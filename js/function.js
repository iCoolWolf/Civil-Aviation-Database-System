//初始化函数方法
$(function(){
	//引用公共文件
	$('.navpage').load(_ROOTPATH_ + "nav.html", {}, function(data) {
		$('.navpage').html(data);
		$('.navpage').trigger('create');
	});
	$('.loginpage').load(_ROOTPATH_ + "login.html", {}, function(data) {
		$('.loginpage').html(data);
		$('.loginpage').trigger('create');
	});
	$('.headerpage').load(_ROOTPATH_ + "header.html", {}, function(data) {
		$('.headerpage').html(data);
		$('.headerpage').trigger('create');
	});
	
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
		case 'airports/trafficExport':
			var airport = document.getElementById('airport').getAttribute("IATA");
			var start = document.getElementById('start').value;
			var end = document.getElementById('end').value;
			var stopType = document.getElementById('stopType').value;
			var date_type = document.getElementById('date_type').value;
			url = "https://data.variflight.com/profiles/Airportscapacityapi/trafficExport?route_type=global&start_date={0}&end_date={1}&dimension=actual&airport={2}&stop={3}&date_type={4}&airlines=all".format(start, end, airport, stopType, date_type);
			window.open(url);
			return;
		case 'airports/detailExcel':
			var airport = document.getElementById('airport').getAttribute("IATA");
			var start = document.getElementById('start').value;
			var end = document.getElementById('end').value;
			var stopType = document.getElementById('stopType').value;
			var date_type = 'y'
			var dimension = document.getElementById('dimension').value;
			url = "https://data.variflight.com/profiles/Transportapi/detailExcel?start_date={0}&end_date={1}&dimension={2}&airport={3}&stop={4}&date_type={5}&airlines=all".format(start, end, dimension, airport, stopType, date_type);
			window.open(url);
			return;
		case 'airports/proportionExcel':
			var airport = document.getElementById('airport').getAttribute("IATA");
			var start = document.getElementById('start').value;
			var end = document.getElementById('end').value;
			var stopType = document.getElementById('stopType').value;
			var date_type = 'y'
			var dimension = document.getElementById('dimension').value;
			url = "https://data.variflight.com/profiles/Transportapi/proportionExcel?start_date={0}&end_date={1}&dimension={2}&airport={3}&stop={4}&date_type={5}&airlines=all".format(start, end, dimension, airport, stopType, date_type);
			window.open(url);
			return;
		case 'airports/detailExport':
			var airport = document.getElementById('airport').getAttribute("IATA");
			var start_hour = document.getElementById('start_hour').value;
			var end_hour = document.getElementById('end_hour').value;
			var date = document.getElementById('date').value;
			url = "https://data.variflight.com/profiles/Airportsmomentapi/detailExport?start_hour={0}&end_hour={1}&flight_type=all&airport={2}&airlines=total&date={3}".format(start_hour, end_hour, airport, date);
			window.open(url);
			return;
		case 'airports/routeDetailExport':
			var airport = document.getElementById('airport').getAttribute("IATA");
			var start = document.getElementById('start').value;
			var end = document.getElementById('end').value;
			var stopType = document.getElementById('stopType').value;
			url = "https://data.variflight.com/profiles/Airportsroute/routeDetailExport?routeType=all&stopType={0}&screenMark=&start={1}&end={2}&airport={3}&airlines=total".format(stopType, start, end, airport);
			window.open(url);
			return;
		case 'airports/dispatchDetailExport':
			var airport = document.getElementById('airport').getAttribute("IATA");
			var start_date = document.getElementById('start').value;
			var end_date = document.getElementById('end').value;
			var dataType = document.getElementById('dataType').value;
			url = "https://data.variflight.com/profiles/Airportsdispatch/dispatchDetailExport?airport={0}&airlines=&start_date={1}&end_date={2}&dataType={3}".format(airport, start_date, end_date, dataType);
			window.open(url);
			return;
		default:
			alert('下载出错！');
			return;
	};
}

//切换功能
function switchFunction(index) {
	var url = _ROOTPATH_;
	if(index != ''){
		url = "{0}/func/{1}.html".format(_ROOTPATH_, index);
	}else{
		url = "{0}/index.html".format(_ROOTPATH_);
	}
	window.location.href=url;
}