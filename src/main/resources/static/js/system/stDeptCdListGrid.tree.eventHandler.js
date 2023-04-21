$.namespace("stDeptCdListTree.eventHandler");
stDeptCdListTree.eventHandler = {
	// 초기화
	init : function () {
		this.treeLoading(true);
	}

	// 표준 분류 목록 트리 세팅
	, treeLoading : function (isInit, tId) {
		var that = this;
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
			// 표준 분류 목록 노드 클릭시
			, callback: {
				onClick : function (event, treeId, treeNode) {
					that.setStDeptCdList(treeNode);
				}
			}
		};

		//표준 분류 목록 조회
		common.Ajax.sendRequest(
			"get"
			, _baseUrl + "system/userDeptMgmt.getUserDeptListWithHierarchy.do"
			, null
			, function ( nodes ) {
				that.zTreeObj = $.fn.zTree.init($("#stDeptCdListTree"), setting, nodes);
				var treeNodes = that.zTreeObj.getNodes();

				if(isInit){
					that.expandFirstNodes(treeNodes);
					that.setStDeptCdList(treeNodes[0]);
				}else {
					var node = that.zTreeObj.getNodeByTId(tId);
					var parentNode = that.zTreeObj.getNodeByTId(node.parentTId);
					that.zTreeObj.expandNode(parentNode,true,true,true);
					$('#'+tId+'_a').trigger('click');
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
	// 최상위 노드로 표준분류기본정보 세팅
	, setStDeptCdList( treeNode ){
		var deptCd = treeNode.deptCd;
		$("#uprDeptCd").val(deptCd);

		//표준 분류 기본 정보 조회
		stDeptCdListGrid.eventhandler.setting(deptCd, treeNode.tId);
	}
}


