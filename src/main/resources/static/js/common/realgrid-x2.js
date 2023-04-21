$(function() {
    var grids = $("div[realGrid]");
    $.each(grids, function(index, item) {
    	common.RealGridControl.setupGrid(item.id);
        var gridAutoH = grids[index].id;
        var gridProps = com.x2commerce.common.Util.namespaceObj( gridAutoH + '.settings').props;

        if ( gridProps.autoFitHeight == true ) {
            var gridHeight = 0;
            if ( gridProps.popup == true ) { // 팝업화면인 경우
                // contentsTop = 조회영역 + 조회버튼영역 + 그리드상단영역
                var contentsTop = $(".header").outerHeight(true) + $(".search").height() + $(".button-group").outerHeight(true) + $(".grid-head").outerHeight(true);
                var contentsBottom = $(".button-group").outerHeight(true); // 하단버튼영역
                var bodyHeight = document.body.scrollHeight;
                var contentsPadding = $(".page-fixed").outerHeight(true) - $(".page-fixed").height();
                gridHeight = bodyHeight - contentsPadding - contentsTop - contentsBottom + 10;
                $( window ).on('resizeEnd', function() {
                    bodyHeight = document.body.scrollHeight;
                    gridHeight = bodyHeight - contentsPadding - contentsTop - contentsBottom + 10; // 그리드 높이 재계산
                    grids[index].style.height = gridHeight + "px";
                    com.x2commerce.common.Util.getGridView(gridAutoH).resetSize();
                } );
            } else { // 팝업화면이 아닌 경우(일반화면)
                // contentsTop = 조회영역 + 조회버튼영역 + 그리드상단영역
                //var contentsTop = $(".search").outerHeight(true) + $(".search-btn").outerHeight(true) + $(".title-area").outerHeight(true) + $(".option-area").outerHeight(true);
                //gridHeight = $(".page-fixed").height() - contentsTop; //  - gridMargin
                var contentsTop = $(".search").outerHeight(true) + $(".search-btn").outerHeight(true) + 50;
                gridHeight = $(".page-fixed").height() - contentsTop;

                $( window ).on('resizeEnd', function() {
                    gridHeight = $(".page-fixed").height() - contentsTop; // 그리드 높이 재계산
                    grids[index].style.height = gridHeight + "px";
                    com.x2commerce.common.Util.getGridView(gridAutoH).resetSize();
                } );
            }
            // 페이지 처음로딩 시 그리드 높이 설정
            grids[index].style.height = gridHeight + "px";
            com.x2commerce.common.Util.getGridView(gridAutoH).resetSize();
        }
    });
});

$.namespace("common.RealGridControl");
common.RealGridControl = {
    STR_GRID_ROOT_CONTEXT : _jsUrl + "common/realgrid",
    STR_GRID_EVENT_HANDLER : ".eventhandler",
    STR_GRID_SETTINGS : ".settings",
    util : com.x2commerce.common.Util,

    setupGrid : function(id) {
        this._setGridDivDimension(id);
        grid = this._initializeGrid(id);
        dataProvider = this._initializeDataProvider(grid);
        this._setGridOptions(grid);
        this._attachGridCallback(grid);
        this._setGridUtilities(grid);

        grid.resetSize();
    },

    _initializeGrid : function(id){
        grid = new RealGrid.GridView(id);

        var gridSetting = com.x2commerce.common.Util.namespaceObj(id + this.STR_GRID_SETTINGS);
        if (gridSetting.props.fitStyle == undefined)
            grid.setDisplayOptions({fitStyle : "none", parentChangable : true });
        else
            grid.setDisplayOptions({fitStyle : gridSetting.props.fitStyle, parentChangable : true });

        if (gridSetting.props.sumRowVisible == false)
            grid.footers.visible = gridSetting.props.sumRowVisible;

        grid.setColumns(gridSetting.columns);
        grid.localId = id;
        grid.onKeyDown = function (grid, key, ctrl, shift, alt) {
            if(ctrl && (key === 45 || key === 46)){
                return false;
            }
        };
        gridSetting.grid = grid;
        return grid;
    },

    _initializeDataProvider : function(grid){
        var dataProvider = new RealGrid.LocalDataProvider();
        grid.setDataSource(dataProvider);

        var gridSetting = com.x2commerce.common.Util.namespaceObj(grid.localId + this.STR_GRID_SETTINGS);
        dataProvider.setFields(gridSetting.fields);

        // row가 update될 경우, callback function
        dataProvider.onRowUpdated = function (provider, row) {
            grid.checkRow(row, true, false);
        };

        // 편집시 체크바에 체크하는 것 2021.06.08 추가
        dataProvider.onValueChanged = function (provider, row, field) {
            grid.checkRow(row, true);
        };

        // 행의 수가 변경되었을 경우, callback function
        var gridEventHandler = com.x2commerce.common.Util.namespaceObj(grid.localId + this.STR_GRID_EVENT_HANDLER);

        if (gridEventHandler.gridEvent && gridEventHandler.gridEvent.onRowCountChanged) {
        	dataProvider.onRowCountChanged = gridEventHandler.gridEvent.onRowCountChanged;
        }

        //grid용 prop 설정 추가
        grid.localProps = gridSetting.props;

        return dataProvider;
    },

    _setGridDivDimension : function(id){
        var gridSetting = com.x2commerce.common.Util.namespaceObj(id + this.STR_GRID_SETTINGS);
        var gridDiv = $("#" + id);

        var width = "100%";
        var height = "300px";
        if(gridSetting && gridSetting.props){
            var props = gridSetting.props;

            width = props.width ? props.width : "100%";
            height = props.autoFitHeight ? getGridHeight()
                    : props.height ? props.height : getGridHeight();
        }

        gridDiv.css("width", width);
        gridDiv.css("height", height);
    },

    _setGridUtilities : function(grid){
        grid.localParameters = {};
        grid.setParam = function(key, value){
            grid.localParameters[key] = value;
        };
        grid.getParam = function(key){
            return grid.localParameters[key];
        };
        grid.tryCommit = function(){
            var result = false;
            try{
                grid.commit();
                result = true;
            }catch(e){
                alert(e);
                result = false;
            }
            return result;
        };

        if(!grid.localProps){
            return;
        }

        //paging component
        if(!grid.localProps.paging){
            return;
        }

        var gridId = grid.localId;

        var gridButtonDiv = $(".option-area");
        var gridPagingDiv = gridButtonDiv.children("div[grid-id='"+gridId+"']");

        // total count 생성
        gridPagingDiv.append($("<span class='total'>총 <em id='"+gridId+"-totalcount'>0</em> 건</span>"));

        // rowsPerPage Select 생성
        gridPagingDiv.append($("<select class='form-control' id='"+gridId+"-select-rowsPerPage'></select>"));

        var rowsPerPageElement = $("#" + gridId + "-select-rowsPerPage");
        // var rows = grid.localProps.rows ? grid.localProps.rows : [100,200,500,1000,10000,50000];
        var rows = grid.localProps.rows ? grid.localProps.rows : [10,20,30,40,50];
        $.each(rows, function(key, value) {
            rowsPerPageElement
                .append($("<option></option>")
                           .attr("value",value)
                           .text(value + "개"));
       });
       rowsPerPageElement.val(grid.localProps.defrow).prop("selected", true);

       var defrow = grid.localProps.defrow ? grid.localProps.defrow : 10;
       rowsPerPageElement.val(defrow).prop("selected", true);
       rowsPerPageElement.on("change", common.RealGridEventHandler.rowsPerPageUpdated);

       // page Select 생성
       gridPagingDiv.append("<select class='form-control' id='"+gridId+"-select-page'></select>");
       var gridPagingElement = $("#"+gridId+"-select-page");
       gridPagingElement.append($("<option></option>")
                            .attr("value", "0")
                            .text("0 쪽"));
    },

    _setGridOptions : function(grid) {
    	 var gridSetting = com.x2commerce.common.Util.namespaceObj(grid.localId + this.STR_GRID_SETTINGS);
    	 var props = gridSetting.props;
    	 var isStateBar = false;
    	 var isCheckBar = false;

         if(gridSetting && props) {
             if(props.stateBar === undefined){ // stateBar 옵션이 있는경우 stateBar 먼저 적용
                isStateBar = props.crud !== undefined ? props.crud : isStateBar;
             }
             isCheckBar = props.checkbox !== undefined ? props.checkbox : isCheckBar;
         }

        grid.setOptions({
            panel : { visible : false },
            indicator : { displayValue: "index" },
            footer : { visible : true },
            stateBar : { visible : isStateBar },
            checkBar : { visible : isCheckBar },
            display : {},
            header : {},
            select : { style: 'rows' },
            edit: {
            	insertable : true,
                deletable : true,
                enterToNextRow : true,
                enterToTab : true
            },
            sortMode : "explicit"
        });


    	grid.stateBar.width = 30;
		grid.checkBar.width = 30;
		grid.header.height = 30;
        if(props.popup){
            var gridType = _gridType;
            if(gridType=='1'){
                grid.setCheckBar({
                    // exclusive: true,
                    // showAll: false
                    visible: false
                });
            }
        }

        grid.setDisplayOptions({
            selectionStyle : 'rows',
            rowHoverType : 'rows',
            rowFocusType : 'rows',
        });

        grid.getDataSource().setOptions({ softDeleting : true , restoreMode : "auto" });
// 더이상 없음.
//        grid.setStyles(common.RealGridTheme.generalBlueSkin);
    },

    _changeTheme : function(cssFile, cssLinkIndex) {
        var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);

        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
    },

    _attachGridCallback : function(grid){
        var gridEventHandler = com.x2commerce.common.Util.namespaceObj(grid.localId + this.STR_GRID_EVENT_HANDLER);
        if(!gridEventHandler){
        	return;
        }

        gridEventHandler.grid = grid;
        gridEventHandler.controller = this;
        gridEventHandler.defaultHandler = common.RealGridEventHandler;

        grid.onValidateColumn = this._onValidateColumn;
        grid.onItemChecked = this._onItemChecked;
        grid.onItemAllChecked = this._onItemAllChecked;

        if(gridEventHandler.gridEvent){
            var overridedFunctions = Object.getOwnPropertyNames(gridEventHandler.gridEvent);
            $.each(overridedFunctions, function(index, functionName){
                grid[functionName] = gridEventHandler.gridEvent[functionName];
            });
        }
    },

    _onValidateColumn : function(grid, column, inserting, value) {
        var validations = com.x2commerce.common.Util.namespaceObj(grid.localId + ".settings.validations");
        var error = {};

        if (typeof column == "undefined" || column == null || column == "") {
        	return error;
        }

        var dataProvider = grid.getDataSource();
        var fieldName = column.fieldName;

        var state = {'created' : 'c', 'updated' : 'u', 'none' : 'u'};
        var row = grid.getCurrent().dataRow;
        if (row < 0 ) { return error;}
        var rowState = dataProvider.getRowState(row);

        for (var index in validations) {
            if (fieldName == validations[index].fieldName){
            	var mode = validations[index].mode;
            	mode = !mode ? "cu" : mode.toLowerCase();

            	var initial = state[rowState];
            	if(mode.indexOf(initial) == -1){
            		continue;
            	}

                if (com.x2commerce.common.Util.evaluate(validations[index].criteria, value)){
                    error.level = validations[index].error.level;
                    error.message = validations[index].error.message;

					break;
                }
            }
        }

        return error;
    },

    _onItemChecked : function(grid, itemIndex, checked) {
        if(!grid.tryCommit()){
            return;
        }

    	var dataProvider = grid.getDataSource();
    	var row = grid.getDataRow(itemIndex);
    	var rowState = dataProvider.getRowState(row);

    	if (rowState == "created") {
    		return;
    	}

    	if (checked) {
    		dataProvider.setRowState(row, "updated", false);
    	}else {
    		if (rowState == "deleted") {
    			dataProvider.setRowState(row, "none", false);
    		}
    		dataProvider.restoreUpdatedRows([row]);
    	}
    },

    _onItemAllChecked : function (grid, checked) {
    	if(!grid.tryCommit()){
            return;
        }

    	var dataProvider = grid.getDataSource();
    	var count = grid.getItemCount();

    	for (var index = count - 1 ; index >= 0 ; index--) {
    		var row = grid.getDataRow(index);
    		var rowState = dataProvider.getRowState(row);

    		if (rowState == "created") {
    			return;
    		}

    		if (checked) {
    			if (rowState !== "deleted" && grid.isCheckable(index)) {
    				dataProvider.setRowState(row, "updated", false);
    			}
    		}else {
    			if (rowState == "deleted") {
    				dataProvider.setRowState(row, "none", false);
    			}
    			dataProvider.restoreUpdatedRows([row]);
    		}
    	}
    },

    beforeSend: function(){
		//저장, 삭제, 조회
		var html='';
		html+='<div class="spinner-back" id="progressBar">';
		html+='	<div class="spinner-border" role="status">';
		html+='		<span class="visually-hidden">Loading...</span>';
		html+='	</div>';
		html+='</div>';
		$('body').append(html);//progressBar show

    	if(localStorage.alertifyExists === undefined || localStorage.alertifyExists === 'false'){
//			alertify.message('요청이 처리중입니다. 잠시만 기다려주세요.', 0);
			localStorage.alertifyExists = 'true';
		}
    },

    afterSend: function(){
		$('#progressBar').remove();//progressBar Remove
    	if(localStorage.alertifyExists === 'true'){
//			alertify.dismissAll();
//			alertify.message('처리가 완료되었습니다.', 1);
			localStorage.alertifyExists = 'false';
		}
    },

    doQueryWithGrid : function(eventHandler, source) {
    	var that = this;
        var grid = eventHandler.grid;

        var sourceGrid = $.realGridUtils.getGridView(source);
        var sourcueDataProivder = sourceGrid.getDataSource();

        if (grid.queryFlag === grid.localId) {
        	// TODO 메세지 다국어 처리 필요
        	alert(_msg.inProcessMsg);
        	return;
        }

        grid.cancel();
        grid.queryFlag = grid.localId;

    	var payloads = {};
    	payloads[sourceGrid.localId] = sourcueDataProivder.getJsonRows(0, sourcueDataProivder.getRowCount() - 1);

        var submitForm = grid.localProps.form;
        if(submitForm){
            payloads.formPayload = $("#" + submitForm).serializeObject();
        }

        $.extend(payloads.formPayload, grid.localParameters);

        $.ajax({
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            contentType : "application/json",
            url : grid.localProps.action,
            cache : false,
            type : "post",
            data : JSON.stringify(payloads),
            dataType : "json",
            beforeSend: function(){
            	that.beforeSend();
            },
            success : function(data) {
            	if(typeof data === "string"){
            		data = $.parseJSON(data);
            	}
            	// data의 형식은 {'totalCount':'0', 'pageNo':0, 'pageSize':0, 'payloads':[]}
            	that.callbackForCommonSuccess(grid, data);
            	if(eventHandler.gridEvent && eventHandler.gridEvent.afterQuerySuccess){
            	    eventHandler.gridEvent.afterQuerySuccess(grid, data);
            	}
            },
            error : function(xhr, status, error){
            	that.callbackForCommonError(xhr, status, error);
                if(eventHandler.gridEvent && eventHandler.gridEvent.afterQueryError){
                    eventHandler.gridEvent.afterQueryError(xhr, status, error);
                }
            },
            complete : function(data) {
                //grid.setAllCheck(false);
                grid.localParameters = {};
                grid.queryFlag = undefined;
                that.afterSend();
            }
        });
    },

    doQuery : function(eventHandler, extraQueryString, pageNo, pageFunc, isPost, isOpenToast) {
        var that = this;
        var grid = eventHandler.grid;

        if (grid.queryFlag === grid.localId) {
        	// TODO 메세지 다국어 처리 필요
        	alert(_msg.inProcessMsg);
        	return;
        }

        grid.cancel();
        grid.queryFlag = grid.localId;

        var pin = {};
        var formName = grid.localProps.form;

        var queryString = !extraQueryString ? "" : extraQueryString ;
        var formParameters;
        try{
            formParameters = $("#" + formName).serialize();
        }catch(e){}
        queryString += formParameters ? "&" + formParameters : "";
        queryString += $.param(grid.localParameters) ? "&" + $.param(grid.localParameters) : "";

        if(grid.localProps.paging){
            pin.grid = grid;
            pin.pageNo = pageNo;
            pin.paging = true;
            pin.pageNumbers = pin.pageNumbers ? pin.pageNumbers : 10;
            pin.pageSize = $("#" + grid.localId + "-select-rowsPerPage").val();

            queryString += "&rowsPerPage=" + pin.pageSize  + "&pageIdx=" + (pageNo + 1);
        }

        var requestURL = grid.localProps.action + "?" + queryString;

        $.ajax({
            url : isPost ? grid.localProps.action : requestURL,
            method : isPost ? "POST" : "GET",
            data : isPost ? queryString : "",
            cache : false,
            dataType : "json",
            global : false,
            beforeSend: function(){
            	that.beforeSend();
            },
            success : function(data) {
            	if(typeof data === "string"){
            		data = $.parseJSON(data);
            	}
            	if(data.succeeded !== undefined && data.succeeded === false){
                    alert(data.message);
                    return;
                }
            	// data의 형식은 {'totalCount':'0', 'pageNo':0, 'pageSize':0, 'payloads':[]}

            	if (grid.localProps.paging) {
            		grid.onSearch = pageFunc;

            		var pageSize = pin.pageSize;
            		var totalCount = parseInt(data.totalCount);
                    var pageCount = ( !totalCount ) ? 1 : Math.floor(totalCount / pageSize) + (totalCount % pageSize === 0 ? 0 : 1); // 수정 ( 2021.09.03 ) - totalCount가 0인 경우 default 쪽수 1로 세팅

                    that._setPagingInfo(grid, pin, pageCount);
                    that._showPagingComponent(pin);
                    
            	}
            	
            	if(isOpenToast) {
					var totalCount = parseInt(data.totalCount);
                    if(totalCount == 0) {
						openToast(_msg.noSearchedDataMsg);
					} else {
						openToast(_msg.searchedDoneMsg);
					}
				}

            	that.callbackForCommonSuccess(grid, data);
				grid.setFocus();

            	if(eventHandler.gridEvent && eventHandler.gridEvent.afterQuerySuccess){
            	    eventHandler.gridEvent.afterQuerySuccess(grid, data);
            	}
            },
            error : function(xhr, status, error){
            	that.callbackForCommonError(xhr, status, error);
                if(eventHandler.gridEvent && eventHandler.gridEvent.afterQueryError){
                    eventHandler.gridEvent.afterQueryError(xhr, status, error);
                }
            },
            complete : function(data) {
                if(grid.localProps.popup){
                    if(_gridType !== '1' && grid.localProps.checkbox) {
                        grid.setAllCheck(false);
                    }
                }
                grid.localParameters = {};
                grid.queryFlag = undefined;
                that.afterSend();
            }
        });
    },

    _showToast : function( message ) {

        $('.toast').remove();
        var idx = new Date().getMilliseconds();
        $('body').append(`<div class="toast show" id="grid_toast_div_${idx}"><div class="toast-body">${message}</div></div>`);

        var toastDiv = $(`#grid_toast_div_${idx}`);
        var divTop = $(toastDiv).offset().top-60;     //top
        var divLeft = $( document ).width();    //width

        $(toastDiv).offset({top: divTop, left: divLeft});
        $(toastDiv).animate( {
            left: "-="+$(toastDiv).width()
        }, 300, function() {
            setTimeout(function(){
                $(toastDiv).animate( {
                    left: "+="+$(toastDiv).width()
                },200 , function() {
                    $(toastDiv).remove();
                });
            }, 1000);
        });
    },

    _setPagingInfo : function(grid, pin, pageCount){
        grid.setPaging(pin.paging, pin.pageSize, pageCount);

        grid.pageNo = pin.pageNo;
        grid.pageSize = pin.pageSize;
        grid.pageNumbers = pin.pageNumbers;
        grid.pageCount = pageCount;
    },

    callbackForCommonSuccess : function(grid, data) {

        var totalCount = parseInt(data.totalCount);
        var count = !grid.pageSize ? totalCount === 0 ? -1 : totalCount : grid.pageSize;

        grid.getDataSource().clearRows();
        grid.getDataSource().fillJsonData(data.payloads, {
            start : 0,
            count : count
        });

        $('#' + grid.localId + '-totalcount').text(' ' + totalCount + ' ');

        grid.closeLoading();

        common.RealGridControl._normalizeValues(grid);
        grid.localSavePoint = grid.getDataSource().savePoint(true);
    },

    callbackForCommonError : function(xhr, status, error) {
		$('#progressBar').remove();//progressBar Remove
        if(xhr && xhr.status){
            if (xhr.status === 401) { // unauthorized. 세션이 끊어진 경우. 로그인 페이지로 이동
				location.replace(_baseUrl + "loginForm.do");
			} else if (xhr.status === 500) {// 500인경우 시스템장애
				alert(_msg.systemError);
			} else if (xhr.status == 403 || xhr.status == 400) {//권한없음
				alert("Error : " + $.parseJSON(xhr.responseText).message);
			} else if (xhr.status == 424) {
				alert($.parseJSON(xhr.responseText).message);
			} else {
				alert(_msg.processError);	
			}
        }else{
           alert(_msg.processError);
        }
    },

    _showPagingComponent : function(pin) {
        var grid = pin.grid;
        var dataProvider = grid.getDataSource();

        var page = pin.pageNo;
        var count = grid.getPageCount();
        var pageSize = grid.pageSize;

        page = Math.max(0, Math.min(page, count - 1));

        grid.setPage(page, 0);
        grid.setRowIndicator({ rowOffset : page * pageSize });

        dataProvider.clearRows();

        var displayPage = parseInt(page) + 1;
        var pageNumbers = grid.pageNumbers;
        var startPage = Math.floor(page / pageNumbers) * pageNumbers + 1;
        var endPage = startPage + pageNumbers - 1;
        endPage = Math.min(endPage, grid.getPageCount());

        var gridPagingPageDiv = $("#"+grid.localId+"-select-page");
        gridPagingPageDiv.empty();
        gridPagingPageDiv.unbind("change");

        for(var i = 1 ; i <= count ; i ++){
            gridPagingPageDiv.append($("<option></option>").attr("value", i).text(i+"쪽"));
        }
        gridPagingPageDiv.val(page === 0 ? 1 : displayPage).attr("selected", "selected");
        gridPagingPageDiv.on("change", common.RealGridEventHandler.gotoPage);
    },

    _validateRowData : function(grid, data) {
        var that = this;
        var columnNames = Object.keys(data);
        for (var index = 0 ; index < columnNames.length ; index++) {
        	var columnName = columnNames[index];
            var column = grid.columnByName(columnName);
            var value = data[columnName];

            var error = that._onValidateColumn(grid, column, true, value);
            if(error.message){
                return error;
            }
        }

        return false;
    },

    _validateExistByChecked : function(grid) {
        var error = {};
        var checkedItems = grid.getCheckedItems();

        if (checkedItems.length == 0) {
            error.level = "error";
            error.message = _msg.noSelectedRowMsg;

            return error;
        }

        return false;
    },

    _validateCellsByCreateUpdate : function(grid, provider) {

        var rowState = provider.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = grid.getItemsOfRows(rowList);
        var errorData = grid.validateCells(indexList,false);

        if(errorData != null) {
            return errorData;
        }

        return false;
    },

    _validateAndExtractPayloads : function(grid) {
        var that = this;

        var payload = [];
        var validationError;

        var provider = grid.getDataSource();
        var rows = provider.getAllStateRows();

        var states = ["updated", "deleted", "created"];

        validationError = that._validateExistByChecked(grid);


        if(validationError){
            alert(validationError.message);
            return;
        }

        validationError = that._validateCellsByCreateUpdate(grid, provider);


        if(validationError){
            alert(validationError[0].message);
            return;
        }

        var extractPayloads = function(rows, provider, payload, states){
            $.each(states, function(index, state){
                if(validationError) {
                	return ;
                }

                $.each(rows[state], function(k, v) {
                    if(validationError) {
                    	return;
                    }

                    // 선택된 내역만 처리한다.
                    if ( grid.isCheckedRow(v) ) {
                        var data = provider.getJsonRow(v);

                        if(state === "created" || state === "updated"){
                            validationError = that._validateRowData(grid, data);


                            if(validationError){
                                alert(validationError.message);
                                return;
                            }
                        }

                        data.state = state;
                        payload.push(data);
                    }
                });
            });
        };

        extractPayloads(rows, provider, payload, states);

        if(validationError){
            return;
        }

        if (confirm(_msg.confirmSaveMsg) != true) {
            return;
        }

        return payload;
    },

    extractGridPayloads : function (grid) {

        var payload = [];
        var states = ["updated", "deleted", "created"];

        var provider = grid.getDataSource();
        var rows = provider.getAllStateRows();

        var extractPayloads = function(rows, provider, payload, states){
            $.each(states, function(index, state){
                $.each(rows[state], function(k, v) {
                    var data = provider.getJsonRow(v);
                    data.state = state;
                    payload.push(data);
                });
            });
        };

        extractPayloads(rows, provider, payload, states);

        return payload;
    },

    doSave : function(eventHandler, mainGridName, gridNames, forms) {
        var that = this;

        var mainGrid = that.util.getGridView(mainGridName);
        gridNames = !gridNames || gridNames.length === 0 ? [mainGridName] : gridNames;
    	var payloads = {};
    	var error = false;

    	$.each(gridNames, function(k, v) {
    		var grid = that.util.getGridView(v);
    		if(!grid){
    			return true;
    		}

    		if(!grid.tryCommit()){
                error = true;
                return false;
            }

    		var payload = that._validateAndExtractPayloads(grid);

    		if (!payload) {
    		    error = true;
    			return false;
    		}
    		if (payload.length === 0) {
                return true;
            }

    		payloads[v] = payload;
    	});

        if (error) {
            return false;
        }


    	if (mainGrid.saveFlag === mainGrid.localId) {
    		// TODO 메세지 다국어 처리 필요
    		alert(_msg.inProcessMsg);
    		return;
    	}

    	mainGrid.saveFlag = mainGrid.localId;

    	var formsSelector = "";
    	forms = typeof forms === "string" ? [forms] : forms;
    	if(forms instanceof Array){
    		formsSelector = forms.map(function(formId){
    			return "#"+formId;
    		}).reduce(function(a,b){
    			return a+", "+b;
    		});
    	}else{
    		formsSelector = "#" + mainGrid.localProps.form;
    	}
    	payloads.formPayload = $(formsSelector).serializeObject();

        $.extend(payloads.formPayload, mainGrid.localParameters);

        $.ajax({
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            contentType : "application/json",
            url : mainGrid.localProps.saveAction,
            type : "post",
            data : JSON.stringify(payloads),
            dataType : "json",
            beforeSend: function(){
            	that.beforeSend();
            },
            success : function(data){
            	if(typeof data === "string"){
            		data = $.parseJSON(data);
            	}
                if(data.succeeded !== undefined && data.succeeded === false){
                    alert(data.message);
                    return;
                }

                var payloadData = data.data;
                if(payloadData !== undefined && payloadData !== null && payloadData !== ""){
                    try{
                    	payloadData = $.parseJSON(payloadData);
                    }catch(exception){
                    	/*ignored*/
                    }
                    that.callbackForCommonSuccess(mainGrid, payloadData);
                }

                if(eventHandler.gridEvent && eventHandler.gridEvent.afterSaveSuccess){
                	that._clearGridsRowStates(gridNames);
                    eventHandler.gridEvent.afterSaveSuccess(eventHandler, mainGridName, gridNames, data);
                }

            },
            error :function(xhr, status, error) {
            	that.callbackForCommonError(xhr, status, error);

                if(eventHandler.gridEvent && eventHandler.gridEvent.afterSaveFail){
                    eventHandler.gridEvent.afterSaveFail(xhr, status, error);
                }
            },
            complete : function(data) {
                mainGrid.localParameters = {};
                mainGrid.saveFlag = undefined;
                that.afterSend();
            }
        });
    },

    _clearGridsRowStates : function(gridNames){
        var that = this;
        gridNames = !$.isArray(gridNames) ? [gridNames] : gridNames;
        $.each(gridNames, function(index, gridName){
            var grid = that.util.getGridView(gridName);
            grid.getDataSource().clearRowStates(false, true);
        });
    },

    doExcelLoad : function(pin,url){
        var that = this;
        var formData = new FormData();
        formData.append("excelFile", pin.uploadFile);
        formData.append("excelColumns", pin.dtoFields);
        formData.append("excelType", pin.dtoClass);

        var requestUrl = _baseUrl + "Admincommon/loadExcel.do";

        if(typeof url !== "undefined"){
            requestUrl = _baseUrl + url;
        }

        $.ajax({
            url: requestUrl,
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            type: 'POST',
            success: function(data){
                if(data.succeeded !== undefined && data.succeeded === false){
                    alert(data.message);
                    return;
                }

                var grid = that.util.getGridView(pin.gridName);

                var provider = grid.getDataSource();
                common.RealGridControl.callbackForCommonSuccess(grid, data);
                grid.checkAll(true, false, false);

                var rowCount = provider.getRowCount();
                for(var i = 0 ; i < rowCount ; i ++){
                    provider.setRowState(i, "created", true);
                }

                if(pin.completeCallback){
                    pin.completeCallback();
                }
            },
            error: function(jqXHR,error, errorThrown){
				if(xhr && xhr.status){
		            if (xhr.status === 401) { // unauthorized. 세션이 끊어진 경우. 로그인 페이지로 이동
						location.replace(_baseUrl + "loginForm.do");
					} else if (xhr.status === 500) {// 500인경우 시스템장애
						alert(_msg.systemError);
					} else if (xhr.status == 403 || xhr.status == 400) {//권한없음
						alert("Error : " + $.parseJSON(xhr.responseText).message);
					} else if (xhr.status == 424) {
						alert($.parseJSON(xhr.responseText).message);
					} else {
						alert(_msg.processError);	
					}
		        }else{
		           alert(_msg.processError);
		        }
            }
          });
    },

    _normalizeValues : function(grid){
        var gridColumns = grid.getColumns();
        var dataProvider = grid.getDataSource();
        var rowCount = dataProvider.getRowCount();
         var gridSetting = com.x2commerce.common.Util.namespaceObj(grid.localId + this.STR_GRID_SETTINGS).columns;

        $.each(gridColumns, function(index, column){
        	if(!column.values || column.values.length === 0
                    || !column.labels || column.labels.length === 0){
                return true;
            }

            var columnName = column.name;

            for(var row = 0; row < rowCount ; row ++){
                var currentValue = dataProvider.getValue(row, columnName);

                // common.RealGridControl._formatValue(dataProvider, gridSetting[index], row, column, currentValue);
                var found = common.RealGridControl._normalizeDropdownValue(dataProvider, row, column, currentValue);

                if(!found){
                    currentValue = !currentValue || currentValue === 'null' ? '' : '[Invalid]' +  currentValue;
                    dataProvider.setValue(row, columnName, currentValue);
                    dataProvider.setRowState(row, "none", false);
                }
            }
        });
    },

    _normalizeDropdownValue : function(dataProvider, row, column, currentValue){
    	if(!column.values || !column.labels || !currentValue){
            return true;
        }

        if(typeof currentValue === "string" && currentValue.length === 0){
            return true;
        }

        var found = false;
        var columnName = column.name;
        var columnValues = column.values;
        var columnLabels = column.labels;

        if(!columnValues || columnValues.length === 0){
            return true;
        }

        $.each(columnValues, function(columnValueIdx, columnValue){
            var columnLabel = columnLabels[columnValueIdx];
            if(columnValue == currentValue){
                found = true;
                return true;
            }
            if(columnLabel == currentValue){
                dataProvider.setValue(row, columnName, columnValue);
                found = true;
                return true;
            }
        });

        return found;
    },

    _formatValue : function(dataProvider, setting, row, column, currentValue){
        if(setting.format === undefined || setting.format === null) {
            return;
        }

        try{
            var convertedValue = VMasker.toPattern(currentValue, setting.format);
            dataProvider.setValue(row, column.name, convertedValue);
            dataProvider.setRowState(row, "none", false);
        }catch(e){
            console.log(e);
        }
    }
};
