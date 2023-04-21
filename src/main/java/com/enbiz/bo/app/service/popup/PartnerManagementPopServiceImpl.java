package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.vendor.PartnerCruRequest;
import com.enbiz.bo.app.dto.response.vendor.PartnerCruPopupResponseEx;
import com.enbiz.bo.app.entity.EtDeliPolcBase;
import com.enbiz.bo.app.entity.EtEntrAempInfo;
import com.enbiz.bo.app.entity.EtEntrBase;
import com.enbiz.bo.app.entity.EtEntrDlvpInfo;
import com.enbiz.bo.app.repository.vendor.EtDeliPolcBaseMapper;
import com.enbiz.bo.app.repository.vendor.EtDeliPolcBaseTrxMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrAempInfoMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrAempInfoTrxMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrBaseMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrBaseTrxMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrDlvpInfoMapper;
import com.enbiz.bo.app.repository.vendor.EtEntrDlvpInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class PartnerManagementPopServiceImpl implements PartnerManagementPopService {

    private final EtEntrBaseTrxMapper etEntrBaseTrxMapper;
    private final EtEntrAempInfoTrxMapper etEntrAempInfoTrxMapper;
    private final EtDeliPolcBaseTrxMapper etDeliPolcBaseTrxMapper;
    private final EtEntrDlvpInfoTrxMapper etEntrDlvpInfoTrxMapper;

    private final EtEntrBaseMapper etEntrBaseMapper;
    private final EtEntrAempInfoMapper etEntrAempInfoMapper;
    private final EtDeliPolcBaseMapper etDeliPolcBaseMapper;
    private final EtEntrDlvpInfoMapper etEntrDlvpInfoMapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveVendorWithOtherData(RawRealGridCUDRequest rawCUDRequest, EtEntrBase etEntrBase) throws Exception {
        if (this.getCountOfExistsEtEntrBaseByEntrNm(etEntrBase) > 0 ) {
            throw new ValidationException("중복된 명칭을 사용하였습니다. 확인 후 다시 시도해 주세요.");
        }

        etEntrBase = setChangeContrDt(etEntrBase);
        etEntrBaseTrxMapper.insertEtEntrBaseTrx(etEntrBase);
        setOtherDataByVendor(rawCUDRequest, etEntrBase.getEntrNo());
    }

    public int getCountOfExistsEtEntrBaseByEntrNm(EtEntrBase etEntrBase) throws Exception {
        return etEntrBaseMapper.getCountOfExistsEtEntrBaseByEntrNm(etEntrBase);
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

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    private void setOtherDataByVendor(RawRealGridCUDRequest rawCUDRequest, String entrNo) throws Exception {
        //협력사 담당자 그리드
        RealGridCUDRequest<EtEntrAempInfo> etEntrAempInfoGridCUD =
                rawCUDRequest.getRequest("etEntrAempInfoGrid", EtEntrAempInfo.class);

        List<EtEntrAempInfo> createEtEntrAempInfoList = etEntrAempInfoGridCUD.getCreate();
        List<EtEntrAempInfo> updateEtEntrAempInfoList = etEntrAempInfoGridCUD.getUpdate();
        List<EtEntrAempInfo> deleteEtEntrAempInfoList = etEntrAempInfoGridCUD.getDelete();
        saveEtEntrAempInfo(entrNo, createEtEntrAempInfoList, updateEtEntrAempInfoList, deleteEtEntrAempInfoList);

        //배송비정책 그리드
        RealGridCUDRequest<EtDeliPolcBase> etDeliPolcBaseGridCUD =
                rawCUDRequest.getRequest("etDeliPolcBaseGrid", EtDeliPolcBase.class);

        List<EtDeliPolcBase> createEtDeliPolcBaseList = etDeliPolcBaseGridCUD.getCreate();
        List<EtDeliPolcBase> updateEtDeliPolcBaseList = etDeliPolcBaseGridCUD.getUpdate();
        List<EtDeliPolcBase> deleteEtDeliPolcBaseList = etDeliPolcBaseGridCUD.getDelete();
        saveEtDeliPolcBase(entrNo, createEtDeliPolcBaseList, updateEtDeliPolcBaseList, deleteEtDeliPolcBaseList);

        //협력사 배송비 정보 그리드
        RealGridCUDRequest<EtEntrDlvpInfo> etEntrDlvpInfoGridCUD =
                rawCUDRequest.getRequest("etEntrDlvpInfoGrid", EtEntrDlvpInfo.class);

        List<EtEntrDlvpInfo> createEtEntrDlvpInfoList = etEntrDlvpInfoGridCUD.getCreate();
        List<EtEntrDlvpInfo> updateEtEntrDlvpInfoList = etEntrDlvpInfoGridCUD.getUpdate();
        List<EtEntrDlvpInfo> deleteEtEntrDlvpInfoList = etEntrDlvpInfoGridCUD.getDelete();
        saveEtEntrDlvpInfo(entrNo, createEtEntrDlvpInfoList, updateEtEntrDlvpInfoList, deleteEtEntrDlvpInfoList);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveEtEntrDlvpInfo(String entrNo, List<EtEntrDlvpInfo> createEtEntrDlvpInfoList,
                                   List<EtEntrDlvpInfo> updateEtEntrDlvpInfoList,
                                   List<EtEntrDlvpInfo> deleteEtEntrDlvpInfoList) throws Exception {

        for (EtEntrDlvpInfo etEntrDlvpInfo : createEtEntrDlvpInfoList) {
            if(entrNo != null && !entrNo.isEmpty()){
                etEntrDlvpInfo.setEntrNo(entrNo);
            }

            etEtEntrDlvpInfoValidator(etEntrDlvpInfo);
            etEntrDlvpInfoTrxMapper.insertEtEntrDlvpInfoTrx(etEntrDlvpInfo);
        }

        for (EtEntrDlvpInfo etEntrDlvpInfo : updateEtEntrDlvpInfoList) {

            etEtEntrDlvpInfoValidator(etEntrDlvpInfo);
            etEntrDlvpInfoTrxMapper.updateEtEntrDlvpInfoTrx(etEntrDlvpInfo);
        }

        for (EtEntrDlvpInfo etEntrDlvpInfo : deleteEtEntrDlvpInfoList) {

            Validator.throwIfEmpty(etEntrDlvpInfo.getEntrDlvpNo()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"entrDlvpNo"}));


            Validator.throwIfEmpty(etEntrDlvpInfo.getEntrNo()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"entrNo"}));

            etEntrDlvpInfoTrxMapper.deleteEtEntrDlvpInfoTrx(etEntrDlvpInfo);
        }
    }

    @Override
    public PartnerCruPopupResponseEx getPartnerDetailWithOtherData(PartnerCruRequest partnerCruRequest) {
        PartnerCruPopupResponseEx partnerCruPopupResponseEx = new PartnerCruPopupResponseEx();

        //1.협력사정보조회
        partnerCruPopupResponseEx.setEtEntrBase(etEntrBaseMapper.getEtEntrBaseOne(partnerCruRequest.getEntrNo()));
        //2.배송비정책조회
        partnerCruPopupResponseEx.setEtDeliPolcBaseList(
                etDeliPolcBaseMapper.getEtDeliPolcBaseList(partnerCruRequest.getEntrNo()));
        //3.협력사직원정보 조회
        partnerCruPopupResponseEx.setEtEntrAempInfoList(
                etEntrAempInfoMapper.getEtEntrAempInfoList(partnerCruRequest.getEntrNo()));
        //4.협력사배송지정보 조회
        partnerCruPopupResponseEx.setEtEntrDlvpInfoList(
                etEntrDlvpInfoMapper.getEtEntrDlvpInfoList(partnerCruRequest.getEntrNo()));

        return partnerCruPopupResponseEx;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateVendorWithOtherData(RawRealGridCUDRequest rawCUDRequest, EtEntrBase etEntrBase) throws Exception {
        if (this.getCountOfExistsEtEntrBaseByEntrNm(etEntrBase) > 0 ) {
            throw new ValidationException("중복된 명칭을 사용하였습니다. 확인 후 다시 시도해 주세요.");
        }

        etEntrBase = setChangeContrDt(etEntrBase);
        etEntrBaseTrxMapper.updateEtEntrBaseTrx(etEntrBase);
        setOtherDataByVendor(rawCUDRequest, etEntrBase.getEntrNo());
    }

    private void etEtEntrDlvpInfoValidator(EtEntrDlvpInfo etEntrDlvpInfo) {
        Validator.throwIfEmpty(etEntrDlvpInfo.getEntrNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"entrNo"}));

        Validator.throwIfEmpty(etEntrDlvpInfo.getDlvpNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"DlvpNm"}));

        Validator.throwIfEmpty(etEntrDlvpInfo.getZipNoSeq()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ZipNoSeq"}));

        Validator.throwIfEmpty(etEntrDlvpInfo.getDtlAddr()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"dtlAddr"}));

        Validator.throwIfEmpty(etEntrDlvpInfo.getAempCellEndNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"CellNo"}));

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveEtDeliPolcBase(String entrNo, List<EtDeliPolcBase> createEtDeliPolcBaseList,
                                   List<EtDeliPolcBase> updateEtDeliPolcBaseList,
                                   List<EtDeliPolcBase> deleteEtDeliPolcBaseList) throws Exception {
        for (EtDeliPolcBase etDeliPolcBase : createEtDeliPolcBaseList) {
            if(entrNo != null && !entrNo.isEmpty()){
                etDeliPolcBase.setEntrNo(entrNo);
            }

            etDeliPolcBaseValidator(etDeliPolcBase);
            etDeliPolcBaseTrxMapper.insertEtDeliPolcBaseTrx(etDeliPolcBase);
        }

        for (EtDeliPolcBase etDeliPolcBase : updateEtDeliPolcBaseList) {

            etDeliPolcBaseValidator(etDeliPolcBase);
            etDeliPolcBaseTrxMapper.updateEtDeliPolcBaseTrx(etDeliPolcBase);
        }

        for (EtDeliPolcBase etDeliPolcBase : deleteEtDeliPolcBaseList) {

            Validator.throwIfEmpty(etDeliPolcBase.getEntrNo()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"entrNo"}));

            etDeliPolcBaseTrxMapper.deleteEtDeliPolcBaseTrx(etDeliPolcBase);
        }
    }

    private void etDeliPolcBaseValidator(EtDeliPolcBase etDeliPolcBase) {
        Validator.throwIfEmpty(etDeliPolcBase.getDlexAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"dlexAmt"}));

        Validator.throwIfEmpty(etDeliPolcBase.getStdAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"StdAmt"}));

        Validator.throwIfEmpty(etDeliPolcBase.getFerryRgnDlexAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ferryRgnDlexAmt"}));

        Validator.throwIfEmpty(etDeliPolcBase.getJejuDlex()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"jejuDlex"}));

        Validator.throwIfEmpty(etDeliPolcBase.getJejuFerryRgnDlexAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"jejuFerryRgnDlexAmt"}));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveEtEntrAempInfo(String entrNo, List<EtEntrAempInfo> createEtEntrAempInfoList,
                                   List<EtEntrAempInfo> updateEtEntrAempInfoList,
                                   List<EtEntrAempInfo> deleteEtEntrAempInfoList) throws Exception {
        for (EtEntrAempInfo etEntrAempInfo : createEtEntrAempInfoList) {
            if(entrNo != null && !entrNo.isEmpty()){
                etEntrAempInfo.setEntrNo(entrNo);
            }

            etEntrAempInfoValidator(etEntrAempInfo);
            etEntrAempInfoTrxMapper.insertEtEntrAempInfoTrx(etEntrAempInfo);
        }

        for (EtEntrAempInfo etEntrAempInfo : updateEtEntrAempInfoList) {
            etEntrAempInfoValidator(etEntrAempInfo);
            etEntrAempInfoTrxMapper.updateEtEntrAempInfoTrx(etEntrAempInfo);
        }

        for (EtEntrAempInfo etEntrAempInfo : deleteEtEntrAempInfoList) {
            Validator.throwIfEmpty(etEntrAempInfo.getAempSeq(),
                    MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                    , new String[] {"AempSeq"}));

            etEntrAempInfoTrxMapper.deleteEtEntrAempInfoTrx(etEntrAempInfo);
        }
    }
    public void etEntrAempInfoValidator(EtEntrAempInfo etEntrAempInfo) throws Exception {
        Validator.throwIfEmpty(etEntrAempInfo.getDutyCd()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"DutyCd"}));

        Validator.throwIfEmpty(etEntrAempInfo.getAempNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"AempNm"}));
    }
}
