$.namespace('reviewEvaluationItemDetailGrid.eventhandler');
reviewEvaluationItemDetailGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    ,gridSetting : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();

        provider.fillJsonData( _evltItemValueList, { fillMode: "set" } );
        grid.editOptions.editable = false;

    }
    ,bindButtonEvent : function () {
        $('#btn_popup_bottom_close').on( 'click', function () {
            window.close();
        });
    }
}