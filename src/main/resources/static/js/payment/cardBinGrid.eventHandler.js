$.namespace("cardBinGrid.eventhandler");
cardBinGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },

    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },

    gridLoading : function(){
        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        };

        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        this.grid.editOptions.commitLevel = "error";
        this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
            var error = {};
            if (column.fieldName === "cardBinno") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "Bin 번호는 " + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'iscmCd'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "발급사는 " + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'cardcoNm'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "카드명칭은 " + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'mbrGbCd'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "회원구분은 " + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'cardTypCd'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "카드유형은 " + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'aplyDt'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "적용일자는 " + msg.necessaryCheckMessage;
                }
            }
            return error;
        }
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

        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_init').click(function() {
            $('#cardBinGridForm')[0].reset();
            self.calendarInit();
        });

        $("#cardBinGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        $("#btn_grid_insert").click(function() {
            self.onAdd();
        });

        $("#btn_grid_remove").click(function() {
            self.onDelete();
        });

        $("#btn_grid_reset").click(function() {
            self.onReset();
        });

        $("#btn_grid_save").click(function() {
            self.onSave();
        });
    },

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },

        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        }
    },
    
    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var param = 'startDate=' + startDate + '&endDate=' + endDate;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null, isOpenToast);
    },

    onAdd : function () {
        var grid = this.grid;
        grid.commit(); // 편집중인 행 편집 완료 처리

        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());

        var defaultValues = {
            iscmCd : '',
            mbrGbCd : '',
            cardTypCd : '',
		    aplyDt : today
        };

        this.defaultHandler.onAdd(grid, defaultValues);
    },

    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.rowCheck);
            return;
        }
        this.defaultHandler.onDelete(this.grid);
    },

	onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        this.grid.commit();

        var dataResource = this.grid.getDataSource();
        // edit row 체크
        var result = false;
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }

        if(!result){
            alert(msg.rowCheck);
            return ;
        }

        // 입력, 수정시 빈값 확인
        var rowState = dataResource.getAllStateRows();
        var rowInsert = rowState.created;
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = this.grid.getItemsOfRows(rowList);
        var log = this.grid.validateCells(indexList,false); // null 전체
        if(log != null) {
            alert(log[0].message);
            return;
        }

        // 입력한 데이터의 Bin번호 중복 여부 확인
        result = true;
        for(var i = 0; i<rowInsert.length; i++){
            if(result) {
                var param = '&cardBinno=' + grid.getValue(rowInsert[i],'cardBinno');
                common.Ajax.sendRequestSync(
                     "POST"
                     ,_baseUrl + "payment/cardBinMgmt.getCheckCardBinno.do"
                     ,param
                     ,function(obj) {
                          if (!obj.succeeded) {
                             alert( Number(rowInsert[i])+1 + "행 ( Bin 번호 : " + grid.getValue(rowInsert[i],'cardBinno') + ") = " + msg.checkCardBinno);
                             result = false;
                             return false;
                          }
                     }
                );
            }
        }

        // 중복이 아닌경우 저장
        if(result) {
            this.controller.doSave(this, this.grid.localId);
        }
    }

};