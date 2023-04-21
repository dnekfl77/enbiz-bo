var dispCtgGridMsg = x2coMessage.getMessage({
    noSelectedStdCtgMsg          : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.noSelectedStdCtgMsg'
    ,duplicatedDispCtgMsg         : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.duplicatedDispCtgMsg'
    ,noCheckedDispCtgForRemoveMsg : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.noCheckedDispCtgForRemoveMsg'
    ,minDispCtgCntMsg             : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.minDispCtgCntMsg'
    ,maxRepDispCtgCntMsg          : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.maxRepDispCtgCntMsg'
    ,minRepDispCtgCntMsg          : 'generalGoods.additionalInfo.dispCtgGrid.alert.msg.minRepDispCtgCntMsg'
});

$.namespace('dispCtgGrid.eventhandler')
dispCtgGrid.eventhandler = {
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
    // 기본정보 > 표준분류 선택시 호출
    ,setDispCtgGridData : function ( stdCtgNo ) {

        this.stdCtgNo = stdCtgNo;
        this.getStdCtgDispInfoList( stdCtgNo );
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 행추가 버튼 클릭
        $('#btn_dispCtgGrid_add').click( function () {

            var stdCtgNo = that.stdCtgNo;

            if ( stdCtgNo === '' ) {
                alert(dispCtgGridMsg.noSelectedStdCtgMsg);
                return;
            }
            that.addDisplayCategory( stdCtgNo );
        });

        // 행삭제 버튼 클릭
        $('#btn_dispCtgGrid_remove').click( function () {
            that.removeDisplayCategory();
        });

        // 변경취소 버튼 클릭
        $('#btn_dispCtgGrid_reset').click( function () {
            that.resetDisplayCategory();
        });

    }
    // 기존에 등록되있는 표준카테고리전시정보 조회
    ,getStdCtgDispInfoList : function ( stdCtgNo ) {

        var that = this;
        // 그리드 초기화
        that.resetGridData();

         if ( stdCtgNo === '' ) return;

        common.Ajax.sendRequest("GET"
            , _baseUrl + "goods/TemporaryGeneralGoods.getDisplayCategoryListByStandardCategory.do"
            , { stdCtgNo : stdCtgNo }
            , function ( data ) {
                if( data.length > 0 ) {

                    // 그리드 데이터 세팅
                    that.setGridData(data);
                }
            }, false
        );
    }
    // 행추가
    ,addDisplayCategory : function ( stdCtgNo ) {

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
                alert(dispCtgGridMsg.duplicatedDispCtgMsg);
                return;
            }

            var grid = that.grid;
            grid.commit(true);

            // 그리드에 데이터 삽입
            that.defaultHandler.onAdd(grid, {
                siteNm  : siteNm
                ,dispCtgHierarchy : dispCtgHierarchy
                ,repCtgYn : 'N'
                ,stdCtgNo : stdCtgNo
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
        if (checkedRows.length == 0) {
            alert(dispCtgGridMsg.noCheckedDispCtgForRemoveMsg);
            return;
        }

        // 행 삭제 처리
        this.defaultHandler.onDelete(grid);
    }
    // 변경취소
    ,resetDisplayCategory : function () {
        var grid = this.grid;
        this.defaultHandler.onCancel( grid );
    }
    // 그리드 데이터 세팅
    ,setGridData : function ( gridData ) {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.fillJsonData( gridData, { fillMode: "set" } );
        grid.localSavePoint = provider.savePoint(true);
    }
    // 그리드 초기화
    ,resetGridData : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.clearRows();
        provider.setRowCount(0);

        grid.localSavePoint = provider.savePoint(true);
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
                //체크해제불가
                provider.setValue( dataRow, 'repCtgYn', 'Y' );
            }
        }
        ,onRowCountChanged : function (provider, count) {
            $('#dispCtgGridCnt').text(count);
        }
    }
    // 전시카테고리 초기화
    ,resetDispCtgGrid : function ( ) {
        this.stdCtgNo = '';
        this.resetGridData();
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
            alert(dispCtgGridMsg.minDispCtgCntMsg);
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
            alert(dispCtgGridMsg.maxRepDispCtgCntMsg);
            return false;
        }

        if ( count < 1 ) {
            alert(dispCtgGridMsg.minRepDispCtgCntMsg);
            return false;
        }

        return true;
    }
    // 전시카테고리 조회
    ,getDispCtgGrid : function () {
        return this.controller.extractGridPayloads(this.grid);
    }
    // 전시카테고리 세팅
    ,setDispCtgGrid : function ( additionalInfoData ) {

        this.stdCtgNo = additionalInfoData.stdCtgNo;
        if ( additionalInfoData.prStdCtgDispInfoList === null ) return;
        this.setGridData(additionalInfoData.prStdCtgDispInfoList);
    }
}