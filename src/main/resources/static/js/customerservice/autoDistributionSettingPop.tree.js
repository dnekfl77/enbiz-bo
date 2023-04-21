listTree = {

    init : function(){
        this.treeLoading();
    },

    treeLoading : function () {
        var that = this;
        var setting = {
            view : {
                dblClickExpand : false
            },
            data: {
                key : {
                    name : "deptNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "deptCd",
                    pIdKey: "uprDeptCd"
                }
            },
            callback: {
                onClick : function (event, treeId, treeNode) {
                    that.setDeptUserList(treeNode);
                }
            }
        };

        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/csAllocationMgmt.getCsDeptList.do",
            null,
            function ( nodes ) {
                that.zTreeObj = $.fn.zTree.init($("#deptCdList"), setting, nodes);

                var treeNodes = that.zTreeObj.getNodes();
                that.expandFirstNodes(treeNodes);

                that.setDeptUserList(treeNodes[0]);
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
    ,setDeptUserList( treeNode ){
        autoDistributionUserGrid.eventhandler.deptCd = treeNode.deptCd;
        autoDistributionUserGrid.eventhandler.jobGrpCd = treeNode.jobGrpCd;
        autoDistributionUserGrid.eventhandler.onSearch(0);
        autoDistributionSettingPopGrid.eventhandler.deptCd = treeNode.deptCd;
        autoDistributionSettingPopGrid.eventhandler.onSearch(0);
    }


}