package com.enbiz.bo.app.dto.request.system;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StandardCodeMlRequest")
@Getter
@Setter
public class StandardCodeMlRequest extends BaseCommonEntity {
	
	private String grpCd;	// 그룹코드
	private String cd;		// 코드
	private String langCd;	// 언어코드
	private String cdNm;	// 코드명
	private String cdDesc;	// 코드설명
	
	private List<Item> items = new ArrayList<>();
    @Getter
    @Setter
    public static class Item {
        private String grpCd;
        private String cd;
        private String langCd;
    }
    
}
