package com.enbiz.bo.app.dto.request.order.common;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OrdDlvpRequest")
@Getter
@Setter
public class OrdDlvpRequest extends BaseCommonEntity {
    private String tmpOrdNo;            // 임시주문번호
    private String tmpDlvpSeq;          // 임시배송지순번
    private String dlvpNm;              // 배송지명
    private String rcvmnNm;             // 수취인명
    private Integer zipNoSeq;           // 우편번호순번
    private String zipNo;               // 우편번호
    private String zipAddr;             // 우편주소
    private String dtlAddr;             // 상세주소
    private String rcvmnEmailAddr;      // 수취인이메일주소
    private String rcvmnCellSctNo;      // 수취인휴대폰구분번호
    private String rcvmnCellTxnoNo;     // 수취인휴대폰국번번호
    private String rcvmnCellEndNo;      // 수취인휴대폰끝번호
    private String rcvmnTelRgnNo;       // 수취인전화지역번호
    private String rcvmnTelTxnoNo;      // 수취인전화국번번호
    private String rcvmnTelEndNo;       // 수취인전화끝번호
    private String deliMsg;             // 배송메시지
    private String shopTrafMsg;         // 매장전달메시지지
}
