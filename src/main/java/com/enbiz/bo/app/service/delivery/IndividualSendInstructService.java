package com.enbiz.bo.app.service.delivery;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.delivery.IndividualSendInstructRequest;
import com.enbiz.bo.app.dto.response.delivery.IndividualSendInstructResponse;
import com.enbiz.bo.app.entity.LoDeliBase;
import com.enbiz.bo.app.entity.LoDeliDtl;
import com.enbiz.bo.app.entity.OpOrdDtl;
import com.enbiz.bo.app.entity.OpOrdDtlStatChgHist;
import com.enbiz.bo.app.repository.delivery.LoDeliBaseMapper;
import com.enbiz.bo.app.repository.delivery.LoDeliBaseTrxMapper;
import com.enbiz.bo.app.repository.delivery.LoDeliDtlTrxMapper;
import com.enbiz.bo.app.repository.delivery.OpOrdDtlStatChgHistTrxMapper;
import com.enbiz.bo.app.repository.order.OpOrdDtlMapper;
import com.enbiz.bo.app.repository.order.OpOrdDtlTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 개별발송지시 서비스
 */

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class IndividualSendInstructService {

    private final OpOrdDtlMapper opOrdDtlMapper;
    private final OpOrdDtlTrxMapper opOrdDtlTrxMapper;    
    private final OpOrdDtlStatChgHistTrxMapper opOrdDtlStatChgHistTrxMapper;
    private final LoDeliBaseMapper loDeliBaseMapper;
    private final LoDeliBaseTrxMapper loDeliBaseTrxMapper;
    private final LoDeliDtlTrxMapper loDeliDtlTrxMapper;

    /**
     * 전체주문조회 목록 조회
     * @param  individualSendInstructRequest
     * @return 배송 목록
     * @throws Exception
     */
    public List<IndividualSendInstructResponse> getIndividualSendInstructList(IndividualSendInstructRequest individualSendInstructRequest) throws Exception {
        return opOrdDtlMapper.getIndividualSendInstructList(individualSendInstructRequest);
    }

    /**
     * 전체주문조회 목록 수
     * @param  individualSendInstructRequest
     * @return 목록 수
     * @throws Exception
     */
    public int getIndividualSendInstructListCount(IndividualSendInstructRequest individualSendInstructRequest) throws Exception {
        return opOrdDtlMapper.getIndividualSendInstructListCount(individualSendInstructRequest);
    }

    /**
     * 발송지시 _ 주문상세 업데이트, 주문상세상태변경이력 입력, 배송기본 입력, 배송상세 입력
     * @param  individualSendInstructRequest
     * @return 발송지시
     * @throws Exception
     */
    public void sendInstruct(IndividualSendInstructRequest individualSendInstructRequest) throws Exception {
        // 주문 상세 테이블 _ 주문내역상태코드(발송지시 21) 업데이트
        OpOrdDtl opOrdDtl = new OpOrdDtl();
        opOrdDtl.setOrdNo(individualSendInstructRequest.getOrdNo());
        opOrdDtl.setDeliUnitNo(individualSendInstructRequest.getDeliUnitNo());
        opOrdDtl.setDlvpSeq(individualSendInstructRequest.getDlvpSeq());
        opOrdDtl.setSysModId(individualSendInstructRequest.getSysModId());
        opOrdDtlTrxMapper.updateSendInstruct(opOrdDtl);

        // 주문상세상태변경이력 테이블 _ 변경이력 추가
        List<OpOrdDtlStatChgHist> ordSeqList = getOrdSeqList(individualSendInstructRequest);
        for (OpOrdDtlStatChgHist opOrdDtlStatChgHist : ordSeqList) {
            opOrdDtlStatChgHist.setOrdDtlStatCd("21"); // 주문내역상태코드(발송지시 21)
            opOrdDtlStatChgHist.setSysRegId(individualSendInstructRequest.getSysRegId());
            opOrdDtlStatChgHist.setSysModId(individualSendInstructRequest.getSysModId());
            opOrdDtlStatChgHistTrxMapper.insertOpOrdDtlStatChgHist(opOrdDtlStatChgHist);
        }

        // 배송기본 테이블 _ 배송기본 추가
        LoDeliBase loDeliBase = new LoDeliBase();
        loDeliBase.setSiteNo(individualSendInstructRequest.getSiteNo());    // 사이트 번호
        loDeliBase.setOrdNo(individualSendInstructRequest.getOrdNo());      // 주문 번호
        loDeliBase.setDlvpSeq(individualSendInstructRequest.getDlvpSeq());  // 배송지 순번
        loDeliBase.setDeliGbCd("10");  // 배송구분코드 (출하:10)
        loDeliBase.setDeliTypCd(individualSendInstructRequest.getOrdDtlGbCd());  // 배송유형코드
        loDeliBase.setDeliProcTypCd(individualSendInstructRequest.getDeliProcTypCd());  // 배송처리유형코드
        loDeliBase.setDeliWayCd(individualSendInstructRequest.getDeliWayCd());  // 배송수단코드
        loDeliBase.setDeliPrgsStatCd("21");  // 배송진행상태코드 (발송지시:21)
        loDeliBase.setDeliPolcNo(individualSendInstructRequest.getDeliPolcNo()); // 배송비정책번호
        loDeliBase.setDlexChrgSubCd(individualSendInstructRequest.getDlexChrgSubCd()); // 배송비부담주체코드
        loDeliBase.setMbrNo(individualSendInstructRequest.getMbrNo()); // 회원번호
        loDeliBase.setOrdererNm(individualSendInstructRequest.getOrdManNm()); // 주문자명
        if(individualSendInstructRequest.getDeliProcTypCd().equals("10")) { // 배송처리유형코드가 센터인 경우
            loDeliBase.setEntrNo("0"); // 협력사 번호
        } else {
            loDeliBase.setEntrNo(individualSendInstructRequest.getEntrNo()); // 협력사 번호
        }
        loDeliBase.setSysRegId(individualSendInstructRequest.getSysRegId());
        loDeliBase.setSysModId(individualSendInstructRequest.getSysModId());
        loDeliBaseTrxMapper.insertLoDeliBase(loDeliBase);

        // 배송진행상태변경이력 테이블 추가
        loDeliBaseTrxMapper.insertLoDeliPrgsStatChgHist(loDeliBase);

        // 해당 배송단위번호에 속해있는 주문상세 리스트 조회 후 배송상세에 입력
        List<LoDeliDtl> opOrdDtlList = getDeliUnitList(individualSendInstructRequest);
        for (LoDeliDtl loDeliDtl : opOrdDtlList) {
            loDeliDtl.setDeliNo(loDeliBase.getDeliNo());
            loDeliDtl.setSysRegId(individualSendInstructRequest.getSysRegId());
            loDeliDtl.setSysModId(individualSendInstructRequest.getSysModId());
            loDeliDtlTrxMapper.insertLoDeliDtl(loDeliDtl);
        }
    }

    /**
     * 배송단위번호에 속해있는 주문상세 주문번호 리스트
     * @param  individualSendInstructRequest
     * @return 주문상세 목록
     * @throws Exception
     */
    public List<OpOrdDtlStatChgHist> getOrdSeqList(IndividualSendInstructRequest individualSendInstructRequest) throws Exception {
        return opOrdDtlMapper.getOrdSeqList(individualSendInstructRequest);
    }

    /**
     * 배송단위번호에 속해있는 주문상세 리스트
     * @param  individualSendInstructRequest
     * @return 주문상세 목록
     * @throws Exception
     */
    public List<LoDeliDtl> getDeliUnitList(IndividualSendInstructRequest individualSendInstructRequest) throws Exception {
        return opOrdDtlMapper.getDeliUnitList(individualSendInstructRequest);
    }

}
