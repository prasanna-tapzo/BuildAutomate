define(['jquery', 'underscore', 'Backbone'
        ,'text!views/budget/reports/yearlyReport.tpl'
        , 'collections/budget/reportsCollections'
    ],
        
function ($, _, Backbone
			, yearlyReportTemplate
			, reportsCollections
		){
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var quaterlyReport = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{
        },
		initialize:function(){
       	},
       	render:function()
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
	  			};
	        	that.collection= new reportsCollections();
	        	var deviceId=getDeviceId();
	        	showSpinner();
	            that.collection.fetch({
					data : $.param({
						customer_Id:els.get("customerID_EM"),
						i_period_type:"Y",
						i_lastnvalue:"4",
						i_expense_month:"ALL",
						i_expense_year:"ALL",
							flag:"YQMWDT", //YQMWDT
							i_period_type_q:"Q",
							i_period_type_d:"D",
							i_period_type_w:"W",	
							period_type:"M",
						number_of_month:"6",
						month_category:"ALL",
						year_category:yer,	
								r_acct_no:"ALL",
								r_acct_category:"Y",
								r_acct_value:"6",
								r_acct_quarter:"ALL",
								r_acct_type:yer
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
								hideSpinner();
	     				}else{
	     					onErrorHandler(data);
	     					hideSpinner();
	     				}
	     			},
	     			error:onErrorHandler
	     		});
			   return this;
		},
        renderSuccess:function(){
        	var expenceAndBudgetList = els.get("reportYearlyTxn");
        	var budg=0;
        	var expc=0;
        	var monthval="";
        	if(expenceAndBudgetList !=null){
	        	if(expenceAndBudgetList.length>0){
	        		for(var i=0;i<expenceAndBudgetList.length;i++){
	        			if(expenceAndBudgetList[i].expenceDescription=="OverAllExpense"){
							if(!(expenceAndBudgetList[i].expences=="null" || expenceAndBudgetList[i].expences==null || expenceAndBudgetList[i].expences=="")){
								expc += parseFloat(expenceAndBudgetList[i].expences);
							}
							if(!(expenceAndBudgetList[i].budget=="null" || expenceAndBudgetList[i].budget==null || expenceAndBudgetList[i].budget=="")){
								budg += parseFloat(expenceAndBudgetList[i].budget);
							}
	        			}
	        		}
	        		//monthval = expenceAndBudgetList[0].monthDesc + " " + expenceAndBudgetList[0].year_value;
	        		monthval = expenceAndBudgetList[0].year_value;
	        	}
        	}
        	
        	this.$el.html(_.template(yearlyReportTemplate,{expc:expc,budg:budg,monthval:monthval})).i18n();
 		    //$("#screentitle").text($.i18n.t('app.smartbudget.general.screenTitle'));
        	
 		    this.showChartBudgVsExpn();
        },
        showChartBudgVsExpn:function()
        {
        // Prepare Data - BAR and LINE Chart
        	
			var expenceAndBudgetList = els.get("reportYearlyTxn");
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
						if(expenceAndBudgetList[i].expenceDescription=="OverAllYearlyExpense"){
							if(!(expenceAndBudgetList[i].expences=="null" || expenceAndBudgetList[i].expences==null || expenceAndBudgetList[i].expences=="")){
								
								var budget = parseInt(expenceAndBudgetList[i].budget);
								
								if(isNaN(budget))
									budget = 0;
								
								var expence = parseInt(expenceAndBudgetList[i].expences);
								if(isNaN(expence))
									expence = 0;
								
								s1.push(budget);
								
								/*s2[i] = new Array();
								s2[i][0] = (i+1);
								s2[i][1] = budget;
								
								s3[i] = new Array();
								s3[i][0] = (i+1);					
								s3[i][1] = expence;*/
								
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
								//yr = yr.substring(2,4);
								ticks.push(yr);
								
								monthDesc.push(expenceAndBudgetList[i].monthDesc);
					        	year_value.push(expenceAndBudgetList[i].year_value);
							}
						}
					}
					console.log("s1--------------> " + s1);
					console.log("s2--------------> " + s2);
					console.log("s3--------------> " + s3);
					
					
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
					
					
					/*var dispTitle = "";
					if(year_value[0]!=year_value[year_value.length-1]){
						dispTitle = monthDesc[0] + " " + year_value[0] + " - " + monthDesc[monthDesc.length-1] + " " + year_value[year_value.length-1];
					}else{
						dispTitle = monthDesc[0] + " - " + monthDesc[monthDesc.length-1] + " " + year_value[year_value.length-1];
					}
					$("#budexpTitle").text(dispTitle);*/
		
				// Plot Chart - BAR and LINE
					
		            this.plotChartBudgVsExpn(s1, s2, s3, ticks,yaxis);
		 
		            
		        // Legends - BAR and LINE Chart
		            
		            var colours = els.get("bar_colors");
		            var key = els.get("bar_label");
		        	var legd = "";
		        	for(var i=0;i<key.length;i++){
		        		var myCanvas = "MyCanvasLL"+(i+1);
		        		legd += "<canvas id='"+myCanvas+"' width='13' height='13'></canvas>&nbsp;<span class='bar-ledgend'>"+key[i]+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		        	}
		        	legd += "</table>";
		    		$("#bar_legend").html(legd);
		    		
		        	for(var j=0;j<key.length;j++){
		        		var myCanvas = "MyCanvasLL"+(j+1);
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
			}else{
				//$("#plotYearChart").html("No record available");
			}
            
        },
        plotChartBudgVsExpn:function(s1,s2,s3,ticks,yaxis){
        	
				$("#plotYearChart").show();
			  	var plot;
			  	var renderGraph = function() {
			  		plot = $.jqplot('plotYearChart', [s1, s2, s3], {
			  			//dataRenderer: barRenderer,
		            	seriesColors:els.get("bar_series_colors"),
		            	grid:{
		            		backgroundColor:"#E2F7F7",
		            		drawBorder : false,
		        			background : '#E2F7F7',
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
	return quaterlyReport;
	
});