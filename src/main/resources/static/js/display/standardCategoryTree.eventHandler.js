$.namespace("standardCategoryTree.eventhandler");
standardCategoryTree.eventhandler = {
    // 초기화
    init : function () {
        this.treeLoading();
    },
    // 표준 분류 목록 트리 세팅
    treeLoading : function () {
        var that = this;
        var setting = {
            view : {
                dblClickExpand : false
            },
            data: {
                key : {
                    name : "stdCtgNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "stdCtgNo",
                    pIdKey: "uprStdCtgNo"
                }
            },
            // 표준 분류 목록 노드 클릭시
            callback: {
                onClick : function (event, treeId, treeNode) {
                    that.setCategoryInfoList(treeNode);
                }
            }
        };

        //표준 분류 목록 조회
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "display/standardCategoryMgmt.getStandardCategoryMgmt.do",
            null,
            function ( nodes ) {
                that.zTreeObj = $.fn.zTree.init($("#categoryListTree"), setting, nodes);

                var treeNodes = that.zTreeObj.getNodes();
                that.expandFirstNodes(treeNodes);
                that.setCategoryInfoList(treeNodes[0]);
        });

    }
    // 트리 펼치기
    ,expandFirstNodes : function ( treeNodes ) {
        var that = this;
        treeNodes.forEach( function (node, index) {
            if(node.isFirstNode){
                that.zTreeObj.expandNode(node);
                if(node.isParent){
                    that.expandFirstNodes(node.children);
                }
            }
        });
    }
    // 최상위 노드로 표준분류기본정보 세팅
    ,setCategoryInfoList( treeNode ){

        var stdCtgNo = treeNode.stdCtgNo;
        var leafCtgYn = treeNode.leafCtgYn;

        //표준 분류 기본 정보 조회
        standardCategoryMgmt.eventhandler.infoSetting(treeNode);

        if(leafCtgYn !== 'Y'){
            $('#categoryList').show();
            $('#goodsList').hide();
            standardCategoryGrid.eventhandler.init(treeNode);    //하위 표준 분류 목록 조회
        } else {
            $('#categoryList').hide();
            $('#goodsList').show();
            standardCategoryGoodsGrid.eventhandler.init(stdCtgNo);       //표준 분류 상품 목록 조회
        }

    }
}


