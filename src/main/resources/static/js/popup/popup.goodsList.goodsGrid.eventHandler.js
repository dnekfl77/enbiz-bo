$.namespace('goodsGrid.eventhandler');
goodsGrid.eventhandler = {

    // 초기화
    init : function () {
        this.argCheck();
        this.setCalendar(7); // default : 최근 일주일
        this.gridLoading();
        this.bindButtonEvent();
    }
    // 팝업 호출시 넘어오는 Argument 값 확인
    ,argCheck : function () {
        if (_gridType != '1' && _gridType != 'N') {
            alert(_msg.invalidAccessMsg);
            this.close();
        }
    }
    // 그리드 추가 옵션 설정
    ,gridLoading : function () {

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false });

        //그리드 셀 체크시 색상 변경 기능 설정
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        });
    }
    // 이벤트 바인딩
    ,bindButtonEvent : function () {

        var that = this;

        // 달력 선택
        $('#calenderBtn').click(function() {
            showCalendar({
                type : 'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format : 'yyyy-MM-dd',
                yyyymmdd1 : $('#goodsRegStartDtm').val(),
                yyyymmdd2 : $('#goodsRegEndDtm').val(),
                //max_term:30,
                fn:function(pin) {
                    $('#goodsRegStartDtm').val(pin.yyyymmdd1);
                    $('#goodsRegEndDtm').val(pin.yyyymmdd2);
                }
            });
        });

        // 기간 선택
        $('#calendarTerm').change(function(){
            that.setCalendar($(this).val());
        });

        // 담담MD 조회 버튼 클릭
        $('#btn_call_md_popup').click(function() {
            var pin = {
                argSelectType   : '1'    //  결과값 갯수
                , argWorkStatCd : '01'   //  근무상태 ( 01 : 재직중, 02 : 퇴사 )
                , argUseYn      : 'Y'    //  사용여부
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
            popCommon(pin, POP_DATA, function(e){
                var returnValue = JSON.parse(e.data);
                $('#mdId').val(returnValue[0].userId)
                $('#mdNm').val(returnValue[0].userNm);
            });

        });

        // 협력사 조회 버튼 클릭
        $('#btn_call_entr_popup').click(function() {
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
            popCommon(pin, POP_DATA, function(e){
                var returnValue = JSON.parse(e.data);
                $('#entrNo').val(returnValue[0].entrNo);
                $('#ertrNm').val(returnValue[0].entrNm);
            });
        });

        // 브랜드 조회 버튼 클릭
        $('#btn_call_brand_popup').click(function() {
            var pin = {
                argSelectType: '1'
            };
            var POP_DATA = {
                url: _baseUrl + 'popup/brandMgmt.brandListPopup.do'
                , winName: 'brandListPopup'
                , title: '브랜드조회'
                , _title: '브랜드조회'
                , left: 20
                , top: 20
                , width: 790
                , height: 590
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, function(e){
                var returnValue = JSON.parse(e.data);
                $('#brandNo').val(returnValue[0].brandNo);
                $('#brandNm').val(returnValue[0].brandNm);
            });
        });

        // 표준분류 조회 버튼 클릭
        $('#btn_call_stdCtg_popup').click(function() {
            var pin = {};
            var POP_DATA = {
                url: _baseUrl + 'popup/standardCategory.prStdCtgListPopup.do'
                , winName: 'prStdCtgListPopup'
                , title: '상품표준분류팝업'
                , _title: '상품표준분류팝업'
                , left: 20
                , top: 20
                , width: 400
                , height: 500
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, function(e){
                var returnValue = JSON.parse(e.data);
                $('#stdCtgNo').val(returnValue.stdCtgNo);
                $('#stdCtgNm').val(returnValue.stdCtgNm);
            });
        });

        // 팝업 검색 결과 지우기 버튼 클릭
        $('.btn_reset_popup').click(function (){
            var inputId = $(this).attr('resetInputId');
            var dataId = $(this).attr('resetDataId');
            $('#' + inputId).val('');
            $('#' + dataId).val('');
        });

        // 검색 조건 변경시
        $('#searchOption').change(function (e) {
            that.resetSearchOption($(this).val());
        });

        // 검색어 입력값 체크
        $("#searchWord").on("propertychange change keyup paste input", function() {
            if( $('#searchOption').val() === 'goodsNm') return;
            var currentVal = $(this).val();
            $(this).val(onlyInputNumber(currentVal));
        });

        // 초기화 버튼 클릭 이벤트 처리
        $('#btn_popup_init').click(function () {
            that.reset();
        });

        // 조회 버튼 클릭 이벤트 처리
        $('#btn_popup_list').click(function () {
            that.search(0,true);
        });

        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_close').click(function () {
            that.close();
        });

        // 적용 버튼 클릭 이벤트 처리
        $('#btn_popup_apply').click(function () {
            that.onApply();
        });
    }
    // 상품등록일자 세팅
    ,setCalendar : function ( term ) {
        var fromAndToCalDate = recentlyCalenderData(term);
        $('#calendarTerm').val(term);
        $('#goodsRegStartDtm').val(fromAndToCalDate[0]);
        $('#goodsRegEndDtm').val(fromAndToCalDate[1]);
    }
    // 검색조건 초기화
    ,resetSearchOption : function ( optionValue ) {

        // 상품명 maxlength ( 400 )
        // 상품번호 maxlength ( 15 )
        var maxlength = ( optionValue === 'goodsNm' ) ? 400 : 15;
        $('#searchOption').val( optionValue );
        $('#searchWord').attr( 'maxlength', maxlength ).val('');
    }
    // 초기화
    ,reset : function () {

        var that = this;

        // 검색 조건 초기화
        $('#goodsGridForm')[0].reset();
        $('#goodsGridForm').find('input[type=hidden]').val('');
        that.resetSearchOption('goodsNm');

        // 상품등록일자 초기화
        that.setCalendar(7);

    }
    // 조회
    ,search : function (pageNo,isOpenToast) {

        var that = this;
        var extraQueryString = '';
        var saleStatCd = "";

        // 검색 조건 최소 글자수 이상 입력한 경우에만 세팅
        // goodsNm, goodsNo 값이 세팅된 경우, 다른 검색조건 무시
        $('#goodsNm').val('');
        $('#goodsNo').val('');

        var searchOption = $('#searchOption').val();
        var searchWord = $('#searchWord').val();

        var minLength = ( searchOption === 'goodsNm' )? 3 : 5;
        var isValidSearchWord = (searchWord.length >= minLength)? true : false;

        if(isValidSearchWord) {
            $('#' + searchOption).val(searchWord);
        } else {
            // 입력 필수값 확인
            var startDate = $('#goodsRegStartDtm').val();
            var endDate = $('#goodsRegEndDtm').val();

            if(startDate === '' || endDate === '') {
                alert(col.valid_msg);
                return;
            }
        }

        // 판매상태 조회 조건 셋팅
        if($('#saleStatCd').val() == '') { // 전체 조회인 경우
            $('#saleStatCd > option').each(function(){
                var inx = $(this).index();
                if(inx == 0) {
                    saleStatCd = "";
                } else if(inx == 1) {
                    saleStatCd += "'" +  $(this).val() + "'";
                } else {
                    saleStatCd += ",'" + $(this).val() + "'";
                }
            });
        } else {
            saleStatCd += "'" +  $('#saleStatCd').val() + "'";
        }

        extraQueryString = '&saleStatCdList=' + saleStatCd;

        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.search(pageNo); };
        this.controller.doQuery(that, extraQueryString, pageNo, pageFunc,false,isOpenToast);
    }
    // 닫기
    ,close : function () {
        window.close();
    }
    // 적용
    ,onApply : function () {

        if ( _gridType === '1' ) {
            var rowIndex = this.grid.getCurrent().dataRow;
            if ( rowIndex === -1 ) {
                alert(_msg.noSelectedDataMsg);
                return;
            }
            this.returnData( rowIndex );

        } else {
            var rowIndexList = this.grid.getCheckedRows();
            if ( !rowIndexList.length ) {
                alert(_msg.noSelectedDataMsg);
                return;
            }
            this.returnData(rowIndexList);
        }
    }
    ,returnData : function ( data ) {

        var grid = this.grid;
        var provider = grid.getDataSource();

        var returnData = [];
        var putReturnData = function ( dataRow ) {
            var row = provider.getJsonRow( dataRow );
            returnData.push({
                  goodsNo : row.goodsNo
                , goodsNm : row.goodsNm
                , saleStatCd : row.saleStatCd
                , saleStatCdNm : row.saleStatCdNm });
        }

        if ( $.isArray(data) ) {
            data.forEach(i => putReturnData(i));
        } else {
            putReturnData(data);
        }

        window.postMessage(JSON.stringify(returnData), _baseUrl);
        window.close();
    }
    // Grid 이벤트 처리
    ,gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
		,onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            goodsGrid.eventhandler.returnData(clickData.dataRow);
        }
    }
}