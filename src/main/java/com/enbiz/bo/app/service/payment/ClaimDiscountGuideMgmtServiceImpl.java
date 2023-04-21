package com.enbiz.bo.app.service.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.payment.OpClmDcGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpClmDcGdBaseResponse;
import com.enbiz.bo.app.entity.OpClmDcGdBase;
import com.enbiz.bo.app.entity.OpClmDcGdMersInfo;
import com.enbiz.bo.app.repository.payment.OpClmDcGdBaseMapper;
import com.enbiz.bo.app.repository.payment.OpClmDcGdBaseTrxMapper;
import com.enbiz.bo.app.repository.payment.OpClmDcGdMersInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 청구할인 안내관리 서비스 구현
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class ClaimDiscountGuideMgmtServiceImpl implements ClaimDiscountGuideMgmtService {

	private final OpClmDcGdBaseMapper opClmDcGdBaseMapper;
	private final OpClmDcGdBaseTrxMapper opClmDcGdBaseTrxMapper;
	private final OpClmDcGdMersInfoTrxMapper opClmDcGdMersInfoTrxMapper;

	@Override
	public List<OpClmDcGdBaseResponse> getClaimDiscountInfoList(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception {
		return opClmDcGdBaseMapper.getClaimDiscountInfoList(opClmDcGdBaseRequest);
	}

	@Override
	public int getClaimDiscountInfoListCount(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception {
		return opClmDcGdBaseMapper.getClaimDiscountInfoListCount(opClmDcGdBaseRequest);
	}

	@Override
	public List<OpClmDcGdBaseResponse> getMersList() throws Exception {
		return opClmDcGdBaseMapper.getMersList();
	}

	@Override
	public OpClmDcGdBaseResponse getMappingMersList(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception {
		return opClmDcGdBaseMapper.getMappingMersList(opClmDcGdBaseRequest);
	}

	@Override
	public OpClmDcGdBaseResponse getClaimDiscountInfoDetail(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception {
		return opClmDcGdBaseMapper.getClaimDiscountInfoDetail(opClmDcGdBaseRequest);
	}

	@Override
	public boolean getAcqrCheck(OpClmDcGdBaseRequest opClmDcGdBaseRequest) {
		int cnt = opClmDcGdBaseMapper.getAcqrCheck(opClmDcGdBaseRequest);
		if (cnt == 1) {
			// 자기 자신인지 확인
			String no = opClmDcGdBaseMapper.getAcqrCheckNo(opClmDcGdBaseRequest);
			if (no.equals(opClmDcGdBaseRequest.getClmDcGdNo())) {
				return true;
			} else {
				return false;
			}
		} else if (cnt == 0) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveClaimDiscount(OpClmDcGdBaseRequest opClmDcGdBaseRequest, OpClmDcGdBase opClmDcGdBase) throws Exception {
		if (opClmDcGdBaseRequest.getClmDcGdNo().equals("")) {
			opClmDcGdBaseTrxMapper.insertOpClmDcGdBase(opClmDcGdBase); // 청구할인안내기본 입력
		} else {
			opClmDcGdBaseTrxMapper.updateOpClmDcGdBase(opClmDcGdBase); // 청구할인안내기본 수정
			opClmDcGdMersInfoTrxMapper.deleteOpClmDcGdMersInfo(opClmDcGdBase); // 기존 청구할인안내가맹점정보 삭제
		}

		// 청구할인안내가맹점정보
		for (String mers : opClmDcGdBaseRequest.getMersList()) {
			OpClmDcGdMersInfo opClmDcGdMersInfo = new OpClmDcGdMersInfo();
			opClmDcGdMersInfo.setClmDcGdNo(opClmDcGdBase.getClmDcGdNo());
			opClmDcGdMersInfo.setMersNo(mers);
			opClmDcGdMersInfo.setSysRegId(opClmDcGdBaseRequest.getSysRegId());
			opClmDcGdMersInfoTrxMapper.insertOpClmDcGdMersInfo(opClmDcGdMersInfo);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void deleteOpClmDcGdBase(OpClmDcGdBase opClmDcGdBase) throws Exception {
		opClmDcGdBaseTrxMapper.deleteOpClmDcGdBase(opClmDcGdBase); // 청구할인안내기본
		opClmDcGdMersInfoTrxMapper.deleteOpClmDcGdMersInfo(opClmDcGdBase); // 청구할인안내가맹점정보
	}

}
