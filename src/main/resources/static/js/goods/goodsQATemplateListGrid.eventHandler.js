var goodsQATemplateListMsg = x2coMessage.getMessage({
    noSelectedTmplMsg : 'goodsQATemplateMgmt.alert.msg.noSelectedTmplMsg'
    ,noAnsTmplNmMsg : 'goodsQATemplateMgmt.alert.msg.noAnsTmplNmMsg'
    ,noAnsTmplContMsg : 'goodsQATemplateMgmt.alert.msg.noAnsTmplContMsg'
});

$.namespace('goodsQATemplateListGrid.eventhandler');
goodsQATemplateListGrid.eventhandler = {
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
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_user_popup').on( 'click', function () {
            that.callUserPopup();
        });

        $('#btn_reset_user_popup').on( 'click', function () {
            $('#ansTmplRegId, #ansTmplRegNm').val('');
        });

        $('#btn_reset').on( 'click', function () {
            that.reset();
        });

        $('#btn_search').on( 'click', function () {
            that.search(0,true);
        });

        $('#btn_add').on( 'click', function () {
            that.add();
        });

        $('#btn_delete').on( 'click', function () {
            that.delete();
        });

        $('#btn_cancel').on( 'click', function () {
            that.cancel();
        });

        $('#btn_save').on( 'click', function () {
            that.save();
        });

        com.x2commerce.common.Util.setupEnterSearch('goodsQATemplateForm','btn_search');

    }
    , callUserPopup : function ( ) {

        var pin = {
            argSelectType: '1'      // 결과값 갯수
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
            $('#ansTmplRegId').val(returnValue[0].userId);
            $('#ansTmplRegNm').val(returnValue[0].userNm);
        });
    }
    ,reset : function () {
        $('#goodsQATemplateForm')[0].reset();
    }
    ,search : function ( pageNo , isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.search(pageNo ,false); };

        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, false, isOpenToast );
    }
    ,add : function () {
        var grid = this.grid;
        this.defaultHandler.onAdd( grid, {
            ansTmplNo : ''
            , ansTmplNm : ''
            , ansTmplCont : ''
            , useYn : 'Y'
            , sysRegId : undefined
            , sysRegDtm : undefined
            , sysModId : undefined
            , sysModDtm : undefined
        });
    }
    ,delete : function () {
        var grid = this.grid;
        var checkedRows = grid.getCheckedRows();
        if ( !checkedRows.length ) {
            alert(goodsQATemplateListMsg.noSelectedTmplMsg);
            return;
        }
        this.defaultHandler.onDelete( grid );
    }
    ,cancel : function () {
        var grid = this.grid;
        this.defaultHandler.onCancel( grid );
    }
    ,save : function () {
        var grid = this.grid;
        grid.commit(true);
        this.controller.doSave(this, grid.localId);
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickData ) {
            if ( clickData.cellType === 'header') return;
            if ( clickData.fieldName === 'ansTmplNm' || clickData.fieldName === 'ansTmplCont' ) {
                var rowData = grid.getDataSource().getJsonRow( clickData.dataRow );
                var pin = { ansTmplNm : rowData.ansTmplNm, ansTmplCont : rowData.ansTmplCont };
                var POP_DATA = {
                    url: _baseUrl + 'goods/GoodsQATemplateMgmt.goodsQATemplateSaveView.do'
                    , winName: 'goodsQAAnsTmplPopup'
                    , title: '템플릿수정'
                    , _title: '템플릿수정'
                    , left: 20
                    , top: 20
                    , width: 625
                    , height: 355
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA, function (e) {
                    var data = JSON.parse(e.data);
                    grid.setValue( clickData.dataRow, 'ansTmplNm', data.ansTmplNm);
                    grid.setValue( clickData.dataRow, 'ansTmplCont', data.ansTmplCont);
                    grid.commit(true);
                });
            }
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === "ansTmplNm" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = goodsQATemplateListMsg.noAnsTmplNmMsg;
                    return error;
                }
            } else if ( column.fieldName === "ansTmplCont" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = goodsQATemplateListMsg.noAnsTmplContMsg;
                    return error;
                }
            }
        }
        ,afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if( data.succeeded ){
                eventHandler.search(0,false);
            }
        }
    }
}