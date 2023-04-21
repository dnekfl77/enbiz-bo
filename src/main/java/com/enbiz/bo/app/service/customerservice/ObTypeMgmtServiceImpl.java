package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.CsObTypCdRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsObTypCdResponse;
import com.enbiz.bo.app.entity.CsObTypCd;
import com.enbiz.bo.app.repository.customerservice.CsObTypCdMapper;
import com.enbiz.bo.app.repository.customerservice.CsObTypCdTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class ObTypeMgmtServiceImpl implements ObTypeMgmtService {

    private final CsObTypCdMapper csObTypCdMapper;
    private final CsObTypCdTrxMapper csObTypCdTrxMapper;

    /**
     * OB유형 목록 조회
     * @param csObTypCdRequest
     * @return
     * @throws Exception
     */
    @Override
    public List<CsObTypCdResponse> getObTypeList(CsObTypCdRequest csObTypCdRequest) throws Exception {
        return csObTypCdMapper.getObTypeList(csObTypCdRequest);
    }

    /**
     *  OB유형 목록 조회 수
     * @param csObTypCdRequest
     * @throws Exception
     */
    @Override
    public int getObTypeListCount(CsObTypCdRequest csObTypCdRequest) throws Exception {
        return csObTypCdMapper.getObTypeListCount(csObTypCdRequest);
    }

    /**
     * OB유형 저장
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveList(List<CsObTypCd> createList,List<CsObTypCd> updateList) throws Exception {
    	for(CsObTypCd csObTypCd : createList){
        	csObTypCdTrxMapper.insertCsObTypeCode(csObTypCd);
        }
    	for(CsObTypCd csObTypCd : updateList){
        	csObTypCdTrxMapper.updateCsObTypeCode(csObTypCd);
        }
    }

    /**
     * OB유형명의 중복여부 확인
     * @param csObTypCdRequest
     * @throws Exception
     */
    @Override
    public boolean checkObTypNm(CsObTypCdRequest csObTypCdRequest) throws Exception {
        int cnt = csObTypCdMapper.checkObTypNm(csObTypCdRequest);
        return cnt == 0;
    }

    /**
     * OB 유형 조회 No Paging
     */
    @Override
    public List<CsObTypCdResponse> getObTypeNoPagingList(CsObTypCdRequest csObTypCdRequest) throws Exception {
        return csObTypCdMapper.getObTypeNoPagingList(csObTypCdRequest);
    }
}
