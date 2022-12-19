define(['jquery', 'underscore', 'Backbone'
        , 'routers/budgetrouter'
        , 'text!views/budget/budget.tpl'
        , 'text!views/budget/budgetFooter.tpl'        
        , 'text!views/common/otpTemplate.tpl'
        , 'text!views/common/pfmMonthPopup.tpl'
        , 'text!views/common/unCategorisePopup.tpl'
        , 'text!views/common/smartbudgetUncategorizePopup.tpl'
        , 'collections/budget/dashboardBandECollections'
        , 'collections/budget/dynamicDashboardBandECollections'
        , 'collections/budget/dashboardUncateCollections'
        , 'collections/budget/splitTransactionCollections'
        , 'libs/jquery/jquery.touchSwipe.min'
 ],
 function($, _, Backbone
			, budgetRouter
			, budgetTemplate
			, budgetFooterTemplate
			, otpTemplate
			, pfmMonthPopupTemplate
			, unCategorisePopupTemplate
			, smartbudgetUncategorizePopupTemplate
			, dashboardBandECollections
			, dynamicDashboardBandECollections
			, dashboardUncateCollections
			, splitTransactionCollections
			, touchSwipemin
		) {
	var els = new EncryptedLocalStorage('secret'); 
	var latestMonth="";
	var latestYear="";
	els.set("restrictLength","6");
	/*====================Category Colours===========================*/

	/*var categoryColorsArray = new Array();
	categoryColorsArray[1]="#1127B4";  // coressponding category ---> transport
	categoryColorsArray[2]="#FF9900";  // coressponding category ---> entertainment
	categoryColorsArray[3]="#CC66CC";  // coressponding category ---> utility
	categoryColorsArray[4]="#5CD65C";  // coressponding category ---> invest
	categoryColorsArray[5]="#1A53FF";  // coressponding category ---> shop
	categoryColorsArray[6]="#00B3B3";  // coressponding category ---> food
	categoryColorsArray[7]="#FFFF4D";  // coressponding category ---> travel
	categoryColorsArray[8]="#E67700";  // coressponding category ---> groceries
	categoryColorsArray[9]="#ADAD85";  // coressponding category ---> health
	categoryColorsArray[27]="#5C5C8A";   // coressponding category ---> uncategorised
	categoryColorsArray[28]="#00CC44";   // coressponding category ---> other

	els.set("categoryColorsArray",categoryColorsArray);*/

	/*===============================================*/

	var restrictLength=els.get("restrictLength");
//Body Content 
	var budget_dashboard = Backbone.View.extend({
		el:'#mobcontent',
		events:{
			"click #unCategoriseId":"CategoryPopup",
			"click #monthid":"showMonthPopup",
			"click #CategoryPopup":"CategoryPopup",
			"click #assignNewCategory":"assignNewCategory",
			"click #categorydetails":"showcategorydetails",
			"click #splitTxn":"gotosplitTxn",
			"change #YourExpnType":"changeYourExpnType"
		},
		showcategorydetails:function(event){
        	if(els.get("PopupTriggered")=="YES"){
            	event.stopPropagation();
        	}else{
        		if(els.get('changeYourExpnType')=="" || els.get('changeYourExpnType')==null){
        			Backbone.history.navigate("#/budgetcategorywise");
	        	}else{
	        		Backbone.history.navigate("#/accounts");
	        	}
        	}
		},
		initialize:function(){
			var budgetrouter=new budgetRouter();
       	},
	    render:function()
	    {	
	    		els.set("unCategorysListPage","N");
				els.set("PopupTriggered","");
				els.set("cate_expn_chart_month_year",'');
				els.set("ATMTXN","");
				els.set("gobackscreen","SB");
				$(".back_butt").hide();
	    		var mnth_yr=els.get("cate_chart_month_year");
	    		var mon,yer;
	    		if(!(mnth_yr=="undefined" || mnth_yr==undefined || mnth_yr==null || mnth_yr=="null" || mnth_yr=="")){
	    			mon = mnth_yr.split(",")[0];
	    			yer = mnth_yr.split(",")[1];
					var new_cate_chart_month_year=mon+","+yer;
	    			els.set("cate_chart_month_year",new_cate_chart_month_year);
	    			els.set("cate_expn_chart_month_year",new_cate_chart_month_year);
	    		}else{
	    			var tody = new Date();
	    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
	    			yer = tody.getFullYear();
	    			var new_cate_chart_month_year=mon+","+yer;
	    			els.set("cate_chart_month_year",new_cate_chart_month_year);
	    			els.set("cate_expn_chart_month_year",new_cate_chart_month_year);
	    		}
	    		latestMonth=mon;
	    		latestYear=yer;
	    		els.set("ackStatus_bugd","");
	    		mon = mon.toUpperCase();
	    		console.log(mon + " ---- " + yer);
		    	var that = this;
	  			var onDataHandler = function(collection) {
	  				hideSpinner();
	  				that.gateAllUncategoryTxns();
	  				els.set('smartbudgetInfoShow',"YES");
	  			};
	  			var onErrorHandler = function(collection) {
	  				hideSpinner();
	  				console.log("Error here budget.js-Dashboard");
	  				that.errorresponse();
	  			};
	        	var flagVal = "";
	        	console.log("els.get('changeYourExpnType').................."+els.get('changeYourExpnType'));
	        	if(els.get('changeYourExpnType')=="" || els.get('changeYourExpnType')==null){
	        		flagVal = "ECUMN";
	        	}else{
	        		flagVal = "EAUMN";
	        	}
	        	that.collection= new dynamicDashboardBandECollections();
	        	var deviceId=getDeviceId();
	        	showSpinner();
       	
	            that.collection.fetch({
					data : $.param({
						customer_Id:els.get("customerID_EM"),
						period_type:"M",
						number_of_month:"6",
						flag:flagVal,
						type_category:"ALL",
						uncatagory:"ALL", //yer,
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
	     				if(ackStatus == "00000" || ackStatus == "9999")
	     				{
	     					els.set("ackStatus_bugd",ackStatus);
	     					console.log("ackStatus : "+ ackStatus);
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
        changeYourExpnType:function(){
        		console.log("=========YourExpnType========>>",$("#YourExpnType").val());
        		if($("#YourExpnType").val()=="A")
        		{
        			els.set('changeYourExpnType',"ACC");		
        		}else{
        			els.set('changeYourExpnType',"");
        		}
        	
        	var acctrnd= Math.floor((Math.random() * 1000000))+"";
			Backbone.history.navigate("#/dashboards/"+acctrnd);
        },
        gateAllUncategoryTxns:function()
	    {
        	
        	
        		var categoryColorsArray = new Array();
        		var categoryNames = els.get("categoryNames");
        		var categoryID = 0;
	        	_.each(categoryNames,function(data){
	        		categoryID = parseInt(data.categoryID)
	        		categoryColorsArray[categoryID] = "#"+data.colorCode;
	        		console.log(categoryID + " " + "#"+data.colorCode);
				});
	        	els.set("categoryColorsArray",categoryColorsArray);
	        	
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
	    		latestMonth=mon;
	    		latestYear=yer;
		    	var that = this;
	  			var onDataHandler = function(collection) {
	  				hideSpinner();
	  				that.renderSuccess();
	  			};
	  			var onErrorHandler = function(collection) {
	  				hideSpinner();
	  				console.log("Error here budget.js-Dashboard");
	  				that.errorresponse();
	  			};
	  			
	        	that.collection= new dashboardUncateCollections();
	        	var deviceId=getDeviceId();
	        	showSpinner();
	            that.collection.fetch({
					data : $.param({
						customer_Id:els.get("customerID_EM"),
						period_type:"M",
						number_of_month:"6",
						flag:"U",
						type_category:"ALL",
						uncatagory:"ALL",
						month_category:"ALL",
						year_category:"ALL",
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
	     				if(ackStatus == "00000" || ackStatus == "9999")
	     				{
	     					els.set("ackStatus_bugd",ackStatus);
	     					console.log("ackStatus : "+ ackStatus);
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
        showMonthPopup:function(event){
        	$("#loginfooter").show();
        	$("#loginfooter").removeClass("footerwrap");
        	els.set("PopupTriggered","YES");
        	var footer=new wealthFooter();
        	footer.undelegateEvents();
			footer.delegateEvents();
        	footer.$("#templateMonthList").html(_.template(pfmMonthPopupTemplate)).i18n(); //bind the common template
			console.log("OTP TEMPLATE2");
			
			$("#monthPopupId").modal({backdrop: 'static'}); //invoke the modal
			$("#monthPopupId").show();  //open the modal
			/*
			setTimeout(function(){
				var divlen = $('div[id^=monthPopupId]').length;
				console.log("div-len :...................."+divlen);
				if(divlen>1){
					for(i=1;i<divlen;i++){
						$(".commonpopupmodal").slice(i).empty();
						$(".commonpopupmodal").slice(i).remove();
					}
				}
				//$(".modal-backdrop").remove();
				$(".content").css("z-index","0");
				$(".commonpopupmodal").css('zIndex', '9999');
				$("#appheaderwrapperID").css('zIndex', '-999');
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
			els.set("cate_chart_month_year",month_year);
        	$('#monthPopupId').modal('hide');   // close the modal window
        	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#monthPopupId").unbind();
			$("#monthPopupId").remove();
			
			$("#appheaderwrapperID").css('zIndex', '1');
			$(".subnav").css('zIndex', '9999');
			var acctrnd= Math.floor((Math.random() * 1000000))+"";
			Backbone.history.navigate("#/dashboards/"+acctrnd);
			
        },
        renderSuccess:function(){
        	this.undelegateEvents();
	    	this.delegateEvents();
	    	this.$el.html(_.template(budgetTemplate)).i18n();
	    	var footer = new wealthFooter();
	    	footer.undelegateEvents();
	    	footer.render();

        	console.log("Inside budget render..........");
        	$("#screentitle").text($.i18n.t('app.smartbudget.general.dashboard'));
        	$("#bdywrap").addClass('noFooter');
        	$("#bdywrap").removeClass('sb-chartexp-gap');
 		    $("#loginfooter").hide();
 		   //$("#loginfooter").show();
 		    $("#genchartdiv").hide();
 		   els.set("categoryNameList", els.get("categoryNames"));
 		   this.showChartBudgVsExpn();
 		   this.showChartExpn();
 		   //this.showUncatgorizedTxns();
 		  console.log("----'smartbudgetUncateInfoShow'----------------->"+els.get('smartbudgetUncateInfoShow'));
 		  //if(els.get('smartbudgetUncateInfoShow')!="YES"){
 		  	/**/
 		  	console.log("unCategorysList_length ",unCategorysList.length);

 		  	if(unCategorysList.length>0)
 		  	{
 		  		if(els.get("smartbudgetUncateInfoShow")=="SHOWONCE")
	 		  	{
 		  			this.showUncateInfoPopup(unCategorysList.length);
 		  			els.set("smartbudgetUncateInfoShow","");
	 		  	}
 		  	}
      		
 		  //}
        },
        gotosplitTxn:function(){
        	var catIDAcc = $("#catIDAcc").val();
			var txnIDAcc = $("#txnIDAcc").val();
			var aMTAcc = $("#aMTAcc").val();
			var catdescAcc = $("#catdescAcc").val();
			var monthAcc = $("#monthAcc").val();
			
			catdescAccCode = catdescAcc.split("-")[0];
			catdescAccCode = catdescAccCode;
			els.set("goBackScreen","DASHBOARD");
        	els.set("ATMTXN",catIDAcc+","+txnIDAcc+","+aMTAcc+","+catdescAcc+","+monthAcc);
			//this.Transaction();
			Backbone.history.navigate("#/cashwidhdral");
        },
        showUncatgorizedTxns:function(){
        	var unCategorysList = els.get("AllunCategorysList");
        	if(unCategorysList==null){
        		unCategorysList="";
        	}
        	
        	var CateName, spentAmt, CateDec, TnxMonth, TnxDate,nickName;

        	var uncateTxnHTML = "";
        	var paramArr = [];
        	if(unCategorysList.length>0){
	        	for(var idx=0;idx<3;idx++){ //unCategorysList.length
	        		
	        		CateName = unCategorysList[idx].description;
	        		CateDesc = unCategorysList[idx].categoryDesc;
	        		spentAmt = unCategorysList[idx].expense;
	        		TnxMonth = unCategorysList[idx].monthDesc;
	        		console.log("TnxMonth : ............. : "+TnxMonth);
	        		if(TnxMonth.indexOf("|")!=-1){
	        			console.log("TnxMonth 1 : ............. : "+TnxMonth);
	        			var temparr = TnxMonth.split("|");
	        			TnxMonth = temparr[0];
	        			nickName = temparr[1];
	        		}
	        		
	        		TnxDate = unCategorysList[idx].transactionID+"";
	        		year_value = unCategorysList[idx].year_value;
	        		TnxDate = TnxMonth + " " +TnxDate.substring(6,8);
	        		TxnID = unCategorysList[idx].transactionID+"";
	        		categID = unCategorysList[idx].categID+"";
	        		console.log("unCategorysList : ............. : "+ CateDesc + " -- " + spentAmt + " -- " + TnxDate);
	        		if(CateName==null || CateName=="null"){
	        			CateName="";
	        		}
		        	uncateTxnHTML += "<div class='cat_grp'>";
		        	uncateTxnHTML += "<div class='media-left'><span class='question_ico'>?</span></div>";
		        	uncateTxnHTML += "<div class='media-body'>";
		        	uncateTxnHTML += "<span class='activeswipelable' id='unCategoriseId' >";
		        	var catecode="";
		        	if(CateName.indexOf("-")!=-1){
		        		catecode = CateName.substring(0,CateName.indexOf("-"));
		        		CateName = CateName.substring(CateName.indexOf("-")+1,CateName.length);
		        	}else{
		        		catecode = CateName;
		        	}
		        	
		        	uncateTxnHTML += "<input type='hidden' name='TransactionId' id='TransactionId' value='"+TxnID+"' />";
		        	uncateTxnHTML += "<input type='hidden' name='categoryId' id='categoryId' value='"+categID+"' />";
		        	uncateTxnHTML += "<input type='hidden' name='AmountValue' id='AmountValue' value='"+spentAmt+"' />";
		        	uncateTxnHTML += "<input type='hidden' name='TransDesc' id='TransDesc' value='"+CateName+"' />";
		        	uncateTxnHTML += "<input type='hidden' name='monthValue' id='monthValue' value='"+TnxMonth+"' />";
		        	uncateTxnHTML += "<input type='hidden' name='yearValue' id='yearValue' value='"+year_value+"' />";
		        	uncateTxnHTML += "<input type='hidden' name='categoryName' id='categoryName' value='"+CateDesc+"' />";
		        	uncateTxnHTML += "<input type='hidden' name='nickName' id='nickName' value='"+nickName+"' />";
		        	
		        	//onclick="myCategoryPopup('<%-data.transcID%>','<%-data.categoryID%>','<%-data.expence%>','<%-datadesccode%>','<%-data.periodValue%>','<%-data.yearvalue%>')
		        	//if(catecode.toUpperCase()=="ATM WITHDRAWAL" || catecode.toUpperCase()=="CSW"){
		        		//var params = "/"+categID+"/"+TxnID+"/"+spentAmt+"/"+CateName+"/"+TnxMonth+"/"+"DASHBOARD";
		        		//var TnxMonthVal = TnxMonth + " " + year_value;

		        		//var params = categID+","+TxnID+","+spentAmt+",'"+CateName+"',"+TnxMonthVal;
			        	
		        		//uncateTxnHTML += "<a id='splitTxn' onClick='splitTxnFunc("+categID+","+TxnID+","+spentAmt+","+CateName+","+TnxMonthVal+")'><span class='fn-blue fn-size19'>"+CateName+"</span></a>";
			        	//uncateTxnHTML += "<span class='amt pull-right'><i class='fa fa-inr' aria-hidden='true'></i>"+numberWithCommasstr(spentAmt)+"</span>";
			        	//uncateTxnHTML += "<a id='splitTxn' onClick='splitTxnFunc("+categID+","+TxnID+","+spentAmt+",'"+CateName+"',"+TnxMonthVal+")'><div class='text-muted fn-size15'>"+ CateDesc +" | "+ TnxDate +"</div></a>";
			        	
		        	uncateTxnHTML += "<span class='fn-blue fn-size19'>"+CateName+"</span>";
		        	uncateTxnHTML += "<span class='amt pull-right'><i class='fa fa-inr' aria-hidden='true'></i>"+numberWithCommasstr(spentAmt)+"</span>";
		        	uncateTxnHTML += "<div class='text-muted fn-size15'>"+ CateDesc +" | "+ TnxDate +"</div>";
			        uncateTxnHTML += "</span>";
		        	/*}else{
			        	uncateTxnHTML += "<a id='CategoryPopup' onclick='myCategoryPopup("+idx+")'><span class='fn-blue fn-size19'>"+CateName+"</span></a>";
			        	uncateTxnHTML += "<span class='amt pull-right'><i class='fa fa-inr' aria-hidden='true'></i>"+numberWithCommasstr(spentAmt)+"</span>";
			        	uncateTxnHTML += "<a id='CategoryPopup' onClick='myCategoryPopup("+idx+")'><div class='text-muted fn-size15'>"+ CateDesc +" | "+ TnxDate +"</div></a>";
		        	}*/
		        	paramArr.push(TxnID+","+categID+","+spentAmt);
		        	uncateTxnHTML += "</div>";
		        	uncateTxnHTML += "</div>";
	        	}
	        	els.set("paramArr",paramArr);
	        	$("#UncategorizedTxn").html(uncateTxnHTML);
	        	console.log("----'smartbudgetUncateInfoShow'----------------->"+els.get('smartbudgetUncateInfoShow'));
	        	//if(els.get('smartbudgetUncateInfoShow')!="YES"){
			       if(unCategorysList.length>0)
		 		  	{
		 		  		if(els.get("smartbudgetUncateInfoShow")=="SHOWONCE")
			 		  	{
			        		this.showUncateInfoPopup(unCategorysList.length);
 		  					els.set("smartbudgetUncateInfoShow","");
			        	}
			        }		
	        	//}
        	}else{
        		$("#UncategorizedTxn").html("No record available");
        	}
        },
        showUncateInfoPopup:function(tottxn){

        	$("#loginfooter").show();
        	$("#loginfooter").removeClass("footerwrap");
        	var footer=new wealthFooter();
        	footer.undelegateEvents();
			footer.delegateEvents();
        	els.set('smartbudgetUncateInfoShow',"YES");
        	//footer.$("#uncatetxnpopupInfo").html(_.template(smartbudgetUncategorizePopupTemplate,{tottxn:tottxn})).i18n(); //bind the common template

        	$("#unCategoriseInfoPopupId").modal({backdrop: 'static'}); //invoke the modal
			$("#unCategoriseInfoPopupId").show();
			/*setTimeout(function(){
				var divlen = $('div[id^=unCategoriseInfoPopupId]').length;
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
        nowcateInfoPopupClose:function(){
        	$('#unCategoriseInfoPopupId').modal('hide');   // close the modal window
        	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#unCategoriseInfoPopupId").unbind();
			$("#unCategoriseInfoPopupId").remove();
			
			$("#appheaderwrapperID").css('zIndex', '1');
			$(".subnav").css('zIndex', '9999');
			Backbone.history.navigate("#/categorize");
			//$("#UncategorizedTxn").focus();
        },
        closeUncateInfoPopup:function(){
        	$('#unCategoriseInfoPopupId').modal('hide');   // close the modal window
        	$(".modal-backdrop").remove(); 		// fade-out modal layer
			$("#unCategoriseInfoPopupId").unbind();
			$("#unCategoriseInfoPopupId").remove();
			
			$("#appheaderwrapperID").css('zIndex', '1');
			$(".subnav").css('zIndex', '9999');
        },
        CategoryPopup:function(){
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
				els.set("ATMTXN_CATE_NAME",categoryNameAcc);
				els.set("eventTriggered",eventTriggered);
				if(eventTriggered=="C"){
					els.set("ATMTXN",catIDAcc+","+txnIDAcc+","+aMTAcc+","+catdescAccDesc+","+monthAcc);
					els.set("ATMTXN_CATE",catdescAccCode);
					var accNickName = $("#accNickName").val();
					els.set("acct_nick_name",accNickName);
					this.Transaction();
				}else if(eventTriggered=="S"){
				
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
						//$("#genchartdiv").css('zIndex', '-1');
						//$("#appheaderwrapperID").css('zIndex', '-1');
						//$(".commonpopupmodal").css('zIndex', '9999');
						//$(".modal-backdrop").css('zIndex', '0');
					}, 1000);
					//$('div[id^=unCategorisePopupId]').addClass("modal-backdrop");
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
						split_seq_id:"1C",
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
			$("#monthPopupId").remove();
			
			//$("#appheaderwrapperID").css('zIndex', '1');
			$(".subnav").css('zIndex', '9999');
			var acctrnd= Math.floor((Math.random() * 1000000))+"";
			Backbone.history.navigate("#/dashboards/"+acctrnd);

        },
        Transaction:function(){	
			 $("#bdywrap").removeClass('sb-chartexp-gap');
			 $("#bdywrap").removeClass('noFooter');
			 $("#loginfooter").show();
			 $("#genchartdiv").hide();
			 els.set("goBackScreen","DASHBOARD");
			 Backbone.history.navigate("#/cashwidhdral");
		},
        showChartBudgVsExpn:function()
        {

        	
			var expenceAndBudgetList = els.get("expenceAndBudgetList");
			if(expenceAndBudgetList==null){
				expenceAndBudgetList="";
			}
			if(expenceAndBudgetList.length>0)
			{
		        // Prepare Data - BAR and LINE Chart
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
					//console.log("tempExpn............."+ tempExpn);
					//console.log("tempBudg............."+ tempBudg);
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
					var dispTitle = "";
					
					if(year_value[0]!=year_value[year_value.length-1]){
						dispTitle = monthDesc[0] + " " + year_value[0] + " - " + monthDesc[monthDesc.length-1] + " " + year_value[year_value.length-1];
					}else{
						dispTitle = monthDesc[0] + " - " + monthDesc[monthDesc.length-1] + " " + year_value[year_value.length-1];
					}
					$("#budexpTitle").text(dispTitle);
		
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
		        	

		        	var amt = 0;
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
		        	console.log("amt ------->"+amt);
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

        	console.log(amt);
        	//amt="3,24,250";
        	//amt="30,24,250";
        	//amt="24,250";
        	//amt="14,30,24,250";
        	var checkAmt=amt;
			console.log(checkAmt);
			if(checkAmt!=0)
			{
				checkAmt=checkAmt.replace(/,/g , "");	
			}else{
				checkAmt=0;
			}
        	
        	console.log(checkAmt);

        		if(parseInt(checkAmt)<100000)
        		{
        			$(".contenthead h2").css("font-size","30px");	
        		}else if(parseInt(checkAmt)>=100000 && parseInt(checkAmt)<10000000){
        			$(".contenthead h2").css("font-size","22px");
        		}else if(parseInt(checkAmt)>=10000000){
        			$(".contenthead h2").css("font-size","18px");
        		}

        		

        	$("#expn_amount").html(amt);
        	if(flag=="Y"){
		        	var legd = "<table cellpadding='0' cellspacing='0' border='0'>";
		        	if(els.get('changeYourExpnType')=="ACC")
		        	{
		        		legd += "<tr><td align='left'><small class='text-muted fn-size10'>ACCOUNTS</small></td>";
		        	}else{
		        		legd += "<tr><td align='left'><small class='text-muted fn-size10'>CATEGORIES</small></td>";
		        	}
		        	

		    		legd += "<td align='right'><small class='text-muted fn-size10'>AMOUNT&nbsp;<i class='fa fa-inr' aria-hidden='true'></i></small></td><tr>";
		    		console.log("key.length",key.length);
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
	        			console.log(data);
	        		    return data;
	        	};
	        	var title0;
	          	var renderGraph = function()
	          	{
          				title0 = "<span class='cal-dnarrow mnt' style='z-index:0;'><a id='monthid'> " + month.toUpperCase() + "<br>" + "<span class='yr'>"+ year +"</a></span>";
	          			//title0 = "<a id='monthid' class='cal-dnarrow'><span class='mnt'>" + month + "<br>" + "<span class='yr'>"+ year +"</span>" +"</a>";
	          			//title0 = "<a id='monthid' class='cal-dnarrow'>" + "Jun" + "<br>" + "<small>2016</small>" +"</a>";
	        			
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
        plotChartBudgVsExpn:function(s1,s2,s3,ticks,yaxis){
        	
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
        },        
        viewStatement:function(){
        	console.log("inside ViewStatement"); 
			Backbone.history.navigate("#/viewstatement");
	    },      	
        errorresponse: function(){
        	hideSpinner();
        	Backbone.history.navigate("#/exception");
        }
	});
	

//Footer Content
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
        	this.$el.html(_.template(budgetFooterTemplate)).i18n();
        	/*this.undelegateEvents();
        	this.delegateEvents();*/
        	//$("#loginfooter").removeClass("footerwrap");
        	return this;
        },
        submitPopup:function()
        {
        	
        	var header= new budget_dashboard();
        	header.submitPopup();
        	header.undelegateEvents();
        	$("#loginfooter").hide();
        	$("#loginfooter").addClass("footerwrap");
        },
		closeMonthPopup:function()
		{
			var header= new budget_dashboard();
			header.closeMonthPopup();
			header.undelegateEvents();
			$("#loginfooter").hide();
			$("#loginfooter").addClass("footerwrap");
		},
		nowcateInfoPopupClose:function(){
			var header= new budget_dashboard();
			header.nowcateInfoPopupClose();
			header.undelegateEvents();
			$("#loginfooter").hide();
			$("#loginfooter").addClass("footerwrap");

		},
		closeUncateInfoPopup:function(){
			var header= new budget_dashboard();
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

	
	return budget_dashboard;
	
});