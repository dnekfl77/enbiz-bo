package com.enbiz.bo.app.service.goods;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.GoodsQATemplateMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQATemplateMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsQaAnsTmplInfo;
import com.enbiz.bo.app.repository.goods.PrGoodsQaAnsTmplInfoMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsQaAnsTmplInfoTrxMapper;

import java.util.List;

/**
 * 상품Q&A답변 템플릿관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GoodsQATemplateMgmtServiceImpl implements GoodsQATemplateMgmtService {

    private final PrGoodsQaAnsTmplInfoMapper prGoodsQaAnsTmplInfoMapper;
    private final PrGoodsQaAnsTmplInfoTrxMapper prGoodsQaAnsTmplInfoTrxMapper;

    @Override
    public int getGoodsQATemplateListCount(GoodsQATemplateMgmtRequest request) throws Exception {
        return prGoodsQaAnsTmplInfoMapper.getGoodsQAAnsTmplListCount(request);
    }

    @Override
    public List<GoodsQATemplateMgmtResponse> getGoodsQATemplateList(GoodsQATemplateMgmtRequest request) throws Exception {
        return prGoodsQaAnsTmplInfoMapper.getGoodsQAAnsTmplList(request);
    }

    @Override
    public PrGoodsQaAnsTmplInfo getGoodsQATemplateInfo(String ansTmplNo) throws Exception {
        return prGoodsQaAnsTmplInfoMapper.getGoodsQAAnsTmplInfo(ansTmplNo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveGoodsQATemplateList(List<PrGoodsQaAnsTmplInfo> createList, List<PrGoodsQaAnsTmplInfo> updateList, List<PrGoodsQaAnsTmplInfo> deleteList) throws Exception {
        createList.forEach(prGoodsQaAnsTmplInfoTrxMapper::insertPrGoodsQaAnsTmplInfo);
        updateList.forEach(prGoodsQaAnsTmplInfoTrxMapper::updatePrGoodsQaAnsTmplInfo);
        deleteList.forEach(prGoodsQaAnsTmplInfoTrxMapper::deletePrGoodsQaAnsTmplInfo);
    }
}
