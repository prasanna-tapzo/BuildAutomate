define(['jquery', 'underscore', 'Backbone'
        , 'text!views/budget/budgets/categorize.tpl'
        , 'text!views/common/unCategorisePopup.tpl'
        , 'collections/budget/AllUnCategorizedTxnsCollections'
        , 'collections/budget/splitTransactionCollections'
        ],
        
   function ($, _, Backbone
		, categorizeTemplate
		, unCategorisePopupTemplate
		, AllUnCategorizedTxnsCollections
		, splitTransactionCollections
		) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var categorize = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{
			//"click #showUncatePopup":"showUncatePopup",
			"click #unCategoriseId":"CategoryPopup",
			"click #assignNewCategory":"assignNewCategory"
        },      
		initialize:function(){
       	},       	
        render:function()
		{
        		$("#failureMessage").hide();
	        	var tody = new Date();
				mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
				yer = tody.getFullYear();
				
		    	var that = this;
	  			var onDataHandler = function(collection) {
	  				hideSpinner();
	  				els.set("unCategorysListPage","Y");
	  				console.log("unCategorysListPage==>>>",els.get("unCategorysListPage"));
	  				$("#failureMessage").hide();
	  				$("#bdywrap").addClass('noFooter');
 					$("#loginfooter").hide();
	  				that.renderSuccess();
	  			};
	  			var onErrorHandler = function(collection) {
	  				hideSpinner();
	  				console.log("Error here budget.js-Dashboard");
		  			if(ackStatus=="8888")
			          {
			            that.errorresponse();
			          }else{
			          	this.$el.html(_.template(categorizeTemplate)).i18n();
					    //$("#screentitle").text($.i18n.t('app.smartbudget.general.alluncate'));
					    
					    /*var footer = new editBudgetsFooter();
					    footer.render();*/
					    $("#bdywrap").addClass('noFooter');
 						$("#loginfooter").hide();
			            $("#failureMessage").show();
			            return this;
			           // return false;
			          }

	  				

	  				//that.errorresponse();
	  			};
	        	that.collection= new AllUnCategorizedTxnsCollections();
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
						expensedescription:"OverAllExpense"
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
     errorresponse: function(){
          hideSpinner();
          Backbone.history.navigate("#/exception");
        },
        renderSuccess:function()
        {
        	this.$el.html(_.template(categorizeTemplate)).i18n();
        	$(".back_butt").show();
		    //$("#screentitle").text($.i18n.t('app.smartbudget.general.alluncate'));
		    /*var footer = new editBudgetsFooter();
		    footer.render();*/
		    return this;
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
			console.log("els.get(unCategorysListPage)----===>>",els.get("unCategorysListPage"));
			if(els.get("unCategorysListPage")!="Y")
			{
				Backbone.history.navigate("#/dashboards/"+acctrnd);	
			}else{
				this.render();
			}
			

        },
        Transaction:function(){	
			 $("#bdywrap").removeClass('sb-chartexp-gap');
			 $("#bdywrap").removeClass('noFooter');
			 $("#loginfooter").show();
			 $("#genchartdiv").hide();
			 els.set("goBackScreen","DASHBOARD");
			 Backbone.history.navigate("#/cashwidhdral");
		}
		
        
	});
	
	return categorize;
	
});