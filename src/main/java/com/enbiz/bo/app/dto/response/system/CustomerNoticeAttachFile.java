package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerNoticeAttachFile")
@Getter
@Setter
public class CustomerNoticeAttachFile  extends BaseCommonEntity{

    private String ntcNo                    ; // 공지번호
    private Integer fileSeq                 ; // 파일순번
    private String atchFileRouteNm          ; // 첨부파일경로명
    private String atchFileNm               ; // 첨부파일명

}
