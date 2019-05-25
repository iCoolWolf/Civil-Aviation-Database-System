//初始化函数方法
$(function(){
	//文本自动补充
	$("#airport").autocomplete(airports, {
		max: 10,    //列表里的条目数
		minChars: 0,    //自动完成激活之前填入的最小字符
		width: $("#airport").width()+1,     //提示的宽度，溢出隐藏
		scrollHeight: 300,   //提示的高度，溢出显示滚动条
		matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		autoFill: false,    //自动填充
		formatItem: function(row, i, max) {
			return row[1] + '  (' + row[0] + ')';
		},
		formatMatch: function(row, i, max) {
			return row[0] + row[1];
		},
		formatResult: function(row) {
			return row[1] + '  (' + row[0] + ')';
		}
	}).result(function(event, row, formatted) {
		$("#airport").attr("IATA", row[0]);
	});
	
	//日期
	var now_time = DateToStr(new Date()); 
	$("#start").val(now_time)
	$("#end").val(now_time)
	$("#start").bind("input propertychange",function(event){
		var start_time = new Date($("#start").val());
		start_time.setFullYear(start_time.getFullYear()+1)
		start_time.setDate(start_time.getDate()-1)
		var end_time = DateToStr(start_time)
		$("#end").val(end_time);
	});
});

//格式化字符串
String.prototype.format = function(){
	var args = arguments;
	return this.replace(/\{(\d+)\}/gm, function(ms, p1){return typeof(args[p1]) == 'undefined' ? ms : args[p1]});
}
	
//将日期转化字符串(yyyy-MM-dd)
function DateToStr(date){
	 var year = date.getFullYear();
	 var month =(date.getMonth() + 1).toString();
	 var day = (date.getDate()).toString();
	 if (month.length == 1) {
		 month = "0" + month;
	 }
	 if (day.length == 1) {
		 day = "0" + day;
	 }
	 dateTime = year +"-"+ month +"-"+  day;
	 return dateTime;
}

//执行下载
function executeDownload(index) {
	switch(index){
		case 1:
			var airport = document.getElementById('airport').getAttribute("IATA");
			var start = document.getElementById('start').value;
			var end = document.getElementById('end').value;
			var stopType = document.getElementById('stopType').value;
			url = "https://data.variflight.com/profiles/Airportsroute/routeDetailExport?routeType=all&stopType={0}&screenMark=&start={1}&end={2}&airport={3}&airlines=total".format(stopType, start, end, airport);
			window.open(url);
		default:
			return;
	};
}

//执行功能切换
function executeFuncSwitch(index) {
	switch(index){
		case 'routeDetailExport':
			URL = './' + index + '.html';
			// $.ajax({ 
				// type : "GET", 
				// url : URL, 
				// dataType : "html",
				// success : function(data){ 
					// $("#core-content").html(data.) 
				// }, 
				// error:function(){ 
					// alert('fail'); 
				// } 
			// }); 
			$.ajaxSetup ({ 
				cache: false 
			});
			$.get(URL, function(data){  
			   $('#core-content').html(data);  
			});
		default:
			return;
	};
}