package com.enbiz.bo.app.service.marketing;


import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.marketing.PresentationDuplicateRequest;
import com.enbiz.bo.app.dto.request.marketing.PresentationRequest;
import com.enbiz.bo.app.dto.response.marketing.PresentationResponse;
import com.enbiz.bo.app.entity.PrPrestHist;
import com.enbiz.bo.app.repository.goods.PrPrestHistMapper;
import com.enbiz.bo.app.repository.goods.PrPrestHistTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 증정품 관리 Impl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class PresentationMgmtServiceImpl implements PresentationMgmtService{

    private final PrPrestHistMapper prPrestHistMapper;
    private final PrPrestHistTrxMapper prPrestHistTrxMapper;

    @Override
    public List<PresentationResponse> getPresentationList(PresentationRequest request) throws Exception {
        return prPrestHistMapper.getPresentationList(request);
    }

    @Override
    public int getPresentationListCount(PresentationRequest request) throws Exception {
        return prPrestHistMapper.getPresentationListCount(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void savePresentation(List<PrPrestHist> createList, List<PrPrestHist> updateList, List<PrPrestHist> deleteList) throws Exception {
        for(PrPrestHist prPrestHist : createList){
            boolean duplicate = getDuplicateStatus(prPrestHist);
            if(duplicate){
                throw new Exception();
            }
            prPrestHistTrxMapper.insertPrPrestHist(prPrestHist);
        }

        for(PrPrestHist prPrestHist : updateList){
            prPrestHistTrxMapper.updatePrPrestHist(prPrestHist);
        }

        for(PrPrestHist prPrestHist : deleteList){
            prPrestHistTrxMapper.deletePrPrestHist(prPrestHist);
        }
    }

    @Override
    public List<String> checkDuplicate(List<PresentationDuplicateRequest> request) throws Exception {
        List<String> duplicateGooods = new ArrayList<>();
        for(PresentationDuplicateRequest req : request){
            boolean duplicate = prPrestHistMapper.checkDuplicate(req);
            if(duplicate){
                duplicateGooods.add(req.getGoodsNo());
            }
        }
        return duplicateGooods;
    }

    public boolean getDuplicateStatus(PrPrestHist prPrestHist) throws Exception {
        PresentationDuplicateRequest req = new PresentationDuplicateRequest();
        req.setGoodsNo(prPrestHist.getGoodsNo());
        req.setAplyStrDt(prPrestHist.getAplyStrDt());
        req.setAplyEndDt(prPrestHist.getAplyEndDt());
        return prPrestHistMapper.checkDuplicate(req);
    }

}
