package com.enbiz.bo.app.dto.request.system;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailRequest {

    @Valid
    private UserCudRequest userInfo;
    @Valid
    private List<IndividualInfoRightCudRequest> individualInfoRightList;
    @NotEmpty
    private String changeRtGrpNoYn;
    @NotEmpty
    private String createYn;
    private String beforeRtGrpNo;

}
