package com.enbiz.bo.app.dto.response;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("AuthorityAccessResponse")
@Getter
@Setter
public class AuthorityAccessResponse {
    private	String rtTgtSeq;	        //권한대상순번
    private	String sysGbCd;	            //시스템구분코드(UR005)
    private	String rtTgtTypCd;	        //권한대상유형코드(UR010)
    private	String rtTgtNm;	            //권한대상명
    private	Long sortSeq;	            //정열순서
    private	String callUrl;	            //호출URL
    private	String useYn;	            //사용여부
    private	String custInfoInclYn;	    //고객정보포함여부
    private	String rmkCont;	            //비고내용
    private	String popupYn;	            //팝업여부
    private	String btnId;	            //버튼아이디
    private	String uprRtTgtSeq;	        //상위권한대상순번
    private	String leafMenuYn;	        //최하위메뉴여부
    private String authorityAccessYn;   //접속권한유무
}
