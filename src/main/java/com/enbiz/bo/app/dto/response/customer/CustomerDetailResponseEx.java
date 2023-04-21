package com.enbiz.bo.app.dto.response.customer;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerDetailResponseEx")
@Getter
@Setter
public class CustomerDetailResponseEx extends CustomerDetailResponse {
    List<CustomerDeliveryInfoResponse> customerDeliveryInfoResponseList;
    List<CustomerTermsAgreeInfoResponse> customerTermsAgreeInfoResponseList;
}
