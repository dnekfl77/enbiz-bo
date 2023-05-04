const batchLogGridHeaderMessage = {
		createTime : 'batchLog.grid.header.label.createTime'
	,	jobName : 'batchLog.grid.header.label.jobName'
	,	status : 'batchLog.grid.header.label.status'
	,	exitMessage : 'batchLog.grid.header.label.exitMessage'
	,	startTime : 'batchLog.grid.header.label.startTime'
	,	endTime : 'batchLog.grid.header.label.endTime'
};
const batchLogMessage = x2coMessage.getMessage(batchLogGridHeaderMessage);

$.namespace("batchLogGrid.settings");
batchLogGrid.settings = {
	fields: [
			{fieldName : "createTime"}			//기준일자
		,	{fieldName : "jobName"}				//배치프로그램명
		,	{fieldName : "status"}				//배치결과코드(CM008)
		,	{fieldName : "exitMessage"}		//배치로그내용
		,	{fieldName : "startTime"}			//배치시작일시
		,	{fieldName : "endTime"}				//배치종료일시
	]
	, columns: [
		//기준일자
		{
			name: "createTime"
			, fieldName: "createTime"
			, header: {text: batchLogMessage.createTime}
			, width : 150
			, readOnly : true
		}
		//배치프로그램명
		, {
			name: "jobName"
			, fieldName: "jobName"
			, styleName : "left-column"
			, header: {text: batchLogMessage.jobName}
			, width : 250
			, readOnly : true
		}
		//배치결과코드(CM008)
		, {
			name: "status"
			, fieldName: "status"
			, header: {text : batchLogMessage.status}
			, width : 150
			, readOnly : true
		}
		//배치로그내용
		, {
			name: "exitMessage"
			, fieldName: "exitMessage"
			, header: {text : batchLogMessage.exitMessage}
			, width : 300
			, readOnly : true
		}
		//배치시작일시
		, {
			name: "startTime"
			, fieldName: "startTime"
			, header: {text : batchLogMessage.startTime}
			, width : 150
			, readOnly : true
		}
		//배치종료일시
		, {
			name: "endTime"
			, fieldName: "endTime"
			, header: {text: batchLogMessage.endTime}
			, width : 150
			, readOnly : true
		}
	]
	, props : {
		  width : "100%"
		, autoFitHeight : true
		, sumRowVisible : false
		, checkbox : false
		, crud : false
        , paging : true              // 페이지네이션 사용 여부
		, form : "batchLogSearchForm"
		, action : _baseUrl + "system/batchLog.getBatchLogList.do"
	}
}