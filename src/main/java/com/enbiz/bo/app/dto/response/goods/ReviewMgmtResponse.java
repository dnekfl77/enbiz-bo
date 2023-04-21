package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

/**
 * 리뷰관리 Response DTO
 */
@Alias("ReviewMgmtResponse")
@Getter
@Setter
public class ReviewMgmtResponse extends BaseCommonEntity {

    private String goodsNo                 ; // 상품번호
    private String goodsNm                 ; // 상품명
    private Integer revScrVal              ; // 리뷰별점
    private String revNo                   ; // 리뷰번호
    private String revCont                 ; // 리뷰내용
    private String revGbCd                 ; // 리뷰구분코드
    private String revGbCdNm               ; // 리뷰구분코드명
    private String revTypCd                ; // 리뷰유형코드
    private String revTypCdNm              ; // 리뷰유형코드명

    @MaskString(type = MaskingType.ID)
    private String loginId                 ; // 회원ID

    private String revWrtDtm               ; // 리뷰작성일시
    private String ordNo                   ; // 주문번호
    private Integer replyCnt               ; // 답글수
    private Integer hlpfulCnt              ; // 도움돼요수
    private String revDispStatCd           ; // 리뷰전시상태코드
    private String revDispStatCdNm         ; // 리뷰전시상태코드
    private String entrNm                  ; // 협럭사명
    private String dispProcmnId            ; // 전시처리자ID
    private String dispProcDtm             ; // 전시처리일시

}
