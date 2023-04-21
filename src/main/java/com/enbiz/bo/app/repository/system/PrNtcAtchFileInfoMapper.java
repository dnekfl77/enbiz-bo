package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.system.CustomerNoticeAttachFile;

@Repository
@Lazy
public interface PrNtcAtchFileInfoMapper {

    /**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 첨부파일 목록 조회
     * @param ntcNo
     * @return
     */
    List<CustomerNoticeAttachFile> getPrNtcAtchFileList(String ntcNo);
}
