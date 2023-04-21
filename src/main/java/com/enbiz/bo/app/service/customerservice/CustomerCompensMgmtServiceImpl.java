package com.enbiz.bo.app.service.customerservice;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.CsCompensReturnRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensAcceptInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCustomerCompensResponse;
import com.enbiz.bo.app.entity.CsCustomerCompensAcceptInfo;
import com.enbiz.bo.app.entity.EtMbrAstMgrHist;
import com.enbiz.bo.app.entity.MeMbrAstSum;
import com.enbiz.bo.app.entity.OpRfdInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.CS019;
import com.enbiz.bo.app.enums.CS021;
import com.enbiz.bo.app.enums.CS022;
import com.enbiz.bo.app.enums.CS026;
import com.enbiz.bo.app.enums.ME015;
import com.enbiz.bo.app.enums.ME016;
import com.enbiz.bo.app.enums.ME020;
import com.enbiz.bo.app.enums.OM023;
import com.enbiz.bo.app.enums.OM024;
import com.enbiz.bo.app.enums.OM025;
import com.enbiz.bo.app.enums.common.CommonCode;
import com.enbiz.bo.app.repository.customerservice.CsCpnsAprmnStdInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCpnsAccpInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCpnsAccpInfoTrxMapper;
import com.enbiz.bo.app.repository.order.EtMbrAstMgrHistTrxMapper;
import com.enbiz.bo.app.repository.order.MeMbrAstSumMapper;
import com.enbiz.bo.app.repository.order.MeMbrAstSumTrxMapper;
import com.enbiz.bo.app.repository.order.OpRfdInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;

/**
 * 고객보상관리
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class CustomerCompensMgmtServiceImpl implements CustomerCompensMgmtService {

    private final CsCustCpnsAccpInfoMapper csCustCpnsAccpInfoMapper;
    private final CsCustCpnsAccpInfoTrxMapper csCustCpnsAccpInfoTrxMapper;
    private final CsCpnsAprmnStdInfoMapper csCpnsAprmnStdInfoMapper;
    private final OpRfdInfoTrxMapper opRfdInfoTrxMapper;
    private final EtMbrAstMgrHistTrxMapper etMbrAstMgrHistTrxMapper;
    private final MeMbrAstSumMapper meMbrAstSumMapper;
    private final MeMbrAstSumTrxMapper meMbrAstSumTrxMapper;

    /**
     * 고객보상 목록 조회
     */
    public List<CsCustomerCompensResponse> getCustomerCompensList(CsCustomerCompensRequest request) throws Exception {
        return csCustCpnsAccpInfoMapper.getCustomerCompensList(request);
    }

    /**
     * 고객보상 목록수 조회
     */
    public int getCustomerCompensListCount(CsCustomerCompensRequest request ) throws Exception {
        return csCustCpnsAccpInfoMapper.getCustomerCompensListCount(request);
    }

    /**
     * 고객보상신청번호 List -> 고객 보상접수정보 조회
     */
    public List<CsCustomerCompensAcceptInfo> getCustomerCompensInfo(String[] custCpnsAplyNoList,String type) throws Exception {
        List<CsCustomerCompensAcceptInfo> csCustCpnsAccpInfos = csCustCpnsAccpInfoMapper.getCustomerCompensInfo(custCpnsAplyNoList);

        for(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo : csCustCpnsAccpInfos){
            if(type.equalsIgnoreCase("A")){
                CsCustomerCompensAcceptInfo.setCpnsAprvStatCd(CS021.REWARD_APPROVAL.getCd());
            }else if(type.equalsIgnoreCase("P")){
                CsCustomerCompensAcceptInfo.setCpnsAprvStatCd(CS021.PAYMENT_APPROVAL.getCd());
            }
        }
        return csCustCpnsAccpInfos;
    }


    /**
     * 고객보상 상세 화면 데이터 조회
     */
    public CsCompensDetailResponse getCustomerCompensDetail(String custCpnsAplyNo) throws Exception {
        return csCustCpnsAccpInfoMapper.getCustomerCompensDetail(custCpnsAplyNo);
    }

    /**
     * 고객보상 사용자 권한 확인
     */
    public String getCsCompensUserGrade(String loginId) throws Exception {
        String grade = csCpnsAprmnStdInfoMapper.getCsCompensUserGrade(loginId);

        if(grade == null){
            return "N";
        }

        return grade;
    }

    /**
     * 고객보상 ( 변경적용 )
     */
    public void updateCustomerCompensDetail(CsCustomerCompensAcceptInfoRequest request) throws Exception{
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String loginId = currentUser.getLoginId();

        CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo = new CsCustomerCompensAcceptInfo();
        CsCustomerCompensAcceptInfo.setCustCpnsAplyNo(request.getCustCpnsAplyNo());
        CsCustomerCompensAcceptInfo.setCpnsAmt(request.getCpnsAmt());

        if(request.getCpnsMeanCd().equals(CS019.CASH.getCd())){
          CsCustomerCompensAcceptInfo.setPayBankCd(request.getPayBankCd());
          CsCustomerCompensAcceptInfo.setPayActnNo(request.getPayActnNo());
          CsCustomerCompensAcceptInfo.setPayDepositorNm(request.getPayDepositorNm());
        }else{
            CsCustomerCompensAcceptInfo.setPayBankCd(null);
            CsCustomerCompensAcceptInfo.setPayActnNo(null);
            CsCustomerCompensAcceptInfo.setPayDepositorNm(null);
        }

        if(StringUtils.isBlank(request.getPayReqMemo())){
            CsCustomerCompensAcceptInfo.setPayReqMemo(null);
        }else{
            CsCustomerCompensAcceptInfo.setPayReqMemo(request.getPayReqMemo());
        }

        CsCustomerCompensAcceptInfo.setAccpCont(request.getAccpCont());
        CsCustomerCompensAcceptInfo.setSysModId(loginId);
        csCustCpnsAccpInfoTrxMapper.updateCustomerCompensDetail(CsCustomerCompensAcceptInfo);
    }

    /**
     *  고객보상 ( 접수취소 및 반려 )
     */
    public void returnCustomerCompensDetail(CsCompensReturnRequest request) throws Exception{
    	
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String loginId = currentUser.getLoginId();
        CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo = new CsCustomerCompensAcceptInfo();

        if(StringUtils.isBlank(request.getCustCpnsAplyNo())){
            throw new Exception();
        }

        if(StringUtils.isBlank(request.getType())){
            throw new Exception();
        }

        if((!request.getType().equalsIgnoreCase("c")) && StringUtils.isBlank(request.getMemo())){
            throw new Exception();
        }

        CsCustomerCompensAcceptInfo.setCustCpnsAplyNo(request.getCustCpnsAplyNo());
        CsCustomerCompensAcceptInfo.setSysModId(loginId);

        //접수취소
        if(request.getType().equalsIgnoreCase("c")) {
            CsCustomerCompensAcceptInfo.setCpnsAprvStatCd(CS021.CANCEL.getCd());
            csCustCpnsAccpInfoTrxMapper.cancelCustomerCompensDetail(CsCustomerCompensAcceptInfo);
        }else if(request.getType().equalsIgnoreCase("a")){
            //보상반려
            CsCustomerCompensAcceptInfo.setCpnsAprvStatCd(CS021.REWARD_RETURN.getCd());
            CsCustomerCompensAcceptInfo.setCpnsPayStatCd(CS022.UNPAID.getCd());
            CsCustomerCompensAcceptInfo.setRetnCausCont(request.getMemo());
            CsCustomerCompensAcceptInfo.setRetnProcmnId(loginId);
            csCustCpnsAccpInfoTrxMapper.rewardPayReturnCustomerCompensDetail(CsCustomerCompensAcceptInfo);
        }else if(request.getType().equalsIgnoreCase("p")){
            //지급반려
            CsCustomerCompensAcceptInfo.setCpnsAprvStatCd(CS021.PAYMENT_RETURN.getCd());
            CsCustomerCompensAcceptInfo.setCpnsPayStatCd(CS022.UNPAID.getCd());
            CsCustomerCompensAcceptInfo.setRetnCausCont(request.getMemo());
            CsCustomerCompensAcceptInfo.setRetnProcmnId(loginId);
            csCustCpnsAccpInfoTrxMapper.rewardPayReturnCustomerCompensDetail(CsCustomerCompensAcceptInfo);
        }

    }


    /**
     * 고객보상 ( 보상승인 , 지급승인 )
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void approveCustomerCompensDetail(CsCustomerCompensAcceptInfoRequest request, Map<String, List<StStdCd>> cs026Code) throws Exception{

    	Validator.throwIfEmpty(request.getCustCpnsAplyNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"CustCpnsAplyNo"}));

        Validator.throwIfEmpty(request.getCpnsAmt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"CpnsAmt"}));

        Validator.throwIfEmpty(request.getAccpCont(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AccpCont"}));

        Validator.throwIfEmpty(request.getCpnsAprvStatCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"CpnsAprvStatCd"}));
        
        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        final String loginId = currentUser.getLoginId();
        final CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo = new CsCustomerCompensAcceptInfo();

        CsCustomerCompensAcceptInfo.setCustCpnsAplyNo(request.getCustCpnsAplyNo());
        CsCustomerCompensAcceptInfo.setCpnsAmt(request.getCpnsAmt());


        if(request.getCpnsMeanCd().equals(CS019.CASH.getCd())){
            CsCustomerCompensAcceptInfo.setPayBankCd(request.getPayBankCd());
            CsCustomerCompensAcceptInfo.setPayActnNo(request.getPayActnNo());
            CsCustomerCompensAcceptInfo.setPayDepositorNm(request.getPayDepositorNm());
        }else{
            CsCustomerCompensAcceptInfo.setPayBankCd(null);
            CsCustomerCompensAcceptInfo.setPayActnNo(null);
            CsCustomerCompensAcceptInfo.setPayDepositorNm(null);
        }

        if(StringUtils.isBlank(request.getPayReqMemo())){
            CsCustomerCompensAcceptInfo.setPayReqMemo(null);
        }else{
            CsCustomerCompensAcceptInfo.setPayReqMemo(request.getPayReqMemo());
        }

        //보상승인상태코드
        CsCustomerCompensAcceptInfo.setCpnsAprvStatCd(request.getCpnsAprvStatCd());
        CsCustomerCompensAcceptInfo.setAccpCont(request.getAccpCont());
        CsCustomerCompensAcceptInfo.setSysModId(loginId);

        //보상승인
        if(request.getCpnsAprvStatCd().equals(CS021.REWARD_APPROVAL.getCd())){

            CsCustomerCompensAcceptInfo.setAprmnId(loginId);
            CsCustomerCompensAcceptInfo.setCpnsPayStatCd(CS022.PAYMENT_REQUEST.getCd());
            csCustCpnsAccpInfoTrxMapper.rewardApproveCompensDetail(CsCustomerCompensAcceptInfo);

        }else if(request.getCpnsAprvStatCd().equals(CS021.PAYMENT_APPROVAL.getCd())){
        //지급승인

            //현금일경우
            if(request.getCpnsMeanCd().equals(CS019.CASH.getCd())){

                CsCustomerCompensAcceptInfo.setCpnsPayStatCd(CS022.WAIT_PAYMENT.getCd());
                CsCustomerCompensAcceptInfo.setCpnsAmt(request.getCpnsAmt());
                csCustCpnsAccpInfoTrxMapper.payCashApproveCompensDetail(CsCustomerCompensAcceptInfo);

                final OpRfdInfo opRfdInfo = new OpRfdInfo();

                if(!StringUtils.isBlank(request.getOrdNo())) {
                    opRfdInfo.setOrdNo(request.getOrdNo());
                }

                opRfdInfo.setMbrNo(request.getMbrNo());
                opRfdInfo.setRfdTypCd(OM023.COMPENS_REFUND.getCd());
                opRfdInfo.setRfdPrgsStatCd(OM024.REFUND_RECEIPT.getCd());
                opRfdInfo.setRfdBankCd(request.getPayBankCd());
                opRfdInfo.setRfdActnNo(request.getPayActnNo());
                opRfdInfo.setRfdActnDepositorNm(request.getPayDepositorNm());
                opRfdInfo.setRfdCausCd(OM025.CPS_REFUND.getCd());
                opRfdInfo.setRfdActnCertiYn("Y");
                opRfdInfo.setRfdAmt(request.getCpnsAmt());
                opRfdInfo.setRfdCmsnAmt(0);
                opRfdInfo.setRfdSmsSndYn("N");
                opRfdInfo.setAcptmnId(loginId);
                opRfdInfo.setSysRegId(loginId);
                opRfdInfo.setSysModId(loginId);
                opRfdInfoTrxMapper.insertAccpOpRfdInfo(opRfdInfo);

            }else{
                CsCustomerCompensAcceptInfo.setCpnsPayStatCd(CS022.COMPLE_PAYMENT.getCd());
                CsCustomerCompensAcceptInfo.setPaymnId(loginId);
                csCustCpnsAccpInfoTrxMapper.payNoCashApproveCompensDetail(CsCustomerCompensAcceptInfo);

                final EtMbrAstMgrHist etMbrAstMgrHist = new EtMbrAstMgrHist();

                String reservesInterval = null;
                List<StStdCd> cs026 = cs026Code.get("CS026");
                for(StStdCd stStdCd : cs026){
                    if(stStdCd.getCd().equals(CS026.RESERVES.getCd())){
                        reservesInterval = stStdCd.getCdNm();
                        break;
                    }
                }

                etMbrAstMgrHist.setMbrNo(request.getMbrNo());

                if(request.getCpnsMeanCd().equals(CS019.RESERVES.getCd())){
                    etMbrAstMgrHist.setAstGbCd(ME015.RESERVES.getCd());
                    etMbrAstMgrHist.setAstRsrvTypCd(ME020.CUSTOMER_CP_RESERVES.getCd());
                    etMbrAstMgrHist.setAvalEndDt(reservesInterval+" day");
                }else{
                    etMbrAstMgrHist.setAstGbCd(ME015.DEPOSIT.getCd());
                    etMbrAstMgrHist.setAstRsrvTypCd(ME020.CUSTOMER_CP_DEPOSIT.getCd());
                    etMbrAstMgrHist.setAvalEndDt(CommonCode.MAX_DATE.getCd());
                }

                etMbrAstMgrHist.setRsrvUseGbCd(ME016.ACCUMULATE.getCd());
                etMbrAstMgrHist.setAstMgrNo(request.getCustCpnsAplyNo());
                etMbrAstMgrHist.setOcurAmt(request.getCpnsAmt());
                etMbrAstMgrHist.setBalAmt(request.getCpnsAmt());
                etMbrAstMgrHist.setSysRegId(loginId);
                etMbrAstMgrHist.setSysModId(loginId);

                //회원자산관리이력
                etMbrAstMgrHistTrxMapper.insertCsCpMbrAstMgrHist(etMbrAstMgrHist);

                MeMbrAstSum meMbrAstSumParam = new MeMbrAstSum();
                meMbrAstSumParam.setMbrNo(request.getMbrNo());
                if(request.getCpnsMeanCd().equals(CS019.RESERVES.getCd())){
                    meMbrAstSumParam.setAstGbCd(ME015.RESERVES.getCd());
                }else{
                    meMbrAstSumParam.setAstGbCd(ME015.DEPOSIT.getCd());
                }

                MeMbrAstSum meMbrAstSum = meMbrAstSumMapper.selectMbrAstSum(meMbrAstSumParam);

                if(meMbrAstSum == null){
                    meMbrAstSum = new MeMbrAstSum();
                    meMbrAstSum.setMbrNo(request.getMbrNo());
                    if(request.getCpnsMeanCd().equals(CS019.RESERVES.getCd())){
                        meMbrAstSum.setAstGbCd(ME015.RESERVES.getCd());
                    }else{
                        meMbrAstSum.setAstGbCd(ME015.DEPOSIT.getCd());
                    }
                    meMbrAstSum.setTotAmt(request.getCpnsAmt());
                    meMbrAstSum.setUseAmt(0);
                    meMbrAstSum.setPosnAmt(request.getCpnsAmt());
                    meMbrAstSum.setSysRegId(loginId);
                    meMbrAstSum.setSysModId(loginId);
                    meMbrAstSumTrxMapper.insertMeMbrAstSum(meMbrAstSum);
                }else{
                    meMbrAstSum.setTotAmt(meMbrAstSum.getTotAmt()+request.getCpnsAmt());
                    meMbrAstSum.setPosnAmt(meMbrAstSum.getPosnAmt()+request.getCpnsAmt());
                    meMbrAstSum.setSysModId(loginId);
                    meMbrAstSumTrxMapper.updateMeMbrAstSum(meMbrAstSum);
                }
            }
        }

    }

}
