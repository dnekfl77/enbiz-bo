package com.enbiz.bo.app.repository.vendor;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.vendor.CooperateEmployeeSearchRequest;
import com.enbiz.bo.app.dto.response.vendor.CooperateEmployeeSearchResponse;

@Repository
@Lazy
public interface EtEntrAempInfoMapper {

    List<CooperateEmployeeSearchResponse> getEtEntrAempInfoList(String entrNo);

    int getCooperateEmployeeSearchListCount(CooperateEmployeeSearchRequest cooperateEmployeeSearchRequest) throws Exception;

    List<CooperateEmployeeSearchResponse> getCooperateEmployeeSearchList(CooperateEmployeeSearchRequest cooperateEmployeeSearchRequest) throws Exception;

}
