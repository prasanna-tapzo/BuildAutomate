define(['jquery', 'underscore', 'Backbone'
        ,'text!views/budget/reports/dailyReport.tpl'
        , 'collections/budget/dashboardBandECollections'
        , 'collections/budget/reportsCollections'
        
    ],
        
function ($, _, Backbone
			, dailyReportTemplate
			, dashboardBandECollections
			, reportsCollections
		){
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var reports = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{
			"click #Expensebydaydetail":"swipeDayTransactions"
        },
		initialize:function(){
       	},
       	render:function()
		{
       		els.set("Day_Cur_Page","");
       		var endrec=6;
			var startrec=0;
       		this.renderSuccess(startrec,endrec);
			return this;
		},
		update:function()
		{
			var Cur_Page = els.get("Day_Cur_Page");
			if(Cur_Page==null || Cur_Page==null){
				Cur_Page="1";
			}
			var cpage = parseInt(Cur_Page);
			var page_num = parseInt(Cur_Page);
			console.log("Update : page_num............"+page_num);
			page_num = cpage*6;
			var endrec=page_num;
			var startrec=page_num-6;
			console.log("Update: page_num.."+"page_num"+" :startrec..... "+ startrec + " : endrec....."+endrec);
       		this.renderSuccess(startrec,endrec);
			return this;
		},
        renderSuccess:function(startrec,endrec){
        	hideSpinner();
        	$(".back_butt").show();
        	this.getTransactionDates(startrec,endrec);
        	this.$el.html(_.template(dailyReportTemplate,{startrec:startrec,endrec:endrec})).i18n();
 		    $("#screentitle").text($.i18n.t('Expenses By Day'));
        	this.showChartExpnDaywise(startrec,endrec);
        },
        getTransactionDates:function(startrec,endrec){
        		els.set("Daily_Txn_Detail","");
	        	var reportDailyTxn = els.get("reportDailyTxn");
	        	var ticks="";
	        	var periodValue;
	
	        	var dailyreporttxn=[];
	        	var cnt = 0;
	        	for(var jj=0;jj<reportDailyTxn.length;jj++)
	        	{
	        		periodValue = reportDailyTxn[jj].periodValue;
	        		if( !(periodValue==null || periodValue=="null") ){
	        			dailyreporttxn[cnt] = reportDailyTxn[jj];
	        			cnt++;
	        		}
	        	}
	        	
	        	for(var jj=0;jj<dailyreporttxn.length;jj++)
	        	{
	        		if(jj>=startrec && jj<endrec)
	        		{
		        		periodValue = dailyreporttxn[jj].periodValue;
		        		if( !(periodValue==null || periodValue=="null") ){
			        		periodValue = periodValue.split("-")[0] + "-" + periodValue.split("-")[1];
			        		ticks += ","+periodValue;
		        		}
	        		}
	        	}
	        	ticks = ticks.substring(1, ticks.length);
	        	console.log("ticks............."+ticks)
	        	els.set("Daily_Txn_Detail",ticks);
        },
        swipeDayTransactions:function(){
        	showSpinner();
        	var Day_Cur_Page = els.get("Day_Cur_Page");
        	Backbone.history.navigate("#/daily/"+Day_Cur_Page);
        },
        showChartExpnDaywise:function(startrec,endrec){
        	
        	var reportDailyTxn = els.get("reportDailyTxn");
        	$("#daywiseid").text("");
        	//var s1 = [1000, 800, 234, 577, 200, 1290];
        	var s1=[];
        	var s2=[];
        	var ticks=[];
        	var periodValue;
        	var tempYaxisVal = 0;
        	var tempexpences = 0;

        	var dailyreporttxn=[];
        	var cnt = 0;
        	for(var jj=0;jj<reportDailyTxn.length;jj++)
        	{
        		periodValue = reportDailyTxn[jj].periodValue;
        		if( !(periodValue==null || periodValue=="null") ){
        			dailyreporttxn[cnt] = reportDailyTxn[jj];
        			cnt++;
        		}
        	}
        	
        	for(var jj=0;jj<dailyreporttxn.length;jj++)
        	{
        		if(jj>=startrec && jj<endrec)
        		{
		        		periodValue = dailyreporttxn[jj].periodValue;
		        		if( !(periodValue==null || periodValue=="null") ){
		        			tempexpences = parseFloat(dailyreporttxn[jj].expences);
		        			var temp = parseInt(dailyreporttxn[jj].expences);
		        			s1.push(temp);
		        			temp = numberWithCommasWithoutZero(temp+"");
		        			s2.push(temp);
			        		periodValue = periodValue.split("-")[0] + "-" + periodValue.split("-")[1];
			        		ticks.push(periodValue);
			        		if(tempexpences > tempYaxisVal){
			        			tempYaxisVal = tempexpences;
							}
		        		}
        		}
        	}
        	
        	var yaxis = tempYaxisVal;
			var tempaxixmaxval = 0;
			console.log("tempaxixmaxval .......yaxis..... "+ yaxis);
			if(yaxis<=100){
					tempaxixmaxval = yaxis/10;
					tempaxixmaxval = (Math.ceil(tempaxixmaxval) *10)+10;
					if(yaxis==100){
						tempaxixmaxval = yaxis+100;
					}
			}else if(yaxis<=1000){
					tempaxixmaxval = yaxis/100;
					tempaxixmaxval = (Math.ceil(tempaxixmaxval) *100)+100;
					if(yaxis==1000){
						tempaxixmaxval = yaxis+1000;
					}
			}else if(yaxis<=10000){
					tempaxixmaxval = yaxis/1000;
					tempaxixmaxval = (Math.ceil(tempaxixmaxval) *1000)+1000;
					if(yaxis==10000){
						tempaxixmaxval = yaxis+10000;
					}
			}else if(yaxis<=100000){
					tempaxixmaxval = yaxis/10000;
					tempaxixmaxval = (Math.ceil(tempaxixmaxval) *10000)+10000;
					if(yaxis==100000){
						tempaxixmaxval = yaxis+100000;
					}
			}else if(yaxis<=1000000){
					tempaxixmaxval = yaxis/100000;
					tempaxixmaxval = (Math.ceil(tempaxixmaxval) *100000)+100000;
					if(yaxis==1000000){
						tempaxixmaxval = yaxis+100000;
					}
			}else if(yaxis<10000000){
					tempaxixmaxval = yaxis/1000000;
					tempaxixmaxval = (Math.ceil(tempaxixmaxval) *1000000)+1000000;
					if(yaxis==10000000){
						tempaxixmaxval = yaxis+1000000;
					}
			}else{
				tempaxixmaxval = yaxis/10000000;
				tempaxixmaxval = Math.ceil(tempaxixmaxval) *10000000;
			}
			console.log("tempaxixmaxval ............ "+ tempaxixmaxval);
			yaxis = tempaxixmaxval;
        	//var s1 = reportDailyTxn.expences;
        	//var ticks = reportDailyTxn.periodValue;
			
			/*
					1 - 125
			    	2 - 88
			    	3 - 64
			    	4 - 53
			    	5 - 45
			    	6 - 40
			*/
			var barsize = s1.length;
			console.log("barsize.B.............."+barsize);
			if(barsize==6){
				barsize = 37;
			}else if(barsize==5){
				barsize = 42;
			}else if(barsize==4){
				barsize = 50;
			}else if(barsize==3){
				barsize = 64;
			}else if(barsize==2){
				barsize = 80;
			}else if(barsize==1){
				barsize = 144;
			}
			console.log("barsize.A.............."+barsize);
        	this.plotChartExpnDaywise(s1,s2,ticks,yaxis,barsize);
        },
        showChartExpnDaywiseOld:function(){
        	
        	var reportDailyTxn = els.get("reportDailyTxn");
        	$("#daywiseid").text("");
        	//var s1 = [1000, 800, 234, 577, 200, 1290];
        	var s1=[];
        	var ticks=[];
        	var periodValue;
        	for(var jj=0;jj<reportDailyTxn.length;jj++){
        		periodValue = reportDailyTxn[jj].periodValue;
        		if( !(periodValue==null || periodValue=="null") ){
            		s1.push(parseInt(reportDailyTxn[jj].expences));
	        		periodValue = periodValue.split("-")[0] + "-" + periodValue.split("-")[1];
	        		ticks.push(periodValue);
        		}
        	}
        	this.plotChartExpnDaywise(s1,ticks);
        },
        //plotChartExpnDaywise:function(s1,ticks){
        plotChartExpnDaywise:function(s1,s2,ticks,yaxis,barsize){
        	
			$("#Expensebydaydetail").show();
			console.log("s1 Length................"+s1);
			if(s1.length>0)
			{
						var plot2;
						var renderGraph = function() {
						  	    plot2 = $.jqplot('Expensebydaydetail', [s1], {
						  	        // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
						  	        //animate: !$.jqplot.use_excanvas,
						  	    	seriesColors:["#FDE7F3"],
						  	    	axesDefaults: {
						  	    		rendererOptions: {
						  	                baselineWidth: 1,
						  	                baselineColor: '#666666',
						  	                drawBaseline: true
						  	            }
						  	    	},
						  	        grid:{
						  				drawBorder : false,
						  				drawGridlines : false,
						  				background : '#E2F7F7',
						  				shadow : false 
						  			},
						  	        seriesDefaults:{
						  	            renderer:$.jqplot.BarRenderer,
						  	            pointLabels: { 
							  	            			show: true,
							  	            			labels:s2
							  	            		 },
						  	            rendererOptions: {
						  	                barMargin: barsize
						  	        	}
						  	        },
						  	        axes: {
						  	            xaxis: {
						  	                renderer: $.jqplot.CategoryAxisRenderer,
						  	                ticks: ticks
						  	            },
						  	        	yaxis: {
						  	        		min:0,
					                    	max:yaxis,
						  	        		tickOptions: {
						  	                	show: false
						  	            	},
						  		            rendererOptions: {
						  		                forceTickAt0: false,
						  		                drawBaseline: false
						  		            }
						  	        	}
						  	        },
						  	        highlighter: { show: false }
						  	    });
						};
						var resizeGraph = function() {
					        if (plot2)
					            plot2.destroy();
			            	renderGraph();
					    };
						setTimeout(function() {
			      			resizeGraph();
						}, 500);
						/*$('#Expensebydaydetail').bind('jqplotDataClick', 
					            function (ev, seriesIndex, pointIndex, data) {
									console.log(" ==============> " + seriesIndex + " : " +pointIndex);
					            }
					        );*/
			}else{
				$("#Expensebydaydetail").html("No record available for dailywise");
			}
        }
        
	});
	return reports;
	
});