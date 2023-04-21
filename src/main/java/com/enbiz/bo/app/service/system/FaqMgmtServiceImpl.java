package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.FaqRequest;
import com.enbiz.bo.app.dto.response.system.FaqResponse;
import com.enbiz.bo.app.entity.PrFaqInfo;
import com.enbiz.bo.app.repository.system.PrFaqInfoMapper;
import com.enbiz.bo.app.repository.system.PrFaqInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class FaqMgmtServiceImpl implements FaqMgmtService {

    private final PrFaqInfoMapper prFaqInfoMapper;
    private final PrFaqInfoTrxMapper prFaqInfoTrxMapper;

    @Override
    public List<FaqResponse> getFaqList(FaqRequest faqRequest) throws Exception {
        return prFaqInfoMapper.getFaqList(faqRequest);
    }

    @Override
    public int getFaqListCount(FaqRequest faqRequest) throws Exception {
        return prFaqInfoMapper.getFaqListCount(faqRequest);
    }
    
    @Override
    public FaqResponse getFaqDetail(FaqRequest faqRequest) throws Exception {
        return prFaqInfoMapper.getFaqDetail(faqRequest);
    }
    
    @Override
    public void saveFaqList(List<PrFaqInfo> updateList) {
        for (PrFaqInfo prFaqInfo : updateList) {
        	prFaqInfoTrxMapper.updatePrFaqInfo(prFaqInfo);
        }
    }

    @Override
    public void registFaqInfo(PrFaqInfo prFaqInfo) {
    	this.validationFaq(prFaqInfo);
    	prFaqInfoTrxMapper.insertPopupPrFaqInfo(prFaqInfo);
    }

    @Override
    public void modifyFaqInfo(PrFaqInfo prFaqInfo) {
    	this.validationFaq(prFaqInfo);
    	prFaqInfoTrxMapper.updatePopupPrFaqInfo(prFaqInfo);
    }

    private void validationFaq(PrFaqInfo prFaqInfo) {
    	Validator.throwIfEmpty(prFaqInfo.getTitle(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"title"}));
    	Validator.throwIfEmpty(prFaqInfo.getFaqLgrpCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"faqLgrpCd"}));
    	Validator.throwIfEmpty(prFaqInfo.getFaqMgrpCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"faqMgrpCd"}));
    	Validator.throwIfEmpty(prFaqInfo.getBbYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"bbYn"}));
    	Validator.throwIfEmpty(prFaqInfo.getSortSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"sortSeq"}));
    	Validator.throwIfEmpty(prFaqInfo.getUprFixYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"uprFixYn"}));
    }

    @Override
    public boolean faqOverLapCheck(FaqRequest faqRequest) {
        int cnt = prFaqInfoMapper.faqOverLapCheck(faqRequest);
        return cnt == 0;
    }

}
