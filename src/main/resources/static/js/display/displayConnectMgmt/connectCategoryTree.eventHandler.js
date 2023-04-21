$.namespace("connectCategoryTree.eventhandler");
connectCategoryTree.eventhandler = {

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
                    connectConnerGrid.eventhandler.onSearch(0, treeNode.dispCtgNo, true);
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
                if (localStorage.alertifyExists === 'true') {
                    this.zTree = $.fn.zTree.init($("#connectCategoryTree"), setting, zNodes);
                    zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                    openToast(msg.noSearchedDataMsg);
                    connectConnerGrid.eventhandler.onSearch(0, null);
                }
            } else {
                zNodes = data.category;
                this.zTree = $.fn.zTree.init($("#connectCategoryTree"), setting, zNodes);
                zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                var nodes = zTree.getNodes();
                if (nodes.length>0) {
                    that.expandFirstNodes(nodes);
                    zTree.selectNode(nodes[0]);  // 첫번째 노드 체크하기
                    connectConnerGrid.eventhandler.onSearch(0, nodes[0].dispCtgNo, true);
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
    }
};