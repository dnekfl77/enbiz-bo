package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrNtcAtchFileInfo;

@Repository
@Lazy
public interface PrNtcAtchFileInfoTrxMapper {

    /**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 첨부파일 추가
     * @param prNtcAtchFileInfo
     */
    void insertPrNtcAtchFileInfo(PrNtcAtchFileInfo prNtcAtchFileInfo);

    /**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 첨부파일 삭제
     * @param prNtcAtchFileInfo
     */
    void deletePrNtcAtchFileInfo(PrNtcAtchFileInfo prNtcAtchFileInfo);
}
