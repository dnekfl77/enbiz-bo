package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

/**
 * 리뷰상세 Response DTO
 */
@Alias("ReviewDetailResponse")
@Getter
@Setter
public class ReviewDetailResponse extends BaseCommonEntity {

    private String revNo                    ; // 리뷰번호

    //============== 리뷰 정보 ==============//
    private String goodsNo                  ; // 상품번호
    private String goodsNm                  ; // 상품명
    @MaskString(type = MaskingType.ID)
    private String loginId                  ; // 회원ID
    private String ordNo                    ; // 주문번호
    private String revWrtDtm                ; // 리뷰작성일시
    private String revTypCdNm               ; // 리뷰유형코드명
    private String revGbCdNm                ; // 리뷰구분코드명
    private String hlpfulCnt                ; // 도움돼요수
    private String replyCnt                 ; // 답글수
    private String revScrVal                ; // 리뷰별점
    private String stfd1Yn                  ; // 만족도1여부
    private String stfd2Yn                  ; // 만족도2여부
    private String stfd3Yn                  ; // 만족도2여부
    private String revDispStatCd            ; // 리뷰전시상태코드
    private String dispProcmnId             ; // 전시처리자ID
    private String dispProcDtm              ; // 전시처리일시
    private String photoDispStatCd          ; // 사진전시상태코드
    private String revCont                  ; // 리뷰내용

    //============== 리뷰 답글 정보 ==============//

    private String replySeq                  ; // 답글순번
    private String wrtmnGbCdNm               ; // 작성자구분코드명(PR037)
    @MaskString(type = MaskingType.ID)
    private String wrtmnId                   ; // 작성자아이디
    private String replyCont                 ; // 답글내용
    private String replySeqDispStatCd        ; // 답글전시상태코드(PR022)
    private String replySeqDispStatCdNm      ; // 답글전시상태코드명

}