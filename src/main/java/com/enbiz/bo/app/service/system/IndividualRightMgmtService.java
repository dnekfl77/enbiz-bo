package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.IndividualRtInfoRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.system.IndividualRtInfoResponse;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StIndivRtBaseInfo;
import com.enbiz.bo.app.entity.StRtInfo;

/**
 * 개별 권한 관리 서비스
 */
public interface IndividualRightMgmtService {

    /**
     * 개별 권한 관리 목록 조회
     * @param  individualRtInfoRequest
     * @return 개별 권한 관리 목록
     * @throws Exception
     */
    List<IndividualRtInfoResponse> getIndividualRightList(IndividualRtInfoRequest individualRtInfoRequest) throws Exception;

    /**
     * 개별 권한 관리 목록 수 조회
     * @param  individualRtInfoRequest
     * @return 개별 권한 관리 목록 수
     * @throws Exception
     */
    int getIndividualRightListCount(IndividualRtInfoRequest individualRtInfoRequest) throws Exception;

    /**
     * 개별권한메뉴 트리 리스트 조회
     * @param  RtTargetBaseRequest
     * @return List<RtTargetBaseResponse>
     * @throws Exception
     */
    List<RtTargetBaseResponse> getIndividualMenuTreeList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 개별 권한 저장처리
     * @param  realGridCUD
     * @throws Exception
     */
    void saveIndividualRightList(RealGridCUDRequest<StIndivRtBaseInfo> realGridCUD) throws Exception;
    
    /**
     * 개별 권한 버튼권한 저장처리
     * @param  realGridCUD
     * @throws Exception
     */
    void saveIndividualRightButtonGridList(RealGridCUDRequest<StRtInfo> realGridCUD)  throws Exception;
}
