package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 리뷰관리 Request DTO
 */
@Alias("ReviewMgmtRequest")
@Getter
@Setter
public class ReviewMgmtRequest extends BaseCommonEntity {

    private String revWrtStartDtm            ; // 리뷰등록시작일
    private String revWrtEndDtm              ; // 리뷰등록종료일
    private String revGbCd                   ; // 리뷰구분코드
    private String revDispStatCd             ; // 리뷰전시상태코드
    private String goodsNo                   ; // 상품번호
    private String goodsNm                   ; // 상품명
    private String loginId                   ; // 회원ID
    private String mbrNm                     ; // 회원명
    private String wrtrIsUserYn              ; // 내답글여부

    private String[] revNoList               ; // 리뷰번호목록

}
