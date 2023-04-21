package com.enbiz.bo.app.service.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.payment.OpMersInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpMersInfoResponse;
import com.enbiz.bo.app.dto.response.popup.CcSitePopupResponse;
import com.enbiz.bo.app.entity.OpAplySiteMersInfo;
import com.enbiz.bo.app.entity.OpMersInfo;
import com.enbiz.bo.app.repository.display.CcSiteBaseMapper;
import com.enbiz.bo.app.repository.payment.OpAplySiteMersInfoMapper;
import com.enbiz.bo.app.repository.payment.OpMersInfoMapper;
import com.enbiz.bo.app.repository.payment.OpMersInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class FranchiseeMgmtServiceImpl implements FranchiseeMgmtService {

	private final OpMersInfoMapper opMersInfoMapper;
	private final OpMersInfoTrxMapper opMersInfoTrxMapper;
	private final OpAplySiteMersInfoMapper opAplySiteMersInfoMapper;
	private final CcSiteBaseMapper ccSiteBaseMapper;

	/**
	 * 가맹점관리 목록 조회
	 * 
	 * @return 가맹점관리 목록
	 * @throws Exception
	 */
	@Override
	public List<OpMersInfoResponse> getFranchiseeList(OpMersInfoRequest opMersInfoRequest) throws Exception {
		return opMersInfoMapper.getFranchiseeList(opMersInfoRequest);
	}

	/**
	 * 가맹점관리 목록 수
	 * 
	 * @return 가맹점관리 목록 수
	 * @throws Exception
	 */
	@Override
	public int getFranchiseeListCount(OpMersInfoRequest opMersInfoRequest) throws Exception {
		return opMersInfoMapper.getFranchiseeListCount(opMersInfoRequest);
	}

	/**
	 * 가맹점관리 상세 조회
	 * 
	 * @return 가맹점관리 상세 조회
	 * @throws Exception
	 */
	@Override
	public OpMersInfoResponse franchiseeDetailInfo(OpMersInfoRequest opMersInfoRequest) throws Exception {
		return opMersInfoMapper.franchiseeDetailInfo(opMersInfoRequest);
	}

	/**
	 * 가맹점관리 상세 조회 _ 사이트 리스트
	 * 
	 * @return 사이트 리스트
	 * @throws Exception
	 */
	@Override
	public List<OpMersInfoResponse> franchiseeSiteList(OpMersInfoRequest opMersInfoRequest) throws Exception {
		return opMersInfoMapper.franchiseeSiteList(opMersInfoRequest);
	}

	/**
	 * 가맹점관리 등록
	 * 
	 * @param opMersInfo
	 * @param opMersInfoRequest
	 * @throws Exception
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void opMersInfoInsert(OpMersInfo opMersInfo, OpMersInfoRequest opMersInfoRequest) throws Exception {
		opMersInfoTrxMapper.opMersInfoInsert(opMersInfo);
		saveOpAplySiteMersInfo(opMersInfo, opMersInfoRequest); // 적용사이트가맹점정보 저장
	}

	/**
	 * 가맹점관리 수정
	 * 
	 * @param opMersInfo
	 * @param opMersInfoRequest
	 * @throws Exception
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void opMersInfoUpdate(OpMersInfo opMersInfo, OpMersInfoRequest opMersInfoRequest) throws Exception {
		opMersInfoTrxMapper.opMersInfoUpdate(opMersInfo);
		opAplySiteMersInfoMapper.deleteOpAplySiteMersInfo(opMersInfo.getMersNo()); // 기존 적용사이트가맹점 정보 모두 삭제
		saveOpAplySiteMersInfo(opMersInfo, opMersInfoRequest); // 적용사이트가맹점정보 저장
	}

	/**
	 * 적용사이트가맹점정보 저장
	 * 
	 * @param opMersInfo
	 * @param opMersInfoRequest
	 * @throws Exception
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveOpAplySiteMersInfo(OpMersInfo opMersInfo, OpMersInfoRequest opMersInfoRequest) throws Exception {

		OpAplySiteMersInfo opAplySiteMersInfo = new OpAplySiteMersInfo();
		opAplySiteMersInfo.setMersNo(opMersInfo.getMersNo());
		opAplySiteMersInfo.setSysModId(opMersInfo.getSysModId());
		opAplySiteMersInfo.setSysRegId(opMersInfo.getSysRegId());

		if (opMersInfo.getAplySiteGbCd().equals("10")) { // 범용인 경우
			List<CcSitePopupResponse> totalSiteList = ccSiteBaseMapper.getSitePopupList(); // 전체 사이트 리스트
			for (CcSitePopupResponse siteList : totalSiteList) {
				opAplySiteMersInfo.setSiteNo(siteList.getSiteNo());
				opAplySiteMersInfoMapper.saveOpAplySiteMersInfo(opAplySiteMersInfo);
			}
		} else if (opMersInfo.getAplySiteGbCd().equals("20")) { // 일부적용인 경우
			String[] siteList = opMersInfoRequest.getSiteList().split(","); // 선택된 사이트 리스트
			for (String siteNo : siteList) {
				opAplySiteMersInfo.setSiteNo(siteNo);
				opAplySiteMersInfoMapper.saveOpAplySiteMersInfo(opAplySiteMersInfo);
			}
		}
	}
}
