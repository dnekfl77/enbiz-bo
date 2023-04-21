package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.CustomerNoticeRequest;
import com.enbiz.bo.app.dto.response.system.CustomerNoticeAttachFile;
import com.enbiz.bo.app.dto.response.system.CustomerNoticeResponse;

/**
 * 고객 공지사항 서비스
 */
public interface CustomerNoticeMgmtService {
	/**
     * 고객공지사항관리 > 고객공지사항 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
	public int getCustomerNoticeListCount(CustomerNoticeRequest request) throws Exception;
	/**
     * 고객공지사항관리 > 고객공지사항 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
	public List<CustomerNoticeResponse> getCustomerNoticeList(CustomerNoticeRequest request) throws Exception;
	/**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 정보 조회
     * @param ntcNo
     * @return
     * @throws Exception
     */
	public CustomerNoticeResponse getCustomerNoticeInfo(String ntcNo) throws Exception;
	/**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 첨부파일 목록 조회
     * @param ntcNo
     * @return
     * @throws Exception
     */
	public List<CustomerNoticeAttachFile> getNoticeAttachedFileList(String ntcNo) throws Exception;
	/**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 고객공지사항 등록
     * @param request
     * @throws Exception
     */
	public void registCustomerNoticeInfo(CustomerNoticeRequest request) throws Exception;
	/**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 고객공지사항 수정
     * @param request
     * @throws Exception
     */
	public void modifyCustomerNoticeInfo(CustomerNoticeRequest request) throws Exception;
}
