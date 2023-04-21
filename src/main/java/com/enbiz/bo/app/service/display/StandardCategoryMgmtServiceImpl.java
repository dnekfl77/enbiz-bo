package com.enbiz.bo.app.service.display;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.display.PrStdCtgRequest;
import com.enbiz.bo.app.dto.response.display.PrGoodsBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.entity.PrStdCtg;
import com.enbiz.bo.app.repository.display.PrStdCtgMapper;
import com.enbiz.bo.app.repository.display.PrStdCtgTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class StandardCategoryMgmtServiceImpl implements StandardCategoryMgmtService {

    private final PrStdCtgMapper prStdCtgMapper;
    private final PrStdCtgTrxMapper prStdCtgTrxMapper;

    @Override
    public List<PrStdCtgResponse> getStandardCategoryMgmt() throws Exception {
        return prStdCtgMapper.getPrStdCtgListWithHierarchy();
    }

    @Override
    public PrStdCtgResponse getStandardCategoryMgmtInfo(PrStdCtgRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        return prStdCtgMapper.getStandardCategoryInfo(request);
    }

    @Override
    public int getStandardCategoryMgmtChildListCount(PrStdCtgRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        return prStdCtgMapper.getStandardCategoryMgmtChildListCount(request);
    }

    @Override
    public List<PrStdCtgResponse> getStandardCategoryMgmtChildList(PrStdCtgRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        return prStdCtgMapper.getStandardCategoryMgmtChildList(request);
    }

    @Override
    public int getStandardCategoryMgmtGoodsListCount(PrStdCtgRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        return prStdCtgMapper.getStandardCategoryMgmtGoodsListCount(request);
    }

    @Override
    public List<PrGoodsBaseResponse> getStandardCategoryMgmtGoodsList(PrStdCtgRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        return prStdCtgMapper.getStandardCategoryMgmtGoodsList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveStandardCategoryMgmtInfo(PrStdCtgRequest request) throws Exception {
        PrStdCtg prStdCtg = new PrStdCtg();
        BeanUtils.copyProperties(prStdCtg, request);
        // 수정자 정보 입력
        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        prStdCtg.setSysModId(currentUser.getLoginId());

        Validator.throwIfEmpty(prStdCtg.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        Validator.throwIfEmpty(prStdCtg.getStdCtgNm()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리명"}));
        Validator.throwIfEmpty(prStdCtg.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prStdCtg.getSortSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"정렬순서"}));
        Validator.throwIfEmpty(prStdCtg.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        Validator.throwIfLongerThan(prStdCtg.getStdCtgNm()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"표준카테고리명","200"}));
        Validator.throwIfLongerThan(prStdCtg.getSortSeq().toString()  ,5,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"정렬순서","5"}));
        prStdCtgTrxMapper.saveStandardCategoryMgmtInfo(prStdCtg);
    }


    @Override
    public boolean checkStandardCategoryDelete(PrStdCtgRequest request) throws Exception {
        Validator.throwIfEmpty(request.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
        boolean result = true;
        int childCategoryCount = prStdCtgMapper.getStandardCategoryMgmtChildListCount(request); //하위 표준 분류 유무
        int goodsCount = prStdCtgMapper.getStandardCategoryMgmtGoodsListCount(request); //등록된 상품 유무
        int displayCount = prStdCtgMapper.getStandardCategoryDisplayListCount(request); //할당된 전시 카테고리 유무

        if(childCategoryCount > 0 || goodsCount > 0 || displayCount > 0) {
            result = false;
        }
        return result;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void cudStandardCategory(List<PrStdCtg> createList, List<PrStdCtg> updateList, List<PrStdCtg> deleteList) throws Exception {
        for(PrStdCtg prStdCtg : createList){
            Validator.throwIfEmpty(prStdCtg.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
            Validator.throwIfEmpty(prStdCtg.getStdCtgNm()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리명"}));
            Validator.throwIfEmpty(prStdCtg.getLeafCtgYn()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"리프카테고리여부"}));
            Validator.throwIfEmpty(prStdCtg.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prStdCtg.getSortSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"정렬순서"}));
            Validator.throwIfEmpty(prStdCtg.getSysRegId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(prStdCtg.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            Validator.throwIfLongerThan(prStdCtg.getStdCtgNm()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"표준카테고리명","200"}));
            Validator.throwIfLongerThan(prStdCtg.getSortSeq().toString()  ,5,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"정렬순서","5"}));
            prStdCtgTrxMapper.insertStandardCategory(prStdCtg);
        }

        for(PrStdCtg prStdCtg : updateList){
            Validator.throwIfEmpty(prStdCtg.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
            Validator.throwIfEmpty(prStdCtg.getStdCtgNm()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리명"}));
            Validator.throwIfEmpty(prStdCtg.getLeafCtgYn()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"리프카테고리여부"}));
            Validator.throwIfEmpty(prStdCtg.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prStdCtg.getSortSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"정렬순서"}));
            Validator.throwIfEmpty(prStdCtg.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            Validator.throwIfLongerThan(prStdCtg.getStdCtgNm()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"표준카테고리명","200"}));
            Validator.throwIfLongerThan(prStdCtg.getSortSeq().toString()  ,5,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"정렬순서","5"}));
            prStdCtgTrxMapper.updateStandardCategoryGrid(prStdCtg);
        }

        for(PrStdCtg prStdCtg : deleteList){
            Validator.throwIfEmpty(prStdCtg.getStdCtgNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"표준카테고리번호"}));
            prStdCtgTrxMapper.deleteStandardCategory(prStdCtg);
        }
    }
}
