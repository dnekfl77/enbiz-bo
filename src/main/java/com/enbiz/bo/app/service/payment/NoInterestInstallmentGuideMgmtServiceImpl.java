package com.enbiz.bo.app.service.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.payment.OpNintInstGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpNintInstGdBaseResponse;
import com.enbiz.bo.app.entity.OpNintInstGdBase;
import com.enbiz.bo.app.entity.OpNintInstGdDtlInfo;
import com.enbiz.bo.app.entity.OpNintInstGdMersInfo;
import com.enbiz.bo.app.repository.payment.OpNintInstGdBaseMapper;
import com.enbiz.bo.app.repository.payment.OpNintInstGdBaseTrxMapper;
import com.enbiz.bo.app.repository.payment.OpNintInstGdDtlInfoTrxMapper;
import com.enbiz.bo.app.repository.payment.OpNintInstGdMersInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 무이자 할부 안내관리 서비스 구현
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class NoInterestInstallmentGuideMgmtServiceImpl implements NoInterestInstallmentGuideMgmtService {

	private final OpNintInstGdBaseMapper opNintInstGdBaseMapper;
	private final OpNintInstGdBaseTrxMapper opNintInstGdBaseTrxMapper;
	private final OpNintInstGdDtlInfoTrxMapper opNintInstGdDtlInfoTrxMapper;
	private final OpNintInstGdMersInfoTrxMapper opNintInstGdMersInfoTrxMapper;

	@Override
	public List<OpNintInstGdBaseResponse> getMersList() throws Exception {
		return opNintInstGdBaseMapper.getMersList();
	}

	@Override
	public List<OpNintInstGdBaseResponse> getInterestFreeInstallmentInfoList(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		return opNintInstGdBaseMapper.getInterestFreeInstallmentInfoList(opNintInstGdBaseRequest);
	}

	@Override
	public int getInterestFreeInstallmentInfoListCount(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		return opNintInstGdBaseMapper.getInterestFreeInstallmentInfoListCount(opNintInstGdBaseRequest);
	}

	@Override
	public OpNintInstGdBaseResponse getInterestFreeInstallmentInfoDetail(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		return opNintInstGdBaseMapper.getInterestFreeInstallmentInfoDetail(opNintInstGdBaseRequest);
	}

	@Override
	public List<OpNintInstGdBaseResponse> getTotalMersList() throws Exception {
		return opNintInstGdBaseMapper.getTotalMersList();
	}

	@Override
	public int getTotalMersListCount() throws Exception {
		return opNintInstGdBaseMapper.getTotalMersListCount();
	}

	@Override
	public List<OpNintInstGdBaseResponse> getDetailList(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		return opNintInstGdBaseMapper.getDetailList(opNintInstGdBaseRequest);
	}

	@Override
	public OpNintInstGdBaseResponse getMappingMersList(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		return opNintInstGdBaseMapper.getMappingMersList(opNintInstGdBaseRequest);
	}

	@Override
	public boolean getAcqrCheck(OpNintInstGdBaseRequest opNintInstGdBaseRequest) {
		int cnt = opNintInstGdBaseMapper.getAcqrCheck(opNintInstGdBaseRequest);
		if (cnt == 1) {
			// 자기 자신인지 확인
			String no = opNintInstGdBaseMapper.getAcqrCheckNo(opNintInstGdBaseRequest);
			if (no.equals(opNintInstGdBaseRequest.getNintInstGdNo())) {
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
	public void saveFranchiseeInstallment(OpNintInstGdBaseRequest opNintInstGdBaseRequest, OpNintInstGdBase opNintInstGdBase) throws Exception {
		if (opNintInstGdBaseRequest.getNintInstGdNo().equals("")) {
			opNintInstGdBaseTrxMapper.insertOpNintInstGdBase(opNintInstGdBase); // 무이자할부안내기본 입력
		} else {
			opNintInstGdBaseTrxMapper.updateOpNintInstGdBase(opNintInstGdBase); // 무이자할부안내기본 수정
			opNintInstGdDtlInfoTrxMapper.deleteOpNintInstGdDtlInfo(opNintInstGdBase); // 기존 무이자할부안내상세정보 삭제
			opNintInstGdMersInfoTrxMapper.deleteOpNintInstGdMersInfo(opNintInstGdBase); // 기존 무이자할부안내가맹점정보 삭제
		}

		// 무이자할부안내상세정보
		int detailCnt = opNintInstGdBaseRequest.getTgtAmt().length;
		for (int i = 0; i < detailCnt; i++) {
			OpNintInstGdDtlInfo opNintInstGdDtlInfo = new OpNintInstGdDtlInfo();
			opNintInstGdDtlInfo.setNintInstGdNo(opNintInstGdBase.getNintInstGdNo());
			opNintInstGdDtlInfo.setTgtAmt(Integer.parseInt(opNintInstGdBaseRequest.getTgtAmt()[i]));
			opNintInstGdDtlInfo.setNint2MonYn("N");
			opNintInstGdDtlInfo.setNint3MonYn("N");
			opNintInstGdDtlInfo.setNint4MonYn("N");
			opNintInstGdDtlInfo.setNint5MonYn("N");
			opNintInstGdDtlInfo.setNint6MonYn("N");
			opNintInstGdDtlInfo.setNint7MonYn("N");
			opNintInstGdDtlInfo.setNint8MonYn("N");
			opNintInstGdDtlInfo.setNint9MonYn("N");
			opNintInstGdDtlInfo.setNint10MonYn("N");
			opNintInstGdDtlInfo.setNint11MonYn("N");
			opNintInstGdDtlInfo.setNint12MonYn("N");
			String monthList = opNintInstGdBaseRequest.getMonthList()[i];
			String[] month = monthList.split("-");
			for (int j = 0; j < month.length; j++) {
				if (j == 0) {
					opNintInstGdDtlInfo.setNint2MonYn("Y");
				}
				if (j == 1) {
					opNintInstGdDtlInfo.setNint3MonYn("Y");
				}
				if (j == 2) {
					opNintInstGdDtlInfo.setNint4MonYn("Y");
				}
				if (j == 3) {
					opNintInstGdDtlInfo.setNint5MonYn("Y");
				}
				if (j == 4) {
					opNintInstGdDtlInfo.setNint6MonYn("Y");
				}
				if (j == 5) {
					opNintInstGdDtlInfo.setNint7MonYn("Y");
				}
				if (j == 6) {
					opNintInstGdDtlInfo.setNint8MonYn("Y");
				}
				if (j == 7) {
					opNintInstGdDtlInfo.setNint9MonYn("Y");
				}
				if (j == 8) {
					opNintInstGdDtlInfo.setNint10MonYn("Y");
				}
				if (j == 9) {
					opNintInstGdDtlInfo.setNint11MonYn("Y");
				}
				if (j == 10) {
					opNintInstGdDtlInfo.setNint12MonYn("Y");
				}
			}
			opNintInstGdDtlInfo.setSysRegId(opNintInstGdBaseRequest.getSysRegId());
			opNintInstGdDtlInfoTrxMapper.insertOpNintInstGdDtlInfo(opNintInstGdDtlInfo);
		}

		// 무이자할부안내가맹점정보
		for (String mers : opNintInstGdBaseRequest.getMersList()) {
			OpNintInstGdMersInfo opNintInstGdMersInfo = new OpNintInstGdMersInfo();
			opNintInstGdMersInfo.setNintInstGdNo(opNintInstGdBase.getNintInstGdNo());
			opNintInstGdMersInfo.setMersNo(mers);
			opNintInstGdMersInfo.setSysRegId(opNintInstGdBaseRequest.getSysRegId());
			opNintInstGdMersInfoTrxMapper.insertOpNintInstGdMersInfo(opNintInstGdMersInfo);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void deleteFranchiseeInstallment(OpNintInstGdBase opNintInstGdBase) throws Exception {
		opNintInstGdBaseTrxMapper.deleteOpNintInstGdBase(opNintInstGdBase); // 무이자할부안내기본
		opNintInstGdDtlInfoTrxMapper.deleteOpNintInstGdDtlInfo(opNintInstGdBase); // 무이자할부안내상세정보
		opNintInstGdMersInfoTrxMapper.deleteOpNintInstGdMersInfo(opNintInstGdBase); // 무이자할부안내가맹점정보
	}

}
