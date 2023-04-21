package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품QA상세 Response DTO
 */
@Alias("GoodsQADetailResponse")
@Getter
@Setter
public class GoodsQADetailResponse extends BaseCommonEntity {

    private String goodsNo                      ; // 상품번호
    private String questNo                      ; // 질문번호
    private String goodsNm                      ; // 상품명
    private String entrNm                       ; // 협력사명
    private String buyTypCdNm                   ; // 매입형태코드명
    private String procStatCd                   ; // 처리상태코드
    private String procStatDtm                  ; // 처리일시
    private String procId                       ; // 처리자ID
    private String contFilePathNm               ; // 상품컨텐츠파일경로
    private String contFileNm                   ; // 상품컨텐츠파일명
    private String mvotYn                       ; // 이관여부
    private String mvotCaus                     ; // 이관사유

    @MaskString(type = MaskingType.ID)
    private String loginId                      ; // 로그인ID

    private String questDtm                     ; // 질문일시
    private String questTypCdNm                 ; // 질문유형코드명
    private String questCont                    ; // 질문내용
    private String questDispStatCd              ; // 질문전시상태코드
    private String questDispProcmnId            ; // 전시처리자ID
    private String questDispProcDtm             ; // 전시처리일시

}
