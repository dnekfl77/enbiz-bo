package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsCompensTypeCodeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensTypeCodeResponse;

@Repository
@Lazy
public interface CsCpnsTypCdMapper {

    /**
     * 보상유형 관리 Tree 목록 조회
     * @return
     * @throws Exception
     */
    List<CsCompensTypeCodeResponse> getRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;

    /**
     * 보상유형관리 하위 보상 정보 목록 조회
     * @return
     * @throws Exception
     */
    List<CsCompensTypeCodeResponse> getLowerRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;

    /**
     * 보상유형관리 하위 보상 정보 목록 조회 수
     * @return
     * @throws Exception
     */
    int getLowerRewardTypeListCount(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;
    /**
     * 보상유형조회 팝업 목록 조회
     * @return
     * @throws Exception
     */
    List<CsCompensTypeCodeResponse> getCsCpnsTypCdPopup(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;

    /**
     * 보상유형조회 팝업 목록 조회 수
     * @return
     * @throws Exception
     */
    int getCsCpnsTypCdPopupCount(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;

}
