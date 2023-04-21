package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;

import java.util.List;

@Repository
@Lazy
public interface PrConrTgtInfoMapper {

    /**
     * 코너대상정보 조회
     * @param prConrBaseRequest
     * @return
     */
    List<PrConrTgtInfoResponse> getCornerTargetInfoList(PrConrBaseRequest prConrBaseRequest);

}
