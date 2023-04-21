package com.enbiz.bo.app.service.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.payment.OpCardBinInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpCardBinInfoResponse;
import com.enbiz.bo.app.entity.OpCardBinInfo;
import com.enbiz.bo.app.repository.payment.OpCardBinInfoMapper;
import com.enbiz.bo.app.repository.payment.OpCardBinInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 카드Bin관리 서비스 구현
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class CardBinMgmtServiceImpl implements CardBinMgmtService {

    private final OpCardBinInfoMapper opCardBinInfoMapper;
    private final OpCardBinInfoTrxMapper opCardBinInfoTrxMapper;

	@Override
    public List<OpCardBinInfoResponse> getCardBinList(OpCardBinInfoRequest opCardBinInfoRequest) throws Exception {
        return opCardBinInfoMapper.getCardBinList(opCardBinInfoRequest);
    }

	@Override
    public int getCardBinListCount(OpCardBinInfoRequest opCardBinInfoRequest) throws Exception {
        return opCardBinInfoMapper.getCardBinListCount(opCardBinInfoRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCUD(List<OpCardBinInfo> createList, List<OpCardBinInfo> updateList, List<OpCardBinInfo> deleteList) throws Exception{
        insertOpCardBinInfo(createList);
        updateOpCardBinInfo(updateList);
        deleteOpCardBinInfo(deleteList);
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertOpCardBinInfo(List<OpCardBinInfo> createList) throws Exception {
        for (OpCardBinInfo opCardBinInfo : createList){
        	opCardBinInfoTrxMapper.insertOpCardBinInfo(opCardBinInfo);
        }
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateOpCardBinInfo(List<OpCardBinInfo> updateList) throws Exception {
        for (OpCardBinInfo opCardBinInfo : updateList){
        	opCardBinInfoTrxMapper.updateOpCardBinInfo(opCardBinInfo);
        }
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteOpCardBinInfo(List<OpCardBinInfo> deleteList) throws Exception {
        for (OpCardBinInfo opCardBinInfo : deleteList){
            opCardBinInfoTrxMapper.deleteOpCardBinInfo(opCardBinInfo);
        }
    }

    @Override
	public boolean checkCardBinno(OpCardBinInfoRequest opCardBinInfoRequest) {
        int cnt = opCardBinInfoMapper.checkCardBinno(opCardBinInfoRequest);
        return cnt <= 0;
    }

}
