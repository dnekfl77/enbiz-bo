$.namespace("marketingDisplayGrid.eventhandler");
marketingDisplayGrid.eventhandler = {
    // 초기화
    init : function () {
        this.valueInit();
        this.gridLoading();
        this.bindButtonEvent();
    },

    valueInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
        $('input:radio[name=dispYn]:input[value=Y]').attr("checked",true); // 전시여부
    },

    gridLoading : function(){
        var self = this;

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        // 기획전 번호, 기획전명 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column ==='mkdpNo' || clickData.column ==='mkdpNm'){
                    self.onAdd("U", currentData.mkdpNo);
                }
            }
        }

        this.grid.setCellStyleCallback(function(grid, dataCell) {
            var ret = {};
            var value = dataProvider.getValue(dataCell.index.dataRow, "dispStat");

            if(value == "30"){
                ret.editable = false;
            }
            return ret;
        });

        this.grid.editOptions.commitLevel = "error";
        this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
            var error = {};
            if(column.fieldName === 'dispSeq'){
                if (value === null || value === '') {
                    error.level = "error";
                    error.message = "전시순서는 " + msg.necessaryCheckMessage;
                } else if (value == "0") {
                    error.level = "error";
                    error.message = msg.checkDispSeq;
                }
            }
            return error;
        }

//        this.grid.onValidateRow = function(grid, itemIndex, dataRow, inserting, values) {
//            var error = {};
//            var rowState = grid.getDataSource().getRowState(dataRow);
//            if (rowState !== "deleted" && rowState !== "createAndDeleted" ) {
//                if (values.dispSeq !== null && values.dispSeq !== '') {
//                    if(values.dispSeq == "0") {
//                        error.level = "error";
//                        error.message = msg.checkDispSeq;
//                    }
//                }
//                return error;
//            }
//        }
    },

    bindButtonEvent : function(){
        var self = this;

		//달력버튼
     	$('#calendarButton').click(function() {
			showCalendar({
				type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd1:$('#startDate').val(),
				yyyymmdd2:$('#endDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd1);
					$('#endDate').val(pin.yyyymmdd2);
				}
			});
		});

        $('#calendar-term').change(function(){
            $('#calendar-term option:selected').each(function(){
                var fromAndToCalDate = recentlyCalenderData($(this).val());
                $('#startDate').val(fromAndToCalDate[0]);
                $('#endDate').val(fromAndToCalDate[1]);
            })
        });

        // 검색조건 초기화 버튼
        $("#btn_init").click(function() {
            $('#marketingDisplayForm')[0].reset();
            self.valueInit();
        });

        // 검색조건 조회 버튼
        $("#btn_list").click(function() {
            self.onSearch(0);
        });

        // form 엔터키 입력
        $("#marketingDisplayForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
        });

        // 그리드 기획전 등록 버튼
        $("#btn_grid_insert").click(function() {
            self.onAdd("I", 0);
        });

        // 그리드 행삭제 버튼
        $("#btn_grid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 그리드 변경 취소 버튼
        $("#btn_grid_reset").click(function() {
            self.onReset();
        });

        // 그리드 저장 버튼
        $("#btn_grid_save").click(function() {
            self.onSave();
        });

        // 그리드 전시기간 일괄변경 버튼
        $("#btn_grid_updateDispDate").click(function() {
            self.onMkdpEndDateChange();
        });

		// 조회 조건 : 담당MD 검색버튼 클릭시
		$('#btn_call_md_popup').click(function () {
		    self.onMdPopup();
		});

		// 조회 조건 : 담당MD 지우개버튼 클릭시
		$('#btn_reset_md_popup').click(function () {
			$('#mdId').val('');
			$('#mdNm').val('');
		});

		// 조회 조건 : 등록자 검색버튼 클릭시
		$('#btn_call_user_popup').click(function () {
		    self.onUserPopup();
		});

		// 조회 조건 : 등록자 지우개버튼 클릭시
		$('#btn_reset_user_popup').click(function () {
			$('#userId').val('');
			$('#userNm').val('');
		});
    },

    onMdPopup : function(){
        var pin = {
            argSelectType   : '1'	//  결과값 갯수
            , argWorkStatCd : '01'  //  근무상태 ( 01 : 재직중, 02 : 퇴사 )
            , argUseYn	  : 'Y'	    //  사용여부
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
        popCommon(pin, POP_DATA, function (e) {
            var returnValue = JSON.parse(e.data);
            $('#mdId').val(returnValue[0].userId);
            $('#mdNm').val(returnValue[0].userNm);
        });
    },

    onUserPopup : function(){
        var pin = {
              argSelectType: '1'    // 결과값 갯수
            , argWorkStatCd: '01'   // 재직중
            , argUseYn: 'Y'         // 사용
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자조회'
            , _title: '사용자조회'
            , left: 20
            , top: 20
            , width: 810
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {
             var returnValue = JSON.parse(e.data);
             $('#userId').val(returnValue[0].userId);
             $('#userNm').val(returnValue[0].userNm);
        });
    },

    onMkdpEndDateChange : function(){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'display/marketingDisplayMgmt.getMarketingDisplayEndDateChange.do'
            , winName: 'marketingDisplayEndDateChange'
            , title: '전시기간 일괄변경'
            , _title: '전시기간 일괄변경'
            , left: 50
            , top: 50
            , width: 600
            , height: 430
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.endDateChangeCallback.bind(this));
    },

    endDateChangeCallback : function(e){
        var resultData = JSON.parse(e.data);
        this.grid.commit();
        var rowCount = this.grid.getItemCount(); // 그리드에 있던 행의 수

        for(var i = 0; i<rowCount; i++){
            if( this.grid.getValue(i, "dispStat") != "30" ) { // 진행상태가 종료가 아닌 경우
                this.grid.setValue(i , "dispEndDtm", resultData.endDate);
            }
        }
    },

    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            $('#marketingDisplayGrid_totalCount').html(grid.getDataSource().getRowCount());
        },

        // 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        }
    },

    onSearch : function(pageNo){
        var that = this;
        this.grid.cancel();

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var param = 'startDate=' + startDate + '&endDate=' + endDate;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc);
    },

    onAdd : function(state, mkdpNo) {
        var self = this;
        var pin = { argInsertUpdate : state, mkdpNo : mkdpNo };
        if(state == "I"){ // 기획전 등록
            var POP_DATA = {
                url:  _baseUrl + 'display/marketingDisplayMgmt.getMarketingDisplayPopup.do'
                , winName: 'getMarketingDisplayPopupInsert'
                , title: '기획전 등록'
                , _title: '기획전 등록'
                , left: 20
                , top: 20
                , width: 825
                , height: 600
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){ // 기획전 수정
            var POP_DATA = {
                url:  _baseUrl + 'display/marketingDisplayMgmt.getMarketingDisplayPopup.do'
                , winName: 'getMarketingDisplayPopupUpdate'
                , title: '기획전 수정'
                , _title: '기획전 수정'
                , left: 20
                , top: 20
                , width: 825
                , height: 600
                , scrollbars: true
                , autoresize: true
            };
        }
        popCommon(pin, POP_DATA, function(e){ this.onSearch(0); }  );
    },

    onDelete : function() {
        var result = true;
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }

        for(var i=0; i<checkedItems.length; i++) {
            var dispStat = this.grid.getValue(checkedItems[i], "dispStat");
            var mkdpNo = this.grid.getValue(checkedItems[i], "mkdpNo");

            if( dispStat != "10") { // 준비중이 아닌 경우 삭제 불가
                alert("기획전 번호(" + mkdpNo + ") : " + msg.checkDeleteList);
                result = false;
            }

            if(!result) {
               return false;
            }
        }

        if(result) {
            if (confirm(msg.observeDelete) != true) {
                return false;
            }
            this.defaultHandler.onDelete(this.grid);
        }

    },

	onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit(true);
        var dataResource = grid.getDataSource();
        var rowState = dataResource.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = grid.getItemsOfRows(rowList);
        var log = grid.validateCells(indexList,false); // null 전체
        if(log != null) {
            alert(log[0].message);
            return;
        }

        var result = false;
        for(var i = 0; i<this.grid.getItemCount(); i++){
            if(this.grid.getDataSource().getRowState(i) == "created" || this.grid.getDataSource().getRowState(i) == "updated") {
                this.grid.checkRow(i);
            }
        }

        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }

        if(!result){
            alert(msg.gridNoSelected);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    }
};