package com.enbiz.bo.app.dto.response.customerservice;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCcnProcInfoResponse")
@Getter
@Setter
public class CsCcnProcInfoResponse extends BaseCommonEntity {
    private String ccnNo;           // 상담번호
    private String cnslProcSeq;     // 상담처리순번
    private String obProcTypCd;     // OB처리유형코드
    private String cnslProcDtm;     // 상담처리일시
    private String cnslProcCont;    // 상담처리내용
    private String userNm;          // 처리자
    private List<CsTelPrmsResponse> csTelPrmsResponses; //고객전화약속정보
    private List<CsTransReqResponse> csTransReqResponses; //고객상담이관요청정보
}
