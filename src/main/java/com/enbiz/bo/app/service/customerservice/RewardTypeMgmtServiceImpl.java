package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.CsCompensTypeCodeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensTypeCodeResponse;
import com.enbiz.bo.app.entity.CsCpnsTypCd;
import com.enbiz.bo.app.repository.customerservice.CsCpnsTypCdMapper;
import com.enbiz.bo.app.repository.customerservice.CsCpnsTypCdTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class RewardTypeMgmtServiceImpl implements RewardTypeMgmtService {

    private final CsCpnsTypCdMapper csCpnsTypCdMapper;
    private final CsCpnsTypCdTrxMapper csCpnsTypCdTrxMapper;

    /**
     * 보상유형 관리 Tree 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
    @Override
    public List<CsCompensTypeCodeResponse> getRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception{
        return csCpnsTypCdMapper.getRewardTypeList(CsCompensTypeCodeRequest);
    }

    /**
     * 보상유형관리 하위 보상 정보 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
    @Override
    public List<CsCompensTypeCodeResponse> getLowerRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception {
        return csCpnsTypCdMapper.getLowerRewardTypeList(CsCompensTypeCodeRequest);
    }

    /**
     *  보상유형관리 하위 보상 정보 목록 조회 수
     * @param CsCompensTypeCodeRequest
     * @throws Exception
     */
    @Override
    public int getLowerRewardTypeListCount(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception {
        return csCpnsTypCdMapper.getLowerRewardTypeListCount(CsCompensTypeCodeRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveRewardTypeList(List<CsCpnsTypCd> createList, List<CsCpnsTypCd> updateList) throws Exception {
    	for(CsCpnsTypCd csCpnsTypCd : createList){
        	csCpnsTypCdTrxMapper.insertCsCpnsTypCd(csCpnsTypCd);
        }
        for(CsCpnsTypCd csCpnsTypCd : updateList){
        	csCpnsTypCdTrxMapper.updateCsCpnsTypCd(csCpnsTypCd);
        }
    }

    /**
     * 보상유형조회 팝업 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
    @Override
    public List<CsCompensTypeCodeResponse> getCsCompensTypeCodePopup(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception {
        return csCpnsTypCdMapper.getCsCpnsTypCdPopup(CsCompensTypeCodeRequest);
    }

    /**
     *  보상유형조회 팝업 조회 수
     * @param CsCompensTypeCodeRequest
     * @throws Exception
     */
    @Override
    public int getCsCompensTypeCodePopupCount(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception {
        return csCpnsTypCdMapper.getCsCpnsTypCdPopupCount(CsCompensTypeCodeRequest);
    }
}
