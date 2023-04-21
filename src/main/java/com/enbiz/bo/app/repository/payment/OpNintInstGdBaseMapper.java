package com.enbiz.bo.app.repository.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpNintInstGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpNintInstGdBaseResponse;

@Repository
@Lazy
public interface OpNintInstGdBaseMapper {

    /**
     * 가맹점 정보 목록
     * @return OpNintInstGdBaseResponse
     */
    List<OpNintInstGdBaseResponse> getMersList();

    /**
     * 무이자 할부 안내 목록 조회
     * @param opNintInstGdBaseRequest
     * @return OpNintInstGdBaseResponse
     */
    List<OpNintInstGdBaseResponse> getInterestFreeInstallmentInfoList(OpNintInstGdBaseRequest opNintInstGdBaseRequest);

    /**
     * 무이자 할부 안내 목록 수
     * @param opNintInstGdBaseRequest
     * @return int
     */
    int getInterestFreeInstallmentInfoListCount(OpNintInstGdBaseRequest opNintInstGdBaseRequest);

    /**
     * 무이자 할부 안내 상세
     * @param opNintInstGdBaseRequest
     * @return OpNintInstGdBaseResponse
     */
    OpNintInstGdBaseResponse getInterestFreeInstallmentInfoDetail(OpNintInstGdBaseRequest opNintInstGdBaseRequest);

    /**
     * 가맹점 전체 목록 조회
     * @return OpNintInstGdBaseResponse
     */
    List<OpNintInstGdBaseResponse> getTotalMersList();

    /**
     * 가맹점 전체 목록 수
     * @return int
     */
    int getTotalMersListCount();

    /**
     * 무이자 할부 안내 상세
     * @param opNintInstGdBaseRequest
     * @return
     */
    List<OpNintInstGdBaseResponse> getDetailList(OpNintInstGdBaseRequest opNintInstGdBaseRequest);

    /**
     * 무이자할부안내가맹점정보
     * @param opNintInstGdBaseRequest
     * @return
     */
    OpNintInstGdBaseResponse getMappingMersList(OpNintInstGdBaseRequest opNintInstGdBaseRequest);


    /**
     * 적용기간 내 매입사 중복 여부 확인
     * @param opNintInstGdBaseRequest
     * @return
     */
    int getAcqrCheck(OpNintInstGdBaseRequest opNintInstGdBaseRequest);


    /**
     * 적용기간 내 매입사 중복 여부 확인 _ 번호확인
     * @param opNintInstGdBaseRequest
     * @return
     */
    String getAcqrCheckNo(OpNintInstGdBaseRequest opNintInstGdBaseRequest);

}
