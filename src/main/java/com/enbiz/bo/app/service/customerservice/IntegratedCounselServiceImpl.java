package com.enbiz.bo.app.service.customerservice;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.CsCounselTemplateInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensAcceptInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCounselInfoSuperRequest;
import com.enbiz.bo.app.dto.request.customerservice.IntegratedCounselRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnOrdGoodsResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnProcInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCounselTemplateInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsRelatedResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTelPrmsResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransReqResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCounselResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCsDetailResponse;
import com.enbiz.bo.app.entity.CsCcnOrdGoodsInfo;
import com.enbiz.bo.app.entity.CsCcnPrgsStatHist;
import com.enbiz.bo.app.entity.CsCcnProcAempHist;
import com.enbiz.bo.app.entity.CsCcnProcInfo;
import com.enbiz.bo.app.entity.CsCcnTransReqInfo;
import com.enbiz.bo.app.entity.CsCustCnslInfo;
import com.enbiz.bo.app.entity.CsCustTelPrmsInfo;
import com.enbiz.bo.app.entity.CsCustomerCompensAcceptInfo;
import com.enbiz.bo.app.enums.CS005;
import com.enbiz.bo.app.enums.CS021;
import com.enbiz.bo.app.enums.CS022;
import com.enbiz.bo.app.repository.customerservice.CsCcnOrdGoodsInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnOrdGoodsInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnPrgsStatHistTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnProcAempHistTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnProcInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnTransReqInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCnslTmplInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCnslInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCnslInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCpnsAccpInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCpnsAccpInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustTelPrmsInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsMvotTypCdMapper;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class IntegratedCounselServiceImpl implements IntegratedCounselService {
	
	private final CsCustCnslInfoMapper csCustCnslInfoMapper;
	private final CsCustCnslInfoTrxMapper csCustCnslInfoTrxMapper;
	private final CsMvotTypCdMapper csMvotTypCdMapper;
	private final CsCcnOrdGoodsInfoMapper csCcnOrdGoodsInfoMapper;
	private final CsCcnOrdGoodsInfoTrxMapper csCcnOrdGoodsInfoTrxMapper;
	private final CsCcnProcInfoTrxMapper csCcnProcInfoTrxMapper;
	private final CsCustTelPrmsInfoTrxMapper csCustTelPrmsInfoTrxMapper;
	private final CsCcnPrgsStatHistTrxMapper csCcnPrgsStatHistTrxMapper;
	private final CsCcnTransReqInfoTrxMapper csCcnTransReqInfoTrxMapper;
	private final CsCcnProcAempHistTrxMapper csCcnProcAempHistTrxMapper;
	private final CsCustCpnsAccpInfoMapper csCustCpnsAccpInfoMapper;
	private final CsCustCpnsAccpInfoTrxMapper csCustCpnsAccpInfoTrxMapper;
	private final CsCnslTmplInfoMapper csCnslTmplInfoMapper;
	
	/**
     * [통합상담관리 목록 조회]
     */
	@Override
    public List<IntegratedCounselResponse> integratedCounselList(IntegratedCounselRequest IntegratedCounselRequest) throws Exception {
        return csCustCnslInfoMapper.integratedCounselList(IntegratedCounselRequest);
    }

    /**
     * [통합상담관리 목록 조회수]
     */
	@Override
    public int integratedCounselListCount(IntegratedCounselRequest IntegratedCounselRequest) throws Exception {
        return csCustCnslInfoMapper.integratedCounselListCount(IntegratedCounselRequest);
    }
    
    /**
     * CS 이관유형코드 조회
     */
	@Override
    public List<CsTransferTypeCodeResponse> getCsTransferTypeCodeList() {
        return csMvotTypCdMapper.getCsTransferTypeCodeList();
    }
    
    /**
     * 고객상담정보 등록
     */
	@Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCustomerCounselInfo(CsCustomerCounselInfoSuperRequest CsCustomerCounselInfoSuperRequest) throws Exception {

        /**
         * 1. 고객상담처리담당자 이력은 처리자가 바뀔때만 쌓는다.
         */

        saveCustomerCounselingInfoValidation(CsCustomerCounselInfoSuperRequest);

        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        CsCustomerCounselInfoSuperRequest.setSysRegId(currentUser.getLoginId());
        CsCustomerCounselInfoSuperRequest.setSysModId(currentUser.getLoginId());

        if (CsCustomerCounselInfoSuperRequest.getAfterTransfer().equals("Y")) {
            CsCustomerCounselInfoSuperRequest.setCcnPrgsStatCd(CS005.TRANSFER_REQUEST.getCd());
        }

        CsCustCnslInfo csCustCnslInfo = new CsCustCnslInfo();
        CsCcnProcInfo csCcnProcInfo = new CsCcnProcInfo();
        CsCcnOrdGoodsInfo csCcnOrdGoodsInfo = new CsCcnOrdGoodsInfo();
        CsCustTelPrmsInfo csCustTelPrmsInfo = new CsCustTelPrmsInfo();
        CsCcnTransReqInfo csCcnTransReqInfo = new CsCcnTransReqInfo();

        BeanUtils.copyProperties(csCustCnslInfo, CsCustomerCounselInfoSuperRequest);
        BeanUtils.copyProperties(csCcnProcInfo, CsCustomerCounselInfoSuperRequest);
        BeanUtils.copyProperties(csCcnOrdGoodsInfo, CsCustomerCounselInfoSuperRequest);
        BeanUtils.copyProperties(csCustTelPrmsInfo, CsCustomerCounselInfoSuperRequest);
        BeanUtils.copyProperties(csCcnTransReqInfo, CsCustomerCounselInfoSuperRequest);

        if (csCustCnslInfo.getSmsAnsNtcYn() == null) {
            csCustCnslInfo.setSmsAnsNtcYn("N");
        }

        if (csCustCnslInfo.getEmailAnsNtcYn() == null) {
            csCustCnslInfo.setEmailAnsNtcYn("N");
        }

        if (csCustCnslInfo.getPreProcYn() == null) {
            csCustCnslInfo.setPreProcYn("N");
        }

        String ccnPrgsStatCd = csCustCnslInfo.getCcnPrgsStatCd();
        if (ccnPrgsStatCd.equals(CS005.IN_PROGRESS.getCd()) || ccnPrgsStatCd.equals(CS005.TRANSFER_REQUEST.getCd())) {
            csCustCnslInfo.setProcmnId(currentUser.getLoginId());
        } else if (ccnPrgsStatCd.equals(CS005.COMPLETE.getCd())) {
            csCustCnslInfo.setProcmnId(currentUser.getLoginId());
            csCustCnslInfo.setFnshmnId(currentUser.getLoginId());
        }

        //고객상담정보 table의 goodsNo가 올수없다 등록시
        //copyProperties인한 copy
        csCustCnslInfo.setGoodsNo(null);
        csCustCnslInfo.setAcptmnId(currentUser.getLoginId());
        csCustCnslInfoTrxMapper.insertCsCustCnslInfo(csCustCnslInfo);

        csCcnProcInfo.setCcnNo(csCustCnslInfo.getCcnNo());
        csCcnOrdGoodsInfo.setCcnNo(csCustCnslInfo.getCcnNo());
        csCustTelPrmsInfo.setCcnNo(csCustCnslInfo.getCcnNo());
        csCcnTransReqInfo.setCcnNo(csCustCnslInfo.getCcnNo());

        String ordNo = StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getOrdNo()) ? null : CsCustomerCounselInfoSuperRequest.getOrdNo();
        String goodsNo = StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getGoodsNo()) ? null : CsCustomerCounselInfoSuperRequest.getGoodsNo();
        if (ordNo!=null || goodsNo!=null) {
            csCcnOrdGoodsInfo.setCustCnslSeq("1");
            csCcnOrdGoodsInfo.setGoodsNo(goodsNo);
            csCcnOrdGoodsInfo.setOrdNo(ordNo);
            csCcnOrdGoodsInfoTrxMapper.insertCsCcnOrdGoodsInfo(csCcnOrdGoodsInfo);
        }

        if (!StringUtils.isBlank(csCcnProcInfo.getCnslProcCont())) {
        	csCcnProcInfoTrxMapper.insertCsCcnProcInfo(csCcnProcInfo);
            if (CsCustomerCounselInfoSuperRequest.getAfterCall().equals("Y")) {
                csCustTelPrmsInfo.setTelPrmsSeq("1");
                csCustTelPrmsInfo.setPrmsStatCd("10");
                csCustTelPrmsInfo.setAempId(currentUser.getLoginId());
                csCustTelPrmsInfoTrxMapper.insertCsCustTelPrmsInfo(csCustTelPrmsInfo);
            }
            if (CsCustomerCounselInfoSuperRequest.getAfterTransfer().equals("Y")) {
                csCcnTransReqInfo.setMvotReqmnId(currentUser.getLoginId());
                csCcnTransReqInfoTrxMapper.insertCsCsCcnTransReqInfo(csCcnTransReqInfo);
            }
        }

        CsCcnPrgsStatHist csCcnPrgsStatHist = new CsCcnPrgsStatHist();
        BeanUtils.copyProperties(csCcnPrgsStatHist, CsCustomerCounselInfoSuperRequest);
        csCcnPrgsStatHist.setCcnNo(csCustCnslInfo.getCcnNo());
        csCcnPrgsStatHistTrxMapper.postCsCcnPrgsStatHist(csCcnPrgsStatHist);

        if (!ccnPrgsStatCd.equals(CS005.RECEIPT.getCd())) {
            CsCcnProcAempHist csCcnProcAempHist = new CsCcnProcAempHist();
            BeanUtils.copyProperties(csCcnProcAempHist, CsCustomerCounselInfoSuperRequest);
            csCcnProcAempHist.setCcnNo(csCustCnslInfo.getCcnNo());
            csCcnProcAempHist.setAempId(CsCustomerCounselInfoSuperRequest.getSysRegId());
            csCcnProcAempHistTrxMapper.insertCsCcnProcAempHist(csCcnProcAempHist);
        }
    }
    
  //상담등록 validation
    void saveCustomerCounselingInfoValidation(CsCustomerCounselInfoSuperRequest CsCustomerCounselInfoSuperRequest) throws Exception {

        //회원ID/명
        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getMbrNo())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.inqmnNm"));
        }

        //상담유형
        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getCnslTypNo())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.cnslTypText"));
        }

        //상담구분
        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getCustCnslGbCd())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.custCnslGbCd"));
        }

        //접수유형
        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getAccpTypCd())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.accpTypCd"));
        }

        //처리상태
        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getCcnPrgsStatCd())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.ccnPrgsStatCd"));
        }

        //문의내용
        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getAccpCont())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.accpCont"));
        }

        //처리내용
        if (!CsCustomerCounselInfoSuperRequest.getCcnPrgsStatCd().equals(CS005.RECEIPT.getCd())) {
            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getCnslProcCont())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.cnslProcCont"));
            }
        }


        //휴대폰번호여부
        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getCellNoYn())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.tel"));
        }


        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getAfterCall())) {
            throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.noAferCall"));
        }

        //전화약속이 있을경우
        if (CsCustomerCounselInfoSuperRequest.getAfterCall().equals("Y")) {

            //예약시간
            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getPrmsDtm())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.prmsDtme"));
            }

            //알림시간
            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getNotiTmCd())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.notiTmCd"));
            }

            //알림시간
            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getPrmsMethCd())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.prmsMethCd"));
            }

            //휴대폰번호
            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getTelRgnNo())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.tel"));
            }

            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getTelTxnoNo())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.tel"));
            }

            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getTelEndNo())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.tel"));
            }

            //상담에모
            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getCnslMemo())) {
                throw new ValidationException(MessageResolver.getMessage("integratedCounselMgmt.csRegistrationPopup.msg.cnslMemo"));
            }
        }

        if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getAfterTransfer())) {
            throw new ValidationException();
        }

        //업무이관 있을경우
        if (CsCustomerCounselInfoSuperRequest.getAfterTransfer().equals("Y")) {

            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getMvotProcStatCd())) {
                throw new ValidationException();
            }

            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getMvotAfAempId())) {
                throw new ValidationException();
            }

            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getCsMvotTypNo())) {
                throw new ValidationException();
            }

            if (StringUtils.isBlank(CsCustomerCounselInfoSuperRequest.getMvotReqCont())) {
                throw new ValidationException();
            }

        }
    }
    
    /**
     * 고객 data 가져오기
     */
    @Override
    public CsRelatedResponse getCsOrderGoodsData(String ccnNo) throws Exception{
        return csCcnOrdGoodsInfoMapper.getCsOrdGoodsData(ccnNo);
    }
    
    /**
     * 고객보상접수정보 등록
     */
    @Override
    public void registCustomerCompens(CsCustomerCompensAcceptInfoRequest request) throws Exception{
    	
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String loginId = currentUser.getLoginId();

        CsCustomerCompensAcceptInfo cs = new CsCustomerCompensAcceptInfo();
        BeanUtils.copyProperties(cs,request);
        cs.setCpnsAprvStatCd(CS021.RECEIPT.getCd());
        cs.setCpnsPayStatCd(CS022.UNPAID.getCd());

        if(StringUtils.isBlank(cs.getOrdNo())){
            cs.setOrdNo(null);
        }

        if(StringUtils.isBlank(cs.getGoodsNo())){
            cs.setGoodsNo(null);
        }

        cs.setAcptmnId(loginId);
        cs.setSysRegId(loginId);
        cs.setSysModId(loginId);

        csCustCpnsAccpInfoTrxMapper.insertCsCustCpnsAccpInfo(cs);
    }
    
    /**
     * 관련상담 list 조회
     */
    @Override
    public CsRelatedResponse getRelatedConsultation(String ccnNo) throws Exception {

        //상담 주문상품정보
        CsRelatedResponse csRelatedResponse = csCcnOrdGoodsInfoMapper.getCsOrdGoodsData(ccnNo);

        if(csRelatedResponse == null){
            csRelatedResponse = new CsRelatedResponse();
            csRelatedResponse.setCount(0);
            csRelatedResponse.setRelatedConsultation(null);
            return csRelatedResponse;
        }


        if(StringUtils.isBlank(csRelatedResponse.getGoodsNo()) && StringUtils.isBlank(csRelatedResponse.getOrdNo())){
            csRelatedResponse.setCount(0);
            csRelatedResponse.setRelatedConsultation(null);
            return csRelatedResponse;
        }

        List<IntegratedCsDetailResponse> relatedConsultation = csCustCnslInfoMapper.getRelatedConsultation(csRelatedResponse);
        csRelatedResponse.setCount(relatedConsultation.size());
        csRelatedResponse.setRelatedConsultation(relatedConsultation);

        return csRelatedResponse;
    }
    
    /**
     * [처리내역 등록위한 기초데이터]
     */
    @Override
    public IntegratedCsDetailResponse getProcessingDetails(String ccnNo) throws Exception {

        //문의내역 및 답변처리
        IntegratedCsDetailResponse integrateCsDetail = csCustCnslInfoMapper.getIntegrateCsDetail(ccnNo);

        //고객전화약속정보
        List<CsTelPrmsResponse> csTelPrmsInfoList = csCustCnslInfoMapper.getCsTelPrmsInfo(ccnNo);

        //고객상담이관요청정보
        List<CsTransReqResponse> csTransReqInfoList = csCustCnslInfoMapper.getCsTransReqInfo(ccnNo);

        //고객보상접수정보
        String telYn = "", transYn = "";

        if (csTelPrmsInfoList == null || csTelPrmsInfoList.size() == 0) {
            telYn = "Y";
        } else {
            if (csTelPrmsInfoList.get(0).getPrmsStatCd().equals("20")) {
                telYn = "Y";
            } else {
                telYn = "N";
            }
        }

        if (csTransReqInfoList == null || csTransReqInfoList.size() == 0) {
            transYn = "Y";
        } else {
            if (csTransReqInfoList.get(0).getMvotProcStatCd().equals("40")) {
                transYn = "Y";
            } else {
                transYn = "N";
            }
        }

        String cpnsPayYn = csCustCpnsAccpInfoMapper.getCpnsPayYn(ccnNo);

        integrateCsDetail.setTelYn(telYn);
        integrateCsDetail.setTransYn(transYn);
        integrateCsDetail.setCpnsPayYn(cpnsPayYn);

        return integrateCsDetail;
    }

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveCustomerCounselProcessInfo(CsCustomerCounselInfoSuperRequest CsCustomerCounselInfoSuperRequest) throws Exception {
		CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        IntegratedCsDetailResponse integrateCsDetail = csCustCnslInfoMapper.getIntegrateCsDetail(CsCustomerCounselInfoSuperRequest.getCcnNo());

        CsCustomerCounselInfoSuperRequest.setSysRegId(currentUser.getLoginId());
        CsCustomerCounselInfoSuperRequest.setSysModId(currentUser.getLoginId());

        //처리내역 등록 팝업은 업무이관이 완료 되었을 경우만 팝업 Open 가능
        if (CsCustomerCounselInfoSuperRequest.getAfterTransfer().equals("Y")) {
            CsCustomerCounselInfoSuperRequest.setCcnPrgsStatCd(CS005.TRANSFER_REQUEST.getCd());
        }

        //50 : 완료(기처리)
        if (CsCustomerCounselInfoSuperRequest.getCcnPrgsStatCd().equals("50")) {
            CsCustomerCounselInfoSuperRequest.setCcnPrgsStatCd("40");
            CsCustomerCounselInfoSuperRequest.setPreProcYn("Y");
        }

        CsCustCnslInfo csCustCnslInfo = new CsCustCnslInfo();
        CsCcnProcInfo csCcnProcInfo = new CsCcnProcInfo();
        CsCustTelPrmsInfo csCustTelPrmsInfo = new CsCustTelPrmsInfo();
        CsCcnTransReqInfo csCcnTransReqInfo = new CsCcnTransReqInfo();

        BeanUtils.copyProperties(csCustCnslInfo, CsCustomerCounselInfoSuperRequest);
        BeanUtils.copyProperties(csCcnProcInfo, CsCustomerCounselInfoSuperRequest);
        BeanUtils.copyProperties(csCustTelPrmsInfo, CsCustomerCounselInfoSuperRequest);
        BeanUtils.copyProperties(csCcnTransReqInfo, CsCustomerCounselInfoSuperRequest);

        String ccnPrgsStatCd = csCustCnslInfo.getCcnPrgsStatCd();
        if (ccnPrgsStatCd.equals(CS005.IN_PROGRESS.getCd()) || ccnPrgsStatCd.equals(CS005.TRANSFER_REQUEST.getCd())) {
            csCustCnslInfo.setProcmnId(currentUser.getLoginId());
        } else if (ccnPrgsStatCd.equals(CS005.COMPLETE.getCd())) {
            //처리자가 없을때는 완료일 경우 한번에 등록
            if(StringUtils.isBlank(integrateCsDetail.getProcmnId())){
                csCustCnslInfo.setProcmnId(currentUser.getLoginId());
            }
            csCustCnslInfo.setFnshmnId(currentUser.getLoginId());
        }

        //전화 약속이 있을때와 없을때
        if (CsCustomerCounselInfoSuperRequest.getAfterCall().equals("Y")) {
        	csCustCnslInfoTrxMapper.updateProcCsCustCnslInfo(csCustCnslInfo);
        } else {
        	csCustCnslInfoTrxMapper.updateProcNoCallCsCustCnslInfo(csCustCnslInfo);
        }

        csCcnProcInfo.setCcnNo(csCustCnslInfo.getCcnNo());
        csCustTelPrmsInfo.setCcnNo(csCustCnslInfo.getCcnNo());
        csCcnTransReqInfo.setCcnNo(csCustCnslInfo.getCcnNo());


        if (csCcnProcInfo.getCnslProcCont() != null) {
        	csCcnProcInfoTrxMapper.insertCsCcnProcInfo(csCcnProcInfo);
            if (CsCustomerCounselInfoSuperRequest.getAfterCall().equals("Y")) {
                csCustTelPrmsInfo.setTelPrmsSeq("1");
                csCustTelPrmsInfo.setPrmsStatCd("10");
                csCustTelPrmsInfo.setAempId(currentUser.getLoginId());
                csCustTelPrmsInfoTrxMapper.insertCsCustTelPrmsInfo(csCustTelPrmsInfo);
            }
            if (CsCustomerCounselInfoSuperRequest.getAfterTransfer().equals("Y")) {
                csCcnTransReqInfo.setMvotReqmnId(currentUser.getLoginId());
                csCcnTransReqInfoTrxMapper.insertCsCsCcnTransReqInfo(csCcnTransReqInfo);
            }
        }

        CsCcnPrgsStatHist csCcnPrgsStatHist = new CsCcnPrgsStatHist();
        BeanUtils.copyProperties(csCcnPrgsStatHist, CsCustomerCounselInfoSuperRequest);
        csCcnPrgsStatHist.setCcnNo(csCustCnslInfo.getCcnNo());
        csCcnPrgsStatHistTrxMapper.postCsCcnPrgsStatHist(csCcnPrgsStatHist);


       if (ccnPrgsStatCd.equals(CS005.COMPLETE.getCd())) {
            //종료인데 처리자가 존재한다면 히스토리 쌓지 않는다.
            if(!StringUtils.isBlank(integrateCsDetail.getProcmnId())){
                return;
            }
        }

        if (!ccnPrgsStatCd.equals(CS005.RECEIPT.getCd())) {
            CsCcnProcAempHist csCcnProcAempHist = new CsCcnProcAempHist();
            BeanUtils.copyProperties(csCcnProcAempHist, CsCustomerCounselInfoSuperRequest);
            csCcnProcAempHist.setCcnNo(csCustCnslInfo.getCcnNo());
            csCcnProcAempHist.setAempId(CsCustomerCounselInfoSuperRequest.getSysRegId());
            csCcnProcAempHistTrxMapper.insertCsCcnProcAempHist(csCcnProcAempHist);
        }
	}
	
	/**
     * [상담 템플리 가져오기]
     */
    public List<CsCounselTemplateInfoResponse> getCsCounselTemplateInfo(CsCounselTemplateInfoRequest request) throws Exception {
        return csCnslTmplInfoMapper.getCsCnslTmplInfoSelectBoxList(request);
    }
    
    /**
     * [통합상담관리 상세 조회]
     */
    public IntegratedCsDetailResponse integratedCounselDetail(String ccnNo) throws Exception {

        //문의내역 및 답변처리
        IntegratedCsDetailResponse integrateCsDetail = csCustCnslInfoMapper.getIntegrateCsDetail(ccnNo);

        if(!StringUtils.isBlank(integrateCsDetail.getEmailAddr())){
            integrateCsDetail.setUserData(integrateCsDetail.getMbrNm() + " / " + integrateCsDetail.getEmailAddr());
        }

        if(!StringUtils.isBlank(integrateCsDetail.getTelRgnNo())){
            integrateCsDetail.setTelNo(integrateCsDetail.getTelRgnNo() + " - " + integrateCsDetail.getTelTxnoNo() + " - " + integrateCsDetail.getTelEndNo());
        }

        String emailAddr = StringUtils.isBlank(integrateCsDetail.getEmailAddr()) ? "" : integrateCsDetail.getEmailAddr();

        integrateCsDetail.setUserData(integrateCsDetail.getMbrNm()+" / "+ emailAddr);

        //상담상품정보
        List<CsCcnOrdGoodsResponse> integrateOrdAndGoodsInfo = csCustCnslInfoMapper.getIntegrateOrdAndGoodsInfo(ccnNo);

        //처리내역
        List<CsCcnProcInfoResponse> integrateProcInfo = csCustCnslInfoMapper.getIntegrateProcInfo(ccnNo);

        //고객전화약속정보
        List<CsTelPrmsResponse> csTelPrmsInfoList = csCustCnslInfoMapper.getCsTelPrmsInfo(ccnNo);

        //고객상담이관요청정보
        List<CsTransReqResponse> csTransReqInfoList = csCustCnslInfoMapper.getCsTransReqInfo(ccnNo);

        for (CsCcnProcInfoResponse response : integrateProcInfo) {
            response.setCsTelPrmsResponses(new ArrayList<>());
            response.setCsTransReqResponses(new ArrayList<>());
            for (CsTelPrmsResponse csTelPr : csTelPrmsInfoList) {
                if (response.getCnslProcSeq().equals(csTelPr.getCnslProcSeq())) {
                    response.getCsTelPrmsResponses().add(csTelPr);
                }
            }

            for (CsTransReqResponse csTransReq : csTransReqInfoList) {
                if (response.getCnslProcSeq().equals(csTransReq.getCnslProcSeq())) {
                    response.getCsTransReqResponses().add(csTransReq);
                }
            }
        }

        integrateCsDetail.setIntegrateOrdAndGoodsInfo(integrateOrdAndGoodsInfo);
        integrateCsDetail.setIntegrateProcInfo(integrateProcInfo);
        return integrateCsDetail;
    }
}
