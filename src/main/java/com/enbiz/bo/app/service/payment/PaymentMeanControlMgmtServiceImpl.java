package com.enbiz.bo.app.service.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlDtlInfoRequest;
import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpPayMeanCtrlInfoResponse;
import com.enbiz.bo.app.entity.OpPayMeanCtrlDtlInfo;
import com.enbiz.bo.app.entity.OpPayMeanCtrlInfo;
import com.enbiz.bo.app.repository.payment.OpPayMeanCtrlDtlInfoMapper;
import com.enbiz.bo.app.repository.payment.OpPayMeanCtrlDtlInfoTrxMapper;
import com.enbiz.bo.app.repository.payment.OpPayMeanCtrlInfoMapper;
import com.enbiz.bo.app.repository.payment.OpPayMeanCtrlInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PaymentMeanControlMgmtServiceImpl implements PaymentMeanControlMgmtService {

	private final OpPayMeanCtrlInfoMapper opPayMeanCtrlInfoMapper;
	private final OpPayMeanCtrlInfoTrxMapper opPayMeanCtrlInfoTrxMapper;
	private final OpPayMeanCtrlDtlInfoMapper opPayMeanCtrlDtlInfoMapper;
	private final OpPayMeanCtrlDtlInfoTrxMapper opPayMeanCtrlDtlInfoTrxMapper;

	@Override
	public List<OpPayMeanCtrlInfoResponse> getMethodsOfPaymentControlList(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		return opPayMeanCtrlInfoMapper.getMethodsOfPaymentControlList(opPayMeanCtrlInfoRequest);
	}

	@Override
	public int getMethodsOfPaymentControlListCount(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		return opPayMeanCtrlInfoMapper.getMethodsOfPaymentControlListCount(opPayMeanCtrlInfoRequest);
	}

	@Override
	public OpPayMeanCtrlInfoResponse methodsOfPaymentControlDetailInfo(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		return opPayMeanCtrlInfoMapper.methodsOfPaymentControlDetailInfo(opPayMeanCtrlInfoRequest);
	}

	@Override
	public List<OpPayMeanCtrlInfoResponse> getMethodsOfPaymentControlDetail(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		return opPayMeanCtrlDtlInfoMapper.getMethodsOfPaymentControlDetail(opPayMeanCtrlInfoRequest);
	}

	@Override
	public int getMethodsOfPaymentControlDetailCount(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		return opPayMeanCtrlDtlInfoMapper.getMethodsOfPaymentControlDetailCount(opPayMeanCtrlInfoRequest);
	}

	@Override
	public void opPayMeanCtrlInfoInsert(OpPayMeanCtrlInfo opPayMeanCtrlInfo) throws Exception {
		opPayMeanCtrlInfoTrxMapper.opPayMeanCtrlInfoInsert(opPayMeanCtrlInfo);
	}

	@Override
	public void opPayMeanCtrlInfoUpdate(OpPayMeanCtrlInfo opPayMeanCtrlInfo) throws Exception {
		opPayMeanCtrlInfoTrxMapper.opPayMeanCtrlInfoUpdate(opPayMeanCtrlInfo);
	}

	@Override
	public void registCUD(String payMeanCtrlNo, OpPayMeanCtrlDtlInfoRequest opPayMeanCtrlDtlInfoRequest) throws Exception {
		List<OpPayMeanCtrlDtlInfo> opPayMeanCtrlDtlInfo = opPayMeanCtrlDtlInfoRequest.getOpPayMeanCtrlDtlInfo();
		for (OpPayMeanCtrlDtlInfo list : opPayMeanCtrlDtlInfo) {

			list.setPayMeanCtrlNo(payMeanCtrlNo);
			if (list.getCtrlGbCd().equals("10")) { // 제어구분코드가 PG사별 인 경우
				list.setCtrlTgtDtlNo("0");
			}
			list.setSysModId(opPayMeanCtrlDtlInfoRequest.getSysModId());
			list.setSysRegId(opPayMeanCtrlDtlInfoRequest.getSysRegId());

			if (list.getState().equals("created")) {
				opPayMeanCtrlDtlInfoTrxMapper.insertOpPayMeanCtrlDtlInfo(list);
			} else if (list.getState().equals("deleted")) {
				opPayMeanCtrlDtlInfoTrxMapper.deleteOpPayMeanCtrlDtlInfo(list);
			}
		}
	}
}
