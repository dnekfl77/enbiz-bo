package com.enbiz.bo.app.dto.response.vendor;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PartnerSearchResponse")
@Getter
@Setter
public class PartnerSearchResponse extends BaseCommonEntity {

    private String entrNo;          // 협력사번호
    private String entrNm;          // 협력사명
    private String trdStatCd;       // 거래상태코드
    private String trdStatNm;       // 거래상태명
    private String rpstmnNm;        // 대표자명
    private String bmanNo;          // 사업자번호
    private String corpnNo;         // 법인번호
    private String btyp;            // 업태
    private String bkind;           // 업종
    private String aempNm;          // 담당자명
    private	String aempTelRgnNo;	//담당자전화지역번호
    private	String aempTelTxnoNo;	//담당자전화국번번호
    private	String aempTelEndNo;	//담당자전화끝번호
    private String aempTelNo;       //담당자전화번호
    private	String aempCellSctNo;	//담당자휴대폰구분번호
    private	String aempCellTxnoNo;	//담당자휴대폰국번번호
    private	String aempCellEndNo;	//담당자휴대폰끝번호
    private String aempCellNo;      //담당자휴대폰번호
    private String trdTypCd;        // 거래형태코드
    private String trdTypNm;        // 거래형태명

}
