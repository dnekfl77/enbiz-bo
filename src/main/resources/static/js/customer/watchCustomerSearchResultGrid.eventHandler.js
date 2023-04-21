$.namespace('watchCustomerSearchResultGrid.eventhandler');
watchCustomerSearchResultGrid.eventhandler = {
    validationBySearch : function () {
        var bValidationBySearch = true;

        if($('#condxSysRegDtmAll').prop('checked') == true) {
            if ( $('#condxLoginId').val().length <= 0 && $('#condxMbrNm').val().length <= 0 ) {
                alert('전체기간으로 조회시 회원ID, 회원이름 조회조건을 하나이상 입력하세요.');
                return false;
            }
        } else {
            //시작날짜와 종료날짜를 비교 common/validate.js
            if(isNotCompareDate($('#condxSysRegDtmStt').val(), $('#condxSysRegDtmEnd').val(), true)) {
                alert('시작일은 종료일 보다 클수 없습니다.');
                return false;
            }
        }

        return bValidationBySearch;
    }
    ,popupWatchCustomerRegister : function() {
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'popup/watchCustomerMgmt.watchCustomerSaveView.do'
            , winName: 'watchCustomerRegisterView'
            , title: '관심회원 등록 팝업'
            , _title: '관심회원 등록 팝업'
            , left: 20
            , top: 20
            , width: 500
            , height: 472
            , scrollbars: false
            , autoresize: false
         };
         popCommon(pin, POP_DATA);
    }
    ,popupWatchCustomerDetail : function(paramMbrNo) {
        if (typeof paramMbrNo === 'undefined' || paramMbrNo === null || paramMbrNo === '') {
            alert('요청정보를 다시 확인하세요.');
            return;
        }

        var pin = {
            mbrNo: paramMbrNo
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/watchCustomerMgmt.watchCustomerDetailPopup.do'
            , winName: 'watchCustomerDetailView'
            , title: '관심회원 상세정보 팝업'
            , _title: '관심회원 상세정보 팝업'
            , left: 20
            , top: 20
            , width: 900
            , height: 472
            , scrollbars: false
            , autoresize: false
         };

         popCommon(pin, POP_DATA);
    }
    // 그리드 추가 옵션 설정
    ,gridInitialize : function () {
        var _self = this;

        // 그리드 셀 수정 불가 설정
        _self.grid.setEditOptions({ editable : false });
    }
    // 검색 조건 초기화
    ,onReset : function () {
        $('#watchCustomerSearchGridForm')[0].reset();
    }
    // 회원 목록 조회
    ,onSearch : function (pageNo,isOpenToast) {
        this.grid.cancel();
        var _self = this;

        if (_self.validationBySearch() == false ) {
            return;
        }

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return _self.onSearch(pageNo); };
        this.controller.doQuery(_self, '', pageNo, pageFunc,false,isOpenToast);
    }
    // 달력초기화
    ,calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#condxSysRegDtmStt').val(initFromAndToCalDate[0]);
        $('#condxSysRegDtmEnd').val(initFromAndToCalDate[1]);
    }
    //관심고객 해제
    ,onUnlock : function() {
        var _self = this;
        var _grid = _self.grid;
        var result = false;

        var rows = _grid.getItemCount();
        var mgrMbrNoArr = [];

        for(var row=0; row < rows; row++) {
            if(_grid.isCheckedItem(row)){
                if (_grid.getValue(row, "rvcDtm") === undefined ||
                        _grid.getValue(row, "rvcDtm") === '' ||
                        _grid.getValue(row, "rvcDtm") === null ) {
                    mgrMbrNoArr.push(_grid.getValue(row, "mgrMbrNo"));
                    result = true;
                }
            }
        }

        console.log(mgrMbrNoArr);

        if(!result){
            alert(_msg.noSelectedDataMsg);
            return false;
        }

        if( confirm(_msg.confirmSaveMsg) ) {
            let parameter = {
                mgrMbrNoArray: mgrMbrNoArr
            };

            common.Ajax.sendJSONRequest(
                "PUT"
                ,_baseUrl + "customer/watchCustomerMgmt.unlockWatchCustomer.do"
                ,parameter
                ,function(obj) {
                    if (obj.succeeded == true) {
                    }else{
                    }
                }
                ,true
                ,null
                ,true
                
            );
        }
    }

    // 이벤트 바인딩
    ,bindButtonEvent : function () {
        var _self = this;

        // 초기화 버튼 클릭 이벤트 처리
        $('#btnInitialize').click(function () {
            _self.onReset();
        });

        // 조회 버튼 클릭 이벤트 처리
        $('#btnSearch').click(function () {
            _self.onSearch(0,true);
        });

        // Enter 이벤트 처리
        $('#customerSearchGridForm').keypress(function (e) {
            if (e.which == 13) {
                $('#btnSearch').click();
                window.event.returnValue = false;
            }
        });

        //달력
        $('#btnCalendar').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#condxSysRegDtmStt').val(),
                yyyymmdd2:$('#condxSysRegDtmEnd').val(),
                //max_term:30,
                fn:function(pin) {
                    $('#condxSysRegDtmStt').val(pin.yyyymmdd1);
                    $('#condxSysRegDtmEnd').val(pin.yyyymmdd2);
                }
            });
        });

        // 관심고객등록
        $('#btnWatchCustomerRegister').click(function () {
            _self.popupWatchCustomerRegister();
        });

        // 관심고객해제
        $('#btnWatchCustomerRemove').click(function () {
            _self.onUnlock();
        });

        //관심구분
        $('#condxMgrGbCd').on('change', function () {
            var _mgrGbCd = $(this).val();

            if (_mgrGbCd.length <= 0) {
                alert('대상코드가 존재하지 않습니다.');
                $('#condxMgrTypCd').empty().append($('<option/>').val('').text(':: 선택 ::'));
                $('#condxMgrTypCd').val('').trigger('change');
                return false;
            }
            var paramObj = {
                code: 'ME009'
                ,referCode: _mgrGbCd
            }
            var callbackOptionRedraw = function(e) {
                $('#condxMgrTypCd').empty().append($('<option/>').val('').text(':: 선택 ::'));
                $('#condxMgrTypCd').val('').trigger('change');

                var optionArr = e.data.ME009;
                if(!Array.isArray(optionArr)) return;

                optionArr.forEach(function (el, index) {
                    $('#condxMgrTypCd').append(
                        $('<option/>').val(el.cd).text(el.cdNm)
                    );
                });
            }

            common.Ajax.sendJSONRequest("GET"
                , _baseUrl + "common/getForwardCdCdNmFromStStdCdByGrpCdRef1Val.do"
                , paramObj
                , callbackOptionRedraw
                , false
                ,"application/json;charset=UTF-8"
            );
        });

    }
    // 초기화
    ,initialize : function () {
        this.gridInitialize();
        this.calendarInit();
        this.bindButtonEvent();
    }
    // Grid 이벤트 처리
    ,gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        }
        ,onCellDblClicked : function(grid, clickData) {
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='mbrNo'|| clickData.column==='mbrNm'){
                watchCustomerSearchResultGrid.eventhandler.popupWatchCustomerDetail(currentData.mbrNo);
            }
        }
        //그리드 셀 체크시 색상 변경 기능 설정
        ,onItemChecked : function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        }
        ,setRowStyleCallback : function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        }
    }
};