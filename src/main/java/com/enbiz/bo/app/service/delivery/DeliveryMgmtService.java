package com.enbiz.bo.app.service.delivery;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.delivery.EtDeliRegnByZipCdCudRequest;
import com.enbiz.bo.app.dto.request.delivery.EtDeliRegnByZipCdRequest;
import com.enbiz.bo.app.dto.response.delivery.EtDeliRegnByZipCdResponse;
import com.enbiz.bo.app.repository.delivery.EtDeliRegnByZipCdMapper;
import com.enbiz.bo.app.repository.delivery.EtDeliRegnByZipCdTrxMapper;
import com.enbiz.bo.app.repository.order.OpOrdDtlMapper;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 배송 관리 서비스
 */

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class DeliveryMgmtService {

    private final EtDeliRegnByZipCdTrxMapper etDeliRegnByZipCdTrxMapper;
    private final EtDeliRegnByZipCdMapper etDeliRegnByZipCdMapper;
    private final OpOrdDtlMapper opOrdDtlMapper;

    /**
     * 지역별 우편번호 목록 조회 - 좌측 그리드
     * @param  etDeliRegnByZipCdRequest
     * @return 배송 목록
     * @throws Exception
     */
    public List<EtDeliRegnByZipCdResponse> getRegnPostNoList(EtDeliRegnByZipCdRequest etDeliRegnByZipCdRequest) throws Exception {
        return etDeliRegnByZipCdMapper.getRegnPostNoList(etDeliRegnByZipCdRequest);
    }

    /**
     * 지역별 우편번호 목록 Count 조회 - 좌측그리드
     * @param  etDeliRegnByZipCdRequest
     * @return 목록 Count
     * @throws Exception
     */
    public int getRegnPostNoListCount(EtDeliRegnByZipCdRequest etDeliRegnByZipCdRequest) throws Exception {
        return etDeliRegnByZipCdMapper.getRegnPostNoListCount(etDeliRegnByZipCdRequest);
    }

    /**
     * 배송지역 드롭다운 리스크
     * @param
     * @return
     * @throws
     */
    public List<String> getRgnGrpList() {
        return etDeliRegnByZipCdMapper.getRgnGrpList();
    }

    /**
     * 배송지역별 우편번호 목록 조회 - 우측 그리드
     * @param etDeliRegnByZipCdRequest
     * @return Exception
     * @throws
     */
    public List<EtDeliRegnByZipCdResponse> getDeliRegnByZipCdList(EtDeliRegnByZipCdRequest etDeliRegnByZipCdRequest) throws Exception {
        return etDeliRegnByZipCdMapper.getDeliRegnByZipCdList(etDeliRegnByZipCdRequest);
    }

    /**
     * 배송지역별 우편번호 목록 Count 조회 - 우측 그리드
     * @param  etDeliRegnByZipCdRequest
     * @return 목록 Count
     * @throws Exception
     */
    public int getDeliRegnByZipCdListCount(EtDeliRegnByZipCdRequest etDeliRegnByZipCdRequest) throws Exception {
        return etDeliRegnByZipCdMapper.getDeliRegnByZipCdListCount(etDeliRegnByZipCdRequest);
    }

    /**
     * 배송지역별 우편번호 신규 등록
     * @param createList 신규 목록
     * @throws Exception
     */
    public void insertDeliRegnByZipCd(List<EtDeliRegnByZipCdCudRequest> createList) {
        try{
            for (EtDeliRegnByZipCdCudRequest etDeliRegnByZipCdRequest : createList) {
                etDeliRegnByZipCdTrxMapper.insertDeliRegnByZipCd(etDeliRegnByZipCdRequest);
            }
        } catch (Exception e ){
            throw new ValidationException(MessageResolver.getMessage("deliveryManagement.message.overLap.zipno"), e);
        }
    }

    /**
     * 배송지역별 우편번호 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    public void deleteDeliRegnByZipCd(List<EtDeliRegnByZipCdCudRequest> deleteList) {
        for (EtDeliRegnByZipCdCudRequest etDeliRegnByZipCdRequest : deleteList) {
            etDeliRegnByZipCdTrxMapper.deleteDeliRegnByZipCd(etDeliRegnByZipCdRequest);
        }
    }

    /**
     * 배송지역 우편번호 저장
     * @param createList 신규 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCUD(List<EtDeliRegnByZipCdCudRequest> createList, List<EtDeliRegnByZipCdCudRequest> deleteList) throws Exception {
        insertDeliRegnByZipCd(createList);
        deleteDeliRegnByZipCd(deleteList);
    }

}
