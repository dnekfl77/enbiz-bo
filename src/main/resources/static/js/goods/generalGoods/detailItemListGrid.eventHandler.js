var detailItemListMsg = x2coMessage.getMessage({
    noSelectedModOption : 'generalGoods.saleInfo.alert.msg.noSelectedModOption'
    ,noCheckedModItem : 'generalGoods.saleInfo.alert.msg.noCheckedModItem'
    ,cantChangeItmSaleStatCdWithSaleEndMsg : 'generalGoods.saleInfo.alert.msg.cantChangeItmSaleStatCdWithSaleEndMsg'
    ,saleStatCdCanBeChangeToSoldOutMsg : 'generalGoods.saleInfo.alert.msg.saleStatCdCanBeChangeToSoldOutMsg'
    ,saleStatCdCanBeChangeToSaleEndMsg : 'generalGoods.saleInfo.alert.msg.saleStatCdCanBeChangeToSaleEndMsg'
    ,noStkQtyMsg : 'generalGoods.saleInfo.alert.msg.noStkQtyMsg'
    ,noSoutNotiStdQtyMsg : 'generalGoods.saleInfo.alert.msg.noSoutNotiStdQtyMsg'
    ,noMinLmtQtyMsg : 'generalGoods.saleInfo.alert.msg.noMinLmtQtyMsg'
    ,noMaxLmtQtyMsg : 'generalGoods.saleInfo.alert.msg.noMaxLmtQtyMsg'
});

$.namespace('detailItemListGrid.eventhandler');
detailItemListGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();

        // 초기 단품 판매 상태
        this.preItemSaleStatCdList = [];
    }
    // 그리드 세팅
    ,gridSetting : function(){

        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if ( item.checked ) return 'rg-trcol_active';
        });
        this.grid.editOptions.commitLevel = "error";

    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 재고관리여부 선택값 변경
        $('#saleInfo :radio[name=stkMgrYn]').change( function () {
            var isManaged = ( this.value === 'Y')? true : false;
            that.changeStockManagedYn( isManaged );
        });

        // 단품품절알림여부 선택값 변경
        $('#saleInfo :radio[name=itmSoutNotiYn]').change( function () {
            var isNotified = ( this.value === 'Y')? true : false;
            that.changeItemSoldOutNotifyYn(isNotified );
        });

        // 구매수량제한여부 선택값 변경
        $('#saleInfo :radio[name=buyQtyLmtYn]').change( function () {
            var isLimited = ( this.value === 'Y')? true : false;
            that.changeBuyQtyLimitYn( isLimited );
        });

        // 변경취소
        $('#btn_reset_items').on( 'click', function () {
            that.resetItems();
        });

        // 선택목록일괄수정 버튼 클릭
        $('#btn_mod_items').on( 'click' , function () {
            that.modItems()
        });
    }
    // 재고관리여부 변경
    ,changeStockManagedYn : function ( isManaged ) {

        // 관리
        if( isManaged ) {
            // 단품품절알림여부 '사용' 변경 & 활성화
            $('#saleInfo :radio[name=itmSoutNotiYn][value=Y]').prop('checked', true);
            $('#saleInfo :radio[name=itmSoutNotiYn]').prop('disabled', false);
            this.changeItemSoldOutNotifyYn(true);

            // 재고수량 일괄수정 옵션 활성화
            $('#batchModType').val('');
            $('#batchModType option[value=01]').prop('disabled', false);

            // 단품등록 그리드 영역 재고수량 수정가능
            this.grid.columnByName('stkQty').editable = true;

        // 관리안함
        } else {
            // 단품품절알림여부 '사용안함' 변경 & 비활성화
            $('#saleInfo :radio[name=itmSoutNotiYn][value=N]').prop('checked', true);
            $('#saleInfo :radio[name=itmSoutNotiYn]').prop('disabled', true);
            this.changeItemSoldOutNotifyYn(false);

            // 재고수량 일괄수정 옵션 비활성화
            $('#batchModType').val('');
            $('#batchModType option[value=01]').prop('disabled', true);

            // 단품등록 그리드 영역 재고수량 0으로 세팅, 수정불가처리
            this.setColumnData('stkQty', 0);
            this.grid.columnByName('stkQty').editable = false;
        }
    }
    // 단품품절알림여부 변경
    ,changeItemSoldOutNotifyYn : function ( isNotified ) {

        // 알림 사용
        if( isNotified ) {

            // 품절알림기준수량 일괄수정 옵션 활성화
            $('#batchModType').val('');
            $('#batchModType option[value=02]').prop('disabled', false);

            this.grid.columnByName("soutNotiYn").readOnly = false;
            this.grid.columnByName('soutNotiStdQty').editable = true;

        // 알림 사용안함
        } else {

            // 품절알림기준수량 일괄수정 옵션 비활성화
            $('#batchModType').val('');
            $('#batchModType option[value=02]').prop('disabled', true);

            // 단품등록 그리드 영역 품절알림여부 'N' 세팅, 수정불가
            this.setColumnData( 'soutNotiYn', 'N' );
            this.grid.columnByName("soutNotiYn").readOnly = true;

            // 단품등록 그리드 영역 품절알림기준수량 0 세팅, 수정불가
            this.setColumnData( 'soutNotiStdQty', 0 );
            this.grid.columnByName('soutNotiStdQty').editable = false;
        }
    }
    // 구매수량제한여부 변경
    ,changeBuyQtyLimitYn : function ( isLimited ) {

        if ( isLimited ) {
            // 최소,최대구매수량 초기화 & 입력창 활성화
            $('#saleInfo input[name=minLmtQty], input[name=maxLmtQty]').val('').removeClass('disabled').attr('readOnly', false);
        } else {
            // 최소,최대구매수량 초기화 & 입력창 비활성화
            $('#saleInfo input[name=minLmtQty], input[name=maxLmtQty]').val('').addClass('disabled').attr('readOnly', true);
        }
    }
    // 선택목록 일괄수정
    ,modItems : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit();

        var type =  $('#batchModType').val();     // 수정 타입
        var value = $('#batchModQty').val();      // 수정값
        var typeName = ( type === '01') ? '재고수량' : '품절알림기준수량';
        var fieldName = ( type === '01') ? 'stkQty' : 'soutNotiStdQty';

        // 수정 타입을 선택하지 않은 경우
        if( type === '' ) {
            alert(detailItemListMsg.noSelectedModOption);
            return;
        }
        // 수정값을 입력하지 않은 경우
        if( value === '' ) {
            alert('일괄수정할 ' + typeName + '을 입력해주세요.');
            return;
        }

        // 수정할 단품을 선택하지 않은 경우
        var checkedItems = grid.getCheckedRows();
        if (checkedItems.length == 0) {
            alert(detailItemListMsg.noCheckedModItem);
            return;
        }

        // 수정 확인 메세지
        if(!confirm('선택된 단품의 ' + typeName + '을 ' + value + '으로 일괄 수정하시겠습니까?')) return;
        checkedItems.forEach( function ( rowNum ) {
            provider.setValue( rowNum, fieldName, value );
        });
    }
    ,resetItems : function () {
        this.defaultHandler.onCancel(this.grid);
    }
    // 컬럼 전체 데이터 값 변경
    ,setColumnData : function ( fieldName, value ) {

        this.grid.commit();

        var provider = this.grid.getDataSource();
        var rowcount = provider.getRowCount();

        if ( rowcount === 0 ) return;

        for ( var i = 0 ; i < rowcount ; i++ ) {
            provider.setValue( i, fieldName, (Array.isArray(value)? value[i] : value) );
        }
    }
    // 컬럼 전체 데이터 조회
    ,getColumnData : function ( fieldName ) {
        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit();

        return provider.getFieldValues( fieldName, 0, -1 );
    }
    // 단품등록 그리드 단품판매상태값 비교 > 상품 판매상태 변경시 사용
    ,checkItemSaleStateCode : function ( itmSaleStatCd ) {

        var itemSaleStatCdList = this.getColumnData('itmSaleStatCd');
        function isMatched(cd) { return cd === itmSaleStatCd;}
        return itemSaleStatCdList.every(isMatched);
    }
    // 단품등록 그리드 단품판매상태 세팅 > 상품 판매상태 변경시 사용
    ,setItemSaleStateCode : function ( itmSaleStatCd ) {

        if ( itmSaleStatCd === '' ) {
            this.setColumnData( 'itmSaleStatCd', this.preItemSaleStatCdList ); // 초기 단품 판매상태로 원복
            this.grid.columnByName('itmSaleStatCd').editable = true;
        } else {
            this.setColumnData( 'itmSaleStatCd', itmSaleStatCd );
            this.grid.columnByName('itmSaleStatCd').editable = false;
        }
    }
    // 그리드 필수 입력값 체크
    ,gridEvent : {
        onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {

            var provider = grid.getDataSource();
            var fieldName = provider.getOrgFieldName(field);

            //재고수량, 우선순위, 품절알림기준수량
            if ( fieldName === 'soutNotiYn') {
                if ( newValue === 'N') {
                    // 품절알림여부 체크 해제시 품절알림기준수량 0으로 세팅
                    grid.setValue(dataRow, 'soutNotiStdQty', 0);
                }
            } else if ( fieldName === 'itmSaleStatCd' ) {
                var preItemSaleStatCdList = detailItemListGrid.eventhandler.preItemSaleStatCdList;
                var postItemSaleStatCdList = detailItemListGrid.eventhandler.getColumnData('itmSaleStatCd');

                // 판매종료 단품은 판매상태 수정 불가
                if ( preItemSaleStatCdList[dataRow] === '40') {
                    alert(detailItemListMsg.cantChangeItmSaleStatCdWithSaleEndMsg);
                    grid.commit();
                    provider.setValue(dataRow, fieldName, oldValue);
                    return;
                }

                // 모든 단품판매상태가 '품절(20)'인 경우, 상품의 판매상태도 품절(20)로 변경
                if ( postItemSaleStatCdList.every(function (cd) { return cd === '20'; } )) {
                    if(confirm(detailItemListMsg.saleStatCdCanBeChangeToSoldOutMsg)) detailGoodsInfo.eventhandler.setGoodsSaleStateCode('20');
                }
                // 모든 단품판매상태가 '판매종료(40)'인 경우, 상품의 판매상태도 판매종료(40)로 변경
                if ( postItemSaleStatCdList.every(function (cd) { return cd === '40'; } )) {
                    if(confirm(detailItemListMsg.saleStatCdCanBeChangeToSaleEndMsg)) detailGoodsInfo.eventhandler.setGoodsSaleStateCode('40');
                }
            }
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === 'stkQty' ) {
                if ( value === undefined || value === '' ) {
                    error.level = 'error';
                    error.message = detailItemListMsg.noStkQtyMsg;
                    return error;
                }
            } else if ( column.fieldName === 'soutNotiStdQty') {
                if ( value === undefined || value === '' ) {
                    error.level = 'error';
                    error.message = detailItemListMsg.noSoutNotiStdQtyMsg;
                    return error;
                }
            }
        }
        ,onRowCountChanged : function (provider, count) {
            $('#detailItemListGridCnt').text(count);
        }
    }
    // 판매옵션 초기화
    ,resetSaleInfo : function () {

        $('#saleInfo')[0].reset();
        $('#saleInfo').find(":radio").prop('disabled', false);

        $('#batchModType').val('');
        $('#batchModType option').prop('disabled', false);

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit();

        provider.clearRows();                               // 그리드 데이터 초기화
        grid.setColumns(detailItemListGrid.settings.columns); // 그리드 컬럼 초기화

        // 저장 포인트 변경
        this.grid.localSavePoint = provider.savePoint(true);
    }
    // 판매옵션 유효성 체크
    ,validationCheck : function () {

        // 구매수량제한여부가 '사용'인 경우
        if ( $('#saleInfo :radio[name=buyQtyLmtYn]:checked').val() === 'Y' ) {

            // 최소수량 & 최대수량을 입력하지 않은 경우
            if ( $('#saleInfo :input[name=minLmtQty]').val() === '' ) {
                alert(detailItemListMsg.noMinLmtQtyMsg);
                $('#saleInfo :input[name=minLmtQty]').focus();
                return false;
            }
            if ( $('#saleInfo :input[name=maxLmtQty]').val() === '' ) {
                alert(detailItemListMsg.noMaxLmtQtyMsg);
                $('#saleInfo :input[name=maxLmtQty]').focus();
                return false;
            }
        }

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var rowState = provider.getAllStateRows();
        var dataRowList = rowState.updated;
        var itemIndexList = grid.getItemsOfRows(dataRowList);
        var errList = grid.validateCells( itemIndexList, false);
        if(errList) {
            alert(errList[0].message);
            return false;
        }

        return true;
    }
    // 판매옵션 조회
    ,getSaleInfo : function () {

        var grid = this.grid;
        grid.commit(true);

        var saleInfoForm = $('#saleInfo');
        var disabled = saleInfoForm.find(':radio:disabled').prop('disabled', false);
        var saleInfoObj = saleInfoForm.serializeObject();
        disabled.prop('disabled', true);

        // 최소,최대 구매수량값이 없는 경우 default 0 값으로 세팅
        if (saleInfoObj.minLmtQty === '') { saleInfoObj.minLmtQty = 0; };
        if (saleInfoObj.maxLmtQty === '') { saleInfoObj.maxLmtQty = 0; };

        saleInfoObj.detailItemListGridData = this.controller.extractGridPayloads(grid);

        return saleInfoObj;
    }
    // 판매옵션 세팅
    ,setSaleInfo : function ( saleInfoData ) {

        var prGoodsBase = saleInfoData.prGoodsBase;

        // 재고관리여부 세팅
        $('#saleInfo [name=stkMgrYn][value=' + prGoodsBase.stkMgrYn + ']').prop('checked', true);
        $('#batchModType option[value=01]').prop('disabled', (prGoodsBase.stkMgrYn === 'N'));

        // 단품품절알림여부 세팅
        $('#saleInfo [name=itmSoutNotiYn][value=' + prGoodsBase.itmSoutNotiYn + ']').prop('checked', true);
        $('#batchModType option[value=02]').prop('disabled', (prGoodsBase.itmSoutNotiYn === 'N'));

        // 구매수량제한여부 세팅
        // 상품유형이 '사은품(20)'일 경우, 구매수량제한여부 수정불가
        var buyQtyLmtYn = prGoodsBase.buyQtyLmtYn;
        $('[name=buyQtyLmtYn][value=' + buyQtyLmtYn + ']').prop('checked', true);
        $('[name=buyQtyLmtYn]').attr('disabled', (prGoodsBase.goodsTypCd === '20'));

        // 구매수량제한여부가 'Y'인 경우
        if (buyQtyLmtYn === 'Y') {
            // 최소/최대 구매수량 세팅
            $('#minLmtQty').val(prGoodsBase.minLmtQty);
            $('#maxLmtQty').val(prGoodsBase.maxLmtQty);
        }

        // 단품 세팅
        var prItmBaseList = saleInfoData.prItmBaseList;
        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        if ( prItmBaseList === null || prItmBaseList.length === 0) return;

        var columnNameList = [];
        for ( var i = 1; i < 6 ; i++ ) {
            var columnName = prItmBaseList[0]['optnCatNm'.concat(i)];
            if ( columnName === null ) break;
            columnNameList.push( columnName );
        }

        // 그리드 컬럼, 필드 세팅
        this.setGridFieldColumn(columnNameList);

        // 그리드 데이터 세팅
        provider.fillJsonData(prItmBaseList, { fillMode: "set" });

        // 그리드 현재 상태 저장
        grid.localSavePoint = provider.savePoint(true);

        // 초기 단품 판매상태 저장 - 복원용
        this.preItemSaleStatCdList = this.getColumnData('itmSaleStatCd');

    }
    // 그리드 컬럼, 필드 세팅
    ,setGridFieldColumn : function ( columnNameList ) {

        var grid = this.grid;
        var provider = grid.getDataSource();

        // 재고관리여부가 "관리안함"일 경우 재고수량 수정 불가
        var stkQtyEditable              = ( $('#saleInfo [name=stkMgrYn]:checked').val() === 'Y' ) ? true : false;
        // 단품품절알림여부가 "사용안함"일 경우 품절알림여부 & 품절알림기준수량 수정 불가
        var soutNotiStdQtyEditable      = ( $('#saleInfo [name=itmSoutNotiYn]:checked').val() === 'Y' ) ? true : false;
        var soutNotiYnReadOnly          = !soutNotiStdQtyEditable;

        // 기본 컬럼
        var columns = [
            { name: 'stkQty'          , fieldName: 'stkQty'          , width : 80   ,header: { text: detailItemListGridCol.stkQty + '*' }          , editor  : { type: 'number', integerOnly: true }, numberFormat: '0', editable: stkQtyEditable ,styleName: (stkQtyEditable)? '' : 'disable-column'},                                           // 재고수량
            { name: 'itmSaleStatCd'   , fieldName: 'itmSaleStatCd'   , width : 120  ,header: { text: detailItemListGridCol.itmSaleStatCd + '*' }   , editor  : { type: 'dropdown', textReadOnly: true }, values: ['10','20','30','40'], labels: ['판매중','품절','일시중단','판매종료'], lookupDisplay: true, sortable: false },                       // 단품판매상태
            { name: 'soutNotiYn'      , fieldName: 'soutNotiYn'      , width : 120  ,header: { text: detailItemListGridCol.soutNotiYn + '*' }      , renderer: { type: "check", trueValues: "Y", falseValues: "N"}, sortable: false, editable : false, readOnly : soutNotiYnReadOnly, styleName: (soutNotiYnReadOnly)? 'disable-column' : ''},    // 품절알림여부
            { name: 'soutNotiStdQty'  , fieldName: 'soutNotiStdQty'  , width : 120  ,header: { text: detailItemListGridCol.soutNotiStdQty + '*' }  , editor  : { type: 'number', integerOnly: true}, numberFormat: '0', editable: soutNotiStdQtyEditable, styleName: (soutNotiStdQtyEditable)? '' : 'disable-column'                              // 품절알림기준수량
                ,styleCallback : function( grid, dataCell ) {
                    var soutNotiYn = grid.getValue(dataCell.index.itemIndex, 'soutNotiYn');
                    return { editable : (soutNotiYn === 'Y')};
            }},
            { name: 'lgcItmNo'        , fieldName: 'lgcItmNo'        , width : 120  ,header: { text: detailItemListGridCol.lgcItmNo }              , editor  : { type: 'line', maxLength: 15}, styleName: 'left-column'}                                                                                                                          // 기간계단품번호
        ];

        // 기본 필드
        var fields = [
            { fieldName: 'stkQty'            ,  dataType: 'number'  }, // 재고수량
            { fieldName: 'itmSaleStatCd'     ,  dataType: 'text'    }, // 단품판매상태
            { fieldName: 'soutNotiYn'        ,  dataType: 'text'    }, // 품절알림여부
            { fieldName: 'soutNotiStdQty'    ,  dataType: 'number'  }, // 품절알림기준수량
            { fieldName: 'lgcItmNo'          ,  dataType: 'text'    }  // 기간계단품번호
        ];

        // 필드 추가
        columnNameList.forEach( function ( columnName, index ) {
            var fieldName = 'optnNm'.concat(index+1);
            fields.unshift({ fieldName: fieldName, dataType: 'text' });
            columns.unshift({ name: fieldName, fieldName: fieldName, width : 120, editable : false, styleName : 'disable-column', header : { text : columnName }});
        });

        fields.unshift({ fieldName: 'itmNo', dataType: 'text' });
        columns.unshift({ name: 'itmNo', fieldName: 'itmNo', width: 80, header: { text: detailItemListGridCol.itmNo }, editable: false, styleName: 'disable-column'});

        provider.setFields(fields);
        grid.setColumns(columns);
        grid.resetSize();

    }
}