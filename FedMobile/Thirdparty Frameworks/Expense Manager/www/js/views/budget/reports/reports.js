define(['jquery', 'underscore', 'Backbone'
        ,'text!views/budget/reports/reports.tpl'
        , 'collections/budget/dashboardBandECollections'
        , 'collections/budget/reportsCollections'
        
    ],
        
function ($, _, Backbone
			, reportsTemplate
			, dashboardBandECollections
			, reportsCollections
		){
	var els = new EncryptedLocalStorage('secret'); 
	var latestMonth="";
	var latestYear="";
	var restrictLength=els.get("restrictLength");
	//Body Content 
	var reports = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{
			"click #categorydetails":"showcategorydetails",
			"click #Expensebyday":"ExpensebydayDetails"
        },
		initialize:function(){
       	},
       	ExpensebydayDetails:function(event){
       		Backbone.history.navigate("#/daily");
		},
       	showcategorydetails:function(event){
       		Backbone.history.navigate("#/budgetcategorywise");
		},
       	render:function()
		{
       			els.set('changeYourExpnType',"");
				els.set("cate_expn_chart_month_year",'');
	       		var mnth_yr=els.get("cate_chart_month_year");
	       		els.set("gobackscreen","RS");
				$(".back_butt").hide();
	    		var mon,yer;
	    		if(!(mnth_yr=="undefined" || mnth_yr==undefined || mnth_yr==null || mnth_yr=="null" || mnth_yr=="")){
	    			mon = mnth_yr.split(",")[0];
	    			yer = mnth_yr.split(",")[1];
	    		}else{
	    			var tody = new Date();
	    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
	    			yer = tody.getFullYear();
	    		}
	    		
	    		mon = mon.toUpperCase();
	    		latestMonth=mon;
	    		latestYear=yer;
	    		console.log(mon + " ---- " + yer);
		    	var that = this;
	  			var onDataHandler = function(collection) {
	  				//hideSpinner();
	  				that.render1Success();
	  			};
	  			var onErrorHandler = function(collection) {
	  				hideSpinner();
	  				console.log("Error here budget.js-Dashboard");
	  				Backbone.history.navigate("#/exception");
	  				//that.errorresponse();
	  			};
	        	that.collection= new dashboardBandECollections();
	        	var deviceId=getDeviceId();
	        	showSpinner();
	        	
	            that.collection.fetch({
					data : $.param({
						customer_Id:els.get("customerID_EM"),
						period_type:"M",
						number_of_month:"6",
						flag:"ECUMN",
						type_category:"ALL",
						uncatagory:"ALL",//yer,
						month_category:mon,
						year_category:"ALL",//yer,
						last_n_value:"",
						calendar_months:"6",
						expensedescription:"OverAllMonthlyExpense"
					}),
	     			dataType: "json",
	     			type: 'POST',
	     			cache: false,
	     			timeout:parseInt(els.get('calltimeout')),
	     			success : function(data)
	     			{
	     				if(ackStatus == "00000")
	     				{
								onDataHandler(data);
								//hideSpinner();
	     				}else{
	     					onErrorHandler(data);
	     					//hideSpinner();
	     				}
	     			},
	     			error:onErrorHandler
	     		});
			   return this;
		},
        render1Success:function()
		{

    		var mnth_yr=els.get("cate_chart_month_year");
    		var mon,yer;
    		if(!(mnth_yr=="undefined" || mnth_yr==undefined || mnth_yr==null || mnth_yr=="null" || mnth_yr=="")){
    			mon = mnth_yr.split(",")[0];
    			yer = mnth_yr.split(",")[1];
    		}else{
    			var tody = new Date();
    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
    			yer = tody.getFullYear();
    		}
    		mon = mon.toUpperCase();
    		dte = tody.getDate()+"";
    		console.log(mon + " ---- " + yer);
	    	var that = this;
  			var onDataHandler = function(collection) {
  				hideSpinner();
  				that.renderSuccess();
  			};
  			var onErrorHandler = function(collection) {
  				hideSpinner();
  				console.log("Error here budget.js-Dashboard");
  				//that.errorresponse();
  				Backbone.history.navigate("#/exception");
  			};
        	that.collection= new reportsCollections();
        	var deviceId=getDeviceId();
        	showSpinner();
            that.collection.fetch({
				data : $.param({
					customer_Id:els.get("customerID_EM"),
					i_period_type:"Y",
					i_lastnvalue:"91", //dte,
					i_expense_month:"ALL",
					i_expense_year:"ALL",
						flag:"DT", //YQMWDT
						i_period_type_q:"Q",
						i_period_type_d:"D",
						i_period_type_w:"W",	
						period_type:"M",
					number_of_month:"6",
					month_category:"ALL",
					year_category:"ALL",	
							r_acct_no:"ALL",
							r_acct_category:"D",
							r_acct_value:"91", //dte,
							r_acct_quarter:"ALL",
							r_acct_type:"ALL"
				}),
     			dataType: "json",
     			type: 'POST',
     			cache: false,
     			timeout:parseInt(els.get('calltimeout')),
     			success : function(data)
     			{
     				if(ackStatus == "00000")
     				{
							onDataHandler(data);
							//hideSpinner();
     				}else{
     					onErrorHandler(data);
     					//hideSpinner();
     				}
     			},
     			error:onErrorHandler
     		});
		   return this;
        	

		    return this;
        },
        renderSuccess:function(){
        	this.$el.html(_.template(reportsTemplate)).i18n();
 		    $("#screentitle").text($.i18n.t('app.smartbudget.general.reports'));
 		    $("#bdywrap").addClass('noFooter');
 		    $("#bdywrap").removeClass('sb-chartexp-gap');
		    $("#loginfooter").hide();
		    $("#genchartdiv").hide();
 		    this.showChartBudgVsExpn();
        	this.showChartExpn();
        	this.showChartExpnDaywise();
        },
        showChartExpnDaywise:function(){
        	
        	var reportDailyTxn = els.get("reportDailyTxn");
        	$("#daywiseid").text("");
        	//var s1 = [1000, 800, 234, 577, 200, 1290];
        	var s1=[];
        	var sx=[];
        	var ticks=[];
        	var periodValue;
        	var tempYaxisVal = 0;
        	var tempexpences = 0;
        	var totrec=0;
        	if(reportDailyTxn.length>6){
        		totrec=7;
        	}else{
        		totrec=reportDailyTxn.length;
        	}
        	for(var jj=0;jj<totrec;jj++){
        		periodValue = reportDailyTxn[jj].periodValue;
        		if( !(periodValue==null || periodValue=="null") ){
        			tempexpences = parseFloat(reportDailyTxn[jj].expences);
        			var temp = parseInt(reportDailyTxn[jj].expences);
        			s1.push(temp);
        			temp = numberWithCommasWithoutZero(temp+"");
        			sx.push(temp);
	        		periodValue = periodValue.split("-")[0] + "-" + periodValue.split("-")[1];
	        		ticks.push(periodValue);
	        		if(tempexpences > tempYaxisVal){
	        			tempYaxisVal = tempexpences;
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
        	this.plotChartExpnDaywise(s1,sx,ticks,yaxis,barsize);
        },
        showChartBudgVsExpn:function()
        {
        // Prepare Data - BAR and LINE Chart
        	
			var expenceAndBudgetList = els.get("expenceAndBudgetList");
			if(expenceAndBudgetList==null){
				expenceAndBudgetList="";
			}
			if(expenceAndBudgetList.length>0)
			{
					var s1=[];
					var s2= new Array();
					var s3= new Array();
					var ticks=[];
					var monthDesc = [];
					var year_value = [];
					var tempExpn=0;
					var tempBudg=0;
					for(var i=0;i<expenceAndBudgetList.length;i++){
						//if(!(expenceAndBudgetList[i].expence=="null" || expenceAndBudgetList[i].expence==null || expenceAndBudgetList[i].expence=="")){
							
							var budget = parseInt(expenceAndBudgetList[i].budget);
							
							if(isNaN(budget))
								budget = 0;
							
							var expence = parseInt(expenceAndBudgetList[i].expence);
							if(isNaN(expence))
								expence = 0;
							
							s1.push(budget);
							
							s2[i] = new Array();
							s2[i][0] = (i+1);
							s2[i][1] = expence;
							
							s3[i] = new Array();
							s3[i][0] = (i+1);
							s3[i][1] = budget;
							
							//console.log("ACT : "+ expence + " : "+ budget);
							if(expence > tempExpn){
								tempExpn = expence;
							}
							
							if(budget > tempBudg){
								tempBudg = budget;
							}
							//console.log("TMP : "+ tempExpn + " : "+ tempBudg);							
							var yr=expenceAndBudgetList[i].year_value+"";
							yr = yr.substring(2,4);
							ticks.push(expenceAndBudgetList[i].monthDesc + " " +  yr);
							
							monthDesc.push(expenceAndBudgetList[i].monthDesc);
				        	year_value.push(expenceAndBudgetList[i].year_value);
						//}
					}
					
					console.log("tempExpn............."+ tempExpn);
					console.log("tempBudg............."+ tempBudg);
					var yaxis = 0;
					if(tempExpn>tempBudg){
						yaxis = tempExpn;
					}else{
						yaxis = tempBudg;
					}
					var tempaxixmaxval = 0;
					if(yaxis<=100){
						if(yaxis==100){
							tempaxixmaxval = yaxis+100;
						}else{
							tempaxixmaxval = yaxis/10;
							tempaxixmaxval = Math.ceil(tempaxixmaxval) *10;
						}
					}else if(yaxis<=1000){
						if(yaxis==1000){
							tempaxixmaxval = yaxis+1000;
						}else{
							tempaxixmaxval = yaxis/100;
							tempaxixmaxval = Math.ceil(tempaxixmaxval) *100;
						}
					}else if(yaxis<=10000){
						if(yaxis==10000){
							tempaxixmaxval = yaxis+10000;
						}else{
							tempaxixmaxval = yaxis/1000;
							tempaxixmaxval = Math.ceil(tempaxixmaxval) *1000;
						}
					}else if(yaxis<=100000){
						if(yaxis==100000){
							tempaxixmaxval = yaxis+100000;
						}else{
							tempaxixmaxval = yaxis/10000;
							tempaxixmaxval = Math.ceil(tempaxixmaxval) *10000;
						}
					}else if(yaxis<=1000000){
						if(yaxis==1000000){
							tempaxixmaxval = yaxis+100000;
						}else{
							tempaxixmaxval = yaxis/100000;
							tempaxixmaxval = Math.ceil(tempaxixmaxval) *100000;
						}
					}else if(yaxis<10000000){
						if(yaxis==10000000){
							tempaxixmaxval = yaxis+100000;
						}else{
							tempaxixmaxval = yaxis/1000000;
							tempaxixmaxval = Math.ceil(tempaxixmaxval) *1000000;
						}
					}else{
						tempaxixmaxval = yaxis/10000000;
						tempaxixmaxval = Math.ceil(tempaxixmaxval) *10000000;
					}
					console.log("tempaxixmaxval ............ "+ tempaxixmaxval);
					yaxis = tempaxixmaxval;
					console.log("tempaxixmaxval ............ "+ tempaxixmaxval);
					
					var dispTitle = "";
					if(year_value[0]!=year_value[year_value.length-1]){
						dispTitle = monthDesc[0] + " " + year_value[0] + " - " + monthDesc[monthDesc.length-1] + " " + year_value[year_value.length-1];
					}else{
						dispTitle = monthDesc[0] + " - " + monthDesc[monthDesc.length-1] + " " + year_value[year_value.length-1];
					}
					$("#budexpTitle").text(dispTitle);
		
					/*
						1 - 125
				    	2 - 88
				    	3 - 64
				    	4 - 53
				    	5 - 45
				    	6 - 40
					*/
			    	
				// Plot Chart - BAR and LINE
					
		            this.plotChartBudgVsExpn(s1, s2, s3, ticks, yaxis);
		 
		            
		        // Legends - BAR and LINE Chart
		            
		            var colours = els.get("bar_colors");
		            var key = els.get("bar_label");
		        	var legd = "";
		        	for(var i=0;i<key.length;i++){
		        		if(i<restrictLength)
		        		{
			        		var myCanvas = "MyCanvasL"+(i+1);
			        		legd += "<canvas id='"+myCanvas+"' width='13' height='13'></canvas>&nbsp;<span class='bar-ledgend'>"+key[i]+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			        	}	
		        	}
		        	legd += "</table>";
		    		$("#bar_legend").html(legd);
		    		
		        	for(var j=0;j<key.length;j++){
		        		if(j<restrictLength)
		        		{
			        		var myCanvas = "MyCanvasL"+(j+1);
			        		var canvas = document.getElementById(myCanvas);
			        		var context = canvas.getContext('2d');
			                context.beginPath();
			                context.arc(8, 8, 4, 0, 2 * Math.PI);
			                if(j==0){
			                	context.fillStyle = colours[j];
				                context.fill();
				                context.lineWidth = 2;
				                context.strokeStyle = colours[j];
				                context.stroke();
			                }else{
				                context.lineWidth = 2;
				                context.strokeStyle = colours[j];
				                context.stroke();
			                }
			            }
		        	}
			}else{
				$("#BudgetandExpense").html("No record available");
			}
            
        },
        showChartExpn:function(){        	

           	// Prepare Data - DONUT Chart

        	var categorysList = els.get("categorysList");
        	if(categorysList==null){
        		categorysList="";
        	}
        	if(categorysList.length > 0)
        	{
		        	var assetVal=[];
		        	var assetVal_leg=[];
		        	var key=[];
		        	var monthDesc=[];
		        	var year_value=[];
		        	var amt = 0;

		        	var colours= new Array();
		        	
		        	var categoryColors = new Array();
					if(els.get('changeYourExpnType')=="ACC")
					{
								colours[0]="#1127B4";
								colours[1]="#FF9900";
								colours[2]="#CC66CC";
								colours[3]="#5CD65C";
								colours[4]="#1A53FF";
								colours[5]="#00B3B3";
								colours[6]="#FFFF4D";
								colours[7]="#E67700";
								colours[8]="#ADAD85";
								colours[9]="#5C5C8A";
								colours[10]="#00CC44";
								colours[11]="#6666FF";
					}else{
						categoryColors=els.get("categoryColorsArray");
						console.log("=-=-========-----------=======",categoryColors);
					}	


		        	for(var j=0;j<categorysList.length;j++){
		        		if(categorysList[j].expenceDescription=="OverAllExpense"){
		        			amt = parseInt(categorysList[j].expense);
		        		}
		        		if(!(categorysList[j].categoryDesc=="null" || categorysList[j].categoryDesc==null || categorysList[j].categoryDesc=="")){
				        	assetVal.push(parseInt(categorysList[j].expense));
				        	assetVal_leg.push(legentAmountFormat(categorysList[j].expense+""));
				        	key.push(categorysList[j].categoryDesc);

				        	if(els.get('changeYourExpnType')!="ACC"){
					        	var eachCategoryId=categorysList[j].categID;
					        	colours.push(categoryColors[eachCategoryId]); 
					        }
				        	//amt += parseInt(categorysList[j].expense);
				        	monthDesc.push(categorysList[j].monthDesc);
				        	year_value.push(categorysList[j].year_value);
		        		}
		        	}
		        	amt = amt+"";
		        	amt = legentAmountFormat(amt);
		        	console.log("assetVal ------->"+assetVal);
		        	console.log("assetVal_leg ------->"+assetVal_leg);
		        	console.log("key ------->"+key);
		        	console.log("colours Order---->"+colours);
		
					
				// Plot Chart - DONUT Chart
					
		        	this.plotChartExpn(assetVal, key, colours, monthDesc[monthDesc.length-1], year_value[year_value.length-1]);
		        	
		       	// Legends - DONUT Chart
		        	
		        	this.legendChartExpn(assetVal, assetVal_leg, key, amt, colours,"Y");
        	}else{
		        		var assetVal=[];
			        	var assetVal_leg=[];
			        	var key=[];
			        	var monthDesc=[];
			        	var year_value=[];
			        	var amt = 0;
			        	//for(var j=0;j<categorysList.length;j++){
			        		//if(categorysList[j].expenceDescription=="OverAllExpense"){
			        			amt = parseInt("0");
			        		//}
			        		//if(!(categorysList[j].categoryDesc=="null" || categorysList[j].categoryDesc==null || categorysList[j].categoryDesc=="")){
					        	assetVal.push(parseInt("1"));
					        	assetVal_leg.push("1");
					        	key.push(" ");
					        	//amt += parseInt(categorysList[j].expense);
					        	monthDesc.push(latestMonth);
					        	year_value.push(latestYear);
			        		//}
			        	//}
			        	//amt = amt+"";
			        	//amt = numberWithCommasWithoutZero(amt);
			        	console.log("assetVal ------->"+assetVal);
			        	console.log("assetVal_leg ------->"+assetVal_leg);
			        	console.log("key ------->"+key);
			        	console.log("amt ------->"+amt);
			
						var colours = new Array();
						colours[0]="#1127B4";
						colours[1]="#FF9900";
						colours[2]="#CC66CC";
						colours[3]="#5CD65C";
						colours[4]="#1A53FF";
						colours[5]="#00B3B3";
						colours[6]="#FFFF4D";
						colours[7]="#E67700";
						colours[8]="#ADAD85";
						colours[9]="#5C5C8A";
						colours[10]="#00CC44";
						colours[11]="#6666FF";
			
						
					// Plot Chart - DONUT Chart
						
			        	this.plotChartExpn(assetVal, key, colours, monthDesc[monthDesc.length-1], year_value[year_value.length-1]);
			        	
			       	// Legends - DONUT Chart
			        	
			        	this.legendChartExpn(assetVal, assetVal_leg, key, amt, colours,"N");        		
        		/*$("#errordiv").text("No record available");
        		$("#categoryheader").hide();
        		$("#categorydetails").hide();*/
        	}
        },
        legendChartExpn:function(assetVal,assetVal_leg, key, amt, colours,flag){
        	$("#expn_amount").html(amt);
        	if(flag=="Y"){
		        	var legd = "<table cellpadding='0' cellspacing='0' border='0'>";
		        	legd += "<tr><td align='left'><small class='text-muted fn-size10'>CATEGORIES</small></td>";
		    		legd += "<td align='right'><small class='text-muted fn-size10'>AMOUNT&nbsp;<i class='fa fa-inr' aria-hidden='true'></i></small></td><tr>";
		        	for(var i=0;i<key.length;i++){
		        		if(i<restrictLength)
		        		{
			        		var myCanvas = "MyCanvas"+(i+1);
			        		legd += "<tr style='border-bottom:solid 1px #efefef;'><td align='left'><canvas id='"+myCanvas+"' width='8' height='8'></canvas>&nbsp;&nbsp;<span style='color:"+colours[i]+";font-size:10px;'>"+key[i]+"</span></td>";
			        		legd += "<td align='right'>&nbsp;<span style='font-size:10px;'>"+assetVal_leg[i]+"</span></td></tr>";
						}			        		
		        	}
		        	if(key.length>restrictLength)
		        	{
						legd += "<tr style='border-bottom:solid 1px #efefef;''><td align='left' colspan='2'><span style='color:#00000;font-size:10px;'>Legends are shown only for <br>top 6 categories</span></td></tr>";		        		
		        	}
		        	legd += "</table>";
		    		$("#expn_legd").html(legd);
    		
		        	for(var j=0;j<key.length;j++){
		        		if(j<restrictLength)
		        		{
			        		var myCanvas = "MyCanvas"+(j+1);
			        		var canvas = document.getElementById(myCanvas);
			        		var context = canvas.getContext('2d');
			                context.beginPath();
			                context.rect(0, 0, 10, 10);
			                context.fillStyle = colours[j];
			                context.fill();
			                context.lineWidth = 1;
			            }    
		        	}        	
        	}else{
        		$("#expn_legd").html("");
        	}
        },
        plotChartExpnDaywise:function(s1,sx,ticks,yaxis,barsize){
        	
				$("#Expensebyday").show();
				console.log("s1 Length................"+s1);
				if(s1.length>0)
				{
					  		var plot2;
							var renderGraph = function() {
							  	    plot2 = $.jqplot('Expensebyday', [s1], {
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
							  				background : '#ffffff',
							  				shadow : false 
							  			},
							  	        seriesDefaults:{
							  	            renderer:$.jqplot.BarRenderer,
							  	            pointLabels: { 
								  	            			show: true,
								  	            			labels:sx
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
				}else{
					$("#Expensebyday").html("No record available for dailywise");
				}
        },
        plotChartExpn:function(assetVal,key,colours, month, year){

	        	$("#ExpnsChart").show();
	        	var plot1;
	        	var donutRenderer = function()
	        	{		
	        			var per = assetVal;
	        			console.log("per length.. "+per.length);
	        			var data = [[]];
	        			for(k=0;k<key.length;k++){
	        				if(k<restrictLength)
				        		{
	        						data[0].push( [ key[k], per[k] ]);
	        					}	
	        			}
	        		    return data;
	        	};
	        	var title0;
	          	var renderGraph = function()
	          	{
      					title0 = "<span class='cal-dnarrow mnt' style='z-index:0; background:none; margin: -74px 43px 0'><a id='monthid'> " + month + "<br>" + "<span class='yr'>"+ year +"</a></span>";
	          			//title0 = "<a id='monthid' class='cal-dnarrow'><span class='mnt'>" + month + "<br>" + "<span class='yr'>"+ year +"</span>" +"</a>";
	          			//title0 = "<a id='monthid' class='cal-dnarrow'>" + month + "<br>" + "<small>"+ year +"</small>" +"</a>";
	        			
	        		    plot1 = jQuery.jqplot('ExpnsChart', [], {
	        		    		seriesColors:colours,
	        		    		title : title0,
	        			      	dataRenderer: donutRenderer,
	        					grid:{
	        						drawBorder : false,
	        						drawGridlines : false,
	        						background : '#ffffff',
	        						shadow : false 
	        					},
	        				  	axesDefaults: { 
	        				  	},
	        		      		seriesDefaults:
	        			      	{
	        						shadow : false,
	        						renderer : jQuery.jqplot.DonutRenderer,
	        						rendererOptions : {
	        							   showDataLabels: false,
	        				               dataLabels: 'percent',       
	        				               //dataLabelFormatString: '%.2f%%',
	        				               //dataLabelPositionFactor: 1.35,
	        				               shadow: false,
	        				               //dataLabelThreshold:0,
	        				               sliceMargin: 1,
	        				               startAngle: -90,
	        				               dataLabelCenterOn:false,
	        				               padding: 0,
	        				               innerDiameter:70,
	        				               diameter:120
	        						}
	        			  		}
	        	    	});
	        	}
	            var resizeGraph = function() {
	                if (plot1)
	                    plot1.destroy();
	                renderGraph();
	            }
	        	setTimeout(function() {
	        			resizeGraph();
	        	}, 500);

        	
        },
        plotChartBudgVsExpn:function(s1,s2,s3,ticks, yaxis){
        	
				$("#BudgetandExpense").show();
			  	var plot;
			  	var renderGraph = function() {
			  		plot = $.jqplot('BudgetandExpense', [s1, s2, s3], {
			  			//dataRenderer: barRenderer,
		            	seriesColors:els.get("bar_series_colors"),
		            	grid:{
		            		backgroundColor:"#ffffff",
		            		drawBorder : false,
		        			background : '#ffffff',
		        			shadow : false
		            	},
		                /*stackSeries: true,
		                seriesDefaults: {
		                    renderer: $.jqplot.BarRenderer,
		                    rendererOptions: {
		                        barMargin: 50
		                    },
		                    pointLabels: {
		                        //show: true, //used to show point values......
		                        stackedValue: true
		                    }
		                },*/
		                series: [{}, 
		        					{ 
			    	                    disableStack : true,//otherwise it wil be added to values of previous series
			    	            		renderer: $.jqplot.LineRenderer,
			    	            		smooth:true,
			    	            		linePattern:"dotted",
			    	            		showMarker:true,
			    	            		lineWidth: 2,
			    	            		shadow:false,
			    			            pointLabels: {
			    			                show: false
			    			            },
			    			            markerOptions: {
			    			                size: 6,
			    			                style:"circle"
			    			            }
			    					},
			    					{ 
			    	                    disableStack : true,//otherwise it wil be added to values of previous series
			    	            		renderer: $.jqplot.LineRenderer,
			    	            		smooth:true,
			    	            		showMarker:true,
			    	            		lineWidth: 2,
			    	            		shadow:false,
			    			            pointLabels: {
			    			                show: false
			    			            },
			    			            markerOptions: {
			    			                size: 7
			    			            }
			    					}
		               			],
		                axesDefaults: {        	
		                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
		                    tickOptions: {
		                        angle: 30
		                    }
		                },
		                axes: {
		                    xaxis: {
		                        renderer: $.jqplot.CategoryAxisRenderer,
		                        tickOptions:{
		                        	showGridline:false
		                        },
		                        ticks: ticks
		                    },
		                    yaxis: {
		                    	min:0,
		                    	max:yaxis,
		                        autoscale: false,
		                        tickOptions: {
		                            formatString: "%'d"
		                        },
		                        rendererOptions: {
		                            forceTickAt0: true
		                        }
		                    }
		                }
		            });
				};
				 var resizeGraph = function() {
			        if (plot)
			            plot.destroy();
	            	renderGraph();
			    }
				setTimeout(function() {
	      			resizeGraph();
				}, 500);
        }
        
	});
	return reports;
	
});