package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 리뷰평가항목관리 Response
 */
@Alias("ReviewEvaluationItemMgmtResponse")
@Getter
@Setter
public class ReviewEvaluationItemMgmtResponse extends BaseCommonEntity {

    private String stdCtgNo        ; // 표준카테고리번호
    private String evltItemNo      ; // 평가항목번호
    private String evltItemNm      ; // 평가항목명
    private Integer sortSeq        ; // 정렬순서

    private String addYn           ; // 추가가능여부
    private String evltVal         ; // 평가값
    private String useYn           ; // 사용여부
    private Integer stdCtgMapCnt   ; // 매핑표준분류수
    private String evltValNo       ; // 평가값번호
    private String stdCtgHierarchy ; // 표준분류하이라키구조

}
