/*globals org */
/*
 * Develop jQuery Plug-in standard format (using '$' alias)
 * (function($) { ... })(jQuery);
 * */

(function ($) {
	// doQuery, doSave
	// callbackForCommonSuccess, callbackForCommonError

	$.realGridUtils = {
		getGridView : function(gridName) {
			return com.x2commerce.common.Util.namespaceObj(gridName + ".settings.grid");
		},

		getRow : function(grid, dataRow) {
			return grid.getValues(grid.getItemIndex(dataRow));
		},

		removeAllData : function(grid) {
			grid.getDataSource().clearRows();
		},

		getActiveRow : function(grid) {
			return grid.getSelection().startItem;
		},

		setAlinkStyles : function(grid, columnName) {
			grid.setColumnProperty(columnName, "styles", {fontUnderline : "true", foreground : "#0000ff"});
		},

		getDropDownLabel : function(grid, columnName, itemIndex) {
			var column = grid.columnByName(columnName);
			var index = this.getDropDownIndex(grid, columnName, itemIndex);

			return index == -1 ? "" : column.labels[index];
		},

		getDropDownIndex : function(grid, columnName, itemIndex) {
			var currentValue = grid.getValue(itemIndex, columnName);
			var column = grid.columnByName(columnName);
			return column.values.indexOf(currentValue);
		},

		setDropDownIndex : function(grid, columnName, itemIndex, dropDownIndex) {
		    var column = grid.columnByName(columnName);
		    var dropDownValue = column.values[dropDownIndex];

		    grid.getDataSource().setValue(itemIndex, columnName, dropDownValue);
		},

		setDropDownValue : function(grid, columnName, itemIndex, value) {
			grid.getDataSource().setValue(itemIndex, columnName, value);
		},

		clearDropDown : function(grid, columnName) {
			var column = grid.columnByName(columnName);
			column.values = [];
			column.labels = [];
		},

		addDropDownItems : function(grid, columnName, label, value) {
		    var column = grid.columnByName(columnName);

/*
			grid 1.x
            column.values = !column.values ? [] : column.values;
            column.labels = !column.labels ? [] : column.labels;

            column.values.push(value);
            column.labels.push(label);

            grid.setColumn(column);
 */
			/*
				grid 2.x부터 아래와 같이 사용
			*/
			var values = !column.values ? [] : (column.values).slice();
			var labels = !column.labels ? [] : (column.labels).slice();

			values.push(value);
			labels.push(label);

			column.values = values;
			column.labels = labels;

            //grid.setColumn(column);
		},

		copyTo : function(source, target, deleted) {
			var self = this;
			var dataProvider = source.getDataSource();
			var checkedItems = source.getCheckedItems();

		    for (var idx = checkedItems.length - 1 ; idx >= 0 ; idx--) {
		    	var dataRow = source.getDataRow(checkedItems[idx]);
		    	var data = dataProvider.getJsonRow(dataRow);

		    	org.x2framework.realgrid.ButtonEventHandler.onAdd(self.getGridView(target), data);

		    	if (deleted) {
		    		dataProvider.setOptions({ softDeleting: false });
		            dataProvider.removeRow(dataRow);
		    	}
		    }

		    dataProvider.setOptions({ softDeleting: true });
		},

		/**
		 * @since 2017/01/06
		 * @desc source -> target copyTo 실행시 중복건이 있는 경우 제외.
		 */
		copyToOlive : function(source, target, deleted) {
            var self = this;
            var dataProvider = source.getDataSource();
            var tDataProvider = target.getDataSource();
            var checkedItems = source.getCheckedItems();

            var dupCnt = 0;
            for (var idx = checkedItems.length - 1 ; idx >= 0 ; idx--) {
                var dataRow = source.getDataRow(checkedItems[idx]);
                var data = dataProvider.getJsonRow(dataRow);

                for (var j = 0; tDataProvider.getRowCount() > j; j++){
                    var targetRow = target.getDataRow(j);
                    var targetData = tDataProvider.getJsonRow(targetRow);

//                  alert("Sourece:evtno-"+data.evtNo+"/mbrNo-"+data.mbrNo+"/tgtrSeq-"+data.tgtrSeq+
//                          "\nTarget:evtno-"+targetData.evtNo+"/mbrNo-"+targetData.mbrNo+"/tgtrSeq-"+targetData.tgtrSeq);

                    if(data.evtNo === targetData.evtNo && data.mbrNo === targetData.mbrNo && data.tgtrSeq === targetData.tgtrSeq){
                        dupCnt++;
                    }
                }

                if(dupCnt == 0){
                    org.x2framework.realgrid.ButtonEventHandler.onAdd(target, data);
                }

                if (deleted) {
                    dataProvider.setOptions({ softDeleting: false });
                    dataProvider.removeRow(dataRow);
                }
            }

            dataProvider.setOptions({ softDeleting: true });
        }

	};

	$.fn.getGridView = function() {
		var gridName = this[0].id;
		return $.realGridUtils.getGridView(gridName);
	};

	$.fn.getRow = function(dataRow){
		var gridName = this[0].id;
		return $.realGridUtils.getRow($.realGridUtils.getGridView(gridName), dataRow);
	};

	$.fn.removeAllData = function() {
		var gridName = this[0].id;
		$.realGridUtils.removeAllData($.realGridUtils.getGridView(gridName));
	};

	$.fn.getActiveRow = function() {
		var gridName = this[0].id;
		return $.realGridUtils.getActiveRow($.realGridUtils.getGridView(gridName));
	};

	$.fn.serializeObject = function() {
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	$.fn.setAlinkStyles = function(columnName) {
		var gridName = this[0].id;
		return $.realGridUtils.setAlinkStyles($.realGridUtils.getGridView(gridName), columnName);
	};

	$.fn.getDropDownLabel = function(columnName, index) {
		var gridName = this[0].id;
		return $.realGridUtils.getDropDownLabel($.realGridUtils.getGridView(gridName), columnName, index);
	};

	$.fn.getDropDownIndex = function(columnName, itemIndex) {
		var gridName = this[0].id;
		return $.realGridUtils.getDropDownIndex($.realGridUtils.getGridView(gridName), columnName, itemIndex);
	};

	$.fn.setDropDownIndex = function(columnName, itemIndex, dropDownIndex) {
		var gridName = this[0].id;
		return $.realGridUtils.setDropDownIndex($.realGridUtils.getGridView(gridName), columnName, itemIndex, dropDownIndex);
	};

	$.fn.setDropDownValue = function(columnName, itemIndex, value) {
		var gridName = this[0].id;
		return $.realGridUtils.setDropDownValue($.realGridUtils.getGridView(gridName), columnName, itemIndex, value);
	};

	$.fn.clearDropDown = function(columnName) {
		var gridName = this[0].id;
		return $.realGridUtils.clearDropDown($.realGridUtils.getGridView(gridName), columnName);
	};

	$.fn.addDropDownItems = function(columnName, label, value) {
		var gridName = this[0].id;
		return $.realGridUtils.addDropDownItems($.realGridUtils.getGridView(gridName), columnName, label, value);
	};

	$.fn.copyTo = function(target) {
		var gridName = this[0].id;
		return $.realGridUtils.copyTo($.realGridUtils.getGridView(gridName), target);
	};

})(jQuery);


