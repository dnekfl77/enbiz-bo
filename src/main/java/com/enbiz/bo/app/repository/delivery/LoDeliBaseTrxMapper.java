package com.enbiz.bo.app.repository.delivery;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.delivery.DeliveryRequest;
import com.enbiz.bo.app.dto.response.delivery.DeliveryResponse;
import com.enbiz.bo.app.entity.LoDeliBase;

@Repository
@Lazy
public interface LoDeliBaseTrxMapper {

    /**
     * 배송기본 추가
     * @param loDeliBase
     */
    void insertLoDeliBase(LoDeliBase loDeliBase);

    /**
     * 배송진행상태변경이력 추가
     * @param loDeliBase
     */
    void insertLoDeliPrgsStatChgHist(LoDeliBase loDeliBase);

   
}
