package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품QA관리 Response DTO
 */
@Alias("GoodsQAMgmtResponse")
@Getter
@Setter
public class GoodsQAMgmtResponse extends BaseCommonEntity {

    //================= 조회 ================= //
    private String procStatCd                   ; // 처리상태코드
    private String procStatCdNm                 ; // 처리상태코드명
    private String questTypCdNm                 ; // 질문유형코드명
    private String questNo                      ; // 질문번호
    private String questCont                    ; // 질문내용

    @MaskString(type = MaskingType.ID)
    private String loginId                      ; // 로그인ID

    private String questDtm                     ; // 질문일시
    private String goodsNo                      ; // 상품번호
    private String goodsNm                      ; // 상품명
    private String brandNm                      ; // 브랜드명
    private String entrNm                       ; // 협력사명
    private String questDispProcmnId            ; // 처리자ID
    private String questDispProcDtm             ; // 처리일시
    private Integer qaAnsCnt                    ; // 답변수
    private String questDispStatCd              ; // 질문전시상태코드
    private String questDispStatCdNm            ; // 질문전시상태코드명
    private String stdCtgHierarchy              ; // 표준분류구조
    private String mdId                         ; // 담당MD
    private String mvotYn                       ; // 이관여부

    //================= 미처리현황 ================= //
    private String questDtmPeriod;
    private String questCnt;



}
