$.namespace("mbrGrid.eventhandler");
mbrGrid.eventhandler = {
    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    }
    // 팝업 호출시 넘어오는 Argument 값 확인
    ,argCheck : function () {
        if ( (_gridType != '1' && _gridType != 'N')
            || (_argMbrStatCd != '' && _argMbrStatCd != '10' && _argMbrStatCd != '20' && _argMbrStatCd != '30')
        ) {
            alert(_msg.invalidAccessMsg);
            this.close();
        }
    }
    // 그리드 추가 옵션 설정
    ,gridLoading : function () {
        var that = this;

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

        // Enter 이벤트 처리
        $("#mbrGridForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_popup_list').click();
                window.event.returnValue = false;
            }
        });

        $('#afterNo').click(function () {
            $("#contactNo").val('');
        });

        $("#contactNo").keyup(function(e) {
            var that = this;

            var regexp = /^[0-9]*$/;

            if($("input:checkbox[name='afterNo']").is(":checked") == true) {
                if ($(that).val().length > 4) {
                    alert("5자 이상 입력되었습니다.");
                    $(that).val($(that).val().substring(0,4));
                    return false;
                }
            }
            if( !regexp.test($(that).val()) ) {
                alert("숫자만 입력하세요.");
            }
            $(that).val($(that).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
        });
    }
    // 검색 조건 초기화
    ,reset : function () {
        $('#mbrGridForm')[0].reset();
    }
    // 회원 목록 조회
    ,search : function (pageNo,isOpenToast) {
        this.grid.cancel();
        var that = this;

        if (that.searchValidation() == false ) {
            return;
        }

        if($("input:checkbox[name='afterNo']").is(":checked") == true) {
            $('#afterNoYn').val('Y');
        } else {
            $('#afterNoYn').val('N');
        }

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.search(pageNo); };
        this.controller.doQuery(that, '', pageNo, pageFunc,false,isOpenToast);
    }
    // 팝업 종료
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
                  loginId : row.loginId
                , mbrNo : row.mbrNo
                , mbrNm : row.mbrNm
                , mbrGbCd : row.mbrGbCd
                , mbrMgrCd : row.mbrMgrCd
                , mbrStatNm : row.mbrStatNm
                , mbrGradeCd : row.mbrGradeCd
                , mbrGradeNm : row.mbrGradeNm
                , emailAddr : row.emailAddr
                , telNo : row.telNo

                , cellNo : row.cellNo
                , telRgnNo : row.telRgnNo
                , telTxnoNo : row.telTxnoNo
                , telEndNo : row.telEndNo
                , cellSctNo : row.cellSctNo
                , cellTxnoNo : row.cellTxnoNo
                , cellEndNo : row.cellEndNo
                , emailAddr : row.emailAddr
                , zipNoSeq : row.zipNoSeq
                , zipNo : row.zipNo
                , zipAddr : row.zipAddr
                , dtlAddr : row.dtlAddr
            });
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
            mbrGrid.eventhandler.returnData(clickData.dataRow);
        }
    }
    , searchValidation : function () {
        var bSearchValidate = true;

        if ($('#loginId').val().length < 1 && $('#mbrNm').val().length < 1 && $('#contactNo').val().length < 1) {
            bSearchValidate = false;
        }

        if (bSearchValidate == false) {
            alert("회원아이디, 회원명, 연락처 중 1개는 필수 입력되어야 합니다. 입력 후 다시 조회 하세요.");
        }

        return bSearchValidate;
    }
};