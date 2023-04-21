package com.enbiz.bo.app.service.payment;

import java.util.List;

import com.enbiz.bo.app.dto.request.payment.OpClmDcGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpClmDcGdBaseResponse;
import com.enbiz.bo.app.entity.OpClmDcGdBase;

/**
 * 청구할인 안내관리 서비스
 */
public interface ClaimDiscountGuideMgmtService {

	/**
	 * 청구할인 안내관리 목록 조회
	 * 
	 * @param opClmDcGdBaseRequest
	 * @return 청구할인 안내관리 목록
	 * @throws Exception
	 */
	List<OpClmDcGdBaseResponse> getClaimDiscountInfoList(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception;

	/**
	 * 청구할인안내관리 삭제
	 * 
	 * @param opClmDcGdBase
	 * @throws Exception
	 */
	void deleteOpClmDcGdBase(OpClmDcGdBase opClmDcGdBase) throws Exception;

	/**
	 * 청구할인안내관리 등록, 수정
	 * 
	 * @param opClmDcGdBaseRequest
	 * @param opClmDcGdBase
	 * @throws Exception
	 */
	void saveClaimDiscount(OpClmDcGdBaseRequest opClmDcGdBaseRequest, OpClmDcGdBase opClmDcGdBase) throws Exception;

	/**
	 * 청구할인안내 _ 적용기간 내 매입사 중복 여부 확인
	 * 
	 * @param opClmDcGdBaseRequest
	 * @return
	 */
	boolean getAcqrCheck(OpClmDcGdBaseRequest opClmDcGdBaseRequest);

	/**
	 * 청구할인 안내 상세
	 * 
	 * @param opClmDcGdBaseRequest
	 * @return 청구할인 안내 상세
	 * @throws Exception
	 */
	OpClmDcGdBaseResponse getClaimDiscountInfoDetail(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception;

	/**
	 * 청구할인안내가맹점정보
	 * 
	 * @param opClmDcGdBaseRequest
	 * @return 청구할인안내가맹점정보
	 * @throws Exception
	 */
	OpClmDcGdBaseResponse getMappingMersList(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception;

	/**
	 * 청구할인 안내관리 _ 가맹점 정보 목록
	 * 
	 * @return 가맹점 정보 목록
	 * @throws Exception
	 */
	List<OpClmDcGdBaseResponse> getMersList() throws Exception;

	/**
	 * 청구할인 안내관리 목록 수
	 * 
	 * @param opClmDcGdBaseRequest
	 * @return 청구할인 안내 목록 수
	 * @throws Exception
	 */
	int getClaimDiscountInfoListCount(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception;

}
