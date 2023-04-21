package com.enbiz.bo.app.dto.request.system;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndividualInfoRightCudRequest {

    @NotEmpty
    private String userId; //사용자ID
    @NotEmpty
    private String indInfoGbCd; //개인정보구분코드(UR008)
    @NotEmpty
    private String useYn; //사용여부

}
