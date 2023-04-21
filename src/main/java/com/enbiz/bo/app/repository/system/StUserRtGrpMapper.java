package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.UserRightGroupRequest;
import com.enbiz.bo.app.dto.response.system.UserRightGroupResponse;

@Repository
@Lazy
public interface StUserRtGrpMapper {

    /**
     * 사용자 메뉴권한정보 리스트 조회
     * */
    List<UserRightGroupResponse> getUserRtGrpInfo(UserRightGroupRequest UserRightGroupRequest);

    /**
     * 사용자 메뉴권한정보 카운팅
     * */
    int getUserRtGrpBtnGridListCount(UserRightGroupRequest UserRightGroupRequest);

}
