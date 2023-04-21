package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsAutoMangersRequest;
import com.enbiz.bo.app.entity.CsAutoDivideAempInfo;

/**
 * CS 자동배분 담당자 정보
 */
@Repository
@Lazy
public interface CsAutoDivAempInfoTrxMapper {

    /**
     * CS 자동배분 담당자 정보 insert
     * @param request
     */
    void insertCsAutoDivAempInfo(CsAutoDivideAempInfo request);

    /**
     * CS 자동배분 담당자 정보 update
     * @param request
     */
    void updateCsAutoDivAempInfo(CsAutoDivideAempInfo request);

    /**
     * CS 자동배분 담당자 정보 delete
     * @param request
     */
    void deleteCsAutoDivAempInfo(CsAutoDivideAempInfo request);

    /**
     * 자동배분담당자 할당진행 여부 변경
     */
    void changeAutoDivPsbYn(CsAutoMangersRequest request);
}
