$.namespace('modificationHistoryListGrid.eventhandler');
modificationHistoryListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.calenderSetting();
        this.bindButtonEvent();
    }
    ,gridSetting : function () {
        this.grid.editOptions.editable = false;
    }
    ,calenderSetting : function () {
        var fromAndToCalDate = recentlyCalenderData(7);
        $('#modStartDtm').val(fromAndToCalDate[0]);
        $('#modEndDtm').val(fromAndToCalDate[1]);
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on('click', function () {
            that.callCalender();
        });

        $('#btn_reset').on('click', function () {
            that.onReset();
        });

        $('#btn_search').on('click', function () {
            that.onSearch(0, true);
        });

        com.x2commerce.common.Util.setupEnterSearch('modificationHistoryForm','btn_search');
    }
    ,callCalender : function () {
        showCalendar({
            type : 'A',
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#modStartDtm').val(),
            yyyymmdd2 : $('#modEndDtm').val(),
            fn:function(pin) {
                $('#modStartDtm').val(pin.yyyymmdd1);
                $('#modEndDtm').val(pin.yyyymmdd2);
            }
        });
    }
    ,onReset : function () {
        $('#modificationHistoryForm')[0].reset();
        this.calenderSetting();
    }
    ,onSearch : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.onSearch(pageNo, false); };

        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    ,gridEvent : {
        onCurrentRowChanged(grid, oldRow, newRow) {
            modifiedGoodsInfoListGrid.eventhandler.getModGoodsInfo(( newRow == -1 )? '' : grid.getDataSource().getJsonRow(newRow).goodsNo);
        }
    }
}