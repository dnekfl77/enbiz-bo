package com.enbiz.bo.app.dto.response.vendor;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CooperateDeliveryInfoResponse")
@Getter
@Setter
public class CooperateDeliveryInfoResponse extends BaseCommonEntity {
    private	String	entrDlvpNo;	//협력사배송지번호
    private	String	entrNo;	//협력사번호
    private	String	dlvpTypCd;	//배송지유형코드(VD007)
    private	String	dlvpNm;	//배송지명
    private	String	useYn;	//사용여부
    private	Long	zipNoSeq;	//우편번호순번
    private	String	zipNo;	//우편번호
    private	String	zipAddr;	//우편주소
    private	String	dtlAddr;	//상세주소
    private	String	utakmnNm;	//담당자명
    private	String	aempTelRgnNo;	//담당자전화지역번호
    private	String	aempTelTxnoNo;	//담당자전화국번번호
    private	String	aempTelEndNo;	//담당자전화끝번호
    private	String	aempCellSctNo;	//담당자휴대폰구분번호
    private	String	aempCellTxnoNo;	//담당자휴대폰국번번호
    private	String	aempCellEndNo;	//담당자휴대폰끝번호

    private String aempTelNo;   //담당자전화번호
    private String aempCellNo;   //담당자휴대폰전화번호
}
