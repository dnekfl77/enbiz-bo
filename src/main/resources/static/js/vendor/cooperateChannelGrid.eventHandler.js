$.namespace("cooperateChannelGrid.eventhandler");
cooperateChannelGrid.eventhandler = {
    onSearch : function(pageIdx, isOpenToast) {
        this.grid.cancel();

        pageIdx = !pageIdx ? 0 : pageIdx;

        var _self = this;
        var pagingFunc = function(pageIdx) {
            return _self.onSearch(pageIdx, false);
        };

        this.controller.doQuery(this, '', pageIdx, pagingFunc, null, isOpenToast);
    }
    ,bindButtonEvent: function () {
        $('#btn_search').on("click", t => {
            this.onSearch(0, true);
        });

        $('#btn_init').on("click", t => {
            $('#cooperateChannelGridSearchForm')[0].reset();
        });
        
        // Enter 이벤트 처리
        $("#cooperateChannelGridSearchForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_search').click();
                window.event.returnValue = false;
            }
        });
        
    }

    ,searchCooperateChannelMaster : function(grid, rowIndex){
        cooperateChannelMasterGrid.eventhandler.clearGrid();

        const entrNo = grid.getValue(rowIndex, "entrNo");
        if (entrNo) {
            cooperateChannelMasterGrid.eventhandler.onSearch(entrNo);
        }
    }
    ,gridEvent : {
        onCurrentRowChanged : function(grid, oldRow, newRow) {
            var rowIndex = grid.getCurrent().dataRow;
            cooperateChannelGrid.eventhandler.searchCooperateChannelMaster(grid, rowIndex);
        }
    }
};