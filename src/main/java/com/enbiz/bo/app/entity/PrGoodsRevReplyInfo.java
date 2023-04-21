package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품리뷰댓글정보
 */
@Alias("PrGoodsRevReplyInfo")
@Getter
@Setter
public class PrGoodsRevReplyInfo extends BaseCommonEntity {

    private String revNo                     ; // 리뷰번호
    private Integer replySeq                 ; // 답글순번
    private String wrtmnGbCd                 ; // 작성자구분코드명(PR037)
    private String wrtmnId                   ; // 작성자아이디
    private String replyCont                 ; // 답글내용
    private String replySeqDispStatCd        ; // 답글전시상태코드(PR022)

}
