define([	'jquery', 'underscore', 'Backbone'
        	, 'text!views/budget/dashboard/budgetCategorise.tpl'
        	, 'text!views/common/unCategorisePopup.tpl'
        	, 'text!views/common/pfmMonthPopup.tpl'
        	, 'collections/budget/accountsCollections'
        	, 'collections/budget/splitTransactionCollections'
        	, 'libs/jquery/jquery.touchSwipe.min'
        	, 'text!views/budget/dashboard/budgetCategoriseFooter.tpl'
        	/*, 'views/budget/dashboard/cashWithdrawal'
          	, 'views/budget/budgets/budgets'*/
        ],
function (	
			$, _, Backbone
			, budgetCategoriseTemplate
			, unCategorisePopupTemplate
			, pfmMonthPopupTemplate
			, accountsCollections
			, splitTransactionCollections
			, touchSwipe
			, budgetCategoriseFooterTemplate
			/*, budgetCategoriseCollections
			  , cashWithdrawal
			  , budgets*/
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
			//"click #transaction":"Transaction",
			//"click #unCategoriseImageId":"unCategoriseImage",
			"click #assignNewCategory":"assignNewCategory",
			"click #monthidcate":"showMonthPopup",
			"click #monthSubmit":"submitPopup",
			"click #monthClose":"closeMonthPopup"
        },
		initialize:function(){
       	},
       	update:function()
		{
       		this.render(els.get("acct_nick_name"),els.get("acct_id"));
		},
        render:function(name,id)
		{	
        	
        	loadjscssfile("js/libs/jqplot-master/jquery.jqplot.css", "css");
        	els.set("acct_nick_name",name);
        	els.set("ATMTXN","");
        	els.set("acct_id",id);
        	var tody = new Date();
        	var mnth_yr=els.get("cate_expn_chart_month_year");
        	console.log("accountsWiseExpnReport : mnth_yr : "+ mnth_yr);
    		var mon,yer;
    		if(!(mnth_yr=="undefined" || mnth_yr==undefined || mnth_yr==null || mnth_yr=="null" || mnth_yr=="")){
    			mon = mnth_yr.split(",")[0];
    			yer = mnth_yr.split(",")[1];
    		}else{
    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
    			yer = tody.getFullYear();
    		}
			//yer = tody.getFullYear();
			mon = mon.toUpperCase();
			latestMonth=mon;
			latestYear=yer;
			
			var that=this;			    
        	var onDataHandler = function(collection) 
        	{
        		hideSpinner();
        		that.renderSuccess(name,mon);
        	}
        	var onErrorHandler = function(collection) {
        		hideSpinner();
        		console.log("ERROR");
        	}
	        that.collection= new accountsCollections([],{});
	        var deviceId=getDeviceId();
	        showSpinner();
	    	that.collection.fetch({
	 			data:$.param({
	 				customer_Id:els.get("customerID_EM"),
	 				type_category:id,
	 				period_type:"M",
	 				number_of_month:"6",
	 				month_category:mon+"-M",
	 				year_category:"ALL", //yer,
		 				expDescription:"",
		 				expDescriptionMonth:"",
		 				expDescriptionAll:"",
	 				flag:"AE",
	 				customer_transactionID:id,
	 				acct_period_type:"M",
	 				acct_number_of_month:"6",
	 				acct_month_category:mon,
	 				acct_year_category:"ALL" //yer
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
        renderSuccess:function(name,mon)
        {
    		this.undelegateEvents();
	    	this.delegateEvents();

        	console.log("Inside accounts render..........");
		    this.$el.html(_.template(budgetCategoriseTemplate,{mon:mon, name:name})).i18n();
			$(".back_butt").show();
			$("#screentitle").text($.i18n.t('app.smartbudget.general.accounts'));
		    var footer = new wealthFooter();
	    	footer.undelegateEvents();
	    	footer.render();

		    //$("#screentitle").text($.i18n.t(name));
		    $("#bdywrap").removeClass('sb-chartexp-gap');
		    $("#bdywrap").addClass('noFooter');
		    $("#loginfooter").hide();
		    $("#genchartdiv").show();
		    this.showChartExpn();
		},
		showChartExpn:function(){	
			
			var categorysList = els.get("accountList");
						
			var assetVal=[];
        	var assetVal_leg=[];
        	var key=[];
        	var monthDesc=[];
        	var year_value=[];
        	var amt = 0;
        	var els_acct_id = els.get("acct_id");
        	var cntr=0;
        	console.log("categorysList.length ------->"+categorysList.length);
        	var lenn=categorysList.length;
        	if(categorysList.length==1)
        	{
        		if( categorysList[0].category=="null" || categorysList[0].category==null || categorysList[0].category=="" )
        		{
        			lenn = 0;
        		}
        	}
        	
        	if(lenn>0)
        	{
        			var colours= new Array();
		        	
		        	var categoryColors = new Array();
					
						categoryColors=els.get("categoryColorsArray");
						console.log("=-=-========----55555555555-------=======",categoryColors);
					

		        	for(var j=0;j<categorysList.length;j++){
		        		if(categorysList[j].expenceDescription=="OverAllExpense"){
		        			//amt = parseInt(categorysList[j].expence);
		        		}
		        		if(!(categorysList[j].category=="null" || categorysList[j].category==null || categorysList[j].category=="")){
		        			if(els_acct_id==categorysList[j].custAcctID){
		        				if(cntr<7){
					        	assetVal.push(parseInt(categorysList[j].expence));
					        	assetVal_leg.push(legentAmountFormat(categorysList[j].expence+""));

					        	var CateGory = categorysList[j].category;	
					        	var category_split = CateGory.split('-');

					        	key.push(category_split[0]);

					        	var eachCategoryId=category_split[1];
					        	colours.push(categoryColors[eachCategoryId]); 
						        

					        	amt += parseFloat(categorysList[j].expence);
					        	monthDesc.push(categorysList[j].periodValue);
					        	year_value.push(categorysList[j].year_value);
		        				}else{
		        					amt += parseFloat(categorysList[j].expence);
		        				}
		        				cntr++;
		        			}
		        		}
		        	}
		        	amt = amt+"";
		        	amt = legentAmountFormat(amt);
		        	console.log("assetVal ------->"+year_value);
		        	console.log("assetVal_leg ------->"+monthDesc);
		        	console.log("key ------->"+key);
		        	console.log("amt ------->"+amt);
					console.log("colours Order---->"+colours);
										
				// Plot Chart - DONUT Chart
					
		        	this.plotChartExpn(assetVal, key, colours, monthDesc[0], year_value[0]);
		        	
		       	// Legends - DONUT Chart
		        	
		        	this.legendChartExpn(assetVal, assetVal_leg, key, amt, colours,"Y");
			}else{
					//for(var j=0;j<categorysList.length;j++){
		        		//if(categorysList[j].expenceDescription=="OverAllExpense"){
		        			amt = parseInt("0");
		        		//}
		        		//if(!(categorysList[j].category=="null" || categorysList[j].category==null || categorysList[j].category=="")){
		        			//if(els_acct_id==categorysList[j].custAcctID){
		        				//if(cntr<6){
					        	assetVal.push(parseInt("1"));
					        	assetVal_leg.push("1");
					        	key.push(" ");
					        	//amt += parseFloat(categorysList[j].expence);
					        	monthDesc.push(latestMonth);
					        	year_value.push(latestYear);
		        				//}else{
		        					//amt += parseFloat(categorysList[j].expence);
		        				//}
		        				//cntr++;
		        			//}
		        		//}
		        	//}
		        	amt = amt+"";
		        	//amt = numberWithCommasWithoutZero(amt);
		        	console.log("assetVal ------->"+assetVal);
		        	console.log("assetVal_leg ------->"+assetVal_leg);
		        	console.log("key ------->"+key);
		        	console.log("amt ------->"+amt);
		        	console.log("year_value ------->"+year_value);
		        	console.log("monthDesc ------->"+monthDesc);
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
					
		        	this.plotChartExpn(assetVal, key, colours, monthDesc[0], year_value[0]);
		        	
		       	// Legends - DONUT Chart
		        	
		        	this.legendChartExpn(assetVal, assetVal_leg, key, amt, colours,"N");
			}
        },
        legendChartExpn:function(assetVal,assetVal_leg, key, amt, colours,flag){
        	$("#Genexpn_amount").html(amt);
        	var counter=0;
	        if(flag=="Y"){
	        	var legd = "<table cellpadding='0' cellspacing='0' border='0' width='85%'>";
	        	//legd += "<tr><td align='left'><small class='text-muted fn-size11'>CATEGORIES</small></td>";
	    		//legd += "<td align='right'><small class='text-muted fn-size11'>AMOUNT&nbsp;<i class='fa fa-inr' aria-hidden='true'></i></small></td><tr>";
	        	for(var i=0;i<key.length;i++){
	        		if(counter>1){
	        			counter=0;
	        		}
	        		if(i<restrictLength)
			        	{
	        				console.log("counter : "+ counter);
			        		var myCanvas = "MyCanvasx"+(i+1);
			        			if(counter==0){
			        			legd += "<tr>";
			        			}
			        			if(counter==1){
			        				legd += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
			        			}
			        			legd += "<td align='left' style='border-bottom:solid 1px #e6e3e3;'><canvas id='"+myCanvas+"' width='8' height='8'></canvas>&nbsp;&nbsp;<span style='color:"+colours[i]+";font-size:10px;'>"+key[i]+"</span></td>";
				        		legd += "<td align='right' style='border-bottom:solid 1px #e6e3e3;'>&nbsp;<span style='font-size:10px;'>"+assetVal_leg[i]+"</span></td>";
				        		counter++;
				        		if(counter>1){
				        			legd += "</tr>";
				        		}
			        		
			        	}
	        	}
	        	console.log("TopCATEEE ====>>>"+key.length+"=-=-=-==-==-"+restrictLength);
	        	if(key.length>restrictLength)
		       	{	        	
	        		legd += "<tr><td align='left' colspan='5'><span style='color:#00000;font-size:12px;'>Legends are shown only for top 6 categories</span></td></tr>";		        		
				}
	        	legd += "</table>";
	    		$("#Genexpn_legd").html(legd);
	    		
	        	for(var j=0;j<key.length;j++){
	        		if(j<restrictLength)
		        	{
		        		var myCanvasx = "MyCanvasx"+(j+1);
		        		var canvas = document.getElementById(myCanvasx);
		        		var context = canvas.getContext('2d');
		                context.beginPath();
		                context.rect(0, 0, 10, 10);
		                context.fillStyle = colours[j];
		                context.fill();
		                context.lineWidth = 1;
		            }    
	        	}
	        }else{
	        	$("#Genexpn_legd").html("");
	        }
        },
        plotChartExpn:function(assetVal,key,colours, month, year){
        		$("#GenExpnsChart").html("");
	        	$("#GenExpnsChart").show();
	        	
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
	          			//title0 = "<a id='monthidcate' class='cal-dnarrow'><span class='mnt'>" + month + "<br>" + "<span class='yr'>"+ year +"</span>" +"</a>";
	          			//title0 = "<a id='monthidcate'>" + month + "<br>" + "<small>"+ year +"</small>" +"</a>";
	        			
	        		    plot1 = jQuery.jqplot('GenExpnsChart', [], {
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

        },
		unCategorisePopup:function(){
			els.set("ATMTXN_CATE","");
			var catIDAcc = $("#catIDAcc").val();
			var txnIDAcc = $("#txnIDAcc").val();
			var aMTAcc = $("#aMTAcc").val();
			var catdescAcc = $("#catdescAcc").val();
			var categoryNameAcc = $("#categoryNameAcc").val();
			var tempDecText = "";
			if(catdescAcc.indexOf(",")!=-1){
				var catdescAccArr = catdescAcc.split(",");
				for(var xa=0;xa<catdescAccArr.length;xa++){
					tempDecText += catdescAccArr[xa];
					if(xa<catdescAccArr.length-1){
						tempDecText += "|COMMA|";
					}
				}
			}else{
				tempDecText = catdescAcc;
			}
			catdescAcc=tempDecText;
			console.log("tempDecText............."+tempDecText);
			var monthAcc = $("#monthAcc").val();
			var catdescAccCode = catdescAcc.substring(0,catdescAcc.indexOf("-"));
			var catdescAccDesc = catdescAcc.substring(catdescAcc.indexOf("-")+1,catdescAcc.length);
			
			
			
			//catdescAccCode = catdescAccCode
			//catdescAcc = "ATM WITHDRAWAL";
			var eventTriggered = $("#eventtriggered").val();
			console.log("eventTriggered............."+eventTriggered);
			//if(catIDAcc=="27"){
				//if(catdescAccCode.toUpperCase()=="CSW" || catdescAccCode.toUpperCase()=="ATM WITHDRAWAL" || catdescAccCode.toUpperCase()=="CASH WITHDRAWAL"){
				//if(catdescAccCode.toUpperCase()=="CSW" && eventTriggered=="C"){
				var Action_Type = els.get("Action_Type");
				console.log("Action_Type............."+Action_Type);
				
				els.set("eventTriggered",eventTriggered);
				
				if(eventTriggered=="CS"){
					els.set("ATMTXN_CATE_NAME","Uncategorized");
					var categorysListAcct = els.get("ExpencesCategoryListAcct");
					var categoryIdArr=[];
					var txnIdArr=[];
					var txnAmtArr=[];
					//var catdescAccDesc="";
					
					for(var mk=0;mk<categorysListAcct.length;mk++){
						var Split_txnId = categorysListAcct[mk].accountType;
						console.log(Split_txnId + " : " + txnIDAcc);
						if(Split_txnId.indexOf(txnIDAcc)!=-1){
							categoryIdArr.push(categorysListAcct[mk].categoryID);
							txnIdArr.push(categorysListAcct[mk].transcID);
							txnAmtArr.push(categorysListAcct[mk].expence);
						}
					}
					var tamtval="";
					if(aMTAcc.indexOf(",")!=-1){
						var amtarr = aMTAcc.split(",");
						for(kk=0;kk<amtarr.length;kk++){
							tamtval += amtarr[kk];
						}
					}else{
						tamtval = aMTAcc;
					}
					aMTAcc = tamtval;
					els.set("ATMTXN","27"+","+txnIDAcc+","+aMTAcc+","+catdescAccDesc+","+monthAcc);
					els.set("categoryIdArr",categoryIdArr);
					els.set("txnIdArr",txnIdArr);
					els.set("txnAmtArr",txnAmtArr);
					els.set("ATMTXN_CATE",catdescAccCode);
					//els.set("ATMTXN_MON",monthAcc);
					this.Transaction();
				}else if(eventTriggered=="C"){
					els.set("ATMTXN_CATE_NAME",categoryNameAcc);
					els.set("ATMTXN",catIDAcc+","+txnIDAcc+","+aMTAcc+","+catdescAccDesc+","+monthAcc);
					els.set("ATMTXN_CATE",catdescAccCode);
					this.Transaction();
				}else if(eventTriggered=="S"){
					els.set("ATMTXN_CATE_NAME",categoryNameAcc);
					console.log('unCategorisePopup : '+ txnIDAcc + " : " + catIDAcc);			
					els.set("isOtporMPIN","mpin");
					this.$("#otpModalinFooter").html(_.template(unCategorisePopupTemplate,{TxnID:txnIDAcc,categID:catIDAcc,spentAmt:aMTAcc})).i18n(); //bind the common template
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
			//}else{
			//	els.set("ATMTXN",catIDAcc+","+txnIDAcc+","+aMTAcc+","+catdescAccDesc+","+monthAcc);
			//	els.set("ATMTXN_CATE",catdescAccCode);
			//	this.Transaction();
			//}
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
  				that.successNewPopup();
  			};
        	that.collection= new splitTransactionCollections();
        	var deviceId=getDeviceId();
        	showSpinner();
            that.collection.fetch({
				data : $.param({
					transction_Id:poptxnID,
					split_seq_id:'1C',
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
			//Backbone.history.navigate("#/budgetCategorises/"+acctrnd);
			Backbone.history.navigate("#/budgetCategorises/"+els.get("acct_nick_name")+"/"+els.get("acct_id")+"/"+acctrnd);

	    },
		unCategoriseImage:function(){
			this.$('#otpModalinFooter').hide();
		},
		Transaction:function(){	
			 $("#bdywrap").removeClass('sb-chartexp-gap');
			 $("#bdywrap").removeClass('noFooter');
			 $("#loginfooter").show();
			 $("#genchartdiv").hide();
			 els.set("goBackScreen","ACCOUNTS");
			 Backbone.history.navigate("#/cashwidhdral");
		},
        showMonthPopup:function(){
			console.log("Month Popup Template........");
			$("#loginfooter").show();
			$("#loginfooter").removeClass("footerwrap");
        	var footer=new wealthFooter();
        	footer.undelegateEvents();
			footer.delegateEvents();
        	footer.$("#templateMonthList").html(_.template(pfmMonthPopupTemplate)).i18n(); //bind the common template
			
			
			$("#monthPopupId").modal({backdrop: 'static'}); //invoke the modal
			$("#monthPopupId").show();  //open the modal

			/*
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
			Backbone.history.navigate("#/budgetCategorises/"+els.get("acct_nick_name")+"/"+els.get("acct_id")+"/"+acctrnd);
			
        },
        
	});


var wealthFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			"click .monthSubmit":"submitPopup",
			"click #monthClose":"closeMonthPopup",
			"click #ButIdLater":"closeUncateInfoPopup",
			"click #ButIdNow":"nowcateInfoPopupClose"
			//"click #viewstatement":"goToViewStatement",
			//"click #emailstatement":"emailStatement",
				
        },
      
        render:function()
		{
			
        	console.log("Inside budget renderfoooteerrr..........");
        	this.$el.html(_.template(budgetCategoriseFooterTemplate)).i18n();
        	
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
		nowcateInfoPopupClose:function(){
			var header= new favorites();
			header.nowcateInfoPopupClose();
			header.undelegateEvents();
			$("#loginfooter").hide();
			$("#loginfooter").addClass("footerwrap");

		},
		closeUncateInfoPopup:function(){
			var header= new favorites();
			header.closeUncateInfoPopup();
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