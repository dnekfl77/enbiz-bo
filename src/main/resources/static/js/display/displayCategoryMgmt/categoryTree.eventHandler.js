$.namespace("categoryTree.eventhandler");
categoryTree.eventhandler = {

    init : function () {
        this.treeLoading();
    },

    treeLoading : function(){
       var that = this;
       var setting = {
            view: {
                showLine: true,
                showIcon : true
            },
            data: {
                key : {
                  name : "dispCtgNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "dispCtgNo",
                    pIdKey: "uprDispCtgNo"
                }
            },
            callback: {
                onClick : function (event, treeId, treeNode) {
                    displayCategoryTotal.eventhandler.treeValue(treeNode);
                }
            }
       };
       var zNodes = [];
       var useYn = '';
       var dispYn = '';
       if( $("#tree_type").val() == "2") {
            useYn = "Y";
            dispYn = "Y";
       } else if( $("#tree_type").val() == "3") {
            useYn = "Y";
       }

       var param = {
              siteNo : $("#tree_siteNo").val()
            , shopTypCd : $("#tree_shopTypCd").val()
            , useYn : useYn
            , dispYn : dispYn
       };
       common.Ajax.sendJSONRequest(
           "GET",
           _baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtTree.do",
           param,
           function(data){
            if(data.category.length == 0 ){ // 검색 결과가 없는 경우
                this.zTree = $.fn.zTree.init($("#categoryTree"), setting, zNodes);
                zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                openToast(msg.noSearchedDataMsg);
                categoryTree.eventhandler.layoutSetting();
            } else {
                zNodes = data.category;
                this.zTree = $.fn.zTree.init($("#categoryTree"), setting, zNodes);
                zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                var nodes = zTree.getNodes();
                if (nodes.length>0) {
                    that.expandFirstNodes(nodes);
                    zTree.selectNode(nodes[0]);  // 첫번째 노드 체크하기
                    categoryTree.eventhandler.layoutSetting();
                    displayCategoryTotal.eventhandler.treeValue(nodes[0]); // 정보 조회
                }
            }
       });
    },

    // 트리 펼치기
    expandFirstNodes : function ( treeNodes ) {
        var that = this;
        treeNodes.forEach( function (node, index) {
            if(node.isFirstNode == true){
                this.zTree.expandNode(node);
                if(node.isParent){
                    that.expandFirstNodes(node.children);
                }
            }
        });
    },

    layoutSetting : function() {
        $("#mallInfo").css("display", "none");
        $("#categoryInfo").css("display", "none");
        $("#unstructuredInfo").css("display", "none");
        $("#subCategoryGridArea").css("display", "none");
        $("#unstructuredGridArea").css("display", "none");
        $("#displayGoodsGridArea").css("display", "none");
    }
};