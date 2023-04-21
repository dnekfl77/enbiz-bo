package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrStdCtgDispInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.dto.response.goods.PrStdCtgDispInfoResponse;
import com.enbiz.bo.app.entity.PrStdCtgDispInfo;
import com.enbiz.bo.app.repository.display.PrStdCtgDispInfoMapper;
import com.enbiz.bo.app.repository.display.PrStdCtgDispInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class StandardDisplayCategoryConnectServiceImpl implements StandardDisplayCategoryConnectService {

    private final PrStdCtgDispInfoMapper prStdCtgDispInfoMapper;
    private final PrStdCtgDispInfoTrxMapper prStdCtgDispInfoTrxMapper;

    @Override
    public List<PrStdCtgResponse> getStandardDisplayCategoryConnectTree() throws Exception {
        return prStdCtgDispInfoMapper.getStandardDisplayCategoryConnectTree();
    }

    @Override
    public int getStandardDisplayCategoryConnectCount(PrStdCtgDispInfoRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        return prStdCtgDispInfoMapper.getStandardDisplayCategoryConnectCount(request);
    }

    @Override
    public List<PrStdCtgDispInfoResponse> getStandardDisplayCategoryConnect(PrStdCtgDispInfoRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        return prStdCtgDispInfoMapper.getStandardDisplayCategoryConnect(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void cudPrStdCtgDispInfo(List<PrStdCtgDispInfo> createList, List<PrStdCtgDispInfo> updateList, List<PrStdCtgDispInfo> deleteList) throws Exception {
        insertPrStdCtgDispInfo(createList);
        updatePrStdCtgDispInfo(updateList);
        deletePrStdCtgDispInfo(deleteList);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertPrStdCtgDispInfo(List<PrStdCtgDispInfo> createList) throws Exception {
        for(PrStdCtgDispInfo prStdCtgDispInfo : createList){
            Validator.throwIfEmpty(prStdCtgDispInfo.getDispCtgNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getRepCtgYn()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"대표카테고리여부"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getSysRegId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            prStdCtgDispInfoTrxMapper.insertPrStdCtgDispInfo(prStdCtgDispInfo);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updatePrStdCtgDispInfo(List<PrStdCtgDispInfo> updateList) throws Exception {
        for(PrStdCtgDispInfo prStdCtgDispInfo : updateList){
            Validator.throwIfEmpty(prStdCtgDispInfo.getDispCtgNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getRepCtgYn()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"대표카테고리여부"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prStdCtgDispInfoTrxMapper.updatePrStdCtgDispInfo(prStdCtgDispInfo);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deletePrStdCtgDispInfo(List<PrStdCtgDispInfo> deleteList) throws Exception {
        for(PrStdCtgDispInfo prStdCtgDispInfo : deleteList){
            Validator.throwIfEmpty(prStdCtgDispInfo.getDispCtgNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시카테고리번호"}));
            Validator.throwIfEmpty(prStdCtgDispInfo.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
            prStdCtgDispInfoTrxMapper.deletePrStdCtgDispInfo(prStdCtgDispInfo);
        }
    }
}
