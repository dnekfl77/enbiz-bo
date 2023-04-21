package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 리뷰관리 > 리뷰상세 Request DTO
 */
@Alias("ReviewDetailRequest")
@Getter
@Setter
public class ReviewDetailRequest extends BaseCommonEntity {

    private String revNo                    ; // 리뷰번호
    private String revDispStatCd            ; // 리뷰전시상태코드
    private String photoDispStatCd          ; // 사진전시상태코드

    private String[] replySeqList           ; // 답글순번목록
    private String replySeqDispStatCd       ; // 답글전시상태코드

    private String replyCont                ; // 답글내용

}
