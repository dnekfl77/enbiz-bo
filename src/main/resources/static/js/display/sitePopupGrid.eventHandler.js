$.namespace("sitePopupGrid.eventhandler");
sitePopupGrid.eventhandler = {

    init : function () {
        this.calendarInit();
        this.gridImgButtonRenderer();
        this.gridLoading();
        this.bindButtonEvent();
    },

    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },

    // 미리보기 버튼 셋팅
    gridImgButtonRenderer : function(){
        grid.registerCustomRenderer("renderer_imgBtn", {
            initContent : function (parent) {
                var span = document.createElement("span");
                span.className = "custom_render_span"
                parent.appendChild(this._button1 = document.createElement("span"));
            },
            canClick : function() {
                return true;
            },
            render : function(grid, model, width, height, info) {
                this._button1.className = "custom_search custom-hover";
            },
            click : function(event) {
                if (event.target === this._button1) {
                    alert("미리보기 팝업 작업 보류");
                }
            }
        });
    },

    gridLoading : function(){
        var self = this;

        this.grid.setEditOptions({ editable: false }) // 그리드 수정불가

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        });

        // 팝업명 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column==='popupNm'){
                    self.updatePopup("U",currentData.popupNo);
                }
            }
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

        $('#calendar-term').change(function(){
            $('#calendar-term option:selected').each(function(){
                var fromAndToCalDate = recentlyCalenderData($(this).val());
                $('#startDate').val(fromAndToCalDate[0]);
                $('#endDate').val(fromAndToCalDate[1]);
            })
        });

        $('#btn_search').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_init').click(function() {
            $('#sitePopupGridForm')[0].reset();
            self.calendarInit();
        });

        $("#btn_grid_insert").click(function() {
            self.updatePopup("I",0);
        });

        $("#btn_grid_delete").click(function() {
            self.onDelete();
        });
    },

    gridEvent : {
        // 삭제 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0, false);
           }
        }
    },

    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var param = 'startDate=' + startDate + '&endDate=' + endDate;
        this.controller.doQuery(this,param,pageIdx, pagingFunc, null, isOpenToast);
    },

    onDelete : function() {
        this.grid.commit();
        var result = false;
        var popupNo = Array();
        var popupNoIdx = 0;

        var dataResource = this.grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                popupNo[popupNoIdx] = this.grid.getValue(i, "popupNo");
                popupNoIdx++;
                result = true;
            }
        }
        if(!result){
            alert(msg.messageNotCheckedData);
            return;
        }
        if (!confirm(msg.deleteQuestionMessage)) {
            return;
        }

        var param = { popupNo : popupNo };
        common.Ajax.sendRequest(
            "POST"
            ,_baseUrl + "display/sitePopupMgmt.deleteSitePopupMgmt.do"
            ,param
            ,function(obj) {
                if (obj.succeeded) {
                    openToast(obj.message);
                    sitePopupGrid.eventhandler.onSearch(0, false);
                }
            }
        );
    },

    updatePopup : function(state, popupNo){
        if(state == "I"){
            var pin = null;
            var POP_DATA = {
                url: _baseUrl + 'display/sitePopupMgmt.sitePopupMgmtSaveView.do'
                , winName: 'sitePopupMgmtPopupInsert'
                , title: '사이트 팝업 등록'
                , _title: '사이트 팝업 등록'
                , left: 20
                , top: 40
                , width: 990
                , height: 800
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            var pin = { popupNo : popupNo };
            var POP_DATA = {
                url: _baseUrl + 'display/sitePopupMgmt.sitePopupMgmtSaveView.do'
                , winName: 'sitePopupMgmtPopupUpdate'
                , title: '사이트 팝업 수정'
                , _title: '사이트 팝업 수정'
                , left: 20
                , top: 40
                , width: 990
                , height: 800
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, null);
    }
};