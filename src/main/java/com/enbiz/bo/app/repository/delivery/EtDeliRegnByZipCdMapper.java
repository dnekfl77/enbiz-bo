package com.enbiz.bo.app.repository.delivery;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.delivery.EtDeliRegnByZipCdRequest;
import com.enbiz.bo.app.dto.response.delivery.EtDeliRegnByZipCdResponse;

@Repository
@Lazy
public interface EtDeliRegnByZipCdMapper {
    /**
     * 지역별 우편번호 목록
     * @param EtDeliRegnByZipCdRequest
     * @return
     */
    List<EtDeliRegnByZipCdResponse> getRegnPostNoList(EtDeliRegnByZipCdRequest ccChlBaseRequest);

    /**
     * 지역별 우편번호 목록 count
     * @param EtDeliRegnByZipCdRequest
     * @return int
     */
    int getRegnPostNoListCount(EtDeliRegnByZipCdRequest ccChlBaseRequest);

    /**
     * 지역별 우편번호 그룹코드리스트
     * @param
     * @return
     */
    List<String> getRgnGrpList();

    /**
     * 배송그룹별 우편번호 목록
     * @param EtDeliRegnByZipCdRequest
     * @return
     */
    List<EtDeliRegnByZipCdResponse> getDeliRegnByZipCdList(EtDeliRegnByZipCdRequest ccChlBaseRequest);

    /**
     * 배송그룹별 우편번호 목록 Count
     * @param
     * @return int
     */
    int getDeliRegnByZipCdListCount(EtDeliRegnByZipCdRequest ccChlBaseRequest);
}
