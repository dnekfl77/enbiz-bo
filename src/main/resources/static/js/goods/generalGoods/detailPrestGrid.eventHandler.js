var detailPrestMsg = x2coMessage.getMessage({
    noCheckedprestForRemoveMsg : 'generalGoods.additionalInfo.prestGrid.alert.msg.noCheckedprestForRemoveMsg'
    ,emptyApplyStartDateMsg : 'generalGoods.additionalInfo.alert.msg.emptyApplyStartDateMsg'
    ,beforeTodayApplyStartDateMsg : 'generalGoods.additionalInfo.alert.msg.beforeTodayApplyStartDateMsg'
    ,duplicatedAplyStrDtMsg : 'generalGoods.additionalInfo.alert.msg.duplicatedAplyStrDtMsg'
    ,afterEndApplyStartDateMsg : 'generalGoods.additionalInfo.alert.msg.afterEndApplyStartDateMsg'
    ,maxApplyPeriodMsg : 'generalGoods.additionalInfo.alert.msg.maxApplyPeriodMsg'
    ,emptyApplyEndDateMsg : 'generalGoods.additionalInfo.alert.msg.emptyApplyEndDateMsg'
    ,beforeTodayApplyEndDateMsg : 'generalGoods.additionalInfo.alert.msg.beforeTodayApplyEndDateMsg'
    ,duplicatedAplyEndDtMsg : 'generalGoods.additionalInfo.alert.msg.duplicatedAplyEndDtMsg'
    ,beforeStartApplyEndDateMsg : 'generalGoods.additionalInfo.alert.msg.beforeStartApplyEndDateMsg'
    ,checkApplyDateBeforeUseMsg : 'generalGoods.additionalInfo.alert.msg.checkApplyDateBeforeUseMsg'
    ,duplicatedPeriodPrestMsg : 'generalGoods.additionalInfo.prestGrid.alert.msg.duplicatedPeriodPrestMsg'
    ,noPrestNmMsg : 'generalGoods.additionalInfo.prestGrid.alert.msg.noPrestNmMsg'
});

$.namespace('detailPrestGrid.eventhandler')
detailPrestGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    // 그리드 세팅
    ,gridSetting : function () {

        //그리드 셀 체크시 색상 변경 기능 추가
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

        // 행추가 버튼 클릭시
        $('#btn_detailPrestGrid_add').click( function () {
            that.addPresent();
        });

        // 행삭제 버튼 클릭시
        $('#btn_detailPrestGrid_remove').click( function () {
            that.removePresent();
        });

    }
    // 행추가
    ,addPresent : function () {

        var grid = this.grid;
        grid.commit(true);

        var defaultValues = { prestNm: '', aplyStrDt: '', aplyEndDt: '', useYn: 'N' };
        this.defaultHandler.onAdd(grid, defaultValues);
    }
    // 행삭제
    ,removePresent : function () {
        var grid = this.grid;
        var provider = grid.getDataSource();

        var checkedRows = grid.getCheckedRows();
        if (checkedRows.length == 0) {
            alert(detailPrestMsg.noCheckedprestForRemoveMsg);
            return;
        }

        //행삭제 처리
        provider.softDeleting = false;
        provider.removeRows(checkedRows);
    }
    // 그리드 이벤트
    ,gridEvent : {
        // 그리드 변경 & 커밋 후 호출
        onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {

            var provider = grid.getDataSource();
            grid.commit(true);

            var toDate = getTodayDate();
            var fieldName = provider.getOrgFieldName(field);

            // 적용시작일자
            if ( fieldName === 'aplyStrDt' ) {

                var aplyStrDt = newValue;
                var aplyEndDt = grid.getValue( dataRow, 'aplyEndDt' );

                // 날짜를 선택하지 않은 경우
                if( aplyStrDt === undefined || aplyStrDt === '' ){
                    alert(detailPrestMsg.emptyApplyStartDateMsg);
                    provider.setValue( dataRow, fieldName, oldValue );
                    return;
                }

                // 현재 날짜 이전 일자 선택 불가
                if( aplyStrDt < toDate ) {
                    alert(detailPrestMsg.beforeTodayApplyStartDateMsg);
                    provider.setValue( dataRow, fieldName, oldValue );
                    return;
                }

                // 적용시작일자 중복 여부 확인
                var aplyStrDtList = provider.getFieldValues( 'aplyStrDt', 0, -1 );
                for ( var i = 0; i < aplyStrDtList.length ; i++ ) {
                    if ( i === dataRow) continue; // 자기자신 제외
                    // 중복되는경우
                    if ( aplyStrDtList[i] === aplyStrDt ) {
                        alert(detailPrestMsg.duplicatedAplyStrDtMsg);
                        provider.setValue( dataRow, fieldName, oldValue );
                        break;
                    }
                }

                // 적용종료일자가 없는경우 비교불가
                if ( aplyEndDt === '' ) return;

                // 적용종료일자 이후 일자 선택 불가
                if ( aplyStrDt > aplyEndDt ) {
                    alert(detailPrestMsg.afterEndApplyStartDateMsg);
                    provider.setValue( dataRow, fieldName, oldValue );
                }

                // 적용종료일자와 간격이 30일 이상인 일자 선택 불가
                var aplyStrDtm = new Date(newValue).getTime();
                var aplyEndDtm = new Date(aplyEndDt).getTime();
                var dateDiff = Math.ceil(( aplyEndDtm - aplyStrDtm ) / ( 1000 * 3600 * 24 ) );
                if ( dateDiff > 30 ) {
                    alert(detailPrestMsg.maxApplyPeriodMsg);
                    provider.setValue( dataRow, fieldName, oldValue );
                    return;
                }
            // 적용종료일자
            } else if ( fieldName === 'aplyEndDt' ) {

                var aplyStrDt = grid.getValue( dataRow, 'aplyStrDt' );
                var aplyEndDt = newValue;

                // 날짜를 선택하지 않은 경우
                if( aplyEndDt === undefined || aplyEndDt === '' ){
                    alert(detailPrestMsg.emptyApplyEndDateMsg);
                    provider.setValue( dataRow, fieldName, oldValue);
                    return;
                }

                // 현재 날짜 이전 일자 선택 불가
                if( aplyEndDt < toDate ) {
                    alert(detailPrestMsg.beforeTodayApplyEndDateMsg);
                    provider.setValue( dataRow, fieldName, oldValue);
                    return;
                }

                // 적용종료일자 중복 여부 확인
                var aplyEndDtList = provider.getFieldValues( 'aplyEndDt', 0, -1 );
                for ( var i = 0; i < aplyEndDtList.length ; i++ ) {
                    if ( i === dataRow) continue; // 자기자신 제외
                    // 중복되는경우
                    if ( aplyEndDtList[i] === aplyEndDt ) {
                        alert(detailPrestMsg.duplicatedAplyEndDtMsg);
                        provider.setValue( dataRow, fieldName, oldValue );
                        break;
                    }
                }

                // 적용시작일자가 없는경우 비교불가
                if ( aplyStrDt === '' ) return;

                // 적용시작일자 이전 일자 선택 불가
                if ( newValue < aplyStrDt ) {
                    alert(detailPrestMsg.beforeStartApplyEndDateMsg);
                    provider.setValue( dataRow, fieldName, oldValue );
                }

                // 적용종료일자와 간격이 30일 이상인 일자 선택 불가
                var aplyStrDtm = new Date(aplyStrDt).getTime();
                var aplyEndDtm = new Date(aplyEndDt).getTime();
                var dateDiff = Math.ceil(( aplyEndDtm - aplyStrDtm ) / ( 1000 * 3600 * 24 ) );

                if ( dateDiff > 30 ) {
                    alert(detailPrestMsg.maxApplyPeriodMsg);
                    provider.setValue( dataRow, fieldName, oldValue);
                    return;
                }

            // 사용여부 체크시
            } else if ( fieldName === 'useYn' && newValue === 'Y' ) {

                // 중복되는 적용기간이 있을경우 사용처리 불가
                var thisAplyStrDt = grid.getValue( dataRow, 'aplyStrDt' );
                var thisAplyEndDt = grid.getValue( dataRow, 'aplyEndDt' );

                // 적용 시작, 종료일자를 선택하지 않은 경우
                if ( thisAplyStrDt === '' || thisAplyEndDt === '' ) {
                    alert(detailPrestMsg.checkApplyDateBeforeUseMsg);
                    provider.setValue( dataRow, 'useYn', 'N' );
                    return;
                }

                var aplyStrDtList = provider.getFieldValues( 'aplyStrDt', 0, -1 );
                var aplyEndDtList = provider.getFieldValues( 'aplyEndDt', 0, -1 );

                for ( var i = 0; i < aplyStrDtList.length ; i++ ) {

                    if ( i === dataRow) continue; // 자기자신 제외
                    // 중복되지 않는 경우
                    if ( thisAplyEndDt < aplyStrDtList[i] || aplyEndDtList[i] < thisAplyStrDt ) {
                        continue;
                    }
                    alert(detailPrestMsg.duplicatedPeriodPrestMsg);
                    provider.setValue( dataRow, 'useYn', 'N' );
                    break;
                }

            }
        },
        // 그리드 변경 후 호출
        onEditChange : function (grid, index, value) {

            var fieldName = index.fieldName;
            if( fieldName === 'aplyStrDt' || fieldName === 'aplyEndDt' ){
                grid.commit(); // 강제로 onEditRowChanged() 호출
            }
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === 'prestNm' ) {
                // 증정메세지를 입력하지 않은경우
                if ( value === undefined || value === '' ) {
                    error.level = 'error';
                    error.message = detailPrestMsg.noPrestNmMsg;
                    return error;
                }
            }
        }
        ,onRowCountChanged : function (provider, count) {
            $('#detailPrestGridCnt').text(count);
        }
    }
    // 증정품 초기화
    ,resetPrestGrid : function ( ) {
        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.clearRows();
        provider.setRowCount(0);
    }
    // 증정품 유효성 체크
    ,validationCheck : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var rowState = provider.getAllStateRows();
        var dataRowList = rowState.created.concat(rowState.updated);
        var itemIndexList = grid.getItemsOfRows(dataRowList);
        var errList = grid.validateCells( itemIndexList, false);
        if(errList) {
            alert(errList[0].message);
            return false;
        }

        var rowcount = provider.getRowCount();
        if ( rowcount > 0 ) {

            var isEmpty = false;

            var aplyStrDtList =  provider.getFieldValues( 'aplyStrDt', 0, -1 );
            $.each( aplyStrDtList, function ( index, data ) {
                if( data === undefined || data === '' ){
                    alert(detailPrestMsg.emptyApplyStartDateMsg);
                    isEmpty = true;
                    return false;
                }
            });

            if( isEmpty ) return false;

            var aplyEndDtList =  provider.getFieldValues( 'aplyEndDt', 0, -1 );
            $.each( aplyEndDtList, function ( index, data ) {
                if( data === undefined || data === '' ){
                    alert(additionalInfoMsg.emptyApplyEndDateMsg);
                    isEmpty = true;
                    return false;
                }
            });

            if( isEmpty ) return false;
        }

        return true;

    }
    // 증정품 조회
    ,getPrestGrid : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        return provider.getJsonRows(0, -1);
    }
    // 증정품 세팅
    ,setPrestGrid : function ( gridData ) {

        if ( gridData === null ) return;

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        provider.fillJsonData( gridData, { fillMode: "set" } );
        grid.localSavePoint = provider.savePoint(true);

    }
}