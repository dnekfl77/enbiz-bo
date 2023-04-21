$.namespace('standardCategoryGrid.settings')
standardCategoryGrid.settings = {
    fields : [
        { fieldName: 'stdCtgNo'},
        { fieldName: 'stdCtgNm'},
        { fieldName: 'useYn'},
        { fieldName: 'sortSeq', dataType: 'number'},
        { fieldName: 'leafCtgYn'},
        { fieldName: 'sysModId'},
        { fieldName: 'sysModDtm'},
        { fieldName: 'uprStdCtgNo'},
        { fieldName: 'leafCtgYnChangePossible'}
    ]
    ,columns : [
        {
            // 표준분류번호
            name: 'stdCtgNo',
            fieldName: 'stdCtgNo',
            width : 80,
            editable : false,
            styleName: 'disable-column',
            header: { text: msg.stdCtgNo }
        }, {
            // 표준분류명
            name: 'stdCtgNm',
            fieldName: 'stdCtgNm',
            width : 200,
            styleName: 'left-column',
            editor : {
                maxLength: 200
            },
            header: { text: msg.stdCtgNm + ' *' }
        }, {
            // 사용여부
            name: 'useYn',
            fieldName: 'useYn',
            width : 70,
            header: { text: msg.useYn + ' *' },
            sortable: false,
            lookupDisplay: true,
            editable : false,
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N"
            }
        }, {
            // 정렬순서
            name: 'sortSeq',
            fieldName: 'sortSeq',
            width : 70,
            header: { text: msg.sortSeq + ' *' },
            editor: {
                type: 'number',
                integerOnly: true,
                maxIntegerLength: 5
            },
            numberFormat : '0'
        }, {
            // 리프표준분류여부
            name: 'leafCtgYn',
            fieldName: 'leafCtgYn',
            width : 110,
            header: { text: msg.leafCtgYn + ' *' },
            sortable: false,
            editable : false,
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N"
            },
            styleCallback: function(grid, dataCell){
                var ret = {}
                var leafCtgYnChangePossible = grid.getValue(dataCell.index.itemIndex, "leafCtgYnChangePossible");
                if(leafCtgYnChangePossible ==='N'){
                    ret.readOnly = true;
                }
                return ret;
            }
        }, {
            // 수정자
            name: 'sysModId',
            fieldName: 'sysModId',
            width : 100,
            editable : false,
            styleName: 'disable-column',
            header: { text: msg.sysModId }
        }, {
            // 수정일시
            name: 'sysModDtm',
            fieldName: 'sysModDtm',
            width : 150,
            editable : false,
            styleName: 'disable-column',
            header: { text: msg.sysModDtm }
        }, {
            // 상위표준카테고리번호
            name: 'uprStdCtgNo',
            fieldName: 'uprStdCtgNo',
            visible : false
        }, {
            // 리프표준분류여부
            name: 'leafCtgYnChangePossible',
            fieldName: 'leafCtgYnChangePossible',
            visible : false
        }
    ]
    ,props : {
          width : "100%"
        , form : 'categoryListForm'   // 서버로 전달할 데이터 Form ID값
        , autoFitHeight : true        // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        , popup : false               // 그리드 설정 - 팝업 자동 resize
        , checkbox : true             // 그리드 설정 - 체크박스 필드 노출 여부
        , crud : true                 // 그리드 설정 - 상태 필드 노출 여부
        , sumRowVisible : false       // 그리드 설정 - 하단 합계 영역 노출 여부
        , paging : true               // 페이지네이션 사용 여부
        , action : _baseUrl + 'display/standardCategoryMgmt.getStandardCategoryMgmtChildList.do'
        , saveAction : _baseUrl + 'display/standardCategoryMgmt.saveStandardCategoryChild.do'
    }
}