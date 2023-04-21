package com.enbiz.bo.app.service.marketing;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.marketing.AppreciateRequest;
import com.enbiz.bo.app.dto.request.marketing.AppreciationCudRequest;
import com.enbiz.bo.app.dto.response.marketing.AppreciateAplyInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateFvrInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateMediaInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateResponse;
import com.enbiz.bo.app.entity.CcAeAplyInfo;
import com.enbiz.bo.app.entity.CcAeAplyMediaInfo;
import com.enbiz.bo.app.entity.CcAeBase;
import com.enbiz.bo.app.entity.CcAeFvrInfo;
import com.enbiz.bo.app.enums.MK012;
import com.enbiz.bo.app.enums.MK013;
import com.enbiz.bo.app.enums.MK014;
import com.enbiz.bo.app.repository.marketing.CcAeBaseMapper;
import com.enbiz.bo.app.repository.marketing.CcAeBaseTrxMapper;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사은행사 관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class AppreciationMgmtServiceImpl implements AppreciationMgmtService{

    private final CcAeBaseMapper ccAeBaseMapper;
    private final CcAeBaseTrxMapper ccAeBaseTrxMapper;

    @Override
    public List<AppreciateResponse> getAppreciationEventList(AppreciateRequest request) throws Exception {
        return ccAeBaseMapper.getAppreciationEventList(request);
    }

    @Override
    public int getAppreciationEventListCount(AppreciateRequest request) throws Exception {
        return ccAeBaseMapper.getAppreciationEventListCount(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveAppreciation(AppreciationCudRequest request) throws Exception {

        validation(request);

        CcAeBase ccAeBase = new CcAeBase();
        BeanUtils.copyProperties(ccAeBase,request);

        if(StringUtils.isBlank(ccAeBase.getPayStrDt()) || StringUtils.isBlank(ccAeBase.getPayEndDt())){
            ccAeBase.setPayStrDt(null);
            ccAeBase.setPayEndDt(null);
        }

        if(ccAeBase.getTmEvtYn().equals("N")){
            ccAeBase.setAplyStrTm(null);
            ccAeBase.setAplyEndTm(null);
        }

        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ccAeBase.setSysRegId(currentUser.getLoginId());
        ccAeBase.setSysModId(currentUser.getLoginId());

        if(StringUtils.isBlank(ccAeBase.getAeNo())){
            ccAeBaseTrxMapper.insertAppreciation(ccAeBase);
        }else{
            ccAeBaseTrxMapper.updateAppreciation(ccAeBase);
        }

        //사은행사적용매체
        CcAeAplyMediaInfo deleteCcAeAplyMediaInfo = new CcAeAplyMediaInfo();
        deleteCcAeAplyMediaInfo.setAeNo(ccAeBase.getAeNo());
        ccAeBaseTrxMapper.deleteAplyMediaInfo(deleteCcAeAplyMediaInfo);
        if(request.getAplyPsbMediaCd() != null && request.getAplyPsbMediaCd().size() > 0){
            for(String mediaCd : request.getAplyPsbMediaCd()) {
                CcAeAplyMediaInfo ccAeAplyMediaInfo = new CcAeAplyMediaInfo();
                ccAeAplyMediaInfo.setAeNo(ccAeBase.getAeNo());
                ccAeAplyMediaInfo.setAplyPsbMediaCd(mediaCd);
                ccAeAplyMediaInfo.setSysRegId(ccAeBase.getSysRegId());
                ccAeAplyMediaInfo.setSysModId(ccAeBase.getSysModId());
                ccAeBaseTrxMapper.insertAplyMediaInfo(ccAeAplyMediaInfo);
            }
        }

        //사은행사혜택정보
        CcAeFvrInfo deleteCcAeFvrInfo = new CcAeFvrInfo();
        deleteCcAeFvrInfo.setAeNo(ccAeBase.getAeNo());
        ccAeBaseTrxMapper.deleteCcAeFvrInfo(deleteCcAeFvrInfo);
        if(request.getAeFvrInfo() !=null && request.getAeFvrInfo().size()>0){
            int seq = 0;
            for(Map<String,String> fvrInfo : request.getAeFvrInfo()){
                CcAeFvrInfo ccAeFvrInfo = new CcAeFvrInfo();
                ccAeFvrInfo.setAeNo(ccAeBase.getAeNo());
                ccAeFvrInfo.setAeFvrSeq(Integer.toString(++seq));
                ccAeFvrInfo.setSysRegId(ccAeBase.getSysRegId());
                ccAeFvrInfo.setSysModId(ccAeBase.getSysModId());
                for(Map.Entry<String, String> entry : fvrInfo.entrySet()){
                    if(entry.getKey().equals("goodsNo")){
                        ccAeFvrInfo.setGoodsNo(entry.getValue());
                    }else if(entry.getKey().equals("minAmt")){
                        ccAeFvrInfo.setAplyMinAmt(Integer.parseInt(entry.getValue()));
                    }
                }
                ccAeBaseTrxMapper.insertCcAeFvrInfo(ccAeFvrInfo);
            }
        }
        
        //사은행사적용정보
        CcAeAplyInfo deleteCcAeAplyInfo = new CcAeAplyInfo();
        deleteCcAeAplyInfo.setAeNo(ccAeBase.getAeNo());
        ccAeBaseTrxMapper.deleteCcAeAplyInfo(deleteCcAeAplyInfo);

        String applyCd = MK013.APPLY.getCd();
        String limitCd = MK013.LIMIT.getCd();
        insertAppreciateAplyInfo(request.getAplySites(),ccAeBase, applyCd, MK014.SITE.getCd());
        insertAppreciateAplyInfo(request.getAplyGoods(),ccAeBase,applyCd, MK014.GOODS.getCd());

        // 10 : 구매금액 사은품 , 20 : 상품 사은품
        if(!ccAeBase.getAddEvtTypCd().equals("20")) {
            insertAppreciateAplyInfo(request.getAplyCategory(), ccAeBase, applyCd, MK014.CATEGORY.getCd());
            insertAppreciateAplyInfo(request.getAplyStdGoods(), ccAeBase, applyCd, MK014.STD_GOODS.getCd());
            insertAppreciateAplyInfo(request.getAplyEntr(), ccAeBase, applyCd, MK014.ENTR.getCd());
            insertAppreciateAplyInfo(request.getAplyBrand(), ccAeBase, applyCd, MK014.BRAND.getCd());
            insertAppreciateAplyInfo(request.getAplyChannel(), ccAeBase, applyCd, MK014.CHANNEL.getCd());

            //적용 정보 - 제한
            insertAppreciateAplyInfo(request.getExceptGoods(), ccAeBase, limitCd, MK014.GOODS.getCd());
            insertAppreciateAplyInfo(request.getExceptStdGoods(), ccAeBase, limitCd, MK014.STD_GOODS.getCd());
        }

    }

    @Override
    public AppreciateDetailResponse getAppreciation(String aeNo) throws Exception {

        //사은행사 기본 데이터 가져온다
        AppreciateDetailResponse appreciationData = ccAeBaseMapper.getAppreciation(aeNo);

        //사은행사 적용정보
        // 01 : 사이트 , 02 : 상품 ,  03 : 전시카테고리  , 04 : 표준상품분류 , 05 : 협력사 , 06 : 브랜드 , 07 : 채널
        List<AppreciateAplyInfoResponse> aeAplyInfo = ccAeBaseMapper.getAplyInfo(aeNo);
        if(aeAplyInfo != null && aeAplyInfo.size() > 0){
            for(AppreciateAplyInfoResponse aeAplyInfoResponse : aeAplyInfo){
                Map<String,String> data = new TreeMap<>();
                data.put("key",aeAplyInfoResponse.getFvrTgtNo());
                data.put("data",aeAplyInfoResponse.getFvrTgtNm()==null?"":aeAplyInfoResponse.getFvrTgtNm());

                if(MK013.APPLY.isEquals(aeAplyInfoResponse.getFvrAplyGbCd())){
                    if(MK014.SITE.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getAplySites().add(data);
                    }else if(MK014.GOODS.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getAplyGoods().add(data);
                    }else if(MK014.CATEGORY.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getAplyCategory().add(data);
                    }else if(MK014.STD_GOODS.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getAplyStdGoods().add(data);
                    }else if(MK014.ENTR.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getAplyEntr().add(data);
                    }else if(MK014.BRAND.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getAplyBrand().add(data);
                    }else if(MK014.CHANNEL.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getAplyChannel().add(data);
                    }
                }else{
                    if(MK014.GOODS.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getExceptGoods().add(data);
                    }else if(MK014.STD_GOODS.isEquals(aeAplyInfoResponse.getFvrAplyTypCd())){
                        appreciationData.getExceptStdGoods().add(data);
                    }
                }
            }
        }

        //사은행사 적용매체
        List<AppreciateMediaInfoResponse> aeMediaInfo = ccAeBaseMapper.getMediaInfo(aeNo);
        if(aeMediaInfo != null && aeMediaInfo.size() > 0){
            for(AppreciateMediaInfoResponse aeMediaRespon : aeMediaInfo){
                appreciationData.getAplyPsbMediaCd().add(aeMediaRespon.getAplyPsbMediaCd());
            }
        }

        //사은행사 혜택 정보
        List<AppreciateFvrInfoResponse> aeFvrInfoList = ccAeBaseMapper.getFvrInfo(aeNo);
        if(aeFvrInfoList != null && aeFvrInfoList.size() > 0){
            for(AppreciateFvrInfoResponse aeFvrInfo : aeFvrInfoList){
                appreciationData.getAeFvrInfo().add(aeFvrInfo);
            }
        }

        return appreciationData;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteAppreciation(String aeNo) throws Exception {
        CcAeBase ccAeBase = new CcAeBase();
        CcAeAplyMediaInfo ccAeAplyMediaInfo = new CcAeAplyMediaInfo();
        CcAeFvrInfo ccAeFvrInfo = new CcAeFvrInfo();
        CcAeAplyInfo ccAeAplyInfo = new CcAeAplyInfo();

        ccAeBase.setAeNo(aeNo);
        ccAeAplyMediaInfo.setAeNo(aeNo);
        ccAeFvrInfo.setAeNo(aeNo);
        ccAeAplyInfo.setAeNo(aeNo);

        ccAeBaseTrxMapper.deleteAppreciation(ccAeBase);
        ccAeBaseTrxMapper.deleteAplyMediaInfo(ccAeAplyMediaInfo);
        ccAeBaseTrxMapper.deleteCcAeFvrInfo(ccAeFvrInfo);
        ccAeBaseTrxMapper.deleteCcAeAplyInfo(ccAeAplyInfo);
    }

    public void insertAppreciateAplyInfo(List<String> aplyList,CcAeBase ccAeBase,String aplyGbCd,String aplyTypCd){
        if(aplyList !=null && aplyList.size() > 0){
            List<String> distinctAplyInfo = aplyList.stream().distinct().collect(Collectors.toList());
            for(String aplyTarget : distinctAplyInfo){
                CcAeAplyInfo ccAeAplyInfo = getCcAeAplyInfo(ccAeBase,aplyTarget,aplyGbCd,aplyTypCd);
                ccAeBaseTrxMapper.insertCcAeAplyInfo(ccAeAplyInfo);
            }
        }
    }

    public CcAeAplyInfo getCcAeAplyInfo(CcAeBase ccAeBase,String targetNo,String aplyGbCd,String aplyTypCd){
        CcAeAplyInfo ccAeAplyInfo = new CcAeAplyInfo();
        ccAeAplyInfo.setAeNo(ccAeBase.getAeNo());
        ccAeAplyInfo.setFvrAplyGbCd(aplyGbCd);
        ccAeAplyInfo.setFvrAplyTypCd(aplyTypCd);
        ccAeAplyInfo.setFvrTgtNo(targetNo);
        ccAeAplyInfo.setSysRegId(ccAeBase.getSysRegId());
        ccAeAplyInfo.setSysModId(ccAeBase.getSysModId());
        return ccAeAplyInfo;
    }

    public void validation(AppreciationCudRequest request) throws Exception {

        //사은행사명
        if(StringUtils.isBlank(request.getAeNm())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeNm"));
        }

        //사은행사유형코드
        if(StringUtils.isBlank(request.getAddEvtTypCd())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeEvtType"));
        }

        //사은행사진행상태코드
        if(StringUtils.isBlank(request.getAePrgsStatCd())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeEvtStatus"));
        }

        //사은행사설명
        if(StringUtils.isBlank(request.getAeDesc())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeDesc"));
        }

        //사은행사시작일시 || 사은행사종료일시
        if(StringUtils.isBlank(request.getAeStrDtm()) || StringUtils.isBlank(request.getAeEndDtm())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeStrEndDtm"));
        }

        //적용매체
        if(CollectionUtils.isEmpty(request.getAplyPsbMediaCd())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeMedia"));
        }

        //회원유형코드
        if(StringUtils.isBlank(request.getMbrTypCd())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeMbrType"));
        }

        //타임행사여부
        if(StringUtils.isBlank(request.getTmEvtYn())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeTmEvtYn"));
        }

        //타임행사여부부에 따른 적용시작시간 , 적용종료시간
        if(StringUtils.isBlank(request.getAplyStrTm()) || StringUtils.isBlank(request.getAplyEndTm())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeAplyStrTmAntEndTm"));
        }

        //사은행사혜택정보
        if(CollectionUtils.isEmpty(request.getAeFvrInfo())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeFvrInfo"));
        }

        //사은행사혜택정보
        for(Map<String,String> fvrInfo :request.getAeFvrInfo()){
            for(Map.Entry<String,String> entry: fvrInfo.entrySet()){
                if(StringUtils.isBlank(entry.getValue())){
                    throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeFvrInfoPriceAndGoods"));
                }
            }
        }

        //사은행사 적용정보
        //10 : 구매금액사은품 , 20 : 상품사은품
        String aeTypcd = request.getAddEvtTypCd();
        if(MK012.BUY_AE.isEquals(aeTypcd)){
            if(CollectionUtils.isEmpty(request.getAplySites())
                    && CollectionUtils.isEmpty(request.getAplyGoods())
                    && CollectionUtils.isEmpty(request.getAplyStdGoods())
                    && CollectionUtils.isEmpty(request.getAplyCategory())
                    && CollectionUtils.isEmpty(request.getAplyBrand())
                    && CollectionUtils.isEmpty(request.getAplyEntr())
                    && CollectionUtils.isEmpty(request.getAplyChannel())){
                throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeAplyInfo"));
            }
        }

        if(MK012.GOODS_AE.isEquals(aeTypcd) && CollectionUtils.isEmpty(request.getAplyGoods())){
            throw new ValidationException(MessageResolver.getMessage("appreciationEventMgmt.ae.message.aeAplyGoodsType"));
        }

    }
}