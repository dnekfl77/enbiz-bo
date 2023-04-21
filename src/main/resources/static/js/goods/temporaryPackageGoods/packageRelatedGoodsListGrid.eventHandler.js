var pkgRelGoodsListGridMsg = x2coMessage.getMessage({
    noEntrNoMsg : 'packageGoods.pkgInfo.alert.msg.noEntrNoMsg'
    ,maxGoodsCntMsg : 'packageGoods.pkgInfo.alert.msg.maxGoodsCntMsg'
    ,alreadyExistGoodsMsg : 'packageGoods.pkgInfo.alert.msg.alreadyExistGoodsMsg'
    ,noCheckedGoodsForRemoveMsg : 'packageGoods.pkgInfo.alert.msg.noCheckedGoodsForRemoveMsg'
    ,noSortSeqMsg : 'packageGoods.pkgInfo.alert.msg.noSortSeqMsg'
    ,duplicatedSortSeqMsg : 'packageGoods.pkgInfo.alert.msg.duplicatedSortSeqMsg'
    ,minGoodsCntMsg : 'packageGoods.pkgInfo.alert.msg.minGoodsCntMsg'
    ,maxRepYnMsg : 'packageGoods.pkgInfo.alert.msg.maxRepYnMsg'
    ,minRepYnMsg : 'packageGoods.pkgInfo.alert.msg.minRepYnMsg'
});

$.namespace("packageRelatedGoodsListGrid.eventhandler");
packageRelatedGoodsListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
        this.entrNo = '';
    }
    ,gridSetting : function(){

        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback( function ( grid, item, fixed ) {
            if ( item.checked ) return 'rg-trcol_active';
        });
        this.grid.editOptions.commitLevel = "error";
    }
    ,setEntrNo : function ( entrNo ) {
        this.entrNo = entrNo;
        if (!entrNo) { this.reset(); }
    }
    ,bindButtonEvent : function () {
        var that = this;
        $('#btn_add_pkg_goods').on( 'click', function () { that.add() });
        $('#btn_remove_pkg_goods').on( 'click', function () { that.remove() });
        $('#btn_reset_pkg_goods').on( 'click', function () { that.reset() });
    }
    ,add : function () {

        var that = this;
        var grid = that.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        if(!that.entrNo){
            alert(pkgRelGoodsListGridMsg.noEntrNoMsg);
            $('#entrNo').focus();
            return;
        }

        if ( provider.getRowCount() === 10 ) {
            alert(pkgRelGoodsListGridMsg.maxGoodsCntMsg);
            return;
        }

        var pin = { entrNo: that.entrNo };
        var POP_DATA = {
            url: _baseUrl + 'goods/TemporaryPackageGoods.temporaryPackageTargetGoodsView.do'
            , winName: 'GoodsPopup'
            , title: '묶음대상 상품조회'
            , _title: '묶음대상 상품조회'
            , left: 20
            , top: 20
            , width: 1044
            , height: 750
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA, function ( e ) {
            var returnValue = JSON.parse(e.data);

            // 중복된 상품 선택 불가
            if ( that.isDuplicatedValue('tgtGoodsNo', returnValue[0].tgtGoodsNo ) ) {
                alert(pkgRelGoodsListGridMsg.alreadyExistGoodsMsg);
                return;
            }

            var rowData = { tgtGoodsNo : returnValue[0].tgtGoodsNo
                ,goodsNm : returnValue[0].goodsNm
                ,repYn : 'N'
                ,sortSeq : undefined
                ,brandNm : returnValue[0].brandNm
                ,entrNo : returnValue[0].entrNo
                ,entrNm : returnValue[0].entrNm
                ,mdId : returnValue[0].mdId
                ,saleStatCdNm : returnValue[0].saleStatCdNm
                ,dispYn : returnValue[0].dispYn
                ,deliProcTypCdNm : returnValue[0].deliProcTypCdNm
                ,deliGoodsGbCdNm :returnValue[0].deliGoodsGbCdNm
                ,salePrc : returnValue[0].salePrc
                ,dispDlexAmt : returnValue[0].dispDlexAmt };

            that.defaultHandler.onAdd(grid, rowData);

        });
    }
    ,isDuplicatedValue : function ( fieldName, value ) {
        var provider = this.grid.getDataSource();
        var searchResult = provider.searchData({ fields:[fieldName], value: value });
        if ( searchResult ) return true;
        return false;
    }
    ,remove : function () {
        var grid = this.grid;
        var checkedRows = grid.getCheckedRows();
        if (!checkedRows.length) {
            alert(pkgRelGoodsListGridMsg.noCheckedGoodsForRemoveMsg);
            return;
        }
        this.defaultHandler.onDelete(grid);
    }
    ,reset : function () {
        this.defaultHandler.onCancel( this.grid );
    }
    , gridEvent : {
        onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            var rowState = grid.getDataSource().getRowState(dataRow);

            if ( rowState !== 'deleted') {
                if ( column.fieldName === "sortSeq" ) {
                    if ( value === undefined ) {
                        error.level = "error";
                        error.message = pkgRelGoodsListGridMsg.noSortSeqMsg;
                        return error;
                    }
                }
            }
        }
        ,onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {

            var provider = grid.getDataSource();
            var fieldName = provider.getOrgFieldName(field);
            grid.commit(true);
            if ( newValue === undefined ) return;

            // 대표상품은 1개 초과 선택 불가
            if ( fieldName === 'repYn') {
                if ( newValue === 'Y' ) {
                    var rowCount = provider.getRowCount();
                    for ( var i = 0 ; i < rowCount ; i++ ) {
                        if ( i === dataRow ) continue;
                        provider.setValue( i, 'repYn', oldValue );
                    }
                }else {
                    provider.setValue( dataRow, 'repYn', oldValue );
                }
            // 우선순위 중복 방지
            } else if ( fieldName === 'sortSeq') {
                var rowState = provider.getAllStateRows();
                var sortSeqList = provider.getFieldValues( fieldName, 0, -1 );
                for( var j = 0 ; j < sortSeqList.length ; j++ ) {
                    if ( j === dataRow) continue;
                    if ( rowState.deleted.includes(j) ) continue;
                    if ( sortSeqList[j] === newValue ) {
                        alert(pkgRelGoodsListGridMsg.duplicatedSortSeqMsg);
                        provider.setValue( dataRow, fieldName, oldValue );
                        return;
                    }
                }
            }
        }
        ,onRowCountChanged : function (provider, count) {
            $('#packageRelatedGoodsListGridCnt').text(count);
        }
    }
    ,resetPkgInfo : function () {
        var grid = this.grid;
        var provider = grid.getDataSource();

        $('#pkgInfo')[0].reset();

        provider.clearRows();
    }
    ,setPkgInfo : function ( data, list ) {
        var grid = this.grid;
        var provider = grid.getDataSource();
        this.entrNo = data.entrNo;

        // 묶음상품 노출 우선순위 세팅
        $('#pkgInfo :radio[name=pkgGoodsPrioRnkCd][value='+data.pkgGoodsPrioRnkCd+']').prop('checked',true);

        // 묶음상품 목록 세팅
        provider.fillJsonData( list, { fillMode: "set" } );
        grid.localSavePoint = provider.savePoint(true);
    }
    ,validatePkgInfo : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var rowState = provider.getAllStateRows();
        var rowCount = provider.getRowCount();

        // 최소 등록 상품 수 제한
        if( rowCount - rowState.deleted.length < 2 ){
            alert(pkgRelGoodsListGridMsg.minGoodsCntMsg);
            return false;
        }

        // 대표여부를 최소 1개 선택하지 않은 경우
        var repYnList =  provider.getFieldValues( 'repYn', 0, -1 );
        var count = repYnList.reduce( function ( acc, value ,idx) {
            if (rowState.deleted.includes(idx)) return acc; // 삭제 대상 제외
            if ( value === 'N' ) return acc;
            return acc + 1;
        }, 0);

        if ( count < 1 ) {
            alert(pkgRelGoodsListGridMsg.minRepYnMsg);
            return false;
        }

        if ( count > 1 ) {
            alert(pkgRelGoodsListGridMsg.maxRepYnMsg);
            return false;
        }

        // 우선순위를 입력하지 않은 경우
        var rowState = provider.getAllStateRows();
        var dataRowList = rowState.created.concat(rowState.updated);
        var itemIndexList = grid.getItemsOfRows(dataRowList);
        var errList = grid.validateCells( itemIndexList, false);
        if(errList) {
            alert(errList[0].message);
            return false;
        }

        return true;
    }
    ,getPkgInfo : function () {
        var pkgInfoObj = $('#pkgInfo').serializeObject();
        pkgInfoObj.packageRelatedGoodsListGridData = this.controller.extractGridPayloads(this.grid);
        return pkgInfoObj;
    }
}