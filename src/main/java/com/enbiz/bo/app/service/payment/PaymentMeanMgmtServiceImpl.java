package com.enbiz.bo.app.service.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.payment.OpPgByPayMeanRequest;
import com.enbiz.bo.app.dto.response.payment.OpPgByPayMeanResponse;
import com.enbiz.bo.app.entity.OpPgByPayMean;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.repository.payment.OpPgByPayMeanMapper;
import com.enbiz.bo.app.repository.payment.OpPgByPayMeanTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 결제수단관리 서비스 IMPL
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PaymentMeanMgmtServiceImpl implements PaymentMeanMgmtService {

	private final OpPgByPayMeanMapper opPgByPayMeanMapper;
	private final OpPgByPayMeanTrxMapper opPgByPayMeanTrxMapper;

	@Override
	public List<OpPgByPayMeanResponse> getPgList() throws Exception {
		return opPgByPayMeanMapper.getPgList();
	}

	@Override
	public int getPgListCount() throws Exception {
		return opPgByPayMeanMapper.getPgListCount();
	}

	@Override
	public List<OpPgByPayMeanResponse> getMethodsOfPaymentList(OpPgByPayMeanRequest opPgByPayMeanRequest) throws Exception {
		return opPgByPayMeanMapper.getMethodsOfPaymentList(opPgByPayMeanRequest);
	}

	@Override
	public int getMethodsOfPaymentListCount(OpPgByPayMeanRequest opPgByPayMeanRequest) throws Exception {
		return opPgByPayMeanMapper.getMethodsOfPaymentListCount(opPgByPayMeanRequest);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void savePgList(List<StStdCd> updateList) {
		for (StStdCd stStdCd : updateList) {
			opPgByPayMeanTrxMapper.updateStStdCd(stStdCd);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveMethodsOfPaymentList(List<OpPgByPayMean> createList, List<OpPgByPayMean> updateList) throws Exception {
		insertMethodsOfPaymentList(createList);
		updateMethodsOfPaymentList(updateList);
	}

	/**
	 * 결제수단 목록 입력
	 * 
	 * @param createList
	 */
	void insertMethodsOfPaymentList(List<OpPgByPayMean> createList) {
		for (OpPgByPayMean opPgByPayMean : createList) {
			opPgByPayMeanTrxMapper.insertMethodsOfPaymentList(opPgByPayMean);
		}
	}

	/**
	 * 결제수단 목록 수정
	 * 
	 * @param updateList
	 */
	void updateMethodsOfPaymentList(List<OpPgByPayMean> updateList) {
		for (OpPgByPayMean opPgByPayMean : updateList) {
			opPgByPayMeanTrxMapper.updateMethodsOfPaymentList(opPgByPayMean);
		}
	}
}
