package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.vendor.PartnerCruRequest;
import com.enbiz.bo.app.dto.response.vendor.PartnerCruPopupResponseEx;
import com.enbiz.bo.app.entity.EtDeliPolcBase;
import com.enbiz.bo.app.entity.EtEntrAempInfo;
import com.enbiz.bo.app.entity.EtEntrBase;
import com.enbiz.bo.app.entity.EtEntrDlvpInfo;

public interface PartnerManagementPopService {
    void saveVendorWithOtherData(RawRealGridCUDRequest rawCUDRequest, EtEntrBase etEntrBase) throws Exception;
    void saveEtEntrAempInfo(String entrNo, List<EtEntrAempInfo> createEtEntrAempInfoList,
                            List<EtEntrAempInfo> updateEtEntrAempInfoList,
                            List<EtEntrAempInfo> deleteEtEntrAempInfoList) throws Exception;
    void saveEtDeliPolcBase(String entrNo, List<EtDeliPolcBase> createEtDeliPolcBaseList,
                            List<EtDeliPolcBase> updateEtDeliPolcBaseList,
                            List<EtDeliPolcBase> deleteEtDeliPolcBaseList) throws Exception;
    void saveEtEntrDlvpInfo(String entrNo, List<EtEntrDlvpInfo> createEtEntrDlvpInfoList,
                            List<EtEntrDlvpInfo> updateEtEntrDlvpInfoList,
                            List<EtEntrDlvpInfo> deleteEtEntrDlvpInfoList) throws Exception;

    PartnerCruPopupResponseEx getPartnerDetailWithOtherData(PartnerCruRequest partnerCruRequest);

    void updateVendorWithOtherData(RawRealGridCUDRequest rawCUDRequest, EtEntrBase etEntrBase) throws Exception ;
}
