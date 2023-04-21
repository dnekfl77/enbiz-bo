var itemListGridMsg = x2coMessage.getMessage({
    noEntrNoMsg                           : 'generalGoods.saleInfo.alert.msg.noEntrNoMsg'
    ,maxOptionsForCreateMsg                : 'generalGoods.saleInfo.alert.msg.maxOptionsForCreateMsg'
    ,alreadySelectedOptionClassMsg         : 'generalGoods.saleInfo.alert.msg.alreadySelectedOptionClassMsg'
    ,noCheckedOptionsForRemoveMsg          : 'generalGoods.saleInfo.alert.msg.noCheckedOptionsForRemoveMsg'
    ,noSelectedItemsForRemoveMsg           : 'generalGoods.saleInfo.alert.msg.noSelectedItemsForRemoveMsg'
    ,noSelectedModOption                   : 'generalGoods.saleInfo.alert.msg.noSelectedModOption'
    ,noCheckedModItem                      : 'generalGoods.saleInfo.alert.msg.noCheckedModItem'
    ,noOptionForCreateMsg                  : 'generalGoods.saleInfo.alert.msg.noOptionForCreateMsg'
    ,noSelectedOptionsForCreateMsg         : 'generalGoods.saleInfo.alert.msg.noSelectedOptionsForCreateMsg'
    ,noSelectedOptionClassMsg              : 'generalGoods.saleInfo.alert.msg.noSelectedOptionClassMsg'
    ,noMinLmtQtyMsg                        : 'generalGoods.saleInfo.alert.msg.noMinLmtQtyMsg'
    ,noMaxLmtQtyMsg                        : 'generalGoods.saleInfo.alert.msg.noMaxLmtQtyMsg'
    ,minItemCntMsg                         : 'generalGoods.saleInfo.alert.msg.minItemCntMsg'
    ,noItemStkQtyMsg                       : 'generalGoods.saleInfo.alert.msg.noItemStkQtyMsg'
    ,noItemSoutNotiStdQtyMsg               : 'generalGoods.saleInfo.alert.msg.noItemSoutNotiStdQtyMsg'
});

$.namespace('itemListGrid.eventhandler');
itemListGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    // 그리드 세팅
    ,gridSetting : function(){

        //그리드 셀 체크시 색상 변경 기능 추가
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if ( item.checked ) return 'rg-trcol_active';
        });
    }
    // 데이터 교환
    ,setSaleInfoData :  {
        // 기본정보 > 상품유형변경시 호출
        setOptnBuyQtyLmtYn : function ( goodsTypeCd ) {

            var that = itemListGrid.eventhandler;

            // 상품유형 : 사은품(20)
            if (goodsTypeCd === '20') {
                // 옵션 여부 '옵션 없음' 셋팅, 수정불가
                $('#saleInfo :radio[name=optnYn][value="N"]').prop('checked', true);
                $('#saleInfo :radio[name=optnYn]').prop('disabled', true);
                that.changeOptionYn(false);

                // 구매수량제한여부 '사용안함' 셋팅, 수정불가
                $('#saleInfo :radio[name=buyQtyLmtYn][value="N"]').prop('checked', true);
                $('#saleInfo :radio[name=buyQtyLmtYn]').prop('disabled', true);
                that.changeBuyQtyLimitYn(false);

            // 상품유형 : 일반상품 (10)
            } else {
                $('#saleInfo :radio[name=optnYn]').prop('disabled', false);

                $('#saleInfo :radio[name=buyQtyLmtYn][value="Y"]').prop('checked', true);
                $('#saleInfo :radio[name=buyQtyLmtYn]').prop('disabled', false);
                that.changeBuyQtyLimitYn(true);
            }
        }
        // 기본정보 > 협력사변경시 호출
        ,setEntrNo : function ( entrNo ) {

            var that = itemListGrid.eventhandler;

            that.entrNo = ( entrNo === null || entrNo === undefined || entrNo === ''   )? '' : entrNo.trim();
            that.resetOptionTable();                // 옵션등록 초기화
            that.resetItemGrid();                   // 단품등록 초기화
            that.getOptionClassCodeList( entrNo );  // 옵션분류코드목록 조회
        }
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

        // 옵션여부 선택값 변경시
        $('#saleInfo :radio[name=optnYn]').change( function () {
            var isOption = ( this.value === 'Y' )? true : false;
            that.changeOptionYn( isOption );
        });

        // 옵션 전체 선택,해제 -> 각 옵션 체크/해제
        $('#btn_check_all_option').click( function () {
            var checkBox = $('input[name=btn_check_option]');
            checkBox.prop('checked',this.checked);
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
    // 옵션여부 변경
    ,changeOptionYn : function ( isOption ) {

        // 옵션있음
        if ( isOption ) {
            this.changeOptionTableBtnState(true);    // 버튼 활성화
        // 옵션없음
        } else {
            this.resetOptionTable();                        // 옵션등록 초기화
            this.resetItemGrid();                           // 단품등록 초기화
            this.changeOptionTableBtnState(false);   // 옵션등록 버튼 비활성화
            this.changeItemGridBtnState(false);      // 단품등록 버튼 비활성화
        }
    }
    // 옵션등록 > 버튼 상태 변경
    ,changeOptionTableBtnState : function ( isActive ) {
        var that = this;

        if( isActive ) {
            $('#optionTable .button').removeClass('disabled');

            // 버튼 이벤트 바인딩
            $('#btn_add_option'     ).off('click').bind('click', function () { that.addOption();      });    // 옵션등록 > 행추가
            $('#btn_remove_options' ).off('click').bind('click', function () { that.removeOptions();  });    // 옵션등록 > 행삭제
            $('#btn_create_items'   ).off('click').bind('click', function () { that.createItems();    });    // 옵션등록 > 단품생성

        } else {
            $('#optionTable .button').addClass('disabled').unbind('click');
        }
    }
    // 옵션등록 > 옵션 등록 테이블 초기화
    ,resetOptionTable : function () {

        // 등록된 옵션 제거
        $('tr[type=newOption]').remove();
        // 옵션 총 건수 업데이트
        this.updateOptionTableCount();
    }
    // 옵션등록 > 행추가
    ,addOption : function () {

        var that = this;
        var entrNo = this.entrNo;

        // 협력사를 선택하지 않은 경우
        if( entrNo === undefined || entrNo === '' ){
            alert(itemListGridMsg.noEntrNoMsg);
            return;
        }

        // 옵션은 최대 5개 까지 등록 가능
        var optionCnt = $('tr[type=newOption]').length;
        if( optionCnt > 4 ){
            alert(itemListGridMsg.maxOptionsForCreateMsg);
            return;
        }

        // 옵션 추가
        var newOptionRow = $('tr[type=option_tmpl]').clone();
        newOptionRow.attr('type','newOption')
        newOptionRow.appendTo( $('#optionTable') );
        newOptionRow.show();

        // 옵션 총 건수 업데이트
        this.updateOptionTableCount();

        // 이벤트 바인딩 - 옵션 분류 변경시
        newOptionRow.find('select').bind( 'change', function () {

            var optionClassCode = $(this).val();

            // 이미 등록된 옵션분류인지 여부 확인
            if(that.isExistOptionClass()){
                alert(itemListGridMsg.alreadySelectedOptionClassMsg);
                // 옵션분류 초기화
                optionClassCode = '';
                $(this).val( '' );
            }

            // 옵션값 초기화
            var optionCodeDiv = $(this).parent().parent().find('div[name=optionCodeList]');
            optionCodeDiv.empty();

            // 옵션값 조회 ( 선택된 옵션 분류 코드 , 옵션값 추가 위치 )
            if( optionClassCode !== ''){
                that.getOptionCodeList( optionClassCode, optionCodeDiv );
            }

        });

        // 각 옵션 체크/해제 -> 전체 체크 체크/해제
        newOptionRow.find('input[name=btn_check_option]').bind( 'click', function () {
            var allCnt = $('tr[type=newOption] input[name=btn_check_option]').length              // 총 옵션 개수
            var checkedCnt = $('tr[type=newOption] input[name=btn_check_option]:checked').length; // 체크된 옵션 개수

            if( allCnt === checkedCnt ) {
                $('#btn_check_all_option').prop( 'checked', true );
                $('tr[type=option_tmpl] input[name=btn_check_option]').prop( 'checked', true );
            } else {
                $('#btn_check_all_option').prop('checked', false);
                $('tr[type=option_tmpl] input[name=btn_check_option]').prop( 'checked', false );
            }
        });

        return newOptionRow;
    }
    // 옵션등록 > 행삭제
    ,removeOptions : function () {
        var checkedOptions = $('tr[type=newOption] input[name=btn_check_option]:checked');

        // 체크된 옵션이 없는경우
        if ( checkedOptions.length === 0 ) {
            alert(itemListGridMsg.noCheckedOptionsForRemoveMsg);
            return;
        }

        // 체크된 옵션 삭제
        checkedOptions.each( function ( ) {
            $(this).parent().parent().remove();
        });

        // 옵션 총 건수 업데이트
        this.updateOptionTableCount();

    }
    // 옵션등록 > 옵션분류 조회
    ,getOptionClassCodeList : function ( entrNo ) {

        $('tr[type=option_tmpl] select[name=optionClassCode]').children().not(':first-child').remove();
        if ( entrNo === '' ) return;

        common.Ajax.sendRequestSync("GET"
            , _baseUrl + "goods/TemporaryGeneralGoods.getOptionCategoryList.do"
            , { entrNo : entrNo }
            , function ( data ) {
                if( Array.isArray(data) ) {
                    data.forEach( function ( optionClass ) {
                        $('tr[type=option_tmpl] select[name=optionClassCode]').append(
                            $('<option/>').val(optionClass.optnCatNo).text('[' + optionClass.optnCatRegGbCdNm + ']' + optionClass.optnCatNm)
                        )
                    });
                }
            },false
        );
    }
    // 옵션등록 > 옵션값 조회 ( 옵션 분류 번호, 옵션값 추가 위치 )
    ,getOptionCodeList : function ( optionClassCode, optionCodeDiv ) {

        common.Ajax.sendRequestSync("GET"
            , _baseUrl + "goods/TemporaryGeneralGoods.getOptionList.do"
            , { optnCatNo : optionClassCode }
            , function ( data ) {
                if(Array.isArray(data)) {
                    data.forEach( function ( option ) {
                        optionCodeDiv.append(
                            $('<label class="checkbox-inline"><input type="checkbox" name="optionCode" data-optnNo="'+option.optnNo+'"data-optnNm="'+ option.optnNm+'"/>' + option.optnNm + '</label>')
                        )
                    });
                }
            }, false
        );
    }
    // 옵션등록 > 옵션 분류 중복 선택 확인
    ,isExistOptionClass : function ( ) {

        var classCdList = $('[type=newOption]').find('[name=optionClassCode] option:selected');

        var oldClassCdList = [];
        for ( var i = 0; i < classCdList.length; i++ ) {
            var oldClassCode = $(classCdList[i]).val();
            if( oldClassCode === '' ) continue;
            if( $.inArray(oldClassCode, oldClassCdList) != -1 ){
                return true;
            }
            oldClassCdList.push(oldClassCode);
        }
        return false;
    }
    // 옵션등록 > 옵션 총 건수 업데이트
    ,updateOptionTableCount : function () {

        var optionCnt = $('tr[type=newOption]').length;
        $('#optionCnt').text( optionCnt );

        if( optionCnt === 0 ) {
            $('#btn_check_all_option').prop('checked', false);
            $('tr[type=option_tmpl] input[name=btn_check_option]').prop( 'checked', false );
        }
    }
    // 단품등록 > 버튼 상태 변경
    ,changeItemGridBtnState : function ( isActive ) {
        var that = this;

        if( isActive ) {
            $('#itemGrid .button').removeClass('disabled');

            // 버튼 이벤트 바인딩
            $('#btn_remove_items'   ).off('click').bind('click', function () { that.removeItems();    });    // 단품등록 > 행삭제
            $('#btn_reset_items'    ).off('click').bind('click', function () { that.resetItems();     });    // 단품등록 > 변경취소
            $('#btn_mod_items'      ).off('click').bind('click', function () { that.modItems();       });    // 단품등록 > 선택목록일괄수정

        } else {
            $('#itemGrid .button').addClass('disabled').unbind('click');
        }
    }
    // 단품등록 > 그리드 초기화
    ,resetItemGrid : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit();

        provider.clearRows();                           // 그리드 데이터 초기화
        grid.setColumns(itemListGrid.settings.columns); // 그리드 컬럼 초기화

        // 변경취소 저장 포인트 변경
        this.grid.localSavePoint = provider.savePoint(true);

        // 그리드 총 건수 업데이트
        this.updateGridCount();
    }
    // 단품등록 > 행삭제
    ,removeItems : function () {
        var grid = this.grid;
        var provider = grid.getDataSource();

        var checkedItems = grid.getCheckedRows();
        if (checkedItems.length == 0) {
            alert(itemListGridMsg.noSelectedItemsForRemoveMsg);
            return;
        }
        provider.softDeleting = false;
        provider.removeRows(checkedItems);

        // 그리드 총 건수 업데이트
        this.updateGridCount();
    }
    // 단품등록 > 변경취소
    ,resetItems : function () {

        this.defaultHandler.onCancel(this.grid);
        this.updateGridCount(); // 그리드 총 건수 업데이트
    }
    // 단품등록 > 일괄수정
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
            alert(itemListGridMsg.noSelectedModOption);
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
            alert(itemListGridMsg.noCheckedModItem);
            return;
        }

        // 수정 확인 메세지
        if(!confirm('선택된 단품의 ' + typeName + '을 ' + value + '으로 일괄 수정하시겠습니까?')) return;
        checkedItems.forEach( function ( rowNum ) {
            provider.setValue( rowNum, fieldName, value );
        });
    }
    // 단품등록 > 단품생성
    ,createItems : function () {

        if(!this.validateOption()) return;

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit();

        var optionData = [];        // 그리드 삽입
        var itemOptnInfo = [];      // 옵션 정보 저장
        var columnNameList = [];    // 컬럼 생성

        // 체크된 옵션 정보
        var checkedOptions = $('tr[type=newOption]').find('input[name=btn_check_option]:checked').parent().parent();
        checkedOptions.each( function ( index, option ) {

            var optionClassCodeNm = $(option).find('[name=optionClassCode] option:selected').text();
            var optionClassCodeNo = $(option).find('[name=optionClassCode] option:selected').val();
            columnNameList.push(optionClassCodeNm);

            // 선택된 옵션값 세팅
            var optionCodeList = $(option).find('input[name=optionCode]:checked');
            var temp = [];
            optionCodeList.each( function ( index, optionCode ) {
                var itemOption = {
                    optnCatNo : optionClassCodeNo
                    ,optnCatNm : optionClassCodeNm.split(']')[1] // 예) [공통]의류사이즈 -> 의류사이즈
                    ,optnNo : $(optionCode).attr('data-optnNo')
                    ,optnNm : $(optionCode).attr('data-optnNm')
                };
                temp.push(itemOption);
                itemOptnInfo.push(itemOption);
            })
            optionData.push( temp );
        });

        // 그리드 컬럼, 필드 세팅
        this.setGridFieldColumn(columnNameList);

        // 그리드에 데이터 세팅
        this.gridData = [];
        this.getGridData({},0, optionData );
        provider.fillJsonData(this.gridData, { fillMode: "set" });

        // 그리드 총 건수 업데이트
        this.updateGridCount();

        // 현재 그리드 상태 저장
        grid.localSavePoint = provider.savePoint(true);

        this.changeItemGridBtnState(true);      // 단품등록 버튼 활성화
        this.itemOptnInfo = itemOptnInfo;
    }
    // 단품등록 > 그리드 컬럼&필드 세팅
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
            { name: 'stkQty'          , fieldName: 'stkQty'          , width : 80   ,header: { text: itemListGridCol.stkQty + '*' }          , editor  : { type: 'number', integerOnly: true }, numberFormat: '0', editable: stkQtyEditable ,styleName: (stkQtyEditable)? '' : 'disable-column'},                                           // 재고수량
            { name: 'soutNotiYn'      , fieldName: 'soutNotiYn'      , width : 120  ,header: { text: itemListGridCol.soutNotiYn + '*' }      , renderer: { type: "check", trueValues: "Y", falseValues: "N"}, sortable: false, editable : false, readOnly : soutNotiYnReadOnly, styleName: (soutNotiYnReadOnly)? 'disable-column' : ''},    // 품절알림여부
            { name: 'soutNotiStdQty'  , fieldName: 'soutNotiStdQty'  , width : 120  ,header: { text: itemListGridCol.soutNotiStdQty + '*' }  , editor  : { type: 'number', integerOnly: true}, numberFormat: '0', editable: soutNotiStdQtyEditable, styleName: (soutNotiStdQtyEditable)? '' : 'disable-column'                            // 품절알림기준수량
                ,styleCallback : function( grid, dataCell ) {
                    var soutNotiYn = grid.getValue(dataCell.index.itemIndex, 'soutNotiYn');
                    return { editable : (soutNotiYn === 'Y')};
            }},
            { name: 'lgcItmNo'        , fieldName: 'lgcItmNo'        , width : 120  ,header: { text: itemListGridCol.lgcItmNo }              , editor  : { type: 'line', maxLength: 15}, styleName: 'left-column'}                                                                                                                          // 기간계단품번호
        ];

        // 기본 필드
        var fields = [
            { fieldName: 'stkQty'            ,  dataType: 'number'  }, // 재고수량
            { fieldName: 'soutNotiYn'        ,  dataType: 'text'    }, // 품절알림여부
            { fieldName: 'soutNotiStdQty'    ,  dataType: 'number'  }, // 품절알림기준수량
            { fieldName: 'lgcItmNo'          ,  dataType: 'text'    }  // 기간계단품번호
        ];

        // 필드 추가
        columnNameList.forEach( function ( columnName, index ) {
            var fieldNames = [
                'optnCatNo'.concat(index+1),  // 옵션분류번호
                'optnCatNm'.concat(index+1),  // 옵션분류명
                'optnNo'.concat(index+1),     // 옵션번호
                'optnNm'.concat(index+1),     // 옵션명
            ];

            fields.unshift({ fieldName: fieldNames[0], dataType: 'text' });
            fields.unshift({ fieldName: fieldNames[1], dataType: 'text' });
            fields.unshift({ fieldName: fieldNames[2], dataType: 'text' });
            fields.unshift({ fieldName: fieldNames[3], dataType: 'text' });

            columns.unshift({ name: fieldNames[0], fieldName: fieldNames[0], visible : false });
            columns.unshift({ name: fieldNames[1], fieldName: fieldNames[1], visible : false });
            columns.unshift({ name: fieldNames[2], fieldName: fieldNames[2], visible : false });
            columns.unshift({ name: fieldNames[4], fieldName: fieldNames[3], width : 120, editable : false, styleName : 'disable-column', header : { text : columnName }});
        });

        provider.setFields(fields);
        grid.setColumns(columns);
        grid.resetSize();
    }
    // 단품등록 > 그리드에 추가할 데이터 생성
    ,getGridData : function( optionData, idx, optionList){

        var that = this;
        var option = optionList[idx];

        // 단품품절알림여부값에 따라 품절알림여부 초기값 변경
        var soutNotiYn = ( $('#saleInfo [name=itmSoutNotiYn]:checked').val() === 'Y' ) ? 'Y' : 'N';

        for (var i = 0 ; i < option.length ; i++ ) {

            optionData['optnCatNo'.concat(idx+1)] = option[i].optnCatNo;
            optionData['optnCatNm'.concat(idx+1)] = option[i].optnCatNm;
            optionData['optnNo'.concat(idx+1)] = option[i].optnNo;
            optionData['optnNm'.concat(idx+1)] = option[i].optnNm;

            if( idx === optionList.length-1 ){
                var resultOptionData = JSON.parse(JSON.stringify(optionData));
                resultOptionData.stkQty = 0;
                resultOptionData.soutNotiYn = soutNotiYn;
                resultOptionData.soutNotiStdQty = 0
                resultOptionData.lgcItmNo = ''
                that.gridData.push(resultOptionData);
            }else {
                that.getGridData( optionData,idx+1, optionList )
            }
        }
    }
    // 단품등록 > 단품생성 가능 여부 확인
    ,validateOption : function () {

        // 추가된 행이 없을 경우
        var options = $('tr[type=newOption]');
        if( options.length === 0 ){
            alert(itemListGridMsg.noOptionForCreateMsg);
            return false;
        }

        // 체크된 행이 없을 경우
        var checkedOptions = options.find('input[name=btn_check_option]:checked').parent().parent();
        if( checkedOptions.length === 0 ){
            alert(itemListGridMsg.noSelectedOptionsForCreateMsg);
            return false;
        }

        // 체크된 행의 옵션분류,옵션값 확인
        for ( var i = 0; i < checkedOptions.length; i++ ) {

            var selectedOptionClassCode = $(checkedOptions[i]).find('[name=optionClassCode] option:selected').val();
            var selectedOptionClassName = $(checkedOptions[i]).find('[name=optionClassCode] option:selected').text();

            // 옵션분류를 선택하지 않은 경우
            if( selectedOptionClassCode === '' ){
                alert(itemListGridMsg.noSelectedOptionClassMsg);
                return false;
            }

            // 옵션값을 선택하지 않은 경우
            var checkedOptionCodeList =  $(checkedOptions[i]).find('input[name=optionCode]:checked');
            if( checkedOptionCodeList.length === 0 ){
                alert('옵션분류 "'+selectedOptionClassName+'"의 옵션값을 선택해주세요.');
                return false;
            }
        }
        return true;
    }
    // 단품등록 > 그리드 총 건수 업데이트
    ,updateGridCount : function () {

        var provider = this.grid.getDataSource();
        var rowCount = provider.getRowCount();

        $('#itemListGridCnt').text(rowCount);
    }
    // 단품등록 > 컬럼 데이터 변경
    ,setColumnData : function ( fieldName, value ) {

        this.grid.commit();

        var provider = this.grid.getDataSource();
        var rowcount = provider.getRowCount();

        if ( rowcount === 0 ) return;

        for ( var i = 0 ; i < rowcount ; i++ ) {
            provider.setValue( i, fieldName, value );
        }
    }
    // 단품등록 > 그리드 필수 입력값 체크
    ,gridEvent : {
        onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {

            var provider = grid.getDataSource();
            var fieldName = provider.getOrgFieldName(field);
            var columnName = (grid.getColumn(field).header.text).replace('*','');

            //재고수량, 우선순위, 품절알림기준수량
            if ( fieldName === 'stkQty' || fieldName === 'soutNotiStdQty' ) {
                if( newValue === undefined || newValue === '' ){
                    alert( columnName + '은(는) 필수값입니다. \n다시 입력해주세요.');
                    grid.commit();
                    provider.setValue(dataRow, fieldName, oldValue);
                }
            } else if ( fieldName === 'soutNotiYn') {
                if ( newValue === 'N') {
                    // 품절알림여부 체크 해제시 품절알림기준수량 0으로 세팅
                    grid.commit();
                    provider.setValue( dataRow, 'soutNotiStdQty', 0 );
                }
            }
        }
    }
    // 판매옵션 초기화
    ,resetSaleInfo : function ( ) {

        // Form 초기화
        $('#saleInfo')[0].reset();

        // Form 초기화 안되는 항목 수동 초기화
        $('#saleInfo').find(":radio").prop('disabled', false);
        $('#batchModType').val('');
        $('#batchModType option').prop('disabled', false);

        this.changeOptionYn(false);

    }
    // 판매옵션 유효성 체크
    ,validationCheck : function () {

        // 구매수량제한여부가 '사용'인 경우
        if ( $('#saleInfo :radio[name=buyQtyLmtYn]:checked').val() === 'Y' ) {

            // 최소수량 & 최대수량을 입력하지 않은 경우
            if ( $('#saleInfo :input[name=minLmtQty]').val() === '' ) {
                alert(itemListGridMsg.noMinLmtQtyMsg);
                $('#saleInfo :input[name=minLmtQty]').focus();
                return false;
            }
            if ( $('#saleInfo :input[name=maxLmtQty]').val() === '' ) {
                alert(itemListGridMsg.noMaxLmtQtyMsg);
                $('#saleInfo :input[name=maxLmtQty]').focus();
                return false;
            }

        }

        var grid = this.grid;
        var provider = grid.getDataSource();
        var rowCount = provider.getRowCount();
        grid.commit();

        // 옵션여부가 '옵션있음'이면서 등록된 단품이 없는경우 ( 최소 1개 이상 등록 필수 )
        if ( $('#saleInfo :radio[name=optnYn]:checked').val() === 'Y' && rowCount === 0  ) {
            alert(itemListGridMsg.minItemCntMsg);
            $('#batchModQty').focus();
            return false;
        }

        // 단품등록 그리드 필수입력값 확인
        if ( rowCount > 0 ) {

            // 재고수량을 입력하지 않은경우
            var stkQtyList =  provider.getFieldValues( 'stkQty', 0, -1 );
            for ( var i = 0; i < stkQtyList.length; i++ ) {
                if( stkQtyList[i] === undefined || stkQtyList[i] === '' ){
                    alert(itemListGridMsg.noItemStkQtyMsg);
                    $('#batchModQty').focus();
                    return false;
                }
            }

            // 품절알림기준수량 입력하지 않은경우
            var soutNotiStdQtyList =  provider.getFieldValues( 'soutNotiStdQty', 0, -1 );
            for ( var i = 0; i < soutNotiStdQtyList.length; i++ ) {
                if( soutNotiStdQtyList[i] === undefined || soutNotiStdQtyList[i] === '' ){
                    alert(itemListGridMsg.noItemSoutNotiStdQtyMsg);
                    $('#batchModQty').focus();
                    return false;
                }
            }
        }

        return true;
    }
    // 판매옵션 조회
    ,getSaleInfo : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var saleInfoForm = $('#saleInfo');
        var disabled = saleInfoForm.find(':radio:disabled').prop('disabled', false);
        var saleInfoObj = saleInfoForm.serializeObject();
        disabled.prop('disabled', true);

        // 최소,최대 구매수량값이 없는 경우 default 0 값으로 세팅
        if (saleInfoObj.minLmtQty === '') { saleInfoObj.minLmtQty = 0; };
        if (saleInfoObj.maxLmtQty === '') { saleInfoObj.maxLmtQty = 0; };

        var rowCount = provider.getRowCount();
        var gridData = provider.getJsonRows(0, -1);
        var itemBaseInfo = [];
        var itemOptnInfo = [];

        // 옵션여부가 옵션있음이고, 등록된 단품행이 1개 이상인 경우
        if ( $('#saleInfo :radio[name=optnYn]:checked').val() === 'Y' && rowCount > 0 ) {

            // 단품생성시 저장해둔 단품옵션정보 저장
            itemOptnInfo = ( this.itemOptnInfo === undefined )? [] : this.itemOptnInfo;

            // 그리드 단품정보 저장
             gridData.forEach( function ( data, index ) {
                 var itmNo = (index+1).toString().padStart(3,'0');
                 itemBaseInfo.push({
                     itmNo          : itmNo,                                                                        // 단품번호 ( 예시 : 001 )
                     stkQty         : data.stkQty,                                                                  // 재고수량
                     lgcItmNo       : data.lgcItmNo,                                                                // 기간계단품번호
                     soutCausCd     : '',                                                                           // 품절사유코드
                     soutNotiYn     : data.soutNotiYn,                                                              // 품절알림여부
                     soutNotiStdQty : data.soutNotiStdQty,                                                          // 품절알림기준수량
                     optnCatNo1     : data.optnCatNo1 === undefined ? '' : data.optnCatNo1,                         // 옵션분류번호_1
                     optnCatNm1     : data.optnCatNm1 === undefined ? '' : data.optnCatNm1,                         // 옵션분류명_1
                     optnNo1        : data.optnNo1    === undefined ? '' : data.optnNo1,                            // 옵션번호_1
                     optnNm1        : data.optnNm1    === undefined ? '' : data.optnNm1,                            // 옵션명_1
                     optnCatNo2     : data.optnCatNo2 === undefined ? '' : data.optnCatNo2,                         // 옵션분류번호_2
                     optnCatNm2     : data.optnCatNm2 === undefined ? '' : data.optnCatNm2,                         // 옵션분류명_2
                     optnNo2        : data.optnNo2    === undefined ? '' : data.optnNo2,                            // 옵션번호_2
                     optnNm2        : data.optnNm2    === undefined ? '' : data.optnNm2,                            // 옵션명_2
                     optnCatNo3     : data.optnCatNo3 === undefined ? '' : data.optnCatNo3,                         // 옵션분류번호_3
                     optnCatNm3     : data.optnCatNm3 === undefined ? '' : data.optnCatNm3,                         // 옵션분류명_3
                     optnNo3        : data.optnNo3    === undefined ? '' : data.optnNo3,                            // 옵션번호_3
                     optnNm3        : data.optnNm3    === undefined ? '' : data.optnNm3,                            // 옵션명_3
                     optnCatNo4     : data.optnCatNo4 === undefined ? '' : data.optnCatNo4,                         // 옵션분류번호_4
                     optnCatNm4     : data.optnCatNm4 === undefined ? '' : data.optnCatNm4,                         // 옵션분류명_4
                     optnNo4        : data.optnNo4    === undefined ? '' : data.optnNo4,                            // 옵션번호_4
                     optnNm4        : data.optnNm4    === undefined ? '' : data.optnNm4,                            // 옵션명_4
                     optnCatNo5     : data.optnCatNo5 === undefined ? '' : data.optnCatNo5,                         // 옵션분류번호_5
                     optnCatNm5     : data.optnCatNm5 === undefined ? '' : data.optnCatNm5,                         // 옵션분류명_5
                     optnNo5        : data.optnNo5    === undefined ? '' : data.optnNo5,                            // 옵션번호_5
                     optnNm5        : data.optnNm5    === undefined ? '' : data.optnNm5,                            // 옵션명_5
                 });
             });
        }

        saleInfoObj.itemOptnInfo = itemOptnInfo;
        saleInfoObj.itemBaseInfo = itemBaseInfo;

        return saleInfoObj;
    }
    // 상세 > 판매옵션 세팅
    ,setSaleInfo : function ( saleInfoData ) {

        var that = this;

        // 재고관리여부 세팅
        $('[name=stkMgrYn][value=' + saleInfoData.stkMgrYn + ']').prop('checked', true);
        $('#batchModType option[value=01]').prop('disabled', (saleInfoData.stkMgrYn === 'N'));

        // 단품품절알림여부 세팅
        $('[name=itmSoutNotiYn][value=' + saleInfoData.itmSoutNotiYn + ']').prop('checked', true);
        $('#batchModType option[value=02]').prop('disabled', (saleInfoData.itmSoutNotiYn === 'N'));

        // 구매수량제한여부 세팅
        // 상품유형이 '사은품(20)'일 경우, 구매수량제한여부 수정불가
        var buyQtyLmtYn = saleInfoData.buyQtyLmtYn;
        $('[name=buyQtyLmtYn][value=' + buyQtyLmtYn + ']').prop('checked', true);
        $('[name=buyQtyLmtYn]').attr('disabled', (saleInfoData.goodsTypCd === '20'));

        // 구매수량제한여부가 'Y'인 경우
        if (buyQtyLmtYn === 'Y') {
            // 최소/최대 구매수량 세팅
            $('#minLmtQty').val(saleInfoData.minLmtQty);
            $('#maxLmtQty').val(saleInfoData.maxLmtQty);
        }

        var prPregItmOptnInfoList = saleInfoData.prPregItmOptnInfoList;     // 옵션 목록
        var prPregItmBaseList = saleInfoData.prPregItmBaseList;             // 단품 목록

        // 옵션여부 세팅
        var optnYn = ( prPregItmOptnInfoList === null || prPregItmBaseList === null || prPregItmOptnInfoList.length === 0 || prPregItmBaseList.length === 0) ? 'N' : 'Y'; // 옵션 목록 & 단품 목록이 있을경우
        $(':radio[name=optnYn]').attr('disabled', (saleInfoData.goodsTypCd === '20')); // 상품유형이 '사은품(20)'일 경우, 옵션여부 수정불가

        $(':radio[name=optnYn][value=' + optnYn + ']').prop('checked', true);
        this.changeOptionYn((optnYn === 'Y'));

        // 옵션 세팅
        // 옵션 분류 select box 세팅
        this.entrNo = saleInfoData.entrNo;
        this.getOptionClassCodeList(saleInfoData.entrNo);

        // 단품 세팅
        if (optnYn === 'N') return;

        var columnNameList = [];
        var itemOptnInfo = [];

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit();

        $.each( prPregItmOptnInfoList, function ( index, itemOptionInfo ) {

            var optnCatNo = itemOptionInfo.optnCatNo;
            var optnCatNm = itemOptionInfo.optnCatNm;
            var optnNoList = itemOptionInfo.optnNo.split('/');
            var optnNmList = itemOptionInfo.optnNm.split('/');

            // 행추가 및 새로운 행의 옵션 분류 선택
            var newOptionRow = that.addOption();
            newOptionRow.find('[name=optionClassCode]').val(optnCatNo);

            // 선택된 옵션 분류의 옵션 값 조회
            that.getOptionCodeList( optnCatNo, newOptionRow.find('[name=optionCodeList]') );

            for ( var i = 0 ; i < optnNoList.length ; i++ ) {

                // 옵션값 선택
                newOptionRow.find('[data-optnno='+optnNoList[i]+']').prop('checked', true);
                // 저장 옵션 데이터 세팅
                itemOptnInfo.push({
                    optnCatNo : optnCatNo
                    ,optnCatNm : optnCatNm
                    ,optnNo :  optnNoList[i]
                    ,optnNm : optnNmList[i]
                });
            }
            // 생성 컬럼명 세팅
            columnNameList.push(optnCatNm);
        });

        this.itemOptnInfo = itemOptnInfo;

        // 그리드 컬럼, 필드 세팅
        this.setGridFieldColumn(columnNameList);

        // 그리드 데이터 세팅
        provider.fillJsonData(prPregItmBaseList, { fillMode: "set" });

        // 그리드 총 건수 업데이트
        this.updateGridCount();

        // 그리드 현재 상태 저장
        grid.localSavePoint = provider.savePoint(true);

        // 단품등록 버튼 활성화
        this.changeItemGridBtnState(true);
    }
}