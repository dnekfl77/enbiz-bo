package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품QA관리 Request DTO
 */
@Alias("GoodsQAMgmtRequest")
@Getter
@Setter
public class GoodsQAMgmtRequest extends BaseCommonEntity {

    //================= 조회 ================= //
    private String questStartDtm           ; // 질문시작일시
    private String questEndDtm             ; // 잘문종료일시
    private String questTypCd              ; // 질문유형코드(PR041)
    private String[] goodsNoList           ; // 상품번호목록
    private String entrNo                  ; // 협력사번호
    private String buyTypCd                ; // 매입형태코드(PR006)
    private String procStatCd              ; // 처리상태코드(PR039)
    private String questDispStatCd         ; // 질문전시상태코드(PR022)
    private String stdCtgNo                ; // 표준분류번호
    private String mdId                    ; // 담당MD

    //================= 전시상태변경 ================= //
    private String[] questNoList           ; // 질문번호목록


}
