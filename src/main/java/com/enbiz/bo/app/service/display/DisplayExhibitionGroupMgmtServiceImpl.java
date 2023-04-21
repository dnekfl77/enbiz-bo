package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrDispGrpBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGrpMappInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrMkdpBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrDispGrpBaseRespons;
import com.enbiz.bo.app.dto.response.display.PrDispGrpMappInfoRespons;
import com.enbiz.bo.app.dto.response.display.PrMkdpBaseResponse;
import com.enbiz.bo.app.repository.display.PrDispGrpBaseMapper;
import com.enbiz.bo.app.repository.display.PrDispGrpBaseTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 기획전 그룹 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class DisplayExhibitionGroupMgmtServiceImpl implements DisplayExhibitionGroupMgmtService {

    private final PrDispGrpBaseMapper prDispGrpBaseMapper;
    private final PrDispGrpBaseTrxMapper prDispGrpBaseTrxMapper;

    /**
     * 그룹 목록 수 조회
     * @param  prDispGrpMappInfoRequest
     * @return int
     * @return 기획전 관리 목록 수
     * @throws Exception
     */
    @Override
    public int getPrDispGrpBaseListCount(PrDispGrpBaseRequest prDispGrpBaseRequest) {
        return prDispGrpBaseMapper.getPrDispGrpBaseListCount(prDispGrpBaseRequest);
    }

    /**
     * 그룹 목록 조회
     * @param  prDispGrpMappInfoRequest
     * @return List<CcFotrInfoResponse>
     * @throws Exception
     */
    @Override
    public List<PrDispGrpBaseRespons> getPrDispGrpBaseList(PrDispGrpBaseRequest prDispGrpBaseRequest) throws Exception {
        return prDispGrpBaseMapper.getPrDispGrpBaseList(prDispGrpBaseRequest);
    }

    /**
     * 그룹 목록 저장(등록, 수정, 삭제)
     * @param
     * 	List<PrDispGrpMappInfoRequest> 등록 목록
     * 	, List<PrDispGrpMappInfoRequest> 수정 목록
     *	, List<PrDispGrpMappInfoRequest> 삭제 목록
     * @throws Exception
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void savePrDispGrpBaseList(List<PrDispGrpBaseRequest> insertList, List<PrDispGrpBaseRequest> updateList, List<PrDispGrpBaseRequest> deleteList) throws Exception{
    	//등록 목록
    	if(insertList!=null && insertList.size()>0) {
    		prDispGrpBaseTrxMapper.insertPrDispGrpBaseList(insertList);
    	}

    	//수정 목록
    	if(updateList!=null && updateList.size()>0) {
    		prDispGrpBaseTrxMapper.updatePrDispGrpBaseList(updateList);
    	}

    	//삭제 목록
    	if(deleteList!=null && deleteList.size()>0) {
    		prDispGrpBaseTrxMapper.deletePrDispGrpBaseList(deleteList);
    	}
    }



    /**
     * 기획전 목록 수 조회
     * @param  prDispGrpMappInfoRequest
     * @return int
     * @return 기획전 관리 목록 수
     * @throws Exception
     */
    @Override
    public int getPrDispGrpMappInfoListCount(PrDispGrpMappInfoRequest prDispGrpMappInfoRequest) {
        return prDispGrpBaseMapper.getPrDispGrpMappInfoListCount(prDispGrpMappInfoRequest);
    }

    /**
     * 기획전 목록 조회
     * @param  prDispGrpMappInfoRequest
     * @return List<CcFotrInfoResponse>
     * @throws Exception
     */
    @Override
    public List<PrDispGrpMappInfoRespons> getPrDispGrpMappInfoList(PrDispGrpMappInfoRequest prDispGrpMappInfoRequest) throws Exception {
        return prDispGrpBaseMapper.getPrDispGrpMappInfoList(prDispGrpMappInfoRequest);
    }

    /**
     * 기획전 목록 저장(등록, 수정, 삭제)
     * @param
     * 	List<PrDispGrpMappInfoRequest> 등록 목록
     * 	, List<PrDispGrpMappInfoRequest> 수정 목록
     *	, List<PrDispGrpMappInfoRequest> 삭제 목록
     * @throws Exception
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void savePrDispGrpMappInfoList(List<PrDispGrpMappInfoRequest> insertList, List<PrDispGrpMappInfoRequest> updateList, List<PrDispGrpMappInfoRequest> deleteList) throws Exception{
    	//등록 목록
    	if(insertList!=null && insertList.size()>0) {
    		prDispGrpBaseTrxMapper.insertPrDispGrpMappInfoList(insertList);
    	}

    	//수정 목록
    	if(updateList!=null && updateList.size()>0) {
    		prDispGrpBaseTrxMapper.updatePrDispGrpMappInfoList(updateList);
    	}

    	//삭제 목록
    	if(deleteList!=null && deleteList.size()>0) {
    		prDispGrpBaseTrxMapper.deletePrDispGrpMappInfoList(deleteList);
    	}
    }

    /**
     * 기획전 수 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록 수
     * @throws Exception
     */
    public int getMarketDisplayListCount(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prDispGrpBaseMapper.getMarketDisplayListCount(prMkdpBaseRequest);
    }

    /**
     * 기획전 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록
     * @throws Exception
     */
    public List<PrMkdpBaseResponse> getMarketDisplayList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prDispGrpBaseMapper.getMarketDisplayList(prMkdpBaseRequest);
    }
}
