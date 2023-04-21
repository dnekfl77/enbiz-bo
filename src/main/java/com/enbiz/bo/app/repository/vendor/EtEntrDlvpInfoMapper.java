package com.enbiz.bo.app.repository.vendor;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.vendor.CooperateDeliveryInfoResponse;

@Repository
@Lazy
public interface EtEntrDlvpInfoMapper {

    List<CooperateDeliveryInfoResponse> getEtEntrDlvpInfoList(String entrNo);
}
