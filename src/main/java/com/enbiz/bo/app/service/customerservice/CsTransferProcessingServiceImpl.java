package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.CsCcnTransInfoUpdateRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoDetailRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnTransInfoDtlPopResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoResponse;
import com.enbiz.bo.app.entity.CsCcnPrgsStatHist;
import com.enbiz.bo.app.entity.CsCcnTransReqInfo;
import com.enbiz.bo.app.entity.CsCustCnslInfo;
import com.enbiz.bo.app.enums.CS005;
import com.enbiz.bo.app.enums.CS006;
import com.enbiz.bo.app.repository.customerservice.CsCcnPrgsStatHistTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnTransReqInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnTransReqInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCnslInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CsTransferProcessingServiceImpl implements CsTransferProcessingService {
	private final CsCcnTransReqInfoMapper csCcnTransReqInfoMapper;
	private final CsCcnTransReqInfoTrxMapper csCcnTransReqInfoTrxMapper;
	private final CsCustCnslInfoTrxMapper csCustCnslInfoTrxMapper;
	private final CsCcnPrgsStatHistTrxMapper csCcnPrgsStatHistTrxMapper;

	@Override
	public int getCsTransferMgmtCount(CsTransferInfoRequest request) {
		return csCcnTransReqInfoMapper.getCsTransferManagementCount(request);
	}

	@Override
	public CsTransferInfoDetailResponse getCsTransferDetail(CsTransferInfoDetailRequest request) {
		CsTransferInfoDetailResponse transInfo = csCcnTransReqInfoMapper.csTransferHistory(request);

        if(!StringUtils.isBlank(transInfo.getEmailAddr())){
            transInfo.setUserData(transInfo.getMbrNm() + " / " + transInfo.getEmailAddr());
        }

        if(!StringUtils.isBlank(transInfo.getTelRgnNo())){
            transInfo.setTelNo(transInfo.getTelRgnNo() + " - " + transInfo.getTelTxnoNo() + " - " + transInfo.getTelEndNo());
        }

        return transInfo;
	}

	@Override
	public void saveCsTransferAnswerInfo(CsCcnTransInfoUpdateRequest request) throws Exception {
		CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String loginId = currentUser.getLoginId();

        CsCcnTransReqInfo csCcnTransReqInfo = new CsCcnTransReqInfo();
        csCcnTransReqInfo.setCcnNo(request.getCcnNo());
        csCcnTransReqInfo.setCnslProcSeq(request.getCnslProcSeq());
        csCcnTransReqInfo.setMvotProcStatCd(request.getMvotProcStatCd());
        csCcnTransReqInfo.setMvotAnsProcCont(request.getMvotAnsProcCont());
        csCcnTransReqInfo.setSysModId(loginId);
       
        if(csCcnTransReqInfo.getMvotProcStatCd().equals(CS006.TRANSFER_REQUEST.getCd())){
            //임시저장
        	csCcnTransReqInfoTrxMapper.postTempCsTransReqInfo(csCcnTransReqInfo);
        } else if(csCcnTransReqInfo.getMvotProcStatCd().equals(CS006.COMPLETE.getCd())){
            //답변처리
            csCcnTransReqInfo.setFnshmnId(loginId);
            csCcnTransReqInfoTrxMapper.postCompleteCsTransReqInfo(csCcnTransReqInfo);
        }
		
	}

	@Override
	public CsCcnTransInfoDtlPopResponse getCsTransferDetailPopup(CsTransferInfoDetailRequest request) {
		return csCcnTransReqInfoMapper.csTransferDetailHistoryPop(request);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void cancelCsTransfer(CsTransferInfoDetailRequest request) throws Exception {
		/**
         * 1. 고객상담이관요청정보:  접수 -> 접수취소
         * 2. 고객상담정보: 이관요청 -> 처리중
         */
    	
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String loginId = currentUser.getLoginId();

        //업무이관 -> 접수취소
        CsCcnTransReqInfo csCcnTransReqInfo = new CsCcnTransReqInfo();
        csCcnTransReqInfo.setCcnNo(request.getCcnNo());
        csCcnTransReqInfo.setCnslProcSeq(request.getCnslProcSeq());
        csCcnTransReqInfo.setMvotProcStatCd(CS006.RECEIPT_CANCEL.getCd());
        csCcnTransReqInfo.setSysModId(loginId);

        csCcnTransReqInfoTrxMapper.csTransferCancel(csCcnTransReqInfo);

        //고객상담 이관요청 -> 처리중
        CsCustCnslInfo csCustCnslInfo = new CsCustCnslInfo();
        csCustCnslInfo.setCcnNo(request.getCcnNo());
        csCustCnslInfo.setCcnPrgsStatCd(CS005.IN_PROGRESS.getCd());
        csCustCnslInfo.setSysModId(loginId);

        csCustCnslInfoTrxMapper.updateCsInfoPrgsStatCd(csCustCnslInfo);

        //고객상담진행상태 이력
        CsCcnPrgsStatHist csCcnPrgsStatHist = new CsCcnPrgsStatHist();
        csCcnPrgsStatHist.setCcnNo(csCustCnslInfo.getCcnNo());
        csCcnPrgsStatHist.setCcnPrgsStatCd(CS005.IN_PROGRESS.getCd());
        csCcnPrgsStatHist.setSysModId(csCustCnslInfo.getCcnNo());
        csCcnPrgsStatHistTrxMapper.postCsCcnPrgsStatHist(csCcnPrgsStatHist);
	}

	@Override
	public List<CsTransferInfoResponse> getCsTransferMgmtList(CsTransferInfoRequest request) {
		return csCcnTransReqInfoMapper.getCsTransferManagement(request);
	}

}
