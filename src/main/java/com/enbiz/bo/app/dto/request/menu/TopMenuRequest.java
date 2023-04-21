package com.enbiz.bo.app.dto.request.menu;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

@Alias("TopMenuRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopMenuRequest {
    @NotNull
    @NotEmpty
    private String rtTgtSeq;
    private	String userGbCd;	        //사용자구분코드(UR001)
    private	String rtGrpNo;	            //권한그룹번호
    private	String jobGrpCd;	        //업무그룹코드(UR002)
    private String sysGbCd;             // 시스템구분코드(UR005)
    private String userId;              //사용자아이디
}
