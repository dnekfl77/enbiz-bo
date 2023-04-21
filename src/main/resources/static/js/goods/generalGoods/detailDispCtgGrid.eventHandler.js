var detailDispCtgMsg = x2coMessage.getMessage({
    duplicatedDispCtgMsg : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.duplicatedDispCtgMsg'
    ,noCheckedDispCtgForRemoveMsg : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.noCheckedDispCtgForRemoveMsg'
    ,minDispCtgCntMsg : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.minDispCtgCntMsg'
    ,maxRepDispCtgCntMsg : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.maxRepDispCtgCntMsg'
    ,minRepDispCtgCntMsg : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.minRepDispCtgCntMsg'
});

$.namespace('detailDispCtgGrid.eventhandler')
detailDispCtgGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
        this.stdCtgNo = '';
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
        $('#btn_detailDispCtgGrid_add').on( 'click', function () {
            that.addDisplayCategory();
        });

        // 행삭제 버튼 클릭
        $('#btn_detailDispCtgGrid_remove').on( 'click', function () {
            that.removeDisplayCategory();
        });

        // 변경취소 버튼 클릭
        $('#btn_detailDispCtgGrid_reset').on( 'click', function () {
            that.resetDisplayCategory();
        });

    }
    // 행추가
    ,addDisplayCategory : function () {

        var that = this;

        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'popup/displayCategoryMgmtPopup.displayCategoryTreeListPopup.do'
            , winName: 'displayCategoryTreePopup'
            , title: '전시 카테고리 Tree 조회'
            , _title: '전시 카테고리 Tree 조회'
            , left: 20
            , top: 20
            , width: 300
            , height: 400
            , scrollbars: false
            , autoresize: false
        };
        popCommon( pin, POP_DATA, function ( e ) {

            var resultData = JSON.parse(e.data);
            var siteNm              = resultData[0].siteNm;
            var dispCtgHierarchy    = resultData[0].hierarchyNm;
            var dispCtgNo           = resultData[0].dispCtgNo;

            // 전시카테고리 중복 여부 확인
            if ( that.isExistDisplyCategory( dispCtgNo ) ) {
                alert(detailDispCtgMsg.duplicatedDispCtgMsg);
                return;
            }

            // 그리드에 데이터 삽입
            var grid = that.grid;
            grid.commit(true);

            that.defaultHandler.onAdd(grid, {
                siteNm  : siteNm
                ,dispCtgHierarchy : dispCtgHierarchy
                ,repCtgYn : 'N'
                ,stdCtgNo : that.stdCtgNo
                ,dispCtgNo : dispCtgNo
                ,useYn : 'Y'
            });
        });
    }
    // 전시카테고리 중복 여부 확인
    ,isExistDisplyCategory : function ( dispCtgNo ) {

        var provider = this.grid.getDataSource();
        var searchResult = provider.searchData({ fields:['dispCtgNo'], value: dispCtgNo });

        if ( searchResult ) return true;
        return false;
    }
    // 행삭제
    ,removeDisplayCategory : function () {

        var grid = this.grid;

        var checkedRows = grid.getCheckedRows();
        if ( checkedRows.length == 0 ) { // 체크된 행이 없는경우
            alert(detailDispCtgMsg.noCheckedDispCtgForRemoveMsg);
            return;
        }

        // 행 삭제 처리
        this.defaultHandler.onDelete( grid );
    }
    // 변경취소
    ,resetDisplayCategory : function () {
        var grid = this.grid;
        this.defaultHandler.onCancel( grid );
    }
    // 그리드 이벤트
    ,gridEvent : {
        // 그리드 데이터 변경시
        onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {

            grid.commit();
            var provider = grid.getDataSource();
            var fieldName = provider.getOrgFieldName(field);

            // 대표카테고리여부 변경이 아닌경우
            if( fieldName !== 'repCtgYn') return;

            // 체크하는 경우
            if ( newValue === 'Y') {
                // 현재 체크된 행을 제외하고 모두 unChecked 처리
                // 대표카테고리여부는 한개의 행만 체크할 수 있도록 처리
                var rowcount = provider.getRowCount();
                for ( var i = 0 ; i < rowcount ; i++ ) {
                    if( i === dataRow ) continue;
                    provider.setValue( i, 'repCtgYn', 'N' );

                }

            // 체크해제하는 경우
            } else {
                // 체크 해제 불가
                provider.setValue( dataRow, 'repCtgYn', 'Y' );
            }
        }
        ,onRowCountChanged : function (provider, count) {
            $('#detailDispCtgGridCnt').text(count);
        }
    }
    // 전시카테고리 초기화
    ,resetDispCtgGrid : function () {

        this.stdCtgNo = '';

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.clearRows();
        provider.setRowCount(0);

        grid.localSavePoint = provider.savePoint(true);
    }
    // 전시카테고리 유효성 체크
    ,validationCheck : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var rowState = provider.getAllStateRows();
        var rowCount = provider.getRowCount();

        // 전시카테고리 개수 제한 = 1개
        if ( rowCount - rowState.deleted.length < 1 ) {
            alert(detailDispCtgMsg.minDispCtgCntMsg);
            return false;
        }

        // 대표 카테고리 지정 개수 제한 = 1개
        var repCtgList =  provider.getFieldValues( 'repCtgYn', 0, -1 );
        var count = repCtgList.reduce( function ( acc, value ,idx) {
            if (rowState.deleted.includes(idx)) return acc; // 삭제 대상 제외
            if ( value === 'N' ) return acc;
            return acc + 1;
        }, 0);

        if ( count > 1 ) {
            alert(detailDispCtgMsg.maxRepDispCtgCntMsg);
            return false;
        }

        if ( count < 1 ) {
            alert(detailDispCtgMsg.minRepDispCtgCntMsg);
            return false;
        }

        return true;
    }
    // 전시카테고리 조회
    ,getDispCtgGrid : function () {
        return this.controller.extractGridPayloads(this.grid);;
    }
    // 전시카테고리 세팅
    ,setDispCtgGrid : function ( additionalInfoData ) {

        this.stdCtgNo = additionalInfoData.prGoodsBase.stdCtgNo;
        if ( additionalInfoData.prStdCtgDispInfoList === null ) return;

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.fillJsonData( additionalInfoData.prStdCtgDispInfoList, { fillMode: "set" } );
        grid.localSavePoint = provider.savePoint(true);

    }
}