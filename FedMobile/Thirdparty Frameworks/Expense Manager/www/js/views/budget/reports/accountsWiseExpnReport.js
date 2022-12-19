define([	'jquery', 'underscore', 'Backbone'
        	, 'text!views/budget/reports/accountsWiseExpnReport.tpl'
        	, 'text!views/common/unCategorisePopup.tpl'
        	, 'text!views/common/pfmMonthPopup.tpl'
        	, 'text!views/common/charOptionPopup.tpl'
        	, 'collections/budget/accountsExpenseCollections'
        	, 'collections/budget/changeCategoryCollections'
        	, 'collections/budget/reportsCollections'
        	, 'text!views/budget/reports/accountsWiseExpnReportFooter.tpl'
        ],
function (	
			$, _, Backbone
			, accountsWiseExpnReportTemplate
			, budgetCategoryWiseTemplate
			, pfmMonthPopupTemplate
			, charOptionPopupTemplate
			, accountsExpenseCollections
			, changeCategoryCollections
			, reportsCollections
			, accountsWiseExpnReportFooterTemplate
		) {
	var els = new EncryptedLocalStorage('secret'); 
	var latestMonth="";
	var latestYear="";
	var restrictLength=els.get("restrictLength");
	//Body Content 
	var favorites = Backbone.View.extend({
		el:'#mobcontent',
		events:{
			"click #unCategoriseId":"unCategorisePopup",
			"click #assignNewCategory":"assignNewCategory",
			"click #monthidcate":"showMonthPopup"
			/*"click #monthSubmit":"submitPopup",
			"click #monthClose":"closeMonthPopup",
			"click #chartOptionClose":"closeChartOptionPopup",
			"click #chartOptionSubmit":"submitChartOptionPopup"*/
        },
		initialize:function(){
       	},
        render:function()
		{	
	        	loadjscssfile("js/libs/jqplot-master/jquery.jqplot.css", "css");
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
	    		latestMonth=mon;
	    		latestYear=yer;
				//yer = tody.getFullYear();
				
				var chartOptionVal = els.get("chartOptionVal");
				var categoryId = chartOptionVal.split(",")[0];
				var categoryName = chartOptionVal.split(",")[2];
				
				var that=this;			    
	        	var onDataHandler = function(collection) 
	        	{
	        		hideSpinner();
	        		that.renderSuccess(mon,categoryName,categoryId);
	        	}
	        	var onErrorHandler = function(collection) {
	        		hideSpinner();
	        		if(ackStatus=="8888")
	        		{
	        			that.errorresponse();
	        		}
	        	}
		        that.collection= new accountsExpenseCollections([],{});
		        var deviceId=getDeviceId();
		        showSpinner();
		    	that.collection.fetch({
		 			data:$.param({
						customer_Id:els.get("customerID_EM"),
						i_period_type:"M",
						i_lastnvalue:"6",
						i_expense_month:mon,
						i_expense_year:yer,
						i_categoryid:categoryId,
							r_acct_no:"ALL",
							r_acct_category:"M",
							r_acct_value:"6",
							r_acct_quarter:mon,
							r_acct_type:yer,
							flag:"AT"
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
        errorresponse: function(){
          hideSpinner();
          Backbone.history.navigate("#/exception");
        },
        renderSuccess:function(mon,categoryName,categoryId)
        {
        	this.undelegateEvents();
	    	this.delegateEvents();
        	console.log("Inside reports cat wise render..........");
		    this.$el.html(_.template(accountsWiseExpnReportTemplate,{mon:mon,categoryId:categoryId})).i18n();
		    var footer = new wealthFooter();
			footer.undelegateEvents();
			footer.render();
		    //$("#screentitle").text(categoryName + " - " + "Across Accounts" );
		    $("#screentitle").text(categoryName);
		    $("#bdywrap").removeClass('sb-chartexp-gap');
		    $("#bdywrap").addClass('noFooter');
		    $("#loginfooter").hide();
		    //$("#genchartdiv").show();
		    this.showChartExpn(mon);
		},
		showChartExpn:function(mon){
			$("#categoryChartDiv").show();
			var categorysList = els.get("accountsWiseExpnses");
			try{
				if(categorysList.length==0){
					categorysList="";
				}
			}catch(e){categorysList="";}
			
			if(categorysList.length>0){
					console.log("showChartExpn Inside ");
					var assetVal=[];
		        	var assetVal_leg=[];
		        	var key=[];
		        	var cateID=[];
		        	var monthDesc=[];
		        	var year_value=[];
		        	var amt = 0;
		        	console.log("categorysList.length : "+ categorysList.length);
		        	for(var j=0;j<categorysList.length;j++)
		        	{
		        		if(categorysList[j].expenceDescription=="OverAllExpense"){
		        			amt = parseInt(categorysList[j].expence);
		        		}
		        		if(categorysList[j].expenceDescription=="OverAllMonthlyExpenseSpecficAcct")
		        		{
		        			console.log(j + " : "+categorysList[j].categoryDesc);
				        	assetVal.push(parseInt(categorysList[j].expence));
				        	assetVal_leg.push(legentAmountFormat(categorysList[j].expence+""));
				        	key.push(categorysList[j].acct_nickname);
				        	cateID.push(categorysList[j].categID);
				        	//amt += parseFloat(categorysList[j].expence);
				        	monthDesc.push(mon);
				        	year_value.push(categorysList[j].yearvalue);
		        		}
		        	}
		        	amt = amt+"";
		        	amt = legentAmountFormat(amt);
		        	console.log("assetVal ------->"+year_value);
		        	console.log("assetVal_leg ------->"+monthDesc);
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
					
		        	this.plotChartExpn(assetVal, key, cateID, colours, monthDesc[0], year_value[0]);
		        	
		       	// Legends - DONUT Chart
		        	
		        	this.legendChartExpn(assetVal, assetVal_leg, key, amt, colours,"Y");
			}else{
				//$("#categoryChartDiv").hide();
				console.log("showChartExpn Inside ");
				var assetVal=[];
	        	var assetVal_leg=[];
	        	var key=[];
	        	var cateID=[];
	        	var monthDesc=[];
	        	var year_value=[];
	        	var amt = 0;
	        	//console.log("categorysList.length : "+ categorysList.length);
	        	//for(var j=0;j<categorysList.length;j++)
	        	//{
	        		//if(categorysList[j].expenceDescription=="OverAllExpense"){
	        			amt = parseInt("0");
	        		//}
	        		//if(categorysList[j].expenceDescription=="OverAllMonthlyExpenseSpecficAcct")
	        		//{
	        			//console.log(j + " : "+categorysList[j].categoryDesc);
			        	assetVal.push("1");
			        	assetVal_leg.push("1");
			        	key.push(" ");
			        	cateID.push(" ");
			        	//amt += parseFloat(categorysList[j].expence);
			        	//monthDesc.push(mon);
			        	//year_value.push(categorysList[j].yearvalue);
			        	monthDesc.push(latestMonth);
			        	year_value.push(latestYear);
	        		//}
	        	//}
	        	amt = amt+"";
	        	//amt = numberWithCommasWithoutZero(amt);
	        	console.log("assetVal ------->"+year_value);
	        	console.log("assetVal_leg ------->"+monthDesc);
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
				
	        	this.plotChartExpn(assetVal, key, cateID, colours, monthDesc[0], year_value[0]);
	        	
	       	// Legends - DONUT Chart
	        	
	        	this.legendChartExpn(assetVal, assetVal_leg, key, amt, colours,"N");
			}
        },
        legendChartExpn:function(assetVal,assetVal_leg, key, amt, colours,flag){

        	var counter=0;
        	$("#expnAmount").html(amt);
        	//$("#Genexpn_amount").html(amt);
        	if(flag=="Y"){
        	var legd = "<table cellpadding='0' cellspacing='0' border='0' width='85%'>";
        	//legd += "<tr><td align='left'>&nbsp;<small class='text-muted fn-size11'>ACCOUNTS</small>&nbsp;</td>";
    		//legd += "<td align='right'><small class='text-muted fn-size11'>AMOUNT&nbsp;<i class='fa fa-inr' aria-hidden='true'></i></small></td><tr>";
        	console.log("restrictLength -------- "+restrictLength);
        	console.log("restrictLength -------- "+key.length);
        	for(var i=0;i<key.length;i++){
        		if(counter>1){
        			counter=0;
        		}
        		if(i<restrictLength)
		        	{
		        		var myCanvas = "MyCanvasx"+(i+1);
		        		if(counter==0){
		        			legd += "<tr>";
		        		}
		        		if(counter==1){
	        				legd += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
	        			}
		        		//legd += "<tr style='border-bottom:solid 1px #efefef;'><td align='left'><canvas id='"+myCanvas+"' width='10' height='10'></canvas>&nbsp;<span style='color:"+colours[i]+";font-size:12px;'>"+key[i]+"</span></td>";
		        		//legd += "<td align='right'>&nbsp;<span style='font-size:12px;'>"+assetVal_leg[i]+"</span></td></tr>";
		        		legd += "<td align='left' style='border-bottom:solid 1px #e6e3e3;'><canvas id='"+myCanvas+"' width='10' height='10'></canvas>&nbsp;&nbsp;<span style='color:"+colours[i]+";font-size:12px;'>"+key[i]+"</span></td>";
		        		legd += "<td align='right' style='border-bottom:solid 1px #e6e3e3;'>&nbsp;<span style='font-size:12px;'>"+assetVal_leg[i]+"</span></td>";
		        		counter++;
		        		if(counter>1){
		        			legd += "</tr>";
		        		}
		        	}	
        	}
        	if(key.length>restrictLength)
		       	{	        	
	        		legd += "<tr><td align='left' colspan='5'><span style='color:#00000;font-size:12px;'>Legends are shown only for top 6 categories</span></td></tr>";		        		
				}
        	legd += "</table>";
    		$("#ExpnCate_legd").html(legd);
    		//$("#Genexpn_legd").html(legd);
    		
        	for(var j=0;j<key.length;j++){
        		if(j<restrictLength)
		        	{
		        		var myCanvas = "MyCanvasx"+(j+1);
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
        		$("#ExpnCate_legd").html("");
        	}
        },
        plotChartExpn:function(assetVal,key,cateID,colours, month, year){
	    		$("#ExpnsCateChart").html("");
	        	$("#ExpnsCateChart").show();
        	
        		//$("#GenExpnsChart").html("");
	        	//$("#GenExpnsChart").show();
	        	$("#MonName").html(getMonthNameShrt(getMonthNumber(month),'F'));
	        	
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
       				title0 = "<span class='cal-dnarrow-large mnt' style='z-index:0'><a id='monthidcate'> " + month + "<br>" + "<span class='yr'>"+ year +"</a></span>";

          			//title0 = "<a id='monthidcate'>" + month + "<br>" + "<small>"+ year +"</small>" +"</a>";
	        			
          				plot1 = jQuery.jqplot('ExpnsCateChart', [], {
	        		    //plot1 = jQuery.jqplot('GenExpnsChart', [], {
	        		    		seriesColors:colours,
	        		    		title : title0,
	        			      	dataRenderer: donutRenderer,
	        					grid:{
	        						drawBorder : false,
	        						drawGridlines : false,
	        						background : '#E2F7F7',
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
	        				               innerDiameter:110,
	        				               diameter:180
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
	        	var that = this;
	        	/*$('#ExpnsCateChart').bind('jqplotDataClick', function(ev, seriesIndex, pointIndex, data) {
	                console.log(plot1.series[seriesIndex].seriesColors[pointIndex] + " : " + seriesIndex + " : " +pointIndex);
	                console.log(key[pointIndex] + " : " + assetVal[pointIndex] + " : " + cateID[pointIndex]);
	                that.showChartOptionPopup(key[pointIndex], cateID[pointIndex]);
	            });*/
        },
		unCategorisePopup:function()
		{
			var catIDAcc = $("#catIDAcc").val();
			var txnIDAcc = $("#txnIDAcc").val();
			var aMTAcc = $("#aMTAcc").val();
			var catdescAcc = $("#catdescAcc").val();
			var monthAcc = $("#monthAcc").val();
			catdescAcc = "ATM WITHDRAWAL";
			if(catdescAcc.toUpperCase()=="ATM WITHDRAWAL"){
				els.set("ATMTXN",catIDAcc+","+txnIDAcc+","+aMTAcc+","+catdescAcc+","+monthAcc);
				this.Transaction();
			}else{
			
				console.log('unCategorisePopup');			
				els.set("isOtporMPIN","mpin");
				this.$("#otpModalinFooter").html(_.template(budgetCategoryWiseTemplate,{TxnID:txnIDAcc,categID:catIDAcc,spentAmt:aMTAcc})).i18n(); //bind the common template
				console.log("OTP TEMPLATE2");
				$("#unCategorisePopupId").modal({backdrop: 'static'}); //invoke the modal
				$("#unCategorisePopupId").show();
				setTimeout(function(){
					var divlen = $('div[id^=unCategorisePopupId]').length;
					console.log("div-len :...................."+divlen);
					if(divlen>1){
						for(i=1;i<divlen;i++){
							$(".commonpopupmodal").slice(i).empty();
							$(".commonpopupmodal").slice(i).remove();
						}
					}
					$(".modal-backdrop").remove();
					$("#genchartdiv").css('zIndex', '-1');
					$("#appheaderwrapperID").css('zIndex', '-1');
					$(".commonpopupmodal").css('zIndex', '9999');
	
				}, 1000);
			}
		},
		assignNewCategory:function(){
        	var popcatID = $("#popcatID").val();
    		var poptxnID = $("#poptxnID").val();
    		var popaMT = $("#popaMT").val();
    		var popassigncatID = $("#popassigncatID").val();

	    	var that = this;
  			var onDataHandler = function(collection) {
  				hideSpinner();
  				that.successNewPopup();
  			};
  			var onErrorHandler = function(collection) {
  				hideSpinner();
  				console.log("Error here budget.js-Dashboard");
  				//that.errorresponse();
  				if(ackStatus=="8888")
	        		{
	        			that.errorresponse();
	        		}
  			};
        	that.collection= new changeCategoryCollections();
        	var deviceId=getDeviceId();
        	showSpinner();
            that.collection.fetch({
				data : $.param({
					transction_Id:poptxnID,
					split_seq_id:1,
					category_Id:popassigncatID,
					i_amount:popaMT
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
	    },
	    successNewPopup:function(){
	
	    	$('#unCategorisePopupId').modal('hide');   // close the modal window
	    	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#unCategorisePopupId").unbind();
			$("#unCategorisePopupId").remove();
			
			$("#appheaderwrapperID").css('zIndex', '1');
			$(".subnav").css('zIndex', '9999');
			var acctrnd= Math.floor((Math.random() * 1000000))+"";
			Backbone.history.navigate("#/budgetCategorises/"+acctrnd);
	
	    },
		unCategoriseImage:function(){
			this.$('#otpModalinFooter').hide();
		},
		Transaction:function(){	
			 $("#bdywrap").removeClass('sb-chartexp-gap');
			 $("#bdywrap").removeClass('noFooter');
			 $("#loginfooter").show();
			 $("#genchartdiv").hide();
			 Backbone.history.navigate("#/cashwidhdral");
		},
        showMonthPopup:function(){

        	$("#loginfooter").show();
        	$("#loginfooter").removeClass("footerwrap");
        	var footer=new wealthFooter();
        	footer.undelegateEvents();
			footer.delegateEvents();
        	footer.$("#templateMonthList").html(_.template(pfmMonthPopupTemplate)).i18n(); //bind the common template
			console.log("OTP TEMPLATE2");
			
			$("#monthPopupId").modal({backdrop: 'static'}); //invoke the modal
			$("#monthPopupId").show();  //open the modal



			/*console.log("Month Popup Template........");

        	this.$("#templateMonthList").html(_.template(pfmMonthPopupTemplate)).i18n(); //bind the common template
			console.log("OTP TEMPLATE2");
			
			$("#monthPopupId").modal({backdrop: 'static'}); //invoke the modal
			$("#monthPopupId").show();  //open the modal
			
			setTimeout(function(){
				var divlen = $('div[id^=monthPopupId]').length;
				console.log("div-len :...................."+divlen);
				if(divlen>1){
					for(i=1;i<divlen;i++){
						$(".commonpopupmodal").slice(i).empty();
						$(".commonpopupmodal").slice(i).remove();
					}
				}
				$(".modal-backdrop").remove();
				$(".commonpopupmodal").css('zIndex', '9999');
				$("#appheaderwrapperID").css('zIndex', '-1');
			}, 1000);*/
        },
        closeMonthPopup:function(){
        	$('#monthPopupId').modal('hide');   // close the modal window
        	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#monthPopupId").unbind();
			$("#monthPopupId").remove();
			$(".commonpopupmodal").css('zIndex', '9999');
			$("#appheaderwrapperID").css('zIndex', '-1');
        },
        submitPopup:function(){
        	var month_year = $("#expnMonthList option:selected").val();
			console.log("month_year : "+ month_year);
			els.set("cate_expn_chart_month_year",month_year);
        	$('#monthPopupId').modal('hide');   // close the modal window
        	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#monthPopupId").unbind();
			$("#monthPopupId").remove();
			
			$("#appheaderwrapperID").css('zIndex', '1');
			$(".subnav").css('zIndex', '9999');
			var acctrnd= Math.floor((Math.random() * 1000000))+"";
			Backbone.history.navigate("#/accountsexpensesreports/"+acctrnd);
			
        },
        showChartOptionPopup:function(cateName,cateId){
			console.log("Month Popup Template........");

        	this.$("#templateChartOptionList").html(_.template(charOptionPopupTemplate,{cateName:cateName,cateId:cateId})).i18n(); //bind the common template
			console.log("OTP TEMPLATE2");
			
			$("#chartOptionPopupId").modal({backdrop: 'static'}); //invoke the modal
			$("#chartOptionPopupId").show();  //open the modal
			
			setTimeout(function(){
				var divlen = $('div[id^=chartOptionPopupId]').length;
				console.log("div-len :...................."+divlen);
				if(divlen>1){
					for(i=1;i<divlen;i++){
						$(".commonpopupmodal").slice(i).empty();
						$(".commonpopupmodal").slice(i).remove();
					}
				}
				$(".modal-backdrop").remove();
				$(".commonpopupmodal").css('zIndex', '9999');
				$("#appheaderwrapperID").css('zIndex', '-1');
			}, 1000);
        },
        closeChartOptionPopup:function(){
        	$('#chartOptionPopupId').modal('hide');   // close the modal window
        	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#chartOptionPopupId").unbind();
			$("#chartOptionPopupId").remove();
			$(".commonpopupmodal").css('zIndex', '9999');
			$("#appheaderwrapperID").css('zIndex', '-1');
        },
        submitChartOptionPopup:function(){
        	var chartOptionVal = $("#chartOptionList option:selected").val();
			console.log("month_year : "+ chartOptionVal);
			//els.set("cate_expn_chart_month_year",month_year);
			els.set("chartOptionVal",chartOptionVal);
        	$('#chartOptionPopupId').modal('hide');   // close the modal window
        	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#chartOptionPopupId").unbind();
			$("#chartOptionPopupId").remove();
			
			$("#appheaderwrapperID").css('zIndex', '1');
			//$(".subnav").css('zIndex', '9999');
			//var acctrnd= Math.floor((Math.random() * 1000000))+"";
			
			if(chartOptionVal.split(",")[1]=="A"){
				console.log("Account Wise......");
				Backbone.history.navigate("#/accountsexpensesreport");
			}else{
				console.log("Month Wise......");
				Backbone.history.navigate("#/categoryexpensesreport");
			}
        }
	});
	var wealthFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			"click .monthSubmit":"submitPopup",
			"click #monthClose":"closeMonthPopup",
			"click #chartOptionClose":"closeChartOptionPopup",
			"click #chartOptionSubmit":"submitChartOptionPopup"
				
        },
      
        render:function()
		{
			
        	console.log("Inside budget renderfoooteerrr..........");
        	this.$el.html(_.template(accountsWiseExpnReportFooterTemplate)).i18n();
        	
        	/*this.undelegateEvents();
        	this.delegateEvents();*/
        	//$("#loginfooter").removeClass("footerwrap");
        	return this;
        },
        submitPopup:function()
        {
        	var header= new favorites();
        	header.submitPopup();
        	header.undelegateEvents();
        	$("#loginfooter").hide();
        	$("#loginfooter").addClass("footerwrap");
        },
		closeMonthPopup:function()
		{
			var header= new favorites();
			header.closeMonthPopup();
			header.undelegateEvents();
			$("#loginfooter").hide();
			$("#loginfooter").addClass("footerwrap");
		},
		submitChartOptionPopup:function(){
			var header= new favorites();
			header.submitChartOptionPopup();
			header.undelegateEvents();
			$("#loginfooter").hide();
			$("#loginfooter").addClass("footerwrap");

		},
		closeChartOptionPopup:function(){
			var header= new favorites();
			header.closeChartOptionPopup();
			header.undelegateEvents();
			$("#loginfooter").hide();
			$("#loginfooter").addClass("footerwrap");

		}
       /* goToViewStatement:function(){
        	this.gotoSubmit();
        	 els.set("emailflag","N");
        	 var header = new wealth();
        	 header.viewStatement();
	    },
	
	    emailStatement:function(){
     	    console.log("inside emailStatement"); 
     	    els.set("emailflag","Y");
     	    els.set("backfromemail","wealth");
     	    var header = new wealth();
     	    header.viewStatement();
	    }*/
	});
	return favorites;
});