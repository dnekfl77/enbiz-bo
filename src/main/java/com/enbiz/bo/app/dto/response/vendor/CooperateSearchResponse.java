package com.enbiz.bo.app.dto.response.vendor;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CooperateSearchResponse")
@Getter
@Setter
public class CooperateSearchResponse extends BaseCommonEntity {

    private String entrNo         ;  // 협력사번호
    private String entrNm         ;  // 협력사명
    private String entrGbCd       ;  // 협력사구분코드
    private String trdTypCd       ;  // 거래형태코드
    private String trdStatCd      ;  // 거래상태코드(VD003)
    private String lgcEntrNo      ;  // 기간계협력사번호
    private String rpstmnNm       ;  // 대표자명
    private String bmanNo         ;  // 사업자 번호
    private String corpnNo        ;  // 법인번호
    private String btyp           ;  // 업태
    private String bkind          ;  // 업종
    private String contStrtDy     ;  // 계약시작일자
    private String contEndDy      ;  // 계약종료일자
    private String aempNm         ;  // 담당자명
    private String aempTelRgnNo   ;  // 담당자전화지역번호
    private String aempTelTxnoNo  ;  // 담당자전화국번번호
    private String aempTelEndNo   ;  // 담당자전화끝번호
    private String aempCellSctNo  ;  // 담당자휴대폰구분번호
    private String aempCellTxnoNo ;  // 담당자휴대폰국번번호
    private String aempCellEndNo  ;  // 담당자휴대폰끝번호
    private String faxRgnNo       ;  // 팩스지역번호
    private String faxTxnoNo      ;  // 팩스국번번호
    private String faxEndNo       ;  // 팩스끝번호
    private String bmanKindCd     ;  // 사업자종류코드
    private Long zipNoSeq         ;  // 우편번호순번
    private String zipNo          ;  // 우편번호
    private String zipAddr        ;  // 우편주소
    private String dtlAddr        ;  // 상세주소
    private String rmkCmt         ;  // 비고내용

    private String trdStatNm      ;  // 거래상태코드(VD003)

}
