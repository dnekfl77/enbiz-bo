package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.AdvertisingWordMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.AdvertisingWordMgmtResponse;
import com.enbiz.bo.app.entity.PrAdveWrdHist;
import com.enbiz.bo.app.repository.goods.PrAdveWrdHistMapper;
import com.enbiz.bo.app.repository.goods.PrAdveWrdHistTrxMapper;
import com.enbiz.common.base.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;
import lombok.RequiredArgsConstructor;

/**
 * 홍보문구관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class AdvertisingWordMgmtServiceImpl implements AdvertisingWordMgmtService {

    private final PrAdveWrdHistMapper prAdveWrdHistMapper;
    private final PrAdveWrdHistTrxMapper prAdveWrdHistTrxMapper;

    @Override
    public int getAdvertisingWordListCount(AdvertisingWordMgmtRequest request) throws Exception {
        return prAdveWrdHistMapper.getPrAdveWrdHistListCount(request);
    }

    @Override
    public List<AdvertisingWordMgmtResponse> getAdvertisingWordList(AdvertisingWordMgmtRequest request) throws Exception {
        return prAdveWrdHistMapper.getPrAdveWrdHistList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveAdvertisingWordList(List<PrAdveWrdHist> createList, List<PrAdveWrdHist> updateList) throws Exception {
        for(PrAdveWrdHist prAdveWrdHist : createList){
            checkDuplicatedAdvertisingWord(prAdveWrdHist);

            Validator.throwIfEmpty(prAdveWrdHist.getGoodsNo()   , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"상품번호 확인불가"}));
            Validator.throwIfEmpty(prAdveWrdHist.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"등록자ID 확인불가"}));

            Validator.throwIfEmpty(prAdveWrdHist.getAplyStrDt() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"적용시작일자"}));
            Validator.throwIfEmpty(prAdveWrdHist.getAplyEndDt() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"적용종료일자"}));
            Validator.throwIfEmpty(prAdveWrdHist.getAdveWrd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"홍보문구"}));
            Validator.throwIfEmpty(prAdveWrdHist.getUseYn()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));

            Validator.throwIfLongerThan(prAdveWrdHist.getAdveWrd(),30, MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[]{"홍보문구","30"}));

            prAdveWrdHistTrxMapper.insertPrAdveWrdHist(prAdveWrdHist);
        }

        for(PrAdveWrdHist prAdveWrdHist : updateList){
            Validator.throwIfEmpty(prAdveWrdHist.getGoodsNo()    , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"상품번호 확인불가"}));
            Validator.throwIfEmpty(prAdveWrdHist.getSysModId()   , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID 확인불가"}));

            Validator.throwIfEmpty(prAdveWrdHist.getAdveWrd()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"홍보문구"}));
            Validator.throwIfEmpty(prAdveWrdHist.getUseYn()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));

            Validator.throwIfLongerThan(prAdveWrdHist.getAdveWrd(), 30, MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[]{"홍보문구","30"}));

            prAdveWrdHistTrxMapper.updatePrAdveWrdHist(prAdveWrdHist);
        }
    }

    private void checkDuplicatedAdvertisingWord(PrAdveWrdHist prAdveWrdHist) throws Exception {
        boolean duplicate = prAdveWrdHistMapper.checkDuplicatedAdveWrdAplyDt(prAdveWrdHist);
        if( duplicate ){
            throw new ValidationException("[ 상품번호 : "+prAdveWrdHist.getGoodsNo()+" ] "+MessageResolver.getMessage("advertisingWordMgmt.alert.msg.duplicatedAdvertisingWordMsg"));
        }
    }
}
