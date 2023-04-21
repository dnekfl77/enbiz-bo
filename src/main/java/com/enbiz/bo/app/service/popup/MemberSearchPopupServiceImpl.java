package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.MemberSearchRequest;
import com.enbiz.bo.app.dto.response.popup.MemberSearchResponse;
import com.enbiz.bo.app.repository.customer.EtMbrBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 회원 조회 팝업
 * munu , 화면 , Request , 버튼
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class MemberSearchPopupServiceImpl implements MemberSearchPopupService {

    private final EtMbrBaseMapper etMbrBaseMapper;

    @Override
    public int getMemberListCount(MemberSearchRequest memberSearchRequest) throws Exception {
        return etMbrBaseMapper.getMemberListCount(memberSearchRequest);
    }

    @Override
    public List<MemberSearchResponse> getMemberList(MemberSearchRequest memberSearchRequest) throws Exception {
        return etMbrBaseMapper.getMemberList(memberSearchRequest);
    }
}
