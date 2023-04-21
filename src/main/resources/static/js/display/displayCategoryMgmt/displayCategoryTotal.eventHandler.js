$.namespace("displayCategoryTotal.eventhandler");
displayCategoryTotal.eventhandler = {
    // 초기화
    init : function () {
        this.bindTreeButtonEvent();
    },

    bindTreeButtonEvent : function(){
        var self = this;

        // 트리 상단 조회 조건 (사이트)
        $("#tree_siteNo").change(function() {
            categoryTree.eventhandler.init();
        });

        // 트리 상단 조회 조건 (매장)
        $("#tree_shopTypCd").change(function() {
            categoryTree.eventhandler.init();
        });

        // 트리 상단 조회 조건 (사용/전시 타입)
        $("#tree_type").change(function() {
            categoryTree.eventhandler.init();
        });

        // 몰 추가 버튼
        $("#btn_mallInfo_insert").click(function() {
            self.mallInsertPopup();
        });

    },

    // 템플릿 공통 팝업 호출
    templatePopupCall : function() {
        var pin = {
            argSelectType: '1',
            argTmplTypCd : ''
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/templateMgmtPopup.templateListPopup.do'
            , winName: 'templatePopup'
            , title: '템플릿 조회'
            , _title: '템플릿 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.templatePopupCallback);
    },

    // 템플릿 공통팝업 콜백
    templatePopupCallback : function(e){
        var resultData = JSON.parse(e.data);
        if($("#mallInfo").css("display") == "block") { // 몰 정보
            $('#mallInfo_tmplFilePath').val(resultData[0].tmplFilePath);
            $('#mallInfo_tmplNo').val(resultData[0].tmplNo);
        } else if($("#categoryInfo").css("display") == "block") { // 카테고리정보
            $('#categoryInfo_tmplFilePath').val(resultData[0].tmplFilePath);
            $('#categoryInfo_tmplNo').val(resultData[0].tmplNo);
        } else if($("#unstructuredInfo").css("display") == "block" && $('#unstructuredInfo_leafYn').val() == "Y" ) { // 비정형 카테고리정보
            $('#unstructuredInfo_tmplFilePath').val(resultData[0].tmplFilePath);
            $('#unstructuredInfo_tmplNo').val(resultData[0].tmplNo);
        }
    },

    // 전시 카테고리 공통팝업 호출
    displayCategoryTreeCall : function() {
        var pin = { siteNo : $("#tree_siteNo").val() };
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
        popCommon(pin, POP_DATA, this.popupDisplayCategoryTreeCallback);
    },

    // 전시카테고리 공통팝업 콜백
    popupDisplayCategoryTreeCallback : function(e) {
        var resultData = JSON.parse(e.data);
        if($("#mallInfo").css("display") == "block") { // 몰 정보
            $('#mallInfo_linkDispNm').val(resultData[0].dispCtgNm);
            $('#mallInfo_linkDispNo').val(resultData[0].dispCtgNo);
        } else if($("#categoryInfo").css("display") == "block") { // 카테고리정보
            $('#categoryInfo_linkDispNm').val(resultData[0].dispCtgNm);
            $('#categoryInfo_linkDispNo').val(resultData[0].dispCtgNo);
        } else if($("#unstructuredInfo").css("display") == "block" && $('#unstructuredInfo_leafYn').val() == "Y" ) { // 비정형 카테고리정보
            $('#unstructuredInfo_linkDispNm').val(resultData[0].dispCtgNm);
            $('#unstructuredInfo_linkDispNo').val(resultData[0].dispCtgNo);
        }
    },

    mallInsertPopup : function(){
        var self = this;
        var pin = { siteNo : $("#tree_siteNo").val(), shopTypCd : $("#tree_shopTypCd").val() };
        var POP_DATA = {
            url: _baseUrl + 'display/displayCategoryMgmt.displayCategoryMgmtMallInfoSaveView.do'
            , winName: 'mallInsert'
            , title: '몰 정보 등록'
            , _title: '몰 정보 등록'
            , left: 20
            , top: 20
            , width: 700
            , height: 318
            , scrollbars: true
            , autoresize: true
        };
        popCommon(pin, POP_DATA, function() { categoryTree.eventhandler.init(); });
    },

    // 트리에서 노드 클릭 시 이벤트
    treeValue : function(data) {
        if( $("#tree_shopTypCd").val() != "40" ){ // 비정형 매장이 아닌 경우
            if(data.level == 0) { // 몰
                $("#mallInfo").css("display", "");
                $("#categoryInfo").css("display", "none");
                $("#unstructuredInfo").css("display", "none");
                $("#subCategoryGridArea").css("display", "");
                $("#unstructuredGridArea").css("display", "none");
                $("#displayGoodsGridArea").css("display", "none");
                mallInfo.eventhandler.mallDetail(data.dispCtgNo);
                subCategoryGrid.eventhandler.valSetting(data);
                subCategoryGrid.eventhandler.onSearch(0,data.dispCtgNo,false);
            } else if(data.level > 0) { // 몰 이외 노드
                $("#mallInfo").css("display", "none");
                $("#categoryInfo").css("display", "");
                $("#unstructuredInfo").css("display", "none");
                $("#unstructuredGridArea").css("display", "none");
                categoryInfo.eventhandler.categoryDetail(data.dispCtgNo);
                if(data.leafYn == "N") {
                    $("#subCategoryGridArea").css("display", "");
                    $("#displayGoodsGridArea").css("display", "none");
                    subCategoryGrid.eventhandler.valSetting(data);
                    subCategoryGrid.eventhandler.onSearch(0,data.dispCtgNo,false);
                } else if(data.leafYn == "Y") {
                    $("#subCategoryGridArea").css("display", "none");
                    $("#displayGoodsGridArea").css("display", "");
                    displayGoodsGrid.eventhandler.valSetting(data);
                    displayGoodsGrid.eventhandler.onSearch(0,data.dispCtgNo,false);
                }
            }
        } else { // 비정형 매장인 경우
            if(data.level == 0) { // 몰
                $("#mallInfo").css("display", "");
                $("#categoryInfo").css("display", "none");
                $("#unstructuredInfo").css("display", "none");
                $("#subCategoryGridArea").css("display", "none");
                $("#unstructuredGridArea").css("display", "");
                $("#displayGoodsGridArea").css("display", "none");
                mallInfo.eventhandler.mallDetail(data.dispCtgNo);
                unstructuredGrid.eventhandler.valSetting(data);
                unstructuredGrid.eventhandler.onSearch(0,data.dispCtgNo,false);
            } else if(data.level > 0) { // 몰 이외 노드
                $("#mallInfo").css("display", "none");
                $("#categoryInfo").css("display", "none");
                $("#unstructuredInfo").css("display", "");
                $("#subCategoryGridArea").css("display", "none");
                $("#displayGoodsGridArea").css("display", "none");
                unstructuredInfo.eventhandler.mallDetail(data);

                if(data.leafYn == "N") {
                    $("#unstructuredGridArea").css("display", "");
                    unstructuredGrid.eventhandler.valSetting(data);
                    unstructuredGrid.eventhandler.onSearch(0,data.dispCtgNo,false);
                } else if(data.leafYn == "Y") {
                    $("#unstructuredGridArea").css("display", "none");
                }
            }
        }
        openToast(msg.searched)
    }

};