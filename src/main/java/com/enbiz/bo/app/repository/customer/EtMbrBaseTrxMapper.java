package com.enbiz.bo.app.repository.customer;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customer.WatchCustomerRequest;
import com.enbiz.bo.app.entity.EtMbrBase;
import com.enbiz.bo.app.entity.EtMbrDlvpInfo;
import com.enbiz.bo.app.entity.EtMbrRfdActnInfo;
import com.enbiz.bo.app.entity.EtMgrMbrInfo;

@Repository
@Lazy
public interface EtMbrBaseTrxMapper {

    void updateEtMbrBaseByCustomerDetail(EtMbrBase etMbrBase);

    void insertEtMbrDlvpInfo(EtMbrDlvpInfo currentData);

    void updateEtMbrDlvpInfo(EtMbrDlvpInfo currentData);

    void deleteEtMbrDlvpInfo(EtMbrDlvpInfo currentData);
    
    void saveWatchCustomer(EtMgrMbrInfo etMgrMbrInfo);
    
    void saveCustomerRefundAccount(EtMbrRfdActnInfo etMbrRfdActnInfo);
    
    void unlockWatchCustomer(WatchCustomerRequest watchCustomerRequest);
}
