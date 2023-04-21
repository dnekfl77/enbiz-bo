package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("etEntrAempInfo")
@Getter
@Setter
public class EtEntrAempInfo extends BaseCommonEntity {
    private	String	entrNo;	//협력사번호
    private	Long	aempSeq;	//담당자순번
    private	String	dutyCd;	//직무코드(VD006)
    private	String	aempNm;	//담당자명
    private	String	telRgnNo;	//전화지역번호
    private	String	telTxnoNo;	//전화국번번호
    private	String	telEndNo;	//전화끝번호
    private	String	cellSctNo;	//휴대폰구분번호
    private	String	cellTxnoNo;	//휴대폰국번번호
    private	String	cellEndNo;	//휴대폰끝번호
    private	String	emailAddr;	//이메일주소
}
