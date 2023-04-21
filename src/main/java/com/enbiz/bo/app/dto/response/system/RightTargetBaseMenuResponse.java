package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("RightTargetBaseMenuResponse")
@Getter
@Setter
public class RightTargetBaseMenuResponse extends BaseCommonDto {

		private String name;
	 	private String rtTgtSeq;
	    private String rtTgtNm;
	    private String uprRtTgtSeq;
	    private String rtTgtSctCd;
	    private String rtSubGbCd;
	    private String sysGbCd;
	    private String mrkNm;
	    private String sortSeq;
	    private String useYn;
	    private String rtTgtTpCd;
	    private String rtGrpNo;
	    private String prsnInfoYn;
	    private String noteCont;
	    private String menuTlwtYn;
	    private String caloUrl;
	    private String menuId;
	    private String pppYn;
	    private String rtTgtTypCd;
	    private String callUrl;
	    private String btnId;
	    private String popupYn;

		private String level;
		private String blank;
		private String hierarchy;
}
