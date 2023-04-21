package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

/**
 * 보상승인자기준정보
 */
@Repository
@Lazy
public interface CsCpnsAprmnStdInfoMapper {

    /**
     * 고객보상 사용자 권한 확인
     */
    String getCsCompensUserGrade(String loginId) throws Exception;
}
