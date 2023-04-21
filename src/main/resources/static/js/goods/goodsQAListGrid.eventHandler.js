var goodsQAListGridMsg = x2coMessage.getMessage({
    noSelectedQAMsg : 'goodsQAMgmt.alert.msg.noSelectedQAMsg'
    ,succeedQADispStatChangeMsg : 'goodsQAMgmt.alert.msg.succeedQADispStatChangeMsg'
});

$.namespace('goodsQAListGrid.eventhandler');
goodsQAListGrid.eventhandler = {
    init : function () {
        this.calenderSetting();
        this.bindButtonEvent();
        this.gridSetting();
    }
    ,gridSetting : function () {

        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });

        this.grid.editOptions.editable = false;

        // 전시상태가 '전시불가'인 경우 체크박스 비활성화
        this.grid.setCheckableExpression("values['questDispStatCd'] <> '30'", true);

        // MD권한자가 아닌경우 전시상태 변경 불가
        if ( _userType !== 'MD' ) {
            $('#btn_display, #btn_hide').unbind('click');
            $('#btn_display, #btn_hide').addClass('disabled');
        }
    }
    ,calenderSetting : function () {
        var fromAndToCalDate = recentlyCalenderData(7);
        $('#questStartDtm').val(fromAndToCalDate[0]);
        $('#questEndDtm').val(fromAndToCalDate[1]);
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on('click', function () {
            that.callCalender();
        });

        $('#btn_call_entr_popup').on('click', function () {
            that.callEntrPopup();
        });

        $('#btn_reset_entr_popup').on('click', function () {
            $('#entrNo, #entrNm').val('');
        });

        $('#btn_call_stdCtg_popup').on('click', function () {
            that.callStdCtgPopup();
        });

        $('#btn_reset_stdCtg_popup').on('click', function () {
            $('#stdCtgHierarchy, #stdCtgNo').val('');
        });

        $('#btn_call_md_popup').on('click', function () {
            that.callMdPopup();
        });

        $('#btn_reset_md_popup').on('click', function () {
            $('#mdId').val('');
        });

        $('#btn_reset').on('click', function () {
            that.onReset();
        });

        $('#btn_search').on('click', function () {
            that.onSearch(0, true);
        });

        $('#btn_display').on('click', function () { // 20 : 전시처리
            that.changeQADisplayState('20');
        });

        $('#btn_hide').on('click', function () { // 10 : 전시안함
            that.changeQADisplayState('10');
        });

        com.x2commerce.common.Util.setupEnterSearch('goodsQAListForm', 'btn_search');

    }
    ,onReset : function () {
        $('#goodsQAListForm')[0].reset();
        $('#goodsQAListForm').children().find('input[type=hidden]').val('');
        this.calenderSetting();
    }
    ,onSearch : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        this.setGoodsNoList();

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.onSearch(pageNo,false); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    ,setGoodsNoList : function () {
        var goodsNo = $('#goodsNo').val().trim();
        var goodsNoList = ( goodsNo === '' ) ? '' : goodsNo.replace(/\n*$/g, '').split('\n');
        $('#goodsNoList').val(goodsNoList);
    }
    ,changeQADisplayState : function ( questDispStatCd ) {

        var that = this;
        var grid = this.grid;
        var provider = grid.getDataSource();

        var checkedItems = grid.getCheckedRows();
        if ( !checkedItems.length ) {
            alert(goodsQAListGridMsg.noSelectedQAMsg);
            return;
        }

        var questNoList = [], questDispStatCdList = [];
        checkedItems.forEach( function ( item ) {
            var data = provider.getJsonRow( item );
            questNoList.push(data.questNo);
            questDispStatCdList.push(data.questDispStatCd);
        });

        if ( questDispStatCdList.includes(questDispStatCd) ){
            alert('선택된 상품Q&A 중 전시상태가 이미 \n[' + _questDispStatCdList[questDispStatCd] + '] 상태인 Q&A가 있습니다.\n다시 선택해주세요.');
            return;
        }

        if ( !confirm('선택된 상품Q&A의 전시상태를 [' + _questDispStatCdList[questDispStatCd] + '] 상태로 변경하시겠습니까?') ) return;

        var param = {};
        param.questNoList = questNoList;
        param.questDispStatCd = questDispStatCd;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/GoodsQAMgmt.modifyMultipleQADisplayState.do"
            , param
            , function ( data ) {
                if( data.succeeded ){
                    that.onSearch(0,false);
                }
            }, null, null, true
        );
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if( clickedCell.cellType === 'header' ) return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if ( clickedCell.column === 'goodsNo' ) {
                var pin = { type: 'R', goodsNo: rowData.goodsNo };
                var POP_DATA = {
                    url: _baseUrl + 'goods/GoodsCommon.goodsView.do'
                    , winName: 'goodsQADetailView'
                    , title: '상품상세'
                    , _title: '상품상세'
                    , left: 20
                    , top: 20
                    , width: 1500
                    , height: 700
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA,function(e){});

            } else if ( clickedCell.column === 'goodsNm') {
                // FO 상품 상세 페이지 호출
                alert('서비스 준비중입니다.');

            }else if ( clickedCell.column === 'questCont' ) {

                // 고객센터 사용자의 경우, 이관된 이력이 있는 경우에만 상세 진입 가능
                if ( _userType === 'CC' && rowData.mvotYn === 'Y' ) return;

                var pin = { questNo: rowData.questNo };
                var POP_DATA = {
                    url: _baseUrl + 'goods/GoodsQAMgmt.goodsQADetailView.do'
                    , winName: 'goodsQADetailPopup'
                    , title: '상품Q&A상세'
                    , _title: '상품Q&A상세'
                    , left: 20
                    , top: 20
                    , width: 1200
                    , height: 660
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA,function(e){});
            }
        }
        ,afterQuerySuccess : function (grid, data) {

            $('#questDtmPeriod_1 ,#questDtmPeriod_3 ,#questDtmPeriod_30').text('0'); // 건수 초기화
            if (!data.payloads.length) return; //조회된 데이터가 없는경우

            var questNoList = [];
            data.payloads.forEach(function(quest){
                questNoList.push(quest.questNo);
            });

            var param = {};
            param.questNoList = questNoList;
            common.Ajax.sendRequest(
                "POST"
                , _baseUrl + "goods/GoodsQAMgmt.getUnProcessedGoodsQA.do"
                , param
                , function ( result ) {
                    result.forEach(function(d){
                        $('#' + d.questDtmPeriod).text(d.questCnt);
                    })
                }
                ,false
            );
        }
    }
    ,callCalender : function () {
        showCalendar({
            type : 'A',
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#questStartDtm').val(),
            yyyymmdd2 : $('#questEndDtm').val(),
            fn:function(pin) {
                $('#questStartDtm').val(pin.yyyymmdd1);
                $('#questEndDtm').val(pin.yyyymmdd2);
            }
        });
    }
    ,callEntrPopup : function () {
        var pin = {
            argSelectType: '1'      // 선택구분   ( 단건선택 : 1, 다건선택 : N )
            , argEntrGbCd: ''       // 협력사구분  ( 상품공급업자 : 10, 제휴사업자 : 20 )
            , argTrdStatCd: '20'    // 거래상태   ( 거래대기 : 10, 거래중 : 20, 거래종료 : 30 )
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
            , winName: 'etEntrListPopup'
            , title: '협력사조회'
            , _title: '협력사조회'
            , left: 10
            , top: 10
            , width: 741
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function ( e ) {
            var returnValue = JSON.parse(e.data);
            $('#entrNo').val(returnValue[0].entrNo);
            $('#entrNm').val(returnValue[0].entrNm);
        });
    }
    ,callStdCtgPopup : function () {

        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'popup/standardCategory.prStdCtgListPopup.do'
            , winName: 'prStdCtgListPopup'
            , title: '상품표준분류조회'
            , _title: '상품표준분류조회'
            , left: 20
            , top: 20
            , width: 400
            , height: 500
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function ( e ) {
            var returnValue = JSON.parse(e.data);
            $('#stdCtgNo').val(returnValue.stdCtgNo);
            $('#stdCtgHierarchy').val(returnValue.hierarchyText);
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
            , title: 'MD조회'
            , _title: 'MD조회'
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
        });
    }
}