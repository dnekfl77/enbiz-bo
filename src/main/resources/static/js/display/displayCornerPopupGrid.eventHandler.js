$.namespace("displayCornerPopupGrid.eventhandler");
displayCornerPopupGrid.eventhandler = {
    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    },

    argCheck : function(){
      if (_gridType != '1' && _gridType != 'N') {
        alert(_msg.invalidAccessMsg);
        window.close();
      }
    },

    gridLoading : function(){
        grid.setEditOptions({ editable: false }); // 그리드 수정불가
		grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        };
        grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });
    },

    bindButtonEvent : function(){
        var self = this;

        // 전시 담당자 > 사용자 공통팝업 호출
       $('#btn_aempPopup_call').click(function() {
            var pin = { argSelectType: "1", argWorkStatCd: "01", argUseYn: "Y" };
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
            popCommon(pin, POP_DATA, self.popupMdListCallback);
       });

        // 전시담당자 지우기
        $('#btn_aempPopup_reset').click(function() {
            $('#aempId').val('');
            $('#aempNm').val('');
        });

        $('#btn_popup_init').click(function() {
            $('#btn_aempPopup_reset').click();
            $('#cornerPopupForm')[0].reset();
        });

        $('#btn_popup_list').click(function() {
            self.onSearch(0,true);
        });

        $("#cornerPopupForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        $("#btn_popup_apply").click(function() {
            self.onApply(self.grid, self.grid.getCheckedRows());
        });

        $("#btn_popup_close").click(function() {
            window.close();
        });
    },

    popupMdListCallback : function(e) {
        var data = JSON.parse(e.data);
        $('#aempNm').val(data[0].userNm);
        $('#aempId').val(data[0].userId);
    },

    gridEvent : {
        onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            displayCornerPopupGrid.eventhandler.onApply(grid, [clickData.dataRow]);
        }
    },
    // 적용
    onApply : function (objGrid, targetRows) {
        if (targetRows.length === 0) {
            alert(_msg.noSelectedDataMsg);
            return;
		} else {
            const selectDataList = [];
            targetRows.forEach((item) => {
                var data = grid.getDataSource().getJsonRow(item)
                selectDataList.push(data);
            });
            window.postMessage(JSON.stringify(selectDataList), _baseUrl);
            window.close();
        }			
	},
	
    onSearch : function(pageNo,isOpenToast){
        var that = this;
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, '', pageNo, pageFunc,false,isOpenToast);
    }
};