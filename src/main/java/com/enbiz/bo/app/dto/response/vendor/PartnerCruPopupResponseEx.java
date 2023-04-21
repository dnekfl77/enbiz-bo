package com.enbiz.bo.app.dto.response.vendor;

import java.util.List;

import com.enbiz.bo.app.entity.EtDeliPolcBase;
import com.enbiz.bo.app.entity.EtEntrBase;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartnerCruPopupResponseEx {

    private EtEntrBase etEntrBase;
    private List<EtDeliPolcBase> etDeliPolcBaseList;
    private List<CooperateEmployeeSearchResponse> etEntrAempInfoList;
    private List<CooperateDeliveryInfoResponse> etEntrDlvpInfoList;

}
