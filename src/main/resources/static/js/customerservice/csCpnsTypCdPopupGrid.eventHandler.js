$.namespace("csCpnsTypCdPopupGrid.eventhandler");
csCpnsTypCdPopupGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_popup_list').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_popup_init').click(function() {
            $('#csCpnsTypCdPopupGridForm')[0].reset();
        });

        $("#csCpnsTypCdPopupGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_popup_list').click();
                window.event.returnValue=false;
            }
        });

        $('#btn_popup_apply').click(function(){
            var datProvider = self.grid.getDataSource();
            var rowIndex = self.grid.getCurrent().dataRow;
            if(rowIndex === -1){
                alert(_msg.noSelectedDataMsg);
                return;
            }

            var returnData = [];
            returnData.push(datProvider.getJsonRow(rowIndex));
            window.postMessage(JSON.stringify(returnData), _baseUrl);
            window.close();
        });

        $("#btn_popup_close").click(function() {
            window.close();
        });
    },

    gridLoading : function(){
        // 그리드 셀 수정 불가 설정
        grid.setEditOptions({ editable: false })

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
    },

    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this,"",pageIdx, pagingFunc,false,isOpenToast);
    },

    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            $('#csCpnsTypCdPopupGrid_totalCount').html(grid.getDataSource().getRowCount());
        },

        onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            var data = grid.getDataSource().getJsonRow(clickData.dataRow);
            var returnData = [];
            returnData.push(data)
            window.postMessage(JSON.stringify(returnData), _baseUrl);
            window.close();
        }
    }

};