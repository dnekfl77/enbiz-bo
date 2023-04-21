var goodsTempSaveMsg = x2coMessage.getMessage({
    noRequiredSearchOptionMsg      : 'goodsTemporarySaveMgmt.alert.msg.noRequiredSearchOptionMsg'
    ,noSelectesdGoodsForRemoveMsg  : 'goodsTemporarySaveMgmt.alert.msg.noSelectesdGoodsForRemoveMsg'
    ,noSelectesdGoodsForRequestMsg : 'goodsTemporarySaveMgmt.alert.msg.noSelectesdGoodsForRequestMsg'
    ,unDeletableGoodsMsg           : 'goodsTemporarySaveMgmt.alert.msg.unDeletableGoodsMsg'
    ,unApprovalGoodsMsg            : 'goodsTemporarySaveMgmt.alert.msg.unApprovalGoodsMsg'
    ,confirmDeleteMsg              : 'adminCommon.grid.alert.delete'
    ,confirmApprovalMsg            : 'goodsTemporarySaveMgmt.alert.msg.confirmApprovalMsg'
});

$.namespace('goodsTemporarySaveListGrid.eventhandler')
goodsTemporarySaveListGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridSetting();
        this.setCalendar(7);
        this.bindButtonEvent();
    }
    // 그리드 세팅
    ,gridSetting : function () {

        // 그리드 수정 불가 설정
        this.grid.setEditOptions({ editable: false });

        //그리드 셀 체크시 색상 변경 기능 추가
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });

        // 그리드 수정불가
        this.grid.setEditOptions({ editable: false })
    }
    // 이벤트 처리
    ,bindButtonEvent : function () {

        var that = this;

        // 캘린더 선택
        $('#btn_call_calender').click(function () {
            showCalendar({
                type : 'A',     // A:시작,종료일선택, B:해당 날짜 1개 선택
                format : 'yyyy-MM-dd',
                yyyymmdd1 : $('#goodsRegStartDtm').val(),
                yyyymmdd2 : $('#goodsRegEndDtm').val(),
                fn:function(pin) {
                    $('#goodsRegStartDtm').val(pin.yyyymmdd1);
                    $('#goodsRegEndDtm').val(pin.yyyymmdd2);
                }
            });
        });

        // 협력사조회 팝업버튼 클릭
        $('#btn_call_entr_popup').click(function () {
            var pin = {
                argSelectType   : '1'
            };
            var POP_DATA = {
                url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
                , winName: 'etEntrListPopup'
                , title: '협력사조회'
                , _title: '협력사조회'
                , left: 20
                , top: 20
                , width: 1000
                , height: 700
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, function (e) {
                var returnValue = JSON.parse(e.data);
                $('#entrNo').val(returnValue[0].entrNo);
                $('#entrNm').val(returnValue[0].entrNm);
            });
        });

        // 팝업 검색결과 지우기 버튼 클릭
        $('#btn_reset_entr_popup').click(function () {
            $('#entrNo').val('');
            $('#entrNm').val('');
        });

        // 초기화 버튼 클릭
        $('#btn_init').click(function () {
            that.reset();
        });

        // 조회 버튼 클릭
        $('#btn_search').click(function () {

            // 필수 입력값 체크
            if($('#goodsRegStartDtm').val() === '' || $('#goodsRegEndDtm').val() === ''){
                alert(goodsTempSaveMsg.noRequiredSearchOptionMsg);
                return;
            }
            that.search(0, true);
        });

        // 삭제 버튼 클릭
        $('#btn_remove').click(function () {
            that.remove();
        });

        // 승인요청 버튼 클릭
        $('#btn_request_approval').click(function () {
            that.requestApproval();
        });

        // 반려사유 레이어팝업 닫기버튼 클릭
        $('#btn_retnCaus_layerPop_close').click(function () {
            $('.layer-popup .box .btn-close').click();
        });

    }
    // 캘린더 세팅
    ,setCalendar : function ( days ) {
        var fromAndToCalDate = recentlyCalenderData(days);
        $('#goodsRegStartDtm').val(fromAndToCalDate[0]);
        $('#goodsRegEndDtm').val(fromAndToCalDate[1]);
    }
    // 초기화
    ,reset : function () {
        $('#goodsTemporarySaveListGridForm')[0].reset();
        this.setCalendar(7);
    }
    // 조회
    ,search : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.search(pageNo, false); };
        this.controller.doQuery(that, extraQueryString, pageNo, pageFunc, null, isOpenToast);
    }
    // 삭제
    ,remove : function () {

        var that = this;
        var grid = this.grid;
        var provider = this.grid.getDataSource();

        var checkedRows = grid.getCheckedRows();
        var deletePregGoodsNoList = [];
        var unDeleteRowList = [];

        // 선택된 행이 없을경우
        if(checkedRows.length === 0){
            alert(goodsTempSaveMsg.noSelectesdGoodsForRemoveMsg);
            return;
        }

        // 승인 상태 확인
        checkedRows.forEach( function (rowNum) {
            var rowData = provider.getJsonRow(rowNum);

            // 삭제 가능조건 ( 10 : 임시저장, 30 : 반려 )
            if(rowData.pregStatCd === '10' || rowData.pregStatCd === '30' ){
                deletePregGoodsNoList.push(
                    rowData.pregGoodsNo + '/' + rowData.goodsCompCd);
            }else{
                unDeleteRowList.push(rowNum);
            }
        });

        // 삭제 불가 행이 있는 경우
        if(unDeleteRowList.length > 0){
            grid.checkRows(unDeleteRowList, false); //체크 해제
            alert(goodsTempSaveMsg.unDeletableGoodsMsg);
            return;
        }

        // 삭제 확인 메세지
        if (!confirm(goodsTempSaveMsg.confirmDeleteMsg)) return;

        common.Ajax.sendRequest("POST"
            , _baseUrl + "goods/GoodsTemporarySaveMgmt.deleteTemporarySaveGoods.do"
            , { pregGoodsNoArray : deletePregGoodsNoList }
            , function ( result ) {
                if(result.succeeded){
                    that.search(0, false);
                }
            }
            , true
        );
    }
    // 승인요청
    ,requestApproval : function () {

        var that = this;
        var grid = this.grid;
        var provider = this.grid.getDataSource();

        var checkedRows = grid.getCheckedRows();
        var disApprovalRowList = [];
        var approvalPregGoodsNoList = [];

        // 선택된 행이 없을경우
        if(checkedRows.length === 0){
            alert(goodsTempSaveMsg.noSelectesdGoodsForRequestMsg);
            return;
        }

        // 승인 상태 확인
        checkedRows.forEach( function (rowNum) {
            var rowData = provider.getJsonRow(rowNum);

            // 승인요청 가능조건 ( 10 : 임시저장)
            if(rowData.pregStatCd === '10'){
                approvalPregGoodsNoList.push(rowData.pregGoodsNo);
            }else{
                disApprovalRowList.push(rowNum);
            }
        });

        // 승인요청 불가 행이 있는 경우
        if(disApprovalRowList.length > 0){
            grid.checkRows(disApprovalRowList, false); //체크 해제
            alert(goodsTempSaveMsg.unApprovalGoodsMsg);
            return;
        }

        // 승인요청 확인 메세지
        if (!confirm(goodsTempSaveMsg.confirmApprovalMsg)) return;

        common.Ajax.sendRequest("POST"
            , _baseUrl + "goods/GoodsTemporarySaveMgmt.requestTemporarySaveGoodsApproval.do"
            , { pregGoodsNoArray : approvalPregGoodsNoList }
            , function ( result ) {
                if(result.succeeded){
                    that.search(0, false);
                }
            }
            ,true
        );
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if(clickedCell.cellType == 'header') return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);

            // 임시상품,묶음상품 상세 팝업 호출
            if( clickedCell.column === 'pregGoodsNo' || clickedCell.column==='goodsNm' ) {

                var pin = {};
                var POP_DATA = {};

                if ( rowData.goodsCompCd === '10' ) {
                    pin = { pageType   : 'C', pregGoodsNo : rowData.pregGoodsNo };
                    POP_DATA = {
                        url: _baseUrl + 'goods/TemporaryGeneralGoods.temporaryGeneralGoodsView.do'
                        , winName: 'tempGelGoodsDetail'
                        , title: '임시상품상세'
                        , _title: '임시상품상세'
                        , left: 20
                        , top: 20
                        , width: 1500
                        , height: 700
                        , scrollbars: false
                        , autoresize: false
                    };

                } else if ( rowData.goodsCompCd === '20' ) {
                    pin = { pageType : 'U', pregGoodsNo : rowData.pregGoodsNo };
                    POP_DATA = {
                        url: _baseUrl + 'goods/TemporaryPackageGoods.temporaryPackageGoodsView.do'
                        , winName: 'tempPkgGoodsDetailPopup'
                        , title: '임시묶음상품상세'
                        , _title: '임시묶음상품상세'
                        , left: 20
                        , top: 20
                        , width: 1500
                        , height: 700
                        , scrollbars: false
                        , autoresize: false
                    };
                }

                popCommon(pin, POP_DATA, function (e) { });

            } else if ( clickedCell.column === 'retnCausCdNm' ) {

                // 승인상태가 '반려(30)'인 경우 반려사유 레이어팝업 호출
                if( rowData.pregStatCd === '30') {
                    $('#retnDt').text(rowData.retnDt);      // 반려일자
                    $('#retnCaus').text(rowData.retnCaus);  // 반려사유
                    layerPopOpen('layerPop-retnCaus');
                }
            }
        }
    }
}