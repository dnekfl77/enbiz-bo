package com.enbiz.bo.app.service.vendor;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.vendor.CooperateAndOthersRequest;
import com.enbiz.bo.app.dto.request.vendor.CooperateSearchRequest;
import com.enbiz.bo.app.dto.request.vendor.PartnerSearchRequest;
import com.enbiz.bo.app.dto.response.vendor.CooperateAndOthersResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateSearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerDeliveryPolicySearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerSearchResponse;
import com.enbiz.bo.app.entity.CcChlBase;
import com.enbiz.bo.app.entity.CcChlDtlInfo;
import com.enbiz.bo.app.entity.EtEntrAempInfo;
import com.enbiz.bo.app.entity.EtEntrBase;
import com.enbiz.bo.app.repository.display.CcChlBaseMapper;
import com.enbiz.bo.app.repository.display.CcChlBaseTrxMapper;
import com.enbiz.bo.app.repository.display.CcSiteBaseMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrAempInfoMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrAempInfoTrxMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrBaseMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class VendorManagementServiceImpl implements VendorManagementService {

    private final EtEntrBaseMapper etEntrBaseMapper;
    private final EtEntrAempInfoMapper etEntrAempInfoMapper;
    private final EtEntrBaseTrxMapper etEntrBaseTrxMapper;
    private final EtEntrAempInfoTrxMapper etEntrAempInfoTrxMapper;
    private final CcChlBaseMapper ccChlBaseMapper;
    private final CcChlBaseTrxMapper ccChlBaseTrxMapper;
    private final CcSiteBaseMapper ccSiteBaseMapper;
    

    @Override
    public int getPartnerSearchListCount(PartnerSearchRequest partnerSearchRequest) throws Exception {
        return etEntrBaseMapper.getPartnerSearchListCount(partnerSearchRequest);
    }

    @Override
    public List<PartnerSearchResponse> getPartnerSearchList(PartnerSearchRequest partnerSearchRequest) throws Exception {
        return etEntrBaseMapper.getPartnerSearchList(partnerSearchRequest);
    }

    @Override
    public int getDeliveryPolicySearchListCount(PartnerSearchRequest partnerSearchRequest) throws Exception {
        return etEntrBaseMapper.getDeliveryPolicySearchListCount(partnerSearchRequest);
    }

    @Override
    public List<PartnerDeliveryPolicySearchResponse> getDeliveryPolicySearchList(PartnerSearchRequest partnerSearchRequest)
            throws Exception {
        return etEntrBaseMapper.getDeliveryPolicySearchList(partnerSearchRequest);
    }

    @Override
    public int getCooperateSearchListCount(CooperateSearchRequest cooperateSearchRequest) throws Exception {
        return etEntrBaseMapper.getCooperateSearchListCount(cooperateSearchRequest);
    }

    @Override
    public List<CooperateSearchResponse> getCooperateSearchList(CooperateSearchRequest cooperateSearchRequest)
            throws Exception {
        return etEntrBaseMapper.getCooperateSearchList(cooperateSearchRequest);
    }

    @Override
    public CooperateResponse getCooperateDetail(String entrNo) throws Exception {
        return etEntrBaseMapper.getCooperateDetail(entrNo);
    }

    private EtEntrBase setChangeContrDt(EtEntrBase etEntrBase) {
        String contrStrtDt = etEntrBase.getContStrtDy();
        String contrEndDt = etEntrBase.getContEndDy();

        if(contrStrtDt != null && !contrStrtDt.isEmpty()){
            etEntrBase.setContStrtDy(contrStrtDt.replaceAll("-", "").substring(0, 8));
        }

        if(contrEndDt != null && !contrEndDt.isEmpty()){
            etEntrBase.setContEndDy(contrEndDt.replaceAll("-", "").substring(0, 8));
        }

        return etEntrBase;
    }

    private void etEntrAempInfoValidator(EtEntrAempInfo etEntrAempInfo) throws Exception {
        Validator.throwIfEmpty(etEntrAempInfo.getDutyCd()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"DutyCd"}));

        Validator.throwIfEmpty(etEntrAempInfo.getAempNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"AempNm"}));
    }

    @Override
    public int getCooperateChannelSearchListCount(CooperateSearchRequest cooperateSearchRequest) throws Exception {
        return etEntrBaseMapper.getCooperateChannelSearchListCount(cooperateSearchRequest);
    }

    @Override
    public List<CooperateSearchResponse> getCooperateChannelSearchList(CooperateSearchRequest cooperateSearchRequest)
            throws Exception {
        return etEntrBaseMapper.getCooperateChannelSearchList(cooperateSearchRequest);
    }

    @Override
    public int getCcChlBaseByEntrNoCount(String entrNo) throws Exception {
        return ccChlBaseMapper.getCcChlBaseByEntrNoCount(entrNo);
    }

    @Override
    public List<CcChlBase> getCcChlBaseByEntrNoList(String entrNo) throws Exception {
        return ccChlBaseMapper.getCcChlBaseByEntrNoList(entrNo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCcChlBase(List<CcChlBase> createCcChlBaseList,
                                                List<CcChlBase> updateCcChlBaseList,
                                                List<CcChlBase> deleteCcChlBaseList)
            throws Exception {
    	
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        for (CcChlBase ccChlBase : createCcChlBaseList) {
            ValidatorCcChlBase(ccChlBase);

            ccChlBase.setSysRegId(currentUser.getLoginId());
            ccChlBase.setSysModId(currentUser.getLoginId());
            ccChlBase = setChangeAplyDt(ccChlBase);

            ccChlBaseTrxMapper.insertCcChlBase(ccChlBase);
        }

        for (CcChlBase ccChlBase : updateCcChlBaseList) {
            ValidatorCcChlBase(ccChlBase);

            ccChlBase.setSysRegId(currentUser.getLoginId());
            ccChlBase.setSysModId(currentUser.getLoginId());
            ccChlBase = setChangeAplyDt(ccChlBase);

            ccChlBaseTrxMapper.updateCcChlBase(ccChlBase);
        }

        for (CcChlBase ccChlBase : deleteCcChlBaseList) {
            Validator.throwIfEmpty(ccChlBase.getChlNo(),
                    MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"ChlNo"}));

            ccChlBaseTrxMapper.deleteCcChlBase(ccChlBase);
        }
    }

    private void ValidatorCcChlBase(CcChlBase ccChlBase) {

        Validator.throwIfEmpty(ccChlBase.getEntrNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"EntrNo"}));
        Validator.throwIfEmpty(ccChlBase.getChlTypCd()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ChlTypCd"}));
        Validator.throwIfEmpty(ccChlBase.getChlNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ChlNm"}));
        Validator.throwIfEmpty(ccChlBase.getAplyStrDt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"AplyStrDt"}));
        Validator.throwIfEmpty(ccChlBase.getAplyEndDt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"AplyEndDt"}));

    }

    private CcChlBase setChangeAplyDt(CcChlBase ccChlBase) {
        String aplyStrDt = ccChlBase.getAplyStrDt();
        String aplyEndDt = ccChlBase.getAplyEndDt();

        if(aplyStrDt != null && !aplyStrDt.isEmpty()){
            ccChlBase.setAplyStrDt(aplyStrDt.replaceAll("-", "").substring(0, 8));
        }

        if(aplyEndDt != null && !aplyEndDt.isEmpty()){
            ccChlBase.setAplyEndDt(aplyEndDt.replaceAll("-", "").substring(0, 8));
        }

        return ccChlBase;
    }

    @Override
    public int getCcChlDtlInfoByChlNoCount(String chlNo) throws Exception {
        return ccChlBaseMapper.getCcChlDtlInfoByChlNoCount(chlNo);
    }

    @Override
    public List<CcChlDtlInfo> getCcChlDtlInfoByChlNoList(String chlNo) throws Exception {
        return ccChlBaseMapper.getCcChlDtlInfoByChlNoList(chlNo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCcChlDtlInfo(List<CcChlDtlInfo> createList,
                                           List<CcChlDtlInfo> updateList,
                                           List<CcChlDtlInfo> deleteList) throws Exception {

        for (CcChlDtlInfo ccChlDtlInfo : createList) {
            ValidatorCcChlDtlInfo(ccChlDtlInfo);
            ccChlBaseTrxMapper.insertCcChlDtlInfo(ccChlDtlInfo);
        }

        for (CcChlDtlInfo ccChlDtlInfo : updateList) {
            ValidatorCcChlDtlInfo(ccChlDtlInfo);
            ccChlBaseTrxMapper.updateCcChlDtlInfo(ccChlDtlInfo);
        }

        for (CcChlDtlInfo ccChlDtlInfo : deleteList) {
            Validator.throwIfEmpty(ccChlDtlInfo.getChlNo(),
                    MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"ChlNo"}));
            Validator.throwIfEmpty(ccChlDtlInfo.getChlDtlNo(),
                    MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"ChlDtlNo"}));

            ccChlBaseTrxMapper.deleteCcChlDtlInfo(ccChlDtlInfo);
        }
    }

    private void ValidatorCcChlDtlInfo(CcChlDtlInfo ccChlDtlInfo) {

        Validator.throwIfEmpty(ccChlDtlInfo.getChlNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ChlNo"}));
        Validator.throwIfEmpty(ccChlDtlInfo.getChlDtlNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ChlTypCd"}));

    }

    public int getCountOfExistsEtEntrBaseByEntrNm(EtEntrBase etEntrBase) throws Exception {
        return etEntrBaseMapper.getCountOfExistsEtEntrBaseByEntrNm(etEntrBase);
    }

    @Override
    public CooperateAndOthersResponse getCooperateAndOthersByEntrNo(CooperateAndOthersRequest cooperateAndOthersRequest)
            throws Exception {

        CooperateAndOthersResponse cooperateAndOthersResponse =
                etEntrBaseMapper.getCooperateDetail(cooperateAndOthersRequest.getEntrNo());

        cooperateAndOthersResponse.setCooperateEmployeeList(
                etEntrAempInfoMapper.getEtEntrAempInfoList(cooperateAndOthersRequest.getEntrNo()));

        return cooperateAndOthersResponse;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCooperateWithOtherData(RawRealGridCUDRequest rawCUDRequest, EtEntrBase etEntrBase)
            throws Exception {

        Validator.throwIfEmpty(etEntrBase.getEntrNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"entrNm"}));
        Validator.throwIfEmpty(etEntrBase.getRpstmnNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"RpstmnNm"}));
        Validator.throwIfEmpty(etEntrBase.getTrdStatCd()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"TrdStatCd"}));
        Validator.throwIfEmpty(etEntrBase.getBmanNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"bmanNo"}));
        Validator.throwIfEmpty(etEntrBase.getContStrtDy()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"contStrtDy"}));
        Validator.throwIfEmpty(etEntrBase.getContEndDy()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"contEndDy"}));
        Validator.throwIfEmpty(etEntrBase.getAempTelRgnNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"aempTelRgnNo"}));
        Validator.throwIfEmpty(etEntrBase.getAempTelTxnoNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"aempTelTxnoNo"}));
        Validator.throwIfEmpty(etEntrBase.getAempTelEndNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"aempTelEndNo"}));
        Validator.throwIfEmpty(etEntrBase.getZipNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"zipNo"}));
        Validator.throwIfEmpty(etEntrBase.getDtlAddr()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"dtlAddr"}));

        if (this.getCountOfExistsEtEntrBaseByEntrNm(etEntrBase) > 0 ) {
            throw new ValidationException("중복된 명칭을 사용하였습니다. 확인 후 다시 시도해 주세요.");
        }

        //제휴사 정보는 구분코드에 20 을 지정한다.
        etEntrBase.setEntrGbCd("20");
        //제휴사 정보는 거래형태코드에 30 을 지정한다.
        etEntrBase.setTrdTypCd("30");
        etEntrBase = setChangeContrDt(etEntrBase);

        if (StringUtils.equals("", etEntrBase.getEntrNo())) {
            etEntrBaseTrxMapper.insertEtEntrBaseTrx(etEntrBase);
        } else {
            etEntrBaseTrxMapper.updateEtEntrBaseTrx(etEntrBase);
        }

        setOthersDataByEntrNo(rawCUDRequest, etEntrBase.getEntrNo());
    }

    private void setOthersDataByEntrNo(RawRealGridCUDRequest rawCUDRequest, String entrNo) throws Exception {
        //배송비정책 그리드
        RealGridCUDRequest<EtEntrAempInfo> etEntrAempInfo =
                rawCUDRequest.getRequest("cooperateEmployeeGrid", EtEntrAempInfo.class);

        List<EtEntrAempInfo> createData = etEntrAempInfo.getCreate();
        List<EtEntrAempInfo> updateData = etEntrAempInfo.getUpdate();
        List<EtEntrAempInfo> deleteData = etEntrAempInfo.getDelete();
        saveEtEntrAempInfo(entrNo, createData, updateData, deleteData);
    }

    public void saveEtEntrAempInfo(String entrNo, List<EtEntrAempInfo> createEtEntrAempInfoList,
                                   List<EtEntrAempInfo> updateEtEntrAempInfoList,
                                   List<EtEntrAempInfo> deleteEtEntrAempInfoList) throws Exception {

        for (EtEntrAempInfo etEntrAempInfo : createEtEntrAempInfoList) {
            etEntrAempInfo.setEntrNo(entrNo);
            etEntrAempInfoValidator(etEntrAempInfo);
            etEntrAempInfoTrxMapper.insertEtEntrAempInfoTrx(etEntrAempInfo);
        }

        for (EtEntrAempInfo etEntrAempInfo : updateEtEntrAempInfoList) {
            etEntrAempInfo.setEntrNo(entrNo);
            etEntrAempInfoValidator(etEntrAempInfo);
            etEntrAempInfoTrxMapper.updateEtEntrAempInfoTrx(etEntrAempInfo);
        }

        for (EtEntrAempInfo etEntrAempInfo : deleteEtEntrAempInfoList) {
            etEntrAempInfo.setEntrNo(entrNo);
            Validator.throwIfEmpty(etEntrAempInfo.getAempSeq(),
                    MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"AempSeq"}));

            etEntrAempInfoTrxMapper.deleteEtEntrAempInfoTrx(etEntrAempInfo);
        }
    }
}
