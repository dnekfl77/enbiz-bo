package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.system.SystemNoticeAttachFileResponse;

@Repository
@Lazy
public interface StBbAtchFileMapper {
    int getMaxFileSeq(String bbcNo);
    List<SystemNoticeAttachFileResponse> getStBbAtchFileList(String bbcNo);
}
