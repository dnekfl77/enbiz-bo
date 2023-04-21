package com.enbiz.bo.app.dto.response.vendor;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CooperateAndOthersResponse")
@Getter
@Setter
public class CooperateAndOthersResponse extends CooperateResponse {

    private List<CooperateEmployeeSearchResponse> cooperateEmployeeList;

}
