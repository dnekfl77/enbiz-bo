$.namespace("userDeptMgmtTree.eventHandler");
userDeptMgmtTree.eventHandler = {
	// 초기화
	init : function () {
		this.treeLoading();
		this.bindButtonEvent();
	}
	, bindButtonEvent : function(){
        $('#btn_popup_bottom_close').click(function() {
            window.close();
        });
    }
	, treeLoading : function () {
		var that = this;
		var onlyOneNode = 0;
		var setting = {
			view : {dblClickExpand : false}
			, data: {
				key : {name : "deptNm"}
				, simpleData: {
					enable: true
					, idKey: "deptCd"
					, pIdKey: "uprDeptCd"
				}
			}
			, callback: {
				beforeClick: function(treeId, treeNode){
                    if(treeNode.isParent == false) { // 최하위 노드
                        if(treeNode.level == "0"){ // 노드가 하나인 경우
                            if(onlyOneNode == 0){
                                onlyOneNode++;
                                return;
                            }else{
                                const selectDataList = [];
                                var dataList = {};
                                dataList.deptCd = treeNode.deptCd;
                                dataList.deptNm = treeNode.deptNm;
                                selectDataList.push(dataList);
                                window.postMessage(JSON.stringify(selectDataList), _baseUrl);
                                window.close();
                            }
                        }
                        else {
                                const selectDataList = [];
                                var dataList = {};
                                dataList.deptCd = treeNode.deptCd;
                                dataList.deptNm = treeNode.deptNm;
                                selectDataList.push(dataList);
                                window.postMessage(JSON.stringify(selectDataList), _baseUrl);
                                window.close();
                        }
                    }
                    return;
                }
			}
		};

		common.Ajax.sendRequest(
			"get"
			, _baseUrl + "popup/userMgmtPopup.userDeptMgmtList.do"
			, null
			, function ( nodes ) {
				that.zTreeObj = $.fn.zTree.init($("#tree"), setting, nodes.data);
				var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                var nodes = zTree.getNodes();
                if (nodes.length>0) {
                    zTree.expandAll("true");
                }
			}
		);
	}
	// 트리 펼치기
	, expandFirstNodes : function ( treeNodes ) {
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
}


