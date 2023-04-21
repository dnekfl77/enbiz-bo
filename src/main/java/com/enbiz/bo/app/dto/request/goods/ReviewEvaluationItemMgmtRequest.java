package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 리뷰평가항목관리 Request
 */
@Alias("ReviewEvaluationItemMgmtRequest")
@Getter
@Setter
public class ReviewEvaluationItemMgmtRequest extends BaseCommonEntity {

    private String stdCtgNo             ; // 표준카테고리번호

    private String evltItemNm           ; // 평가항목명
    private String[] evltItemNoList     ; // 평가항목번호목록
    private String regStartDtm          ; // 평가항목 등록 시작일시
    private String regEndDtm            ; // 평가항목 등록 종료일시
    private String evltItemNo           ; // 평가항목번호

}
