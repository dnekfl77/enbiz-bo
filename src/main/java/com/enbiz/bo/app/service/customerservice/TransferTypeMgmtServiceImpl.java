package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.CsMvotTypeCodeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.entity.CsMvotTypCd;
import com.enbiz.bo.app.repository.customerservice.CsMvotTypCdMapper;
import com.enbiz.bo.app.repository.customerservice.CsMvotTypCdTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class TransferTypeMgmtServiceImpl implements TransferTypeMgmtService {

    private final CsMvotTypCdMapper csMvotTypCdMapper;
    private final CsMvotTypCdTrxMapper csMvotTypCdTrxMapper;

    /**
     * 이관유형 목록 조회
     * @param CsMvotTypeCodeRequest
     * @return
     * @throws Exception
     */
    @Override
    public List<CsTransferTypeCodeResponse> getTransferTypeList(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception {
        return csMvotTypCdMapper.getTransferTypeList(CsMvotTypeCodeRequest);
    }

    /**
     * 이관유형 목록 조회 수
     * @param CsMvotTypeCodeRequest
     * @throws Exception
     */
    @Override
    public int getTransferTypeListCount(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception {
        return csMvotTypCdMapper.getTransferTypeListCount(CsMvotTypeCodeRequest);
    }
    
    /**
     * 이관유형 저장
     * @param createList
     * @throws Exception
     */
    @Override
    public void saveList(List<CsMvotTypCd> createList, List<CsMvotTypCd> updateList) throws Exception {
    	for(CsMvotTypCd csMvotTypCd : createList){
        	csMvotTypCdTrxMapper.insertCsMvotTypCd(csMvotTypCd);
        }
    	for(CsMvotTypCd csMvotTypCd : updateList){
        	csMvotTypCdTrxMapper.updateCsMvotTypCd(csMvotTypCd);
        }
    }

    /**
     * 이관유형명의 중복여부 확인
     * @param CsMvotTypeCodeRequest
     * @throws Exception
     */
    @Override
    public boolean checkCsMvotTypeName(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception {
        int cnt = csMvotTypCdMapper.checkCsMvotTypNm(CsMvotTypeCodeRequest);
        return cnt == 0;
    }
}
