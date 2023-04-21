var goodsApprovalMsg = x2coMessage.getMessage({
    noAprvReqDtForSearchMsg             : 'goodsApprovalMgmt.alert.msg.noAprvReqDtForSearchMsg'
    ,noSelectedGoodsForApprovalMsg       : 'goodsApprovalMgmt.alert.msg.noSelectedGoodsForApprovalMsg'
    ,invalidGoodsForApprovalMsg          : 'goodsApprovalMgmt.alert.msg.invalidGoodsForApprovalMsg'
    ,goodsApprovalConfirmMsg             : 'goodsApprovalMgmt.alert.msg.goodsApprovalConfirmMsg'
    ,noSelectedGoodsForReturnMsg         : 'goodsApprovalMgmt.alert.msg.noSelectedGoodsForReturnMsg'
    ,maxSelectableGoodsForReturnMsg      : 'goodsApprovalMgmt.alert.msg.maxSelectableGoodsForReturnMsg'
    ,invalidGoodsForReturnMsg            : 'goodsApprovalMgmt.alert.msg.invalidGoodsForReturnMsg'
});

$.namespace('goodsApprovalListGrid.eventhandler')
goodsApprovalListGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridSetting();
        this.calenderSetting();
        this.bindButtonEvent();
    }
    // 그리드 초기화
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

        this.grid.setEditOptions({ editable: false }); // 그리드 수정 불가능

    }
    // 캘린더 세팅
    ,calenderSetting : function () {
        if($('#aprvReqStartDt').val() === "") {
            var defaultDays = 7;
            var fromAndToCalDate = recentlyCalenderData(defaultDays);
            $('#aprvReqStartDt').val(fromAndToCalDate[0]);
            $('#aprvReqEndDt').val(fromAndToCalDate[1]);
        } else {
            this.search(0, false);
        }
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 캘린더
        $('#btn_call_calender').on( 'click', function () {
            that.callCalender();
        });

        // 담당MD 조회
        $('#btn_call_md_popup').on( 'click', function () {
            that.callMdPopup();
        });

        // 담당MD 초기화
        $('#btn_reset_md_popup').on( 'click', function () {
            $('#mdId').val('');
            $('#mdNm').val('');
        });

        // 협력사 조회
        $('#btn_call_entr_popup').on( 'click', function () {
            that.callEntrPopup();
        });

        // 협력사 초기화
        $('#btn_reset_entr_popup').on( 'click', function () {
            $('#entrNo').val('');
            $('#entrNm').val('');
        });

        // 초기화
        $('#btn_reset').on( 'click', function () {
            that.reset();
        });

        // 조회
        $('#btn_search').on( 'click', function () {
            that.search(0, true);
        });

        // 승인
        $('#btn_approval').on( 'click', function () {
            that.approval();
        });

        // 반려
        $('#btn_return').on( 'click', function () {
            that.callReturnPopup();
        });
    }
    // 초기화
    ,reset : function () {
        $('#goodsApprovalListGridForm')[0].reset();
        this.calenderSetting();
        $('#pregGoodsNoList').val('');
        $('#mdId').val('');
    }
    // 조회
    ,search : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        if ( !that.validation() ) return;

        this.setPregGoodsNoList();

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.search(pageNo); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    // 조회 필수값 확인 > 승인요청일자
    ,validation : function () {

        if( $('#aprvReqStartDt').val() === '' || $('#aprvReqEndDt').val() === '' ) {
            alert(goodsApprovalMsg.noAprvReqDtForSearchMsg);
            return false;
        }
        return true;
    }
    // 조회 형태 변경 > 임시상품번호 배열 형태로 변경( 구분자 : Enter )
    ,setPregGoodsNoList : function () {
        var pregGoodsNo = $('#pregGoodsNo').val();
        var pregGoodsNoList = ( pregGoodsNo === '' ) ? '' : pregGoodsNo.replace(/\n*$/g, '').split('\n');
        $('#pregGoodsNoList').val(pregGoodsNoList);
    }
    // 승인
    ,approval : function () {

        var that = this;
        var grid = this.grid;
        var provider = grid.getDataSource();
        var checkedRows = grid.getCheckedRows();

        // 선택된 행이 없는 경우
        if( checkedRows.length === 0 ){
            alert(goodsApprovalMsg.noSelectedGoodsForApprovalMsg);
            return;
        }

        // 승인상태가 '승인대기(20)'가 아닌 행이 있는 경우
        var isValid = true;
        var pregGoodsNoList = [];
        $.each( checkedRows, function ( index, value ) {
            var rowData = provider.getJsonRow( value );
            if ( rowData.pregStatCd === '20' ) {
                pregGoodsNoList.push(
                    rowData.pregGoodsNo + '/' + rowData.goodsCompCd
               );
                return true;
            }
            isValid = false;
            return false;
        });

        if ( !isValid ) {
            alert(goodsApprovalMsg.invalidGoodsForApprovalMsg);
            return;
        }

        // 승인 확인 메세지
        if (!confirm(goodsApprovalMsg.goodsApprovalConfirmMsg)) return;

        common.Ajax.sendRequest(
            "POST"
            , _baseUrl + "goods/GoodsApprovalMgmt.approveGoods.do"
            , { pregGoodsNoList : pregGoodsNoList }
            , function ( result ) {
                if(result.succeeded) that.search(0);
            }, true
        );
    }
    // 반려 팝업 호출
    ,callReturnPopup : function () {

        var that = this;
        var grid = this.grid;
        var provider = grid.getDataSource();

        var checkedRows = grid.getCheckedRows();

        // 선택된 행이 없는 경우
        if ( checkedRows.length === 0 ){
            alert(goodsApprovalMsg.noSelectedGoodsForReturnMsg);
            return;
        }

        // 1개 이상 선택한 경우
        if( checkedRows.length > 1 ) {
            alert(goodsApprovalMsg.maxSelectableGoodsForReturnMsg);
            return;
        }

        // 승인상태가 '승인대기(20)'가 아닌 경우
        var rowData = provider.getJsonRow( checkedRows[0] );
        if ( rowData.pregStatCd !== '20' ) {
            alert(goodsApprovalMsg.invalidGoodsForReturnMsg);
            return;
        }

        // 반려사유등록 팝업 호출
        var pin = { pregGoodsNo : rowData.pregGoodsNo }
        var POP_DATA = {
            url: _baseUrl + 'goods/GoodsApprovalMgmt.goodsApprovalReturnView.do'
            , winName: 'goodsReturnPopup'
            , title: '반려사유등록'
            , _title: '반려사유등록'
            , left: 20
            , top: 20
            , width: 500
            , height: 360
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {
            var returnData = JSON.parse(e.data);
            if ( returnData.succeeded ) {
                that.search(0, false);
            }
        });
    }
    ,callCalender : function () {
        showCalendar({
            type : 'A', // A : 시작,종료일선택, B : 해당 날짜 1개 선택
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#aprvReqStartDt').val(),
            yyyymmdd2 : $('#aprvReqEndDt').val(),
            fn:function(pin) {
                $('#aprvReqStartDt').val(pin.yyyymmdd1);
                $('#aprvReqEndDt').val(pin.yyyymmdd2);
            }
        });
    }
    ,callMdPopup : function () {
        var pin = {
            argSelectType: '1'      // 선택구분 ( 1 : 단건선택, N : 다건선택 )
            , argWorkStatCd: '01'   // 근무상태 ( 01 : 재직중, 02 : 퇴사 )
            , argUseYn: 'Y'         // 사용여부
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
            , winName: 'mdListPopup'
            , title: 'MD 조회 팝업'
            , _title: 'MD 조회 팝업'
            , left: 20
            , top: 20
            , width: 690
            , height: 600
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function(e) {
            var returnValue = JSON.parse(e.data);
            $('#mdId').val(returnValue[0].userId);
            $('#mdNm').val(returnValue[0].userNm);
        });
    }
    ,callEntrPopup : function () {
        var pin = {
            argSelectType   : '1' // 선택구분 ( 1 : 단건선택, N : 다건선택 )
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
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if( clickedCell.cellType === 'header' ) return;
            var _self = goodsApprovalListGrid.eventhandler;
            var rowData = _self.grid.getDataSource().getJsonRow(clickedCell.dataRow);

            // 임시상품, 상품명 더블클릭시 > 임시상품/묶음상품 상세 팝업 호출
            if( clickedCell.column === 'pregGoodsNo' || clickedCell.column === 'goodsNm' ) {

                var pin = {};
                var POP_DATA = {};

                if ( rowData.goodsCompCd === '10' ) {

                    pin = { pageType : 'C', pregGoodsNo : rowData.pregGoodsNo };
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


            } else if ( clickedCell.column === 'retnCausCdNm' ) { // 반려사유 더블클릭시 > 승인상태가 '반려(30)'인 경우 반려사유 레이어팝업 호출

                if( rowData.pregStatCd === '30') {
                    $('#retnDt').text(rowData.retnDt);      // 반려일자
                    $('#retnCaus').text(rowData.retnCaus);  // 반려사유
                    layerPopOpen('layerPop-retnCaus');
                }
            }
        }
    }
}