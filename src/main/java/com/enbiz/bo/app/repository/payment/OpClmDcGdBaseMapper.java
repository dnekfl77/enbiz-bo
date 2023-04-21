package com.enbiz.bo.app.repository.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpClmDcGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpClmDcGdBaseResponse;

@Repository
@Lazy
public interface OpClmDcGdBaseMapper {

    /**
     * 청구할인 안내 목록 조회
     * @param opClmDcGdBaseRequest
     * @return OpClmDcGdBaseResponse
     */
    List<OpClmDcGdBaseResponse> getClaimDiscountInfoList(OpClmDcGdBaseRequest opClmDcGdBaseRequest);

    /**
     * 청구할인 안내 목록 수
     * @param opClmDcGdBaseRequest
     * @return int
     */
    int getClaimDiscountInfoListCount(OpClmDcGdBaseRequest opClmDcGdBaseRequest);

    /**
     * 가맹점 정보 목록
     * @return OpClmDcGdBaseResponse
     */
    List<OpClmDcGdBaseResponse> getMersList();

    /**
     * 청구할인안내가맹점정보
     * @param opClmDcGdBaseRequest
     * @return OpClmDcGdBaseResponse
     */
    OpClmDcGdBaseResponse getMappingMersList(OpClmDcGdBaseRequest opClmDcGdBaseRequest);

    /**
     * 청구할인 안내 상세
     * @param opClmDcGdBaseRequest
     * @return OpClmDcGdBaseResponse
     */
    OpClmDcGdBaseResponse getClaimDiscountInfoDetail(OpClmDcGdBaseRequest opClmDcGdBaseRequest);

    /**
     * 적용기간 내 매입사 중복 여부 확인
     * @param opClmDcGdBaseRequest
     * @return
     */
    int getAcqrCheck(OpClmDcGdBaseRequest opClmDcGdBaseRequest);

    /**
     * 적용기간 내 매입사 중복 여부 확인 _ 번호확인
     * @param opClmDcGdBaseRequest
     * @return
     */
    String getAcqrCheckNo(OpClmDcGdBaseRequest opClmDcGdBaseRequest);

}
