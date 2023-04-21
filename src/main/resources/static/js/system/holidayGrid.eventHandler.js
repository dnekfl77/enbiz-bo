$.namespace("holidayGrid.eventhandler");
holidayGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    ,gridSetting : function () {

        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.setEditOptions({ commitLevel : 'error' });
    }
    ,bindButtonEvent : function(){
        var self = this;

        $('#btn_search').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
            $('#hlddGridForm')[0].reset();
        });

        $('#btn_grid_add_many').click(function(){
            var pin = {};
            var POP_DATA = {
                  url: '/system/holidayMgmt.holidayRegistView.do'
                , winName: 'notiMsgPopup'
                , title: '휴일관리 일괄등록'
                , _title: '휴일관리 일괄등록'
                , left: 20
                , top: 50
                , width: 1000
                , height: 545
                , scrollbars: false
                , autoresize: false
            }
            popCommon(pin, POP_DATA, function(){});
        });

        $('#btn_grid_add').click(function() {
            self.onAdd();
        });

        $('#btn_grid_remove').click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        $('#btn_grid_save').click(function() {
            self.onSave();
        });

         $("#btn_grid_reset").click(function() {
            self.onReset();
         });

        $("#hlddGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_search').click();
                window.event.returnValue=false;
            }
         });

    },

    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0,false);
           }
        }
    },

    onAdd : function() {
        var job=$('#holiJobGbCd').val();

        if(job==''){
            job='01';
        }
        var sct=$('#holiGbCd').val();
        if(sct==''){
            sct='01';
        }

        var self = this;
        var grid = self.grid;

        grid.commit(true);

        var defaultValues = {holiJobGbCd:job, holiGbCd:sct, useYn:"Y"};
        self.defaultHandler.onAdd(grid, defaultValues);
    },

    onDelete : function() {
        var self = this;
        var grid = self.grid;

        var checkedItems = grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(_rowCheckMsg);
            return;
        }

        self.defaultHandler.onDelete(grid);
    },

    onSearch : function(pageIdx,isOpenToast){
        var year = $('#holi_year').val();
        var month = $('#holi_month').val();

        if( !year && month ){
            alert(alertMsg.selectYearMsg);
            return;
        }
        $('#holiDt').val( year + month );

        var self = this;
        pageIdx = !pageIdx ? 0 : pageIdx;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this, "", pageIdx, pagingFunc,null,isOpenToast);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit(true);
        this.controller.doSave(this, grid.localId);
    },

    onReset : function() {
        var grid = self.grid;
        this.defaultHandler.onCancel(grid);
    }
};