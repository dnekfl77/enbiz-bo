package com.enbiz.bo.app.service.customerservice;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.CsAssignRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAssignRetrieveRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAutoDivideAempRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAutoMangersRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsDeptUserRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsObCounselInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsObTypCdRequest;
import com.enbiz.bo.app.dto.request.customerservice.InquireTypeRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerNoMaskingResponse;
import com.enbiz.bo.app.dto.response.customerservice.CounselingTypeResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsAssignResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsAutoDivideAempInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptAempResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptUserResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsObCounselInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsObTypCdResponse;
import com.enbiz.bo.app.dto.response.customerservice.InquireTypeResponse;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;
import com.enbiz.bo.app.entity.CsAutoDivideAempInfo;
import com.enbiz.bo.app.entity.CsCcnOrdGoodsInfo;
import com.enbiz.bo.app.entity.CsCcnPrgsStatHist;
import com.enbiz.bo.app.entity.CsCcnProcAempHist;
import com.enbiz.bo.app.entity.CsCustCnslInfo;
import com.enbiz.bo.app.enums.CS001;
import com.enbiz.bo.app.enums.CS002;
import com.enbiz.bo.app.enums.CS003;
import com.enbiz.bo.app.enums.CS004;
import com.enbiz.bo.app.enums.CS005;
import com.enbiz.bo.app.enums.CS023;
import com.enbiz.bo.app.enums.UR002;
import com.enbiz.bo.app.repository.customer.EtMbrBaseMapper;
import com.enbiz.bo.app.repository.customerservice.CsAutoDivAempInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsAutoDivAempInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnOrdGoodsInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnPrgsStatHistTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCcnProcAempHistTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCnslTypInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCnslInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCnslInfoTrxMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustInqTypCdMapper;
import com.enbiz.bo.app.repository.customerservice.CsObTypCdMapper;
import com.enbiz.bo.app.repository.order.OpOrdBaseMapper;
import com.enbiz.bo.app.repository.system.StDeptCdMapper;
import com.enbiz.bo.app.repository.system.StUserBaseMapper;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.util.DateTimeUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상담할당관리 Service
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class CsAllocationMgmtServiceImpl implements CsAllocationMgmtService {

    private final CsCustCnslInfoMapper csCustCnslInfoMapper;
    private final CsCustCnslInfoTrxMapper csCustCnslInfoTrxMapper;
    private final EtMbrBaseMapper etMbrBaseMapper;
    private final OpOrdBaseMapper ordBaseMapper;
    private final CsCnslTypInfoMapper csCnslTypInfoMapper;
    private final CsCcnOrdGoodsInfoTrxMapper csCcnOrdGoodsInfoTrxMapper;
    private final CsCcnPrgsStatHistTrxMapper csCcnPrgsStatHistTrxMapper;
    private final CsObTypCdMapper csObTypCdMapper;
    private final CsCustInqTypCdMapper csCustInqTypCdMapper;
    private final CsCcnProcAempHistTrxMapper csCcnProcAempHistTrxMapper;
    private final StDeptCdMapper stDeptCdMapper;
    private final StUserBaseMapper stUserBaseMapper;
    private final CsAutoDivAempInfoMapper csAutoDivAempInfoMapper;
    private final CsAutoDivAempInfoTrxMapper csAutoDivAempInfoTrxMapper;

    /**
     * 자동배분상세번호 가져오기
     */
    @Override
    public List<CsAutoDivideAempInfoResponse> getAutoDivideDetailNo(String autoDivGbCd) throws Exception {

        List<CsAutoDivideAempInfoResponse> csAutoDivAempInfoResponseList = new ArrayList<>();

        if(autoDivGbCd.equals(CS023.OB.getCd())){
            CsObTypCdRequest csObTypCdRequest = new CsObTypCdRequest();
            csObTypCdRequest.setUseYn("Y");
            List<CsObTypCdResponse> obTypeNoPagingList = csObTypCdMapper.getObTypeNoPagingList(csObTypCdRequest);

            for(CsObTypCdResponse cs : obTypeNoPagingList){
                CsAutoDivideAempInfoResponse CsAutoDivideAempInfoResponse = new CsAutoDivideAempInfoResponse();
                CsAutoDivideAempInfoResponse.setAutoDivDtlNo(cs.getObTypNo());
                CsAutoDivideAempInfoResponse.setAutoDivDtlNm(cs.getObTypNm());
                csAutoDivAempInfoResponseList.add(CsAutoDivideAempInfoResponse);
            }

        }else if(autoDivGbCd.equals(CS023.OneToOne.getCd())){
            InquireTypeRequest inquireTypeRequest = new InquireTypeRequest();
            inquireTypeRequest.setUseYn("Y");
            List<InquireTypeResponse> inquiryTypeSNoPaging = csCustInqTypCdMapper.getInquiryTypeSmallNoPaging(inquireTypeRequest);

            for(InquireTypeResponse cs : inquiryTypeSNoPaging){
                CsAutoDivideAempInfoResponse CsAutoDivideAempInfoResponse = new CsAutoDivideAempInfoResponse();
                CsAutoDivideAempInfoResponse.setAutoDivDtlNo(cs.getCustInqTypCd());
                CsAutoDivideAempInfoResponse.setAutoDivDtlNm(cs.getCustInqTypNm());
                csAutoDivAempInfoResponseList.add(CsAutoDivideAempInfoResponse);
            }
        }

        return csAutoDivAempInfoResponseList;
    }


    /**
     * 상담할당목록
     */
    @Override
    public List<CsAssignResponse> csAllocationMgmtList(CsAssignRequest request) throws Exception {
        String recept = CS005.RECEIPT.getCd();
        String inProgress = CS005.IN_PROGRESS.getCd();
        String transferRequest = CS005.TRANSFER_REQUEST.getCd();
        String complete = CS005.COMPLETE.getCd();
        String startDate = request.getStartDate().substring(0,8);
        String endDate = request.getEndDate().substring(0,8);
        int days = DateTimeUtils.diffDays(startDate, endDate);
        request.setDays(days);
        request.setCcnPrgsStatCdList(new ArrayList<>());
        List<String> ccnPrgsList = request.getCcnPrgsStatCdList();
        if(StringUtils.isBlank(request.getCcnPrgsStatCd())){
            ccnPrgsList.add(recept);
            ccnPrgsList.add(inProgress);
            ccnPrgsList.add(transferRequest);
            ccnPrgsList.add(complete);
        }else if(request.getCcnPrgsStatCd().equals(inProgress)){
            ccnPrgsList.add(inProgress);
            ccnPrgsList.add(transferRequest);
        }else{
            ccnPrgsList.add(request.getCcnPrgsStatCd());
        }

        return csCustCnslInfoMapper.csAllocationMgmtList(request);
    }

    /**
     * 업무유형별 담당자 목록
     */
    @Override
    public List<CsAssignResponse> csAllocationDetailMgmtList(CsAssignRequest request) throws Exception {

        String recept = CS005.RECEIPT.getCd();
        String inProgress = CS005.IN_PROGRESS.getCd();
        String transferRequest = CS005.TRANSFER_REQUEST.getCd();
        String complete = CS005.COMPLETE.getCd();

        String startDate = request.getStartDate().substring(0,8);
        String endDate = request.getEndDate().substring(0,8);
        int days = DateTimeUtils.diffDays(startDate, endDate);

        request.setDays(days);
        request.setCcnPrgsStatCdList(new ArrayList<>());

        List<String> ccnPrgsList = request.getCcnPrgsStatCdList();

        if(StringUtils.isBlank(request.getCcnPrgsStatCd())){
            ccnPrgsList.add(recept);
            ccnPrgsList.add(inProgress);
            ccnPrgsList.add(transferRequest);
            ccnPrgsList.add(complete);
        }else if(request.getCcnPrgsStatCd().equals(inProgress)){
            ccnPrgsList.add(inProgress);
            ccnPrgsList.add(transferRequest);
        }else{
            ccnPrgsList.add(request.getCcnPrgsStatCd());
        }

        if(request.getSubAutoDivDtlNo().equals("null")){
            request.setSubAutoDivDtlNo(null);
        }

        return csCustCnslInfoMapper.csAllocationDetailMgmtList(request);
    }

    /**
     * 상담할당관리 > 할당회수
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void retrieveAllcations(ArrayList<CsAssignRetrieveRequest> request) throws Exception {

    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String loginId = currentUser.getLoginId();

        List<String> ccnNoAllList = new ArrayList<>();

        for(CsAssignRetrieveRequest retrieve : request){
            List<String> ccnNoList = new ArrayList<>();
            String autoDivGbCd = retrieve.getAutoDivGbCd();
            String autoDivDtlNo = retrieve.getAutoDivDtlNo();
            retrieve.setSysModId(loginId);
            //OB
            if(autoDivGbCd.equals(CS023.OB.getCd()) && !StringUtils.isBlank(autoDivDtlNo)){
                ccnNoList = csCustCnslInfoMapper.retrieveObCcnNoSelect(retrieve);
                if(ccnNoList == null || ccnNoList.size() < 1){
                    return;
                }
                csCustCnslInfoTrxMapper.retrieveObAllcation(retrieve);
            }else if(autoDivGbCd.equals(CS023.OneToOne.getCd()) && !StringUtils.isBlank(autoDivDtlNo)){
            //1:1
                ccnNoList = csCustCnslInfoMapper.retrieveOneToOneCcnNoSelect(retrieve);
                if(ccnNoList == null || ccnNoList.size() < 1){
                    return;
                }
                csCustCnslInfoTrxMapper.retrieveOneToOneAllcation(retrieve);
            }else{
            //(OB,전체) , (1:1,전체) , (QnA,전체)
                ccnNoList = csCustCnslInfoMapper.retrieveCcnNoSelect(retrieve);
                if(ccnNoList == null || ccnNoList.size() < 1){
                    return;
                }
                csCustCnslInfoTrxMapper.retrieveAllcation(retrieve);
            }
            ccnNoAllList.addAll(ccnNoList);
        }

        for(String ccnNo : ccnNoAllList){
            CsCcnProcAempHist csCcnProcAempHist = new CsCcnProcAempHist();
            csCcnProcAempHist.setCcnNo(ccnNo);
            csCcnProcAempHist.setAempId(null);
            csCcnProcAempHist.setSysRegId(loginId);
            csCcnProcAempHist.setSysModId(loginId);
            csCcnProcAempHistTrxMapper.insertCsCcnProcAempHist(csCcnProcAempHist);
        }
    }

    /**
     * OB 업무등록 excel file date setting
     */
    @Override
    public void settingObCsCounselInfoListExcel(List<? extends BaseCommonEntity> list,String cnslTypNo ,String obTypNo) {
        for(Object object : list){
            if(object instanceof CsObCounselInfoRequest){
                CsObCounselInfoRequest request = (CsObCounselInfoRequest) object;
                request.setCnslTypNo(cnslTypNo);
                request.setObTypNo(obTypNo);
            }
        }
    }

    /**
     * OB 업무 일괄등록
     */
    @Override
    public List<CsObCounselInfoResponse> saveObCsCounselInfoListExcel(List<CsObCounselInfoRequest> createList) throws Exception {

        List<CsObCounselInfoResponse> failList = new ArrayList<>();

        for(CsObCounselInfoRequest createData : createList){

            CsObCounselInfoResponse CsObCounselInfoResponse = new CsObCounselInfoResponse();

            //회원번호
            CustomerNoMaskingResponse memberData = etMbrBaseMapper.getMemberData(createData.getMbrNo().trim());

            //주문번호
            boolean ordNoExists = ordBaseMapper.existsOrdNo(createData.getOrdNo().trim());

            if(memberData == null || !ordNoExists){
                CsObCounselInfoResponse.setMbrNo(createData.getMbrNo());
                CsObCounselInfoResponse.setOrdNo(createData.getOrdNo());
                CsObCounselInfoResponse.setAccpCont(createData.getAccpCont());
                CsObCounselInfoResponse.setYn("Fail");
                CsObCounselInfoResponse.setFailCont("존재하지 않는 회원번호 또는 주문번호");
                failList.add(CsObCounselInfoResponse);
            }else{

                CounselingTypeResponse cnslTypInfoData = csCnslTypInfoMapper.getCnslTypInfoData(createData.getCnslTypNo());

                CsCustCnslInfo csCustCnslInfo = new CsCustCnslInfo();
                csCustCnslInfo.setCustCnslGbCd(CS001.IB.getCd());
                csCustCnslInfo.setAccpMediaCd(CS002.CALL.getCd());
                csCustCnslInfo.setAccpTypCd(CS003.OB.getCd());
                csCustCnslInfo.setCnslSubCd(CS004.CALL_CENTER.getCd());
                csCustCnslInfo.setCcnPrgsStatCd(CS005.RECEIPT.getCd());
                csCustCnslInfo.setAcptmnId(createData.getSysRegId());
                csCustCnslInfo.setMbrNo(createData.getMbrNo());
                csCustCnslInfo.setInqmnNm(memberData.getMbrNm());
                csCustCnslInfo.setCnslLrgTypNo(cnslTypInfoData.getCnslLrgTypNo());
                csCustCnslInfo.setCnslMidTypNo(cnslTypInfoData.getCnslMidTypNo());
                csCustCnslInfo.setCnslTypNo(createData.getCnslTypNo());

                if(!StringUtils.isBlank(memberData.getTelRgnNo())){
                    csCustCnslInfo.setCellNoYn("N");
                    csCustCnslInfo.setTelRgnNo(memberData.getTelRgnNo());
                    csCustCnslInfo.setTelTxnoNo(memberData.getTelTxnoNo());
                    csCustCnslInfo.setTelEndNo(memberData.getTelEndNo());
                }else{
                    csCustCnslInfo.setCellNoYn("Y");
                    csCustCnslInfo.setTelRgnNo(memberData.getCellSctNo());
                    csCustCnslInfo.setTelTxnoNo(memberData.getCellTxnoNo());
                    csCustCnslInfo.setTelEndNo(memberData.getCellEndNo());
                }

                csCustCnslInfo.setAccpCont(createData.getAccpCont());
                csCustCnslInfo.setSmsAnsNtcYn("N");
                csCustCnslInfo.setEmailAnsNtcYn("N");
                csCustCnslInfo.setObTypNo(createData.getObTypNo());
                csCustCnslInfo.setPreProcYn("N");
                csCustCnslInfo.setSysRegId(createData.getSysRegId());
                csCustCnslInfo.setSysModId(createData.getSysModId());

                csCustCnslInfoTrxMapper.insertCsCustCnslInfo(csCustCnslInfo);

                if(!StringUtils.isBlank(createData.getOrdNo())){
                    CsCcnOrdGoodsInfo csCcnOrdGoodsInfo = new CsCcnOrdGoodsInfo();
                    csCcnOrdGoodsInfo.setCcnNo(csCustCnslInfo.getCcnNo());
                    csCcnOrdGoodsInfo.setCustCnslSeq("1");
                    csCcnOrdGoodsInfo.setOrdNo(createData.getOrdNo());
                    csCcnOrdGoodsInfo.setSysRegId(createData.getSysRegId());
                    csCcnOrdGoodsInfo.setSysModId(createData.getSysModId());
                    csCcnOrdGoodsInfoTrxMapper.insertCsCcnOrdGoodsInfo(csCcnOrdGoodsInfo);
                }

                CsCcnPrgsStatHist csCcnPrgsStatHist = new CsCcnPrgsStatHist();
                csCcnPrgsStatHist.setCcnNo(csCustCnslInfo.getCcnNo());
                csCcnPrgsStatHist.setCcnPrgsStatCd(csCustCnslInfo.getCcnPrgsStatCd());
                csCcnPrgsStatHist.setSysRegId(createData.getSysRegId());
                csCcnPrgsStatHist.setSysModId(createData.getSysModId());
                csCcnPrgsStatHistTrxMapper.postCsCcnPrgsStatHist(csCcnPrgsStatHist);
            }

        }

        return failList;
    }

	@Override
	public List<UserDeptResponse> getCsDeptList() throws Exception {
		return stDeptCdMapper.getSpecificGroupDeptCd(UR002.CUST_CNTR.getCd());
	}

	@Override
	public List<CsDeptUserResponse> getCsDeptUserList(CsDeptUserRequest request) throws Exception {
		return stUserBaseMapper.getDeptUserList(request);
	}

	@Override
	public int getCsDeptUserListCount(CsDeptUserRequest request) throws Exception {
		return stUserBaseMapper.getDeptUserListCount(request);
	}

	@Override
	public List<CsDeptAempResponse> getAutoDistributionManagerList(CsDeptUserRequest request) throws Exception {
		return csAutoDivAempInfoMapper.getAutoDistributionManagerList(request);
	}

	@Override
	public int getAutoDistributionManagerListCount(CsDeptUserRequest request) throws Exception {
		return csAutoDivAempInfoMapper.getAutoDistributionManagerListCount(request);
	}

	@Override
	public void saveAutoDistributionManager(List<CsAutoDivideAempInfo> createList, List<CsAutoDivideAempInfo> updateList,
			List<CsAutoDivideAempInfo> deleteList) throws Exception {
		for(CsAutoDivideAempInfo createData : createList){
            if(createData.getAutoDivDtlNo().equals("null")){
                createData.setAutoDivDtlNo(null);
            }
            csAutoDivAempInfoTrxMapper.insertCsAutoDivAempInfo(createData);
        }

        for(CsAutoDivideAempInfo updateData : updateList){
            if(updateData.getAutoDivDtlNo().equals("null")){
                updateData.setAutoDivDtlNo(null);
            }
            csAutoDivAempInfoTrxMapper.updateCsAutoDivAempInfo(updateData);
        }

        for(CsAutoDivideAempInfo deleteData : deleteList){
        	csAutoDivAempInfoTrxMapper.deleteCsAutoDivAempInfo(deleteData);
        }
		
	}

	@Override
	public boolean checkValidateManager(CsAutoDivideAempRequest request) throws Exception {
		boolean result = false;

        if(request.getAutoDivDtlNo().equals("null")){
            result = csAutoDivAempInfoMapper.checkValidateNoDtlManager(request);
        }else{
            result = csAutoDivAempInfoMapper.checkValidateManager(request);
        }

        return result;
	}

	@Override
	public void changeAutoDivideAllocationPossibleYn(CsAutoMangersRequest request) throws Exception {
		CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        request.setSysModId(currentUser.getLoginId());
        csAutoDivAempInfoTrxMapper.changeAutoDivPsbYn(request);
	}

}
