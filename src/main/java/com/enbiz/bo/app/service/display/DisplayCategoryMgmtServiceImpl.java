package com.enbiz.bo.app.service.display;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGoodsInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrDispGoodsInfoResponse;
import com.enbiz.bo.app.entity.PrDispCtgBase;
import com.enbiz.bo.app.entity.PrDispGoodsInfo;
import com.enbiz.bo.app.entity.PrDpmlBase;
import com.enbiz.bo.app.repository.display.PrDispCtgBaseMapper;
import com.enbiz.bo.app.repository.display.PrDispCtgBaseTrxMapper;
import com.enbiz.bo.app.repository.display.PrDispGoodsInfoMapper;
import com.enbiz.bo.app.repository.display.PrDispGoodsInfoTrxMapper;
import com.enbiz.bo.app.repository.display.PrDpmlBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;

/**
 * 전시 카테고리 조회 서비스 IMPL
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class DisplayCategoryMgmtServiceImpl implements DisplayCategoryMgmtService {

    private final PrDispCtgBaseMapper prDispCtgBaseMapper;
    private final PrDispCtgBaseTrxMapper prDispCtgBaseTrxMapper;
    private final PrDpmlBaseTrxMapper prDpmlBaseTrxMapper;
    private final PrDispGoodsInfoMapper prDispGoodsInfoMapper;
    private final PrDispGoodsInfoTrxMapper prDispGoodsInfoTrxMapper;

    @Override
    public List<PrDispCtgBaseResponse> getCcSiteBase() throws Exception {
        return prDispCtgBaseMapper.getCcSiteBase();
    }

    @Override
    public List<PrDispCtgBaseResponse> getCategoryTreeList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        Validator.throwIfEmpty(prDispCtgBaseRequest.getSiteNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        Validator.throwIfEmpty(prDispCtgBaseRequest.getShopTypCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"매장유형"}));
        return prDispCtgBaseMapper.getCategoryTreeList(prDispCtgBaseRequest);
    }

    @Override
    public String getSiteName(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        Validator.throwIfEmpty(prDispCtgBaseRequest.getSiteNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        return prDispCtgBaseMapper.getSiteName(prDispCtgBaseRequest);
    }

    @Override
    public void prDpmlBaseInsert(PrDpmlBase prDpmlBase) throws Exception {
        Validator.throwIfEmpty(prDpmlBase.getSiteNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        Validator.throwIfEmpty(prDpmlBase.getDpmlNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시몰명"}));
        Validator.throwIfEmpty(prDpmlBase.getMallTypCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"매장유형"}));
        Validator.throwIfEmpty(prDpmlBase.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
        Validator.throwIfEmpty(prDpmlBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prDpmlBase.getHdrTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"해더유형"}));
        Validator.throwIfEmpty(prDpmlBase.getPrtTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"출력유형"}));
        if(prDpmlBase.getPrtTypCd().equals("01")) {
            Validator.throwIfEmpty(prDpmlBase.getTmplNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
        } else if(prDpmlBase.getPrtTypCd().equals("02")) {
            Validator.throwIfEmpty(prDpmlBase.getMovFrmeCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"이동방법"}));
            Validator.throwIfEmpty(prDpmlBase.getLinkUrlAddr(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결URL"}));
        } else if(prDpmlBase.getPrtTypCd().equals("03")) {
            Validator.throwIfEmpty(prDpmlBase.getLinkDispNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결전시번호"}));
        }
        Validator.throwIfEmpty(prDpmlBase.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
        Validator.throwIfEmpty(prDpmlBase.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prDpmlBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prDpmlBaseTrxMapper.prDpmlBaseInsert(prDpmlBase);

        // 전시몰 데이터 전시카테고리에 대입
        PrDispCtgBase prDispCtgBase = new PrDispCtgBase();
        BeanUtils.copyProperties(prDpmlBase, prDispCtgBase);
        prDispCtgBase.setDispCtgNm(prDpmlBase.getDpmlNm()); // 전시몰명

        String pattern = "yyyyMMdd";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String startDate = simpleDateFormat.format(new Date());
        prDispCtgBase.setDispStrDt(startDate); // 전시시작일자
        prDispCtgBase.setDispEndDt("29991231"); // 전시종료일자

        prDispCtgBase.setUprDispCtgNo(prDispCtgBaseMapper.getUprDispCtgNo(prDispCtgBase.getSiteNo())); // 최상위 루트노드 번호
        prDispCtgBase.setLeafYn("N"); // 최하위여부

        Validator.throwIfEmpty(prDispCtgBase.getDispCtgNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리명"}));
        Validator.throwIfEmpty(prDispCtgBase.getSiteNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        Validator.throwIfEmpty(prDispCtgBase.getDpmlNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시몰번호"}));
        Validator.throwIfEmpty(prDispCtgBase.getShopTypCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"매장유형"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
        Validator.throwIfEmpty(prDispCtgBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispStrDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시시작일자"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispEndDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시종료일자"}));
        Validator.throwIfEmpty(prDispCtgBase.getUprDispCtgNo()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"상위전시카테고리번호"}));
        Validator.throwIfEmpty(prDispCtgBase.getLeafYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"최하위여부"}));
        Validator.throwIfEmpty(prDispCtgBase.getPrtTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"출력유형"}));
        if(prDispCtgBase.getPrtTypCd().equals("01")) {
            Validator.throwIfEmpty(prDispCtgBase.getTmplNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
        } else if(prDispCtgBase.getPrtTypCd().equals("02")) {
            Validator.throwIfEmpty(prDispCtgBase.getMovFrmeCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"이동방법"}));
            Validator.throwIfEmpty(prDispCtgBase.getLinkUrlAddr(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결URL"}));
        } else if(prDispCtgBase.getPrtTypCd().equals("03")) {
            Validator.throwIfEmpty(prDispCtgBase.getLinkDispNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결전시번호"}));
        }
        Validator.throwIfEmpty(prDispCtgBase.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prDispCtgBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));

        prDispCtgBaseTrxMapper.prDispCtgBaseInsert(prDispCtgBase);
    }

    @Override
    public PrDispCtgBaseResponse getMallDetail(PrDispCtgBaseRequest prDispCtgBaseRequest)  throws Exception {
        Validator.throwIfEmpty(prDispCtgBaseRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prDispCtgBaseMapper.getMallDetail(prDispCtgBaseRequest);
    }

    @Override
    public void saveDisplayCategoryMgmtMallDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        PrDispCtgBase prDispCtgBase = new PrDispCtgBase();
        BeanUtils.copyProperties(prDispCtgBaseRequest, prDispCtgBase);
        Validator.throwIfEmpty(prDispCtgBase.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispCtgNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리명"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
        Validator.throwIfEmpty(prDispCtgBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prDispCtgBase.getPrtTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"출력유형"}));
        if(prDispCtgBase.getPrtTypCd().equals("01")) {
            Validator.throwIfEmpty(prDispCtgBase.getTmplNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
        } else if(prDispCtgBase.getPrtTypCd().equals("02")) {
            Validator.throwIfEmpty(prDispCtgBase.getMovFrmeCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"이동방법"}));
            Validator.throwIfEmpty(prDispCtgBase.getLinkUrlAddr(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결URL"}));
        } else if(prDispCtgBase.getPrtTypCd().equals("03")) {
            Validator.throwIfEmpty(prDispCtgBase.getLinkDispNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결전시번호"}));
        }
        Validator.throwIfEmpty(prDispCtgBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));

        prDispCtgBaseTrxMapper.saveMallUpdate(prDispCtgBase);

        PrDpmlBase prDpmlBase = new PrDpmlBase();
        BeanUtils.copyProperties(prDispCtgBaseRequest, prDpmlBase);
        prDpmlBase.setDpmlNm(prDispCtgBaseRequest.getDispCtgNm());
        Validator.throwIfEmpty(prDpmlBase.getDpmlNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시몰번호"}));
        Validator.throwIfEmpty(prDpmlBase.getDpmlNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시몰명"}));
        Validator.throwIfEmpty(prDpmlBase.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
        Validator.throwIfEmpty(prDpmlBase.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
        Validator.throwIfEmpty(prDpmlBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prDpmlBase.getPrtTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"출력유형"}));
        if(prDpmlBase.getPrtTypCd().equals("01")) {
            Validator.throwIfEmpty(prDpmlBase.getTmplNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
        } else if(prDpmlBase.getPrtTypCd().equals("02")) {
            Validator.throwIfEmpty(prDpmlBase.getMovFrmeCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"이동방법"}));
            Validator.throwIfEmpty(prDpmlBase.getLinkUrlAddr(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결URL"}));
        } else if(prDpmlBase.getPrtTypCd().equals("03")) {
            Validator.throwIfEmpty(prDpmlBase.getLinkDispNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결전시번호"}));
        }
        Validator.throwIfEmpty(prDpmlBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));

        prDpmlBaseTrxMapper.prDpmlBaseUpdate(prDpmlBase);
    }

    @Override
    public PrDispCtgBaseResponse getCategoryDetail(PrDispCtgBaseRequest prDispCtgBaseRequest)  throws Exception {
        Validator.throwIfEmpty(prDispCtgBaseRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prDispCtgBaseMapper.getCategoryDetail(prDispCtgBaseRequest);
    }

    @Override
    public void saveCategoryUpdate(PrDispCtgBase prDispCtgBase) throws Exception {
        if( prDispCtgBase.getShopTypCd().equals("40")) { // 비정형 매장인 경우
            prDispCtgBase.setDispSeq(999); // 전시순서
            prDispCtgBase.setDispYn("Y"); // 전시여부

            String pattern = "yyyyMMdd";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String startDate = simpleDateFormat.format(new Date());
            prDispCtgBase.setDispStrDt(startDate); // 전시시작일자
            prDispCtgBase.setDispEndDt("29991231"); // 전시종료일자
        }

        Validator.throwIfEmpty(prDispCtgBase.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispCtgNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리명"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
        Validator.throwIfEmpty(prDispCtgBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispStrDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시시작일자"}));
        Validator.throwIfEmpty(prDispCtgBase.getDispEndDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시종료일자"}));
        Validator.throwIfEmpty(prDispCtgBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));

        if( !prDispCtgBase.getShopTypCd().equals("40") || !prDispCtgBase.getLeafYn().equals("N") ) {
            Validator.throwIfEmpty(prDispCtgBase.getPrtTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"출력유형"}));
            if(prDispCtgBase.getPrtTypCd().equals("01")) {
                Validator.throwIfEmpty(prDispCtgBase.getTmplNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
            } else if(prDispCtgBase.getPrtTypCd().equals("02")) {
                Validator.throwIfEmpty(prDispCtgBase.getMovFrmeCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"이동방법"}));
                Validator.throwIfEmpty(prDispCtgBase.getLinkUrlAddr(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결URL"}));
            } else if(prDispCtgBase.getPrtTypCd().equals("03")) {
                Validator.throwIfEmpty(prDispCtgBase.getLinkDispNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결전시번호"}));
            }
        }

        prDispCtgBaseTrxMapper.saveCategoryUpdate(prDispCtgBase);
    }

    @Override
    public int getSubCategoryListCount(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        Validator.throwIfEmpty(prDispCtgBaseRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prDispCtgBaseMapper.getSubCategoryListCount(prDispCtgBaseRequest);
    }

    @Override
    public List<PrDispCtgBaseResponse> getSubCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        Validator.throwIfEmpty(prDispCtgBaseRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prDispCtgBaseMapper.getSubCategoryList(prDispCtgBaseRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertPrDispCtgBase(PrDispCtgBase dispCtg, List<PrDispCtgBase> createList) throws Exception {
        for (PrDispCtgBase prDispCtgBase : createList) {
            prDispCtgBase.setUprDispCtgNo(dispCtg.getUprDispCtgNo());
            prDispCtgBase.setSiteNo(dispCtg.getSiteNo());
            prDispCtgBase.setShopTypCd(dispCtg.getShopTypCd());
            prDispCtgBase.setLeafYn(dispCtg.getLeafYn());
            prDispCtgBase.setLrgCtgNo(dispCtg.getLrgCtgNo());
            prDispCtgBase.setMidCtgNo(dispCtg.getMidCtgNo());
            prDispCtgBase.setSmlCtgNo(dispCtg.getSmlCtgNo());
            prDispCtgBase.setThnCtgNo(dispCtg.getThnCtgNo());

            String[] startDate = prDispCtgBase.getDispStrDt().split("-");
            String[] endDate = prDispCtgBase.getDispEndDt().split("-");

            prDispCtgBase.setDispStrDt(startDate[0] + startDate[1] + startDate[2]); // 전시시작일자
            prDispCtgBase.setDispEndDt(endDate[0] + endDate[1] + endDate[2]); // 전시종료일자

            Validator.throwIfEmpty(prDispCtgBase.getDispCtgNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리명"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
            Validator.throwIfEmpty(prDispCtgBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispStrDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시시작일자"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispEndDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시종료일자"}));
            Validator.throwIfEmpty(prDispCtgBase.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(prDispCtgBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));

            prDispCtgBaseTrxMapper.prDispCtgBaseInsert(prDispCtgBase);

            // 대중소세 카테고리 중 최하위에 해당 카테고리번호 입력
            if(prDispCtgBase.getLrgCtgNo() == "" || prDispCtgBase.getLrgCtgNo() == null){
                prDispCtgBase.setLrgCtgNo(prDispCtgBase.getDispCtgNo());
            } else if(prDispCtgBase.getMidCtgNo() == "" || prDispCtgBase.getMidCtgNo() == null){
                prDispCtgBase.setMidCtgNo(prDispCtgBase.getDispCtgNo());
            } else if(prDispCtgBase.getSmlCtgNo() == "" || prDispCtgBase.getSmlCtgNo() == null){
                prDispCtgBase.setSmlCtgNo(prDispCtgBase.getDispCtgNo());
            } else if(prDispCtgBase.getThnCtgNo() == "" || prDispCtgBase.getThnCtgNo() == null){
                prDispCtgBase.setThnCtgNo(prDispCtgBase.getDispCtgNo());
            }

            Validator.throwIfEmpty(prDispCtgBase.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prDispCtgBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prDispCtgBaseTrxMapper.prDispCtgBaseUpdateDispCtgNo(prDispCtgBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updatePrDispCtgBase(List<PrDispCtgBase> updateList) throws Exception {
        for (PrDispCtgBase prDispCtgBase : updateList) {
            String[] startDate = prDispCtgBase.getDispStrDt().split("-");
            String[] endDate = prDispCtgBase.getDispEndDt().split("-");

            prDispCtgBase.setDispStrDt(startDate[0] + startDate[1] + startDate[2]); // 전시시작일자
            prDispCtgBase.setDispEndDt(endDate[0] + endDate[1] + endDate[2]); // 전시종료일자

            Validator.throwIfEmpty(prDispCtgBase.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispCtgNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리명"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
            Validator.throwIfEmpty(prDispCtgBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispStrDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시시작일자"}));
            Validator.throwIfEmpty(prDispCtgBase.getDispEndDt()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시종료일자"}));
            Validator.throwIfEmpty(prDispCtgBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));

            prDispCtgBaseTrxMapper.updatePrDispCtgBase(prDispCtgBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deletePrDispCtgBase(List<PrDispCtgBase> deleteList) throws Exception {
        for (PrDispCtgBase prDispCtgBase : deleteList) {
            Validator.throwIfEmpty(prDispCtgBase.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            prDispCtgBaseTrxMapper.deletePrDispCtgBase(prDispCtgBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCUD(PrDispCtgBase prDispCtgBase, List<PrDispCtgBase> createList, List<PrDispCtgBase> updateList, List<PrDispCtgBase> deleteList)  throws Exception {
        insertPrDispCtgBase(prDispCtgBase, createList);
        updatePrDispCtgBase(updateList);
        deletePrDispCtgBase(deleteList);
    }

    @Override
    public PrDispGoodsInfoResponse getGoodsDetail(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception {
        Validator.throwIfEmpty(prDispGoodsInfoRequest.getGoodsNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"상품번호"}));
        return prDispCtgBaseMapper.getGoodsDetail(prDispGoodsInfoRequest);
    }

    @Override
    public int getDisplayGoodsListCount(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception {
        Validator.throwIfEmpty(prDispGoodsInfoRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prDispCtgBaseMapper.getDisplayGoodsListCount(prDispGoodsInfoRequest);
    }

    @Override
    public List<PrDispGoodsInfoResponse> getDisplayGoodsList(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception {
        Validator.throwIfEmpty(prDispGoodsInfoRequest.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        return prDispCtgBaseMapper.getDisplayGoodsList(prDispGoodsInfoRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertPrDispGoodsInfo(List<PrDispGoodsInfo> createList) throws Exception {
        for (PrDispGoodsInfo prDispGoodsInfo : createList) {
            Validator.throwIfEmpty(prDispGoodsInfo.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getGoodsNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"상품번호"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prDispGoodsInfoTrxMapper.insertPrDispGoodsInfo(prDispGoodsInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updatePrDispGoodsInfo(List<PrDispGoodsInfo> updateList) throws Exception {
        for (PrDispGoodsInfo prDispGoodsInfo : updateList) {
            Validator.throwIfEmpty(prDispGoodsInfo.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getGoodsNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"상품번호"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getDispSeq()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getDispYn()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prDispGoodsInfoTrxMapper.updatePrDispGoodsInfo(prDispGoodsInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deletePrDispGoodsInfo(List<PrDispGoodsInfo> deleteList) throws Exception {
        for (PrDispGoodsInfo prDispGoodsInfo : deleteList) {
            Validator.throwIfEmpty(prDispGoodsInfo.getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prDispGoodsInfo.getGoodsNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"상품번호"}));
            prDispGoodsInfoTrxMapper.deletePrDispGoodsInfo(prDispGoodsInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void GoodsCUD(List<PrDispGoodsInfo> createList, List<PrDispGoodsInfo> updateList, List<PrDispGoodsInfo> deleteList)  throws Exception {
        insertPrDispGoodsInfo(createList);
        updatePrDispGoodsInfo(updateList);
        deletePrDispGoodsInfo(deleteList);
    }

    @Override
    public void setValGoodsList(String dispCtgNo, List<PrDispGoodsInfo> goodsList) throws Exception {
        for (PrDispGoodsInfo prDispGoodsInfo : goodsList) {
            prDispGoodsInfo.setDispCtgNo(dispCtgNo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public List<PrDispGoodsInfo> registCUDExcel(List<PrDispGoodsInfo> createList)  throws Exception {
        // 중복 데이터 제거
        List<PrDispGoodsInfo> resultList = new ArrayList<>();
        List<PrDispGoodsInfo> insertList = new ArrayList<>();
        insertList.addAll(createList);
        Validator.throwIfEmpty(createList.get(0).getDispCtgNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
        String[] goodsNoList = prDispGoodsInfoMapper.checkPrDispGoodsInfo(createList.get(0).getDispCtgNo());
        for (int i=0; i<createList.size(); i++) {
            for(String goodsNo : goodsNoList) {
                if(createList.get(i).getGoodsNo().equals(goodsNo)) { // 이미 등록된 상품이 있는 경우
                    resultList.add(createList.get(i));
                    insertList.remove(createList.get(i));
                    break;
                }
            }
        }

        insertPrDispGoodsInfo(insertList); // 중복되지 않은 리스트
        return resultList; // 중복된 리스트 리턴
    }
}
