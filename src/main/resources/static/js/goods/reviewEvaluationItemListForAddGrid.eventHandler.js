var revrevEvltItemListForAddGridMsg = x2coMessage.getMessage({
    noSelectedEvltItemMsgForAdd : 'reviewEvaluationItemMgmt.reviewEvaluationItemListPopup.alert.msg.noSelectedEvltItemMsgForAdd'
});

$.namespace('reviewEvaluationItemListForAddGrid.eventhandler');
reviewEvaluationItemListForAddGrid.eventhandler = {
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

        this.grid.editOptions.editable = false;
        this.grid.setCheckableExpression("values['addYn'] = 'Y'", true); // 추가 가능여부

    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_popup_init').on( 'click', function () {
            that.reset();
        });

        $('#btn_popup_list').on( 'click', function () {
            that.search(0, false);
        });

        $('#btn_popup_close').on( 'click', function () {
            that.close();
        });

        $('#btn_popup_apply').on( 'click', function () {
            that.apply();
        });

        $("#reviewEvaluationItemListForAddForm").on("keypress", function(e) {
            if( e.keyCode === 13 ) {
                e.preventDefault();
                $("#btn_popup_list").click();
            }
        });
    }
    ,reset : function(){
        $('#reviewEvaluationItemListForAddForm')[0].reset();
    }
    ,search : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = 'evltItemNoList='+_evltItemNoList;
        that.grid.cancel();

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.search( pageNo, false ); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    ,close : function () {
        window.close();
    }
    ,apply : function () {
        var that = this;
        var checkedRows = that.grid.getCheckedRows();
        var resultData = [];

        if ( !checkedRows.length ) {
            alert(revrevEvltItemListForAddGridMsg.noSelectedEvltItemMsgForAdd);
            return;
        }

        checkedRows.forEach( function ( rowNum ) {
            var rowData = that.grid.getDataSource().getJsonRow(rowNum);
            resultData.push({ evltItemNo : rowData.evltItemNo , evltItemNm : rowData.evltItemNm});
        });

        window.postMessage( JSON.stringify( resultData ), _baseUrl );
        this.close();

    }
    ,gridEvent : {
        onCellDblClicked : function( grid, clickData ) {
            if ( clickData.cellType === 'gridEmpty' || clickData.cellType === 'header') return;
            var rowData = grid.getDataSource().getJsonRow(clickData.dataRow);
            if ( rowData.addYn === 'N' ) return;

            window.postMessage( JSON.stringify( [rowData]), _baseUrl );
            window.close();
        }
    }
}