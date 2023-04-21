package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("UserMenuRtInfoResponse")
@Getter
@Setter
public class UserMenuRtInfoResponse extends BaseCommonDto {
    private	String	rtGrpNo;	//권한그룹번호
    private	String	rtTgtSeq;	//권한대상순번
    private	String	rtSubGbCd;	//권한주체구분코드(UR006)
    private	String	useYn;	//사용여부
    private String  rtTgtNm; //권한대상명
}
