package com.enbiz.bo.app.service.goods;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.ReviewEvaluationItemMgmtRequest;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.dto.response.goods.ReviewEvaluationItemMgmtResponse;
import com.enbiz.bo.app.entity.PrEvltItemCd;
import com.enbiz.bo.app.entity.PrEvltValInfo;
import com.enbiz.bo.app.entity.PrStdCtgEvltItemInfo;
import com.enbiz.bo.app.repository.display.PrStdCtgMapper;
import com.enbiz.bo.app.repository.goods.*;

import lombok.RequiredArgsConstructor;

/**
 * 리뷰평가항목관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ReviewEvaluationItemMgmtServiceImpl implements ReviewEvaluationItemMgmtService{

    private final PrStdCtgMapper prStdCtgMapper;

    private final PrStdCtgEvltItemInfoMapper prStdCtgEvltItemInfoMapper;
    private final PrStdCtgEvltItemInfoTrxMapper prStdCtgEvltItemInfoTrxMapper;

    private final PrEvltItemCdMapper prEvltItemCdMapper;
    private final PrEvltItemCdTrxMapper prEvltItemCdTrxMapper;

    private final PrEvltValInfoMapper prEvltValInfoMapper;
    private final PrEvltValInfoTrxMapper prEvltValInfoTrxMapper;

    @Override
    public List<PrStdCtgResponse> getStandardCategoryList() throws Exception {
        return prStdCtgMapper.getPrStdCtgListWithHierarchy();
    }

    @Override
    public int getReviewEvaluationItemListCountByCategory(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prStdCtgEvltItemInfoMapper.getStdCtgEvltItemListCount(request);
    }

    @Override
    public List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemListByCategory(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prStdCtgEvltItemInfoMapper.getStdCtgEvltItemList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveReviewEvaluationItemListByCategory(List<PrStdCtgEvltItemInfo> createList, List<PrStdCtgEvltItemInfo> updateList, List<PrStdCtgEvltItemInfo> deleteList) throws Exception {
        createList.forEach(prStdCtgEvltItemInfoTrxMapper::insertPrStdCtgEvltItemInfo);
        updateList.forEach(prStdCtgEvltItemInfoTrxMapper::updatePrStdCtgEvltItemInfo);
        deleteList.forEach(prStdCtgEvltItemInfoTrxMapper::deletePrStdCtgEvltItemInfo);
    }

    @Override
    public int getReviewEvaluationItemListCountForAdd(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prEvltItemCdMapper.getEvltItemListCountForAdd(request);
    }

    @Override
    public List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemListForAdd(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prEvltItemCdMapper.getEvltItemListForAdd(request);
    }

    @Override
    public List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemValueList(String evltItemNo) throws Exception {
        return prEvltValInfoMapper.getEvltItemValueList(evltItemNo);
    }

    @Override
    public int getReviewEvaluationItemListCount(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prEvltItemCdMapper.getEvltItemListCount(request);
    }

    @Override
    public List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemList(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prEvltItemCdMapper.getEvltItemList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveReviewEvaluationItemList(List<PrEvltItemCd> createList, List<PrEvltItemCd> updateList) throws Exception {
        createList.forEach((item)->{
            // 평가항목명 중복여부 확인
            if(prEvltItemCdMapper.checkDuplicatedEvltItemNm(item)) {
                throw new IllegalArgumentException("reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.duplicatedEvltItmNmMsg");
            }
            prEvltItemCdTrxMapper.insertPrEvltItemCd(item);
        });

        updateList.forEach((item)->{
            // 평가항목명 중복 여부 확인
            if(prEvltItemCdMapper.checkDuplicatedEvltItemNm(item)) {
                throw new IllegalArgumentException("reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.duplicatedEvltItmNmMsg");
            }

            // 사용여부를 N으로 변경한 경우, 매핑된 카테고리 연결 해제
            if("N".equals(item.getUseYn()) && prStdCtgEvltItemInfoMapper.checkEvltItemMappingStdCtg(item.getEvltItemNo())){
                prStdCtgEvltItemInfoTrxMapper.deleteEvltItemMappingStdCtg(item.getEvltItemNo());
            }
            prEvltItemCdTrxMapper.updatePrEvltItemCd(item);
        });
    }

    @Override
    public List<ReviewEvaluationItemMgmtResponse> getMappedCategoryListToEvaluationItem(String evltItemNo) throws Exception {
        return prStdCtgEvltItemInfoMapper.getMappingStdCtgList(evltItemNo);
    }

    @Override
    public int getReviewEvaluationValueListCount(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prEvltValInfoMapper.getEvltValueListCount(request);
    }

    @Override
    public List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationValueList(ReviewEvaluationItemMgmtRequest request) throws Exception {
        return prEvltValInfoMapper.getEvltValueList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveReviewEvaluationValueList(List<PrEvltValInfo> createList, List<PrEvltValInfo> updateList, List<PrEvltValInfo> deleteList) throws Exception {
        createList.forEach(prEvltValInfoTrxMapper::insertPrEvltValInfo);
        updateList.forEach(prEvltValInfoTrxMapper::updatePrEvltValInfo);
        deleteList.forEach(prEvltValInfoTrxMapper::deletePrEvltValInfo);
    }

}
