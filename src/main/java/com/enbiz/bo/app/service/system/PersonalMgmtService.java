package com.enbiz.bo.app.service.system;

import com.enbiz.bo.app.dto.request.login.LoginRequest;

//import com.commerce.entity.common.StBmMenuInfo;
//import com.commerce.entity.common.StBmMenuInfoEx;
//import com.commerce.entity.system.EtUsrBaseEx;

public interface PersonalMgmtService {

    /**
     * 즐겨찾기 count 조회
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    public int getBookmarkListCount(StBmMenuInfo stBmMenuInfo) throws Exception;

    /**
     * 즐겨찾기 리스트 조회
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    public List<StBmMenuInfoEx> getBookmarkList(StBmMenuInfo stBmMenuInfo) throws Exception;

    /**
     * 즐겨찾기 리스트 저장 CUD
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    public void saveBookmarkList(List<StBmMenuInfo> createList, List<StBmMenuInfo> updateList,
//            List<StBmMenuInfo> deleteList) throws Exception;

    /**
     * 즐겨찾기 리스트 저장 CUD - 삭제 delete
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    public void deleteBookmarkList(List<StBmMenuInfo> deleteList) throws Exception;

    /**
     * 즐겨찾기 리스트 저장 CUD - 수정 update
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    public void updateBookmarkList(List<StBmMenuInfo> updateList) throws Exception;

    /**
     * 패스워드변경 페이지 저장
     *
     * @param etUsrBase
     * @return
     * @throws Exception
     */
    void saveChangePassword(LoginRequest loginRequest) throws Exception;
}