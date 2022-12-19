define(['jquery', 'underscore', 'Backbone'
        ,'text!views/budget/reports/categoryWiseExpnReport.tpl'
        , 'collections/budget/categoryExpenseCollections'
    ],
        
function ($, _, Backbone
			, categoryWiseExpnReportTemplate
			, categoryExpenseCollections
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
	        	//loadjscssfile("js/libs/jqplot-master/jquery.jqplot.css", "css");
	        	//els.set("acct_nick_name",name);
	        	//els.set("acct_id",id);
	        	var tody = new Date();
	        	var mnth_yr=els.get("cate_expn_chart_month_year");
	        	console.log("accountsWiseExpnReport : mnth_yr : "+ mnth_yr);
	    		var mon,yer;
	    		if(!(mnth_yr=="undefined" || mnth_yr==undefined || mnth_yr==null || mnth_yr=="null" || mnth_yr=="")){
	    			mon = mnth_yr.split(",")[0];
	    			yer = mnth_yr.split(",")[1];
	    			mon = mon.toUpperCase();
	    		}else{
	    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
	    			yer = tody.getFullYear();
	    			mon = mon.toUpperCase();
	    		}
				/*yer = tody.getFullYear();
				mon = mon.toUpperCase();*/
				var chartOptionVal = els.get("chartOptionVal");
				var categoryId = chartOptionVal.split(",")[0];
				var categoryName = chartOptionVal.split(",")[2];
				
				var that=this;			    
	        	var onDataHandler = function(collection) 
	        	{
	        		hideSpinner();
	        		that.renderSuccess(mon,yer,categoryName,categoryId);
	        	}
	        	var onErrorHandler = function(collection) {
	        		hideSpinner();
	        		console.log("ERROR");
	        	}
		        that.collection= new categoryExpenseCollections([],{});
		        var deviceId=getDeviceId();
		        showSpinner();
		    	that.collection.fetch({
		 			data:$.param({
						customer_Id:els.get("customerID_EM"),
						i_period_type:"M",
						i_lastnvalue:"6",
						i_expense_month:"ALL",
						i_expense_year:"ALL",
						i_categoryid:categoryId,
						r_acct_no:"ALL",
						r_acct_category:"M",
						r_acct_value:"6",
						r_acct_quarter:"ALL",
						//r_acct_type:yer,
						r_acct_type:"ALL",
						flag:"ET"
		 			}),
		 			dataType: "json",
		 			type: 'POST',
		 			cache: false,
		 			timeout:parseInt(els.get('calltimeout')),
		 			success : function(data){
		 				if(ackStatus == "00000"){ 					
		 						onDataHandler(data);		     						
		 						hideSpinner(); 					
		 				}else{
		 					onErrorHandler(data);
		 					hideSpinner(); 	
		 				}
		 			},
		 			error:function(){ console.log("Common Error..............."); }
		 		});
		},
        renderSuccess:function(mon,yer,categoryName,categoryId){
        	
        	var expenceAndBudgetList = els.get("categoryWiseExpnses");
        	var budg=0;
        	var expc=0;
        	var monthval="";
        	monthval =yer;// expenceAndBudgetList[i].year_value;
        	var monthYearObj = {};
        	if(expenceAndBudgetList !=null){
	        	if(expenceAndBudgetList.length>0){
	        		for(var i=0;i<expenceAndBudgetList.length;i++){
	        			if(expenceAndBudgetList[i].expenceDescription=="OverAllMonthlyExpense"){
							if(!(expenceAndBudgetList[i].expense=="null" || expenceAndBudgetList[i].expense==null || expenceAndBudgetList[i].expense=="")){
								expc += parseFloat(expenceAndBudgetList[i].expense);
							}
							if(!(expenceAndBudgetList[i].budget=="null" || expenceAndBudgetList[i].budget==null || expenceAndBudgetList[i].budget=="")){
								budg += parseFloat(expenceAndBudgetList[i].budget);
							}

	        			}

	        		}
	        		monthYearObj.startMonth = expenceAndBudgetList[0].periodValue;
	        		monthYearObj.startYear = expenceAndBudgetList[0].year_value;
	        		monthYearObj.endMonth = expenceAndBudgetList[(expenceAndBudgetList.length-2)].periodValue;
	        		monthYearObj.endYear = expenceAndBudgetList[(expenceAndBudgetList.length-1)].year_value;
	        		//monthval = expenceAndBudgetList[0].monthDesc + " " + expenceAndBudgetList[0].year_value;
	        		
	        	}
        	}
        	this.$el.html(_.template(categoryWiseExpnReportTemplate,{expc:expc,budg:budg,monthval:monthval,mon:mon,categoryName:categoryName,categoryId:categoryId, monthAndYear : monthYearObj})).i18n();
 		    //$("#screentitle").text($.i18n.t('app.smartbudget.general.screenTitle'));
 		    //$("#screentitle").text(categoryName + " - " + "Across Months" );
 		    $("#screentitle").text(categoryName);
 		    $("#bdywrap").addClass('noFooter');
 		    $("#bdywrap").removeClass('sb-chartexp-gap');
		    $("#loginfooter").hide();
		    $("#genchartdiv").hide();
 		    this.showChartBudgVsExpn();
        },
        showChartBudgVsExpn:function()
        {
        // Prepare Data - BAR and LINE Chart
        	
			var expenceAndBudgetList = els.get("categoryWiseExpnses");
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
					var mk = 0;
					for(var i=0;i<expenceAndBudgetList.length;i++){
						if(expenceAndBudgetList[i].expenceDescription=="OverAllMonthlyExpense"){
							console.log(i + "-------O------> "+expenceAndBudgetList[i].budget + " : " + expenceAndBudgetList[i].expense);

								//if(!(expenceAndBudgetList[i].expense=="null" || expenceAndBudgetList[i].expense==null || expenceAndBudgetList[i].expense=="")){
									console.log(i + "------I-------> "+expenceAndBudgetList[i].budget + " : " + expenceAndBudgetList[i].expense);
									var budget = parseInt(expenceAndBudgetList[i].budget);
									
									if(isNaN(budget))
										budget = 0;
									
									var expence = parseInt(expenceAndBudgetList[i].expense);
									if(isNaN(expence))
										expence = 0;
									
									s1.push(budget);
									
									s2[mk] = new Array();
									s2[mk][0] = (mk+1);
									s2[mk][1] = expence;
									
									s3[mk] = new Array();
									s3[mk][0] = (mk+1);					
									s3[mk][1] = budget;
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
									ticks.push(expenceAndBudgetList[i].periodValue+ " " +  yr);
									
									monthDesc.push(expenceAndBudgetList[i].periodValue);
						        	year_value.push(expenceAndBudgetList[i].year_value);
						        	mk++;
							//}
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
					console.log("s1 =====>>>>",s1);
					console.log("s2 =====>>>>",s2);
					console.log("s3 =====>>>>",s3);
					console.log("ticks =====>>>>",ticks);
					console.log("yaxis =====>>>>",yaxis);
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
		                stackSeries: true,
		                /*seriesDefaults: {
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
