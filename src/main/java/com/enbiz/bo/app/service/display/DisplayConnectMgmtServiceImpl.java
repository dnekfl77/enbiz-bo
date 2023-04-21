package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrConrContInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrConrSetInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrConrTgtInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrConrContInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrConrSetInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplConrMappInfoResponse;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;
import com.enbiz.bo.app.entity.PrConrContInfo;
import com.enbiz.bo.app.entity.PrConrSetInfo;
import com.enbiz.bo.app.repository.display.PrConrBaseMapper;
import com.enbiz.bo.app.repository.display.PrConrContInfoMapper;
import com.enbiz.bo.app.repository.display.PrConrSetInfoMapper;
import com.enbiz.bo.app.repository.display.PrTmplConrMappInfoMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;

/**
 * 전시 연결 관리 서비스 IMPL
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class DisplayConnectMgmtServiceImpl implements DisplayConnectMgmtService {

    private final PrTmplConrMappInfoMapper prTmplConrMappInfoMapper;
    private final PrConrBaseMapper prConrBaseMapper;
    private final PrConrSetInfoMapper prConrSetInfoMapper;
    private final PrConrContInfoMapper prConrContInfoMapper;

    @Override
    public List<PrTmplConrMappInfoResponse> getConnerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfoRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prTmplConrMappInfoMapper.getConnerList(prTmplConrMappInfoRequest);
    }

    @Override
    public int getConnerListCount(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfoRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prTmplConrMappInfoMapper.getConnerListCount(prTmplConrMappInfoRequest);
    }

    @Override
    public PrConrBaseResponse getConnerDetail(PrConrBaseRequest prConrBaseRequest) throws Exception {
        Validator.throwIfEmpty(prConrBaseRequest.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        return prConrBaseMapper.getConnerDetail(prConrBaseRequest);
    }

    @Override
    public PrDispCtgBaseResponse getDispHierarchyNm(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        return prConrBaseMapper.getDispHierarchyNm(prDispCtgBaseRequest);
    }

    @Override
    public List<PrConrSetInfoResponse> getSetConnerList(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception {
        return prConrBaseMapper.getSetConnerList(prConrSetInfoRequest);
    }

    @Override
    public List<PrConrSetInfoResponse> getFirstSetConnerList(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception {
        return prConrBaseMapper.getFirstSetConnerList(prConrSetInfoRequest);
    }

    @Override
    public int getSetConnerListCount(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception {
        return prConrBaseMapper.getSetConnerListCount(prConrSetInfoRequest);
    }

    @Override
    public void prDispConrInfoInsert(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception {
        Validator.throwIfEmpty(prConrSetInfoRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"카테고리번호"}));
        Validator.throwIfEmpty(prConrSetInfoRequest.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        int cnt = prConrSetInfoMapper.checkPrDispConrInfo(prConrSetInfoRequest);
        if(cnt == 0) {
            PrConrSetInfo prConrSetInfo = new PrConrSetInfo();
            BeanUtils.copyProperties(prConrSetInfoRequest, prConrSetInfo);
            Validator.throwIfEmpty(prConrSetInfo.getSysRegId() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(prConrSetInfo.getSysModId() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prConrSetInfoMapper.prDispConrInfoInsert(prConrSetInfo);
        }
    }

    @Override
    public void prConrSetInfoInsert(String dispCtgNo, PrConrSetInfoRequest prConrSetInfoRequest) throws Exception {
        String[] conrTgtNoList = prConrSetInfoMapper.getConrTgtNoList(prConrSetInfoRequest); // 해당 코너의 코너대상번호 리스트
        for(String conrTgtNo : conrTgtNoList) {
            prConrSetInfoRequest.setConrTgtNo(conrTgtNo);
            int cnt = prConrSetInfoMapper.checkPrConrSetInfo(prConrSetInfoRequest);
            if(cnt == 0) { // 중복이 아닌 경우 저장
                PrConrTgtInfoResponse prConrTgtInfoResponse = prConrSetInfoMapper.getPrConrSetInfo(prConrSetInfoRequest);  // 전시 대상 정보 테이블 조회
                prConrSetInfoRequest.setDispCtgNo(dispCtgNo);
                prConrSetInfoRequest.setConrNo(prConrTgtInfoResponse.getConrNo());
                prConrSetInfoRequest.setConrTgtNo(conrTgtNo);
                prConrSetInfoRequest.setDispSeq(prConrTgtInfoResponse.getDispSeq());
                prConrSetInfoRequest.setDpthNo(prConrTgtInfoResponse.getDpthNo());
                prConrSetInfoRequest.setUprConrTgtNo(prConrTgtInfoResponse.getUprConrTgtNo());
                prConrSetInfoMapper.prConrSetInfoInsert_dpthNo2(prConrSetInfoRequest); // 전시세트정보 테이블 (상세) 입력
            }
        }

    }

    @Override
    public void registCUD(List<PrConrSetInfo> updateList) throws Exception {
        for (PrConrSetInfo prConrSetInfo : updateList) {
            PrConrSetInfoRequest prConrSetInfoRequest = new PrConrSetInfoRequest();
            prConrSetInfoRequest.setDispCtgNo(prConrSetInfo.getDispCtgNo());
            prConrSetInfoRequest.setConrNo(prConrSetInfo.getConrNo());
            prConrSetInfoRequest.setConrTgtNo(prConrSetInfo.getConrTgtNo());
            int cnt = prConrSetInfoMapper.checkPrConrSetInfo(prConrSetInfoRequest); // 중복여부 확인

            if(cnt == 0) { // 중복이 아닌 경우 INSERT
                prConrSetInfoMapper.prConrSetInfoInsert_dpthNo1(prConrSetInfo); // 전시세트정보 테이블 (그룹) 입력
            } else { // 중복인 경우 UPDATE
                prConrSetInfoMapper.prConrSetInfoUpdate(prConrSetInfo); // 전시세트정보 테이블 (그룹) 수정
            }

            // 해당 그룹의 전시세트정보 테이블 (상세) 입력
            prConrSetInfoRequest.setSysRegId(prConrSetInfo.getSysRegId());
            prConrSetInfoRequest.setSysModId(prConrSetInfo.getSysModId());
            prConrSetInfoInsert(prConrSetInfo.getDispCtgNo(), prConrSetInfoRequest);
        }

    }

    @Override
    public List<PrConrTgtInfoResponse> getConrTgtCdList(PrConrTgtInfoRequest prConrTgtInfoRequest) throws Exception {
        if(prConrTgtInfoRequest.getSetYn().equals("Y")) {
            return prConrSetInfoMapper.getConrTgtCdList_setY(prConrTgtInfoRequest);
        } else {
            return prConrSetInfoMapper.getConrTgtCdList_setN(prConrTgtInfoRequest);
        }
    }

    @Override
    public List<PrConrContInfoResponse> getPrConrContInfoGoodsList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoGoodsList(prConrContInfoRequest);
    }

    @Override
    public int getPrConrContInfoListGoodsCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoListGoodsCount(prConrContInfoRequest);
    }

    @Override
    public List<PrConrContInfoResponse> getPrConrContInfoReviewList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoReviewList(prConrContInfoRequest);
    }

    @Override
    public int getPrConrContInfoReviewListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoReviewListCount(prConrContInfoRequest);
    }

    @Override
    public void registCUDPrConrContInfo(List<PrConrContInfo> createList, List<PrConrContInfo> updateList, List<PrConrContInfo> deleteList) throws Exception {
        insertPrConrContInfoMapperInfo(createList);
        updatePrConrContInfoMapperInfo(updateList);
        deletePrConrContInfoMapperInfo(deleteList);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertPrConrContInfoMapperInfo(List<PrConrContInfo> createList) {
        for (PrConrContInfo prConrContInfo : createList) {
            if(prConrContInfo.getConrContNo() == null || prConrContInfo.getConrContNo().equals("") ){
                prConrContInfoMapper.prConrContInfoInsert(prConrContInfo);
            } else {
                prConrContInfoMapper.insertPrConrContInfo(prConrContInfo);
            }
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updatePrConrContInfoMapperInfo(List<PrConrContInfo> updateList) {
        for (PrConrContInfo prConrContInfo : updateList) {
            prConrContInfoMapper.updatePrConrContInfo(prConrContInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deletePrConrContInfoMapperInfo(List<PrConrContInfo> deleteList) {
        for (PrConrContInfo prConrContInfo : deleteList) {
            prConrContInfoMapper.deletePrConrContInfo(prConrContInfo);
        }
    }

    @Override
    public List<PrConrContInfoResponse> getPrConrContInfoBrandList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoBrandList(prConrContInfoRequest);
    }

    @Override
    public int getPrConrContInfoListBrandCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoListBrandCount(prConrContInfoRequest);
    }

    @Override
    public PrBrandMstResponse getBrandDetail(PrBrandMstRequest prBrandMstRequest) throws Exception {
        return prConrContInfoMapper.getBrandDetail(prBrandMstRequest);
    }

    @Override
    public List<PrConrContInfoResponse> getPrConrContInfoMkdpList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoMkdpList(prConrContInfoRequest);
    }

    @Override
    public int getPrConrContInfoMkdpListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoMkdpListCount(prConrContInfoRequest);
    }

    @Override
    public List<PrConrContInfoResponse> getPrConrContInfoHtmlList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoHtmlList(prConrContInfoRequest);
    }

    @Override
    public int getPrConrContInfoHtmlListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoHtmlListCount(prConrContInfoRequest);
    }

    @Override
    public PrConrContInfoResponse getPrConrContInfoHtmlDetail(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoHtmlDetail(prConrContInfoRequest);
    }

    @Override
    public void prConrContInfoInsert(PrConrContInfo prConrContInfo) throws Exception {
        prConrContInfoMapper.prConrContInfoInsert(prConrContInfo);
    }

    @Override
    public void prConrContInfoUpdate(PrConrContInfo prConrContInfo) throws Exception {
        prConrContInfoMapper.updatePrConrContInfo(prConrContInfo);
    }

    @Override
    public List<PrConrContInfoResponse> getPrConrContInfoImgList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoImgList(prConrContInfoRequest);
    }

    @Override
    public int getPrConrContInfoImgListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoImgListCount(prConrContInfoRequest);
    }

    @Override
    public PrConrContInfoResponse getPrConrContInfoImgDetail(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoImgDetail(prConrContInfoRequest);
    }

    @Override
    public List<PrConrContInfoResponse> getPrConrContInfoTextList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoTextList(prConrContInfoRequest);
    }

    @Override
    public int getPrConrContInfoTextListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        return prConrContInfoMapper.getPrConrContInfoTextListCount(prConrContInfoRequest);
    }
}
