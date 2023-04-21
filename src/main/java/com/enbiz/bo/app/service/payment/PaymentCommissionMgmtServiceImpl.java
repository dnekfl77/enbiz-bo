package com.enbiz.bo.app.service.payment;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.payment.OpCmsnInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpCmsnInfoResponse;
import com.enbiz.bo.app.entity.OpCmsnInfo;
import com.enbiz.bo.app.repository.payment.OpCmsnInfoMapper;
import com.enbiz.bo.app.repository.payment.OpCmsnInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 결제수수료관리 서비스 구현
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PaymentCommissionMgmtServiceImpl implements PaymentCommissionMgmtService {

	private final OpCmsnInfoMapper opCmsnInfoMapper;
	private final OpCmsnInfoTrxMapper opCmsnInfoTrxMapper;

	@Override
	public List<OpCmsnInfoResponse> getClearingCommissionList(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		return opCmsnInfoMapper.getClearingCommissionList(opCmsnInfoRequest);
	}

	@Override
	public int getClearingCommissionListCount(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		return opCmsnInfoMapper.getClearingCommissionListCount(opCmsnInfoRequest);
	}

	@Override
	public OpCmsnInfoResponse getClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		return opCmsnInfoMapper.getClearingCommissionDetail(opCmsnInfoRequest);
	}

	@Override
	public List<OpCmsnInfoResponse> getMersTotalList() throws Exception {
		return opCmsnInfoMapper.getMersTotalList();
	}

	@Override
	public List<OpCmsnInfoResponse> getMappingMersList(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		return opCmsnInfoMapper.getMappingMersList(opCmsnInfoRequest);
	}

	@Override
	public List<OpCmsnInfoResponse> getMonthList(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		return opCmsnInfoMapper.getMonthList(opCmsnInfoRequest);
	}

	@Override
	public boolean aplyDateCheck(OpCmsnInfoRequest opCmsnInfoRequest) throws ParseException {
		// 중복여부 확인(PG사, 결제수단유형, 결제수단명, 수수료구분, 수수료유형)
		List<OpCmsnInfoResponse> dateList = opCmsnInfoMapper.aplyDateCheck(opCmsnInfoRequest);

		boolean maxDate = false;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date maxEndDate = dateFormat.parse("0000-00-00 00:00:00");

		if (dateList.size() == 0) { // 중복없음
			return true;
		} else { // 중복있음
			// 중복인 경우 날짜 비교
			for (OpCmsnInfoResponse opCmsnInfoResponse : dateList) {
				// 1. 중복 데이터 중 종료일자가 2999-12-31 값 존재여부 확인
				if (opCmsnInfoResponse.getAplyEndDtm().equals("2999-12-31 23:59:59")) {
					// 2. 종료일자가 2999-12-31 있는경우 내 자신데이터인지 확인 (기존 내 시작시간과 동일한지 확인) -> 내자신이 아닌것들과만 비교
					if (opCmsnInfoRequest.getAplyStrDtm().equals(opCmsnInfoResponse.getAplyStrDtm())) {
						if (opCmsnInfoRequest.getArgInsertUpdate().equals("I")) { // 입력
							return false;
						} else { // 수정
							return true;
						}
					} else {
						// 기존 시작일자와 신규시작일자 비교
						SimpleDateFormat transFormat1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						Date lastStrDate = transFormat1.parse(opCmsnInfoResponse.getAplyStrDtm());
						SimpleDateFormat transFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						Date newStrDate = transFormat2.parse(opCmsnInfoRequest.getAplyStrDtm());
						if (newStrDate.compareTo(lastStrDate) <= 0) { // 기존일자가 시작일자가 더 큰 경우
							return false;
						} else {
							return true;
						}
					}
				}
			}
			return false;
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest, OpCmsnInfo opCmsnInfo) throws Exception {
		if (opCmsnInfoRequest.getCmsnTgtLgrpCd().equals("11")) { // 결제수단유형 : 신용카드(11)
			opCmsnInfoRequest.setCmsnGbCd("0");
			opCmsnInfo.setCmsnGbCd("0");
		} else {
			opCmsnInfoRequest.setCmsnTypCd("0");
			opCmsnInfo.setCmsnTypCd("0");
		}

		// 중복여부 확인(PG사, 결제수단유형, 결제수단명, 수수료구분, 수수료유형)
		List<OpCmsnInfoResponse> dateList = opCmsnInfoMapper.aplyDateCheck(opCmsnInfoRequest);

		boolean maxDate = false;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date maxEndDate = dateFormat.parse("0000-00-00 00:00:00");
		Date maxStrDate = dateFormat.parse("0000-00-00 00:00:00");

		if (dateList.size() == 0) { // 중복없음
			insertClearingCommissionDetail(opCmsnInfoRequest, opCmsnInfo); // 저장
		} else { // 중복있음
			for (OpCmsnInfoResponse opCmsnInfoResponse : dateList) { // 중복인 경우 날짜 비교
				// 1. 중복 데이터 중 종료일자가 2999-12-31 값 존재여부 확인
				if (opCmsnInfoResponse.getAplyEndDtm().equals("2999-12-31 23:59:59")) {
					// 2. 종료일자가 2999-12-31 있는경우 내 자신데이터인지 확인 (기존 내 시작시간과 동일한지 확인)
					if (opCmsnInfoRequest.getAplyStrDtm().equals(opCmsnInfoResponse.getAplyStrDtm())) { // 내자신
						opCmsnInfoTrxMapper.deleteClearingCommissionDetail(opCmsnInfo); // 기존 데이터 삭제
						insertClearingCommissionDetail(opCmsnInfoRequest, opCmsnInfo); // 저장
						break;
					} else {
						// 기존 시작일자와 신규시작일자 비교
						Date lastStrDate = dateFormat.parse(opCmsnInfoResponse.getAplyStrDtm());
						Date newStrDate = dateFormat.parse(opCmsnInfoRequest.getAplyStrDtm());
						if (newStrDate.compareTo(lastStrDate) > 0) { // 신규 시작일자가 더 큰 경우 저장
							Date lastEndDate = dateFormat.parse(opCmsnInfoResponse.getAplyEndDtm());
							updateClearingCommissionDetail(newStrDate, lastStrDate, lastEndDate, opCmsnInfoRequest); // 기존 데이터 적용종료일자 수정
							insertClearingCommissionDetail(opCmsnInfoRequest, opCmsnInfo); // 저장
						}
					}
				}
			}
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void insertClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest, OpCmsnInfo opCmsnInfo) throws Exception {
		if (opCmsnInfoRequest.getCmsnTgtLgrpCd().equals("11")) { // 결제수단유형 : 신용카드(11)
			opCmsnInfo.setCmsnGbCd("0");
			opCmsnInfo.setCmsnAmt(0);

			if (opCmsnInfoRequest.getCmsnTypCd().equals("20")) { // 수수료 유형 : 무이자(20) // 가맹점 O, 할부월 O
				String[] monthList = opCmsnInfoRequest.getMonthList().split(",");
				String[] mersList = opCmsnInfoRequest.getMersList2();

				for (String mersNo : mersList) {
					opCmsnInfo.setMersNo(mersNo);
					for (String val : monthList) {
						int month = Integer.parseInt(val.split("-")[0]);
						double cmsnRate = Double.parseDouble(val.split("-")[1]);
						opCmsnInfo.setInstMonCnt(month);
						opCmsnInfo.setCmsnRate(cmsnRate);
						opCmsnInfoTrxMapper.insertClearingCommissionDetail(opCmsnInfo);
					}
				}
			} else { // 가맹점 O, 할부월 X
				opCmsnInfo.setInstMonCnt(0);
				String[] mersList = opCmsnInfoRequest.getMersList1();
				for (String mersNo : mersList) {
					opCmsnInfo.setMersNo(mersNo);
					opCmsnInfoTrxMapper.insertClearingCommissionDetail(opCmsnInfo);
				}
			}
		} else { // 가맹점 X, 할부월 X
			opCmsnInfo.setCmsnTypCd("0");
			opCmsnInfo.setMersNo("0");
			opCmsnInfo.setInstMonCnt(0);
			if (opCmsnInfoRequest.getCmsnAmt() == null || opCmsnInfoRequest.getCmsnAmt().equals(""))
				opCmsnInfo.setCmsnAmt(0);
			if (opCmsnInfoRequest.getCmsnRateBase() == null || opCmsnInfoRequest.getCmsnRateBase().equals("")) {
				opCmsnInfo.setCmsnRate((double) 0);
			} else {
				opCmsnInfo.setCmsnRate(opCmsnInfoRequest.getCmsnRateBase());
			}
			opCmsnInfoTrxMapper.insertClearingCommissionDetail(opCmsnInfo);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void updateClearingCommissionDetail(Date newStrDate, Date aplyStrDate, Date aplyEndDate, OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar cal = Calendar.getInstance();
		cal.setTime(newStrDate);
		cal.add(Calendar.SECOND, -1); // 1초전
		String aplyEnd = dateFormat.format(cal.getTime());
		opCmsnInfoRequest.setAplyEndDt(aplyEnd); // 수정값
		opCmsnInfoRequest.setAplyStrDtm(dateFormat.format(aplyStrDate)); // 검색조건
		opCmsnInfoRequest.setAplyEndDtm(dateFormat.format(aplyEndDate)); // 검색조건
		opCmsnInfoTrxMapper.updateClearingCommissionDetail(opCmsnInfoRequest);
	}
}
