listTree = {

    init : function(){
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
                    name : "cnslTypNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "cnslTypNo",
                    pIdKey: "uprCnslTypNo"
                }
            },
            callback: {
                onClick : function (event, treeId, treeNode) {
                    // if(treeNode.level === 3){
                    //     return;
                    // }
                    that.setCategoryInfoList(treeNode);
                }
            }
        };

        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/counselingTypeMgmt.getCounselingTypeList.do",
            null,
            function ( nodes ) {
                that.zTreeObj = $.fn.zTree.init($("#consultationTypeList"), setting, nodes);

                var treeNodes = that.zTreeObj.getNodes();
                that.expandFirstNodes(treeNodes);

                ////
                // var nodes = treeNodes.getNodes();
                // if (nodes.length>0) {
                //     treeNodes.expandAll("true");
                //     treeNodes.selectNode(nodes[0]);  // 첫번째 노드 체크하기
                // }
                ////
         });

    }

    // 트리 펼치기
    ,expandFirstNodes : function ( treeNodes ) {
        var that = this;
        treeNodes.forEach( function (node, index) {
            if(node.isFirstNode == true){
                that.zTreeObj.expandNode(node);
                if(node.isParent){
                    that.expandFirstNodes(node.children);
                }
            }
        });
    }
    // 최상위 노드로 표준분류기본정보 세팅
    ,setCategoryInfoList( treeNode ){
        consultationTypeListGrid.eventhandler.treeData = treeNode;
        consultationTypeListGrid.eventhandler.treeDepth = treeNode.level;
        consultationTypeListGrid.eventhandler.uprCnslTypNo = treeNode.cnslTypNo;
        consultationTypeListGrid.eventhandler.hierarchyText = treeNode.hierarchyText;
        consultationTypeListGrid.eventhandler.onSearch(0);
    }



}