var detailAssocGoodsMsg = x2coMessage.getMessage({
    duplicatedAssocGoodsMsg : 'generalGoods.additionalInfo.assocGoodsGrid.alert.msg.duplicatedAssocGoodsMsg'
    ,canAddThisGoodsMsg : 'generalGoods.additionalInfo.assocGoodsGrid.alert.msg.canAddThisGoodsMsg'
    ,noCheckedAssocGoodsForRemoveMsg : 'generalGoods.additionalInfo.assocGoodsGrid.alert.msg.noCheckedAssocGoodsForRemoveMsg'
    ,duplicatedSorSeqMsg : 'generalGoods.additionalInfo.assocGoodsGrid.alert.msg.duplicatedSorSeqMsg'
    ,noSortSeqMsg : 'generalGoods.additionalInfo.assocGoodsGrid.alert.msg.noSortSeqMsg'
});

$.namespace('detailAssocGoodsGrid.eventhandler')
detailAssocGoodsGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    // 그리드 세팅
    ,gridSetting : function () {

        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.editOptions.commitLevel = "error";

    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 행추가 버튼 클릭
        $('#btn_detailAssocGoodsGrid_add').click( function () {
            that.addAssociatedGoods();
        });

        // 행삭제 버큰 클릭
        $('#btn_detailAssocGoodsGrid_remove').click( function () {
            that.removeAssociatedGoods();
        });

        // 변경취소 버큰 클릭
        $('#btn_detailAssocGoodsGrid_reset').click( function () {
            that.resetAssociatedGoods();
        });

    }
    // 행추가
    ,addAssociatedGoods : function () {

        var that = this;

        var pin = {
            argSelectType: '1',     // 선택 개수
            argSaleState: '10',     // 판매상태 : 판매중
            argGoodsType: ''        // 상품유형
        };

        var POP_DATA = {
            url: _baseUrl + 'popup/goodsMgmtPopup.goodsListPopup.do'
            , winName: 'goodsListPopup'
            , title: '상품 조회'
            , _title: '상품 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {

            var resultData = JSON.parse(e.data);
            var goodsNo = resultData[0].goodsNo;

            // 연관상품 중복 여부 확인
            if ( that.isExistAssociatedGoods( goodsNo ) ) {
                alert(detailAssocGoodsMsg.duplicatedAssocGoodsMsg);
                return;
            }

            // 현재 상품 추가 방지
            if ( goodsNo === that.goodsNo) {
                alert(detailAssocGoodsMsg.canAddThisGoodsMsg);
                return;
            }

            // 그리드에 데이터 삽입
            var grid = that.grid;
            grid.commit(true);

            that.defaultHandler.onAdd(grid, {
                sortSeq : undefined
                ,asctGoodsNo : goodsNo
                ,asctGoodsNm : resultData[0].goodsNm
                ,saleStatCdNm : resultData[0].saleStatCdNm
                ,asctGbCd : '01' // 연관구분코드 ( 01 : 구매연관상품 )
            });
        });

    }
    // 연관상품 중복 여부 확인
    ,isExistAssociatedGoods : function ( goodsNo ) {

        var provider = this.grid.getDataSource();
        var searchResult = provider.searchData({ fields:['asctGoodsNo'], value: goodsNo });

        if ( searchResult ) return true;
        return false;
    }
    // 행삭제
    ,removeAssociatedGoods : function () {

        var grid = this.grid;

        var checkedRows = grid.getCheckedRows();
        if (checkedRows.length == 0) {
            alert(detailAssocGoodsMsg.noCheckedAssocGoodsForRemoveMsg);
            return;
        }

        // 행 삭제 처리
        this.defaultHandler.onDelete(grid);
    }
    // 변경취소
    ,resetAssociatedGoods : function () {
        var grid = this.grid;
        this.defaultHandler.onCancel( grid );
    }
    // 그리드 이벤트
    ,gridEvent : {
        // 그리드 데이터 변경시
        onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {

            var provider = grid.getDataSource();
            var fieldName = provider.getOrgFieldName(field);
            grid.commit(true);

            // 전시순번 변경이 아닌경우
            if( fieldName !== 'sortSeq') return;

            // 전시순번을 입력하지 않은경우
            if( newValue === undefined || newValue === '' ) return;

            // 전시순번 중복 입력 여부 확인
            var rowState = provider.getAllStateRows();
            var sortSeqList = provider.getFieldValues( fieldName, 0, -1 );

            for( var i = 0 ; i < sortSeqList.length ; i++ ) {
                if ( i === dataRow) continue;
                if ( rowState.deleted.includes(i) ) continue;
                if ( sortSeqList[i] === newValue ) {
                    alert(detailAssocGoodsMsg.duplicatedSorSeqMsg);
                    provider.setValue( dataRow, fieldName, oldValue );
                    return;
                }
            }
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            var rowState = grid.getDataSource().getRowState(dataRow);

            if ( rowState !== 'deleted') {
                if ( column.fieldName === "sortSeq" ) {
                    if ( value === undefined ) {
                        error.level = "error";
                        error.message = detailAssocGoodsMsg.noSortSeqMsg;
                        return error;
                    }
                }
            }
        }
        ,onRowCountChanged : function (provider, count) {
            $('#detailAssocGoodsGridCnt').text(count);
        }
    }
    // 연관상품 초기화
    ,resetAssocGoodsGrid : function ( ) {
        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.clearRows();
        provider.setRowCount(0);

        grid.localSavePoint = provider.savePoint(true);
    }
    // 연관상품 유효성 체크
    ,validationCheck : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        // 전시순번을 입력하지 않은 경우
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
    // 연관상품 조회
    ,getAssocGoodsGrid : function () {
        return this.controller.extractGridPayloads(this.grid);
    }
    // 연관상품 세팅
    ,setAssocGoodsGrid : function ( additionalInfoData ) {

        this.goodsNo = additionalInfoData.prGoodsBase.goodsNo;
        var gridData = additionalInfoData.prAssocGoodsInfoList;

        if ( gridData === null ) return;

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.fillJsonData( gridData, { fillMode: "set" } );
        grid.localSavePoint = provider.savePoint(true);
    }
}