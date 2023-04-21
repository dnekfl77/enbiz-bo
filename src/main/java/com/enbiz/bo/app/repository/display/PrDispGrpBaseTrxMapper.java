package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrDispGrpBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGrpMappInfoRequest;

/**
 * 기획전 그룹 관리 Mapper
 * @author N.J.Kim
 *
 */
@Repository
@Lazy
public interface PrDispGrpBaseTrxMapper {

    /**
     * 기획전 그룹 목록 등록
     * @param prPrDispGrpMappInfoInfo 등록
     * @throws Exception
     */
	int insertPrDispGrpBaseList(List<PrDispGrpBaseRequest> record);

    /**
     * 기획전 그룹 목록 수정
     * @param ccPrDispGrpMappInfoInfo 등록
     * @throws Exception
     */
	int updatePrDispGrpBaseList(List<PrDispGrpBaseRequest> ccFotrInfoRequest);

    /**
     * 기획전 그룹 삭제 목록 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
	int deletePrDispGrpBaseList(List<PrDispGrpBaseRequest> ccFotrInfoRequest);

    /**
     * 기획전 그룹 목록 등록
     * @param prPrDispGrpMappInfoInfo 등록
     * @throws Exception
     */
	int insertPrDispGrpMappInfoList(List<PrDispGrpMappInfoRequest> prDispGrpMappInfoRequest);

    /**
     * 기획전 그룹 목록 수정
     * @param ccPrDispGrpMappInfoInfo 등록
     * @throws Exception
     */
	int updatePrDispGrpMappInfoList(List<PrDispGrpMappInfoRequest> prDispGrpMappInfoRequest);

    /**
     * 기획전 그룹 목록 삭제
     * @param deleteList 삭제 목록
     * @throws Exception
     */
	int deletePrDispGrpMappInfoList(List<PrDispGrpMappInfoRequest> prDispGrpMappInfoRequest);
}