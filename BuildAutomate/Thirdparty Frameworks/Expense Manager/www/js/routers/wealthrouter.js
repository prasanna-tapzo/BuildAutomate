define(['jquery','underscore', 'Backbone',
       // 'views/common/exception'
       	],
    function ($,_, Backbone,
    	exception
    		) {
	var els = new EncryptedLocalStorage('secret');  
	var wealthRouter=Backbone.Router.extend({
			routes:{
			"acctministatement/:id":"acctMiniStatement",
			"casastatementdetails/:id":"casaStatementDetails",
			"casadetailstatementtrandet/:id":"casaDetailStatementTranDet",
			"viewstatement":"ViewStatement",
			"viewstatementsubmit":"ViewStatementSubmit",
			"casaviewstatement":"casaViewStatement",
			"casaviewstatementsubmit":"casaViewstatementSubmit",
			"depositsummary/:id":"depositSummary",
			"depositoffers":"depositOffers",
			"openfixeddeposit":"openFixedDeposit",
			"openfixeddepositconfirm":"openFixedDepositConfirm",
			"openfixeddepositreview":"openFixedDepositReview",
			"openrecurringdeposit":"openRecurringDeposit",
			"openrecurringdepositconfirm":"openRecurringDepositConfirm",
			"openrecurringdepositreview":"openRecurringDepositReview",
			"closerdconfirm":"closeRdConfirm",
			"closerdreview":"closeRdReview",
			"closefixeddeposit":"closeFixedDeposit",
			"closefixeddepositconfirm":"closeFixedDepositConfirm",
			"closefixeddepositreview":"closeFixedDepositReview",
			"loansummary/:id":"loanSummary",
			"loanviewstatement":"loanViewStatement",
			"loanviewstatementsubmit":"loanViewStatementSubmit",
			"loanpayment":"loanPayment",
			"loanpaymentconfirm":"loanPaymentConfirm",
			"loanpaymentsuccess":"loanPaymentSuccess",
			"loanstatementdetails/:id":"loanStatementDetails",
			"walletministatement/:id":"walletMiniStatement",
			"prepaidcardministatement/:id":"prepaidCardMiniStatement",
			"prepaidviewstatement":"prepaidViewStatement",
			"prepaidstatementdetails/:id":"prepaidStatementDetails",
			"walletviewstatement":"walletViewStatement",
			"walletstatementdetails/:id":"walletStatementDetails",
			"statementfilter":"statementFilter",
			"emailstatement":"emailStatement",
			"opendepositreccuring/:id":"opendepositreccuring",
			"opendepositfixed/:id":"opendepositfixed"
			
			
			//"exception":"exception",
			},
			
		   opendepositreccuring: function(id){
	            	var that=this;
	            	console.log("opendepositreccuring entry");
	            	$("#container").unbind();
	            	$("#mobcontent").unbind();
                        $("#iosBackButton").show();
	            	$("#loginfooter").unbind();
	            	depano=$("#depacno"+id).val();
	            	els.set("depano",depano);
	            	require(['jquery','views/wealth/deposits/opendeposit/openRecurringDeposit'],
		                    function ($,openRecurringDeposit) {
	            		that.subview = that.disposeView(new openRecurringDeposit());
	                  	 that.subview.render();
	            	});
	            },
	        opendepositfixed: function(id){
	            	var that=this;
	            	console.log("opendepositreccuring entry");
	            	$("#container").unbind();
	            	$("#mobcontent").unbind();
                        $("#iosBackButton").show();
	            	$("#loginfooter").unbind();
	            	fixdepacno=$("#fixdepacno"+id).val();
	            	els.set("fixdepacno",fixdepacno);
	            	require(['jquery','views/wealth/deposits/opendeposit/openFixedDeposit'],
		                    function ($,openFixedDeposit) {
	            		that.subview = that.disposeView(new openFixedDeposit());
	                  	 that.subview.render();
	            	});
	            }, 
			
			acctMiniStatement: function(id){
				console.log("idddddddd",id);
				els.set("casaindex",id);
            	var that=this;
            	console.log("acctMiniStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
            	require(['jquery','views/wealth/casa/acctMiniStatement'],
	                    function ($,acctMiniStatement) {
            		that.subview = that.disposeView(new acctMiniStatement());
                  	 that.subview.render();
            	});
            },
            
            casaStatementDetails: function(id){
            	var that=this;
            	els.set("casatrandetindex",id);
            	console.log("statementDetails entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").empty();
            	require(['jquery','views/wealth/casa/casaStatementDetails'],
	                    function ($,statementDetails) {
            		that.subview = that.disposeView(new statementDetails());
                  	 that.subview.render();
            	});
            },
            
            casaDetailStatementTranDet: function(id){
            	var that=this;
            	els.set("casatrandetindex",id);
            	console.log("casaDetailStatementTranDet entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").empty();
            	require(['jquery','views/wealth/casa/casaDetailStatementTranDet'],
	                    function ($,casaDetailStatementTranDet) {
            		that.subview = that.disposeView(new casaDetailStatementTranDet());
                  	 that.subview.render();
            	});
            },
            prepaidStatementDetails: function(id){
            	var that=this;
            	els.set("cardtrandetindex",id);
            	console.log("prepaidStatementDetails entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").empty();
            	require(['jquery','views/wealth/prepaid/prepaidStatementDetails'],
	                    function ($,prepaidStatementDetails) {
            		that.subview = that.disposeView(new prepaidStatementDetails());
                  	 that.subview.render();
            	});
            },
            
            walletStatementDetails: function(id){
            	var that=this;
            	els.set("wallettrandetindex",id);
            	console.log("walletStatementDetails entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").empty();
            	require(['jquery','views/wealth/wallet/walletStatementDetails'],
	                    function ($,walletStatementDetails) {
            		that.subview = that.disposeView(new walletStatementDetails());
                  	 that.subview.render();
            	});
            },
            
            loanStatementDetails: function(id){
            	var that=this;
            	els.set("loantrandetindex",id);
            	console.log("loanStatementDetails entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").empty();
            	require(['jquery','views/wealth/loan/loanStatementDetails'],
	                    function ($,loanStatementDetails) {
            		that.subview = that.disposeView(new loanStatementDetails());
                  	 that.subview.render();
            	});
            },
            ViewStatement: function(){
            	els.set("casaindex","0");
            	var that=this;
            	console.log("ViewStatement entry");

            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","wealth");
                  els.set("statementFilter","");
            	require(['jquery','views/wealth/viewStatement'],
	                    function ($,viewStatement) {
            		that.subview = that.disposeView(new viewStatement());
                  	 that.subview.render();
            	});
            },
            
            ViewStatementSubmit: function(){
            	var that=this;
            	console.log("ViewStatementSubmit entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
            	require(['jquery','views/wealth/viewStatementSubmit'],
	                    function ($,viewStatementSubmit) {
            		that.subview = that.disposeView(new viewStatementSubmit());
                  	 that.subview.render();
            	});
            },
            
            casaViewStatement: function(){
            	var that=this;
            	console.log("casaViewStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  if(els.get("statementFilter") == "statementFilter"){
                     els.set("iosNavigation","statementfilter");   
                  }else{
                     els.set("iosNavigation","viewstatement");
                  }
            	require(['jquery','views/wealth/casa/casaViewStatement'],
	                    function ($,casaViewStatement) {
            		that.subview = that.disposeView(new casaViewStatement());
                  	 that.subview.render();
            	});
            },
            
            casaViewStatementSubmit: function(){
            	var that=this;
            	console.log("casaViewStatementSubmit entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
				els.set("iosNavigation","viewstatement");
            	require(['jquery','views/wealth/casa/casaViewStatementSubmit'],
	                    function ($,casaViewStatementSubmit) {
            		that.subview = that.disposeView(new casaViewStatementSubmit());
                  	 that.subview.render();
            	});
            },
            
            loanViewStatement: function(){
            	var that=this;
            	console.log("loanViewStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","viewstatement");
            	require(['jquery','views/wealth/loan/loanViewStatement'],
	                    function ($,loanViewStatement) {
            		that.subview = that.disposeView(new loanViewStatement());
                  	 that.subview.render();
            	});
            },
            
            loanViewStatementSubmit: function(){
            	var that=this;
            	console.log("loanViewStatementSubmit entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
            	require(['jquery','views/wealth/loan/loanViewStatementSubmit'],
	                    function ($,loanViewStatementSubmit) {
            		that.subview = that.disposeView(new loanViewStatementSubmit());
                  	 that.subview.render();
            	});
            },
            
            loanPayment: function(){
            	var that=this;
            	console.log("loanPayment entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  var loanindex=els.get("loanindex");
                  els.set("iosNavigation","loansummary/"+loanindex);
            	require(['jquery','views/wealth/loan/loanPayment'],
	                    function ($,loanPayment) {
            		that.subview = that.disposeView(new loanPayment());
                  	 that.subview.render();
            	});
            },
            loanPaymentConfirm: function(){
            	var that=this;
            	console.log("loanPaymentConfirm entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","loanpayment");
            	require(['jquery','views/wealth/loan/loanPaymentConfirm'],
	                    function ($,loanPaymentConfirm) {
            		that.subview = that.disposeView(new loanPaymentConfirm());
                  	 that.subview.render();
            	});
            },
            loanPaymentSuccess: function(){
            	var that=this;
            	console.log("loanPaymentSuccess entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
            	require(['jquery','views/wealth/loan/loanPaymentSuccess'],
	                    function ($,loanPaymentSuccess) {
            		that.subview = that.disposeView(new loanPaymentSuccess());
                  	 that.subview.render();
            	});
            },
            depositSummary: function(id){
            	var that=this;
            	console.log("depositSummary entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
            	els.set("depositindex",id);
                  els.set("iosNavigation","wealth");
            	/*depano=$("#depano"+id).val();
            	deppdtname=$("#deppdtname"+id).val();
            	depavbal=$("#depavbal"+id).val();
            	els.set("depano",depano);
            	els.set("deppdtname",deppdtname);
            	els.set("depavbal",depavbal);*/
            	
            	require(['jquery','views/wealth/deposits/depositSummary'],
	                    function ($,depositSummary) {
            		that.subview = that.disposeView(new depositSummary());
                  	 that.subview.render();
            	});
            },
            
            depositOffers: function(){
            	var that=this;
            	console.log("depositSummary entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").empty();
            	require(['jquery','views/wealth/deposits/opendeposit/depositOffers'],
	                    function ($,depositOffers) {
            		that.subview = that.disposeView(new depositOffers());
                  	 that.subview.render();
            	});
            },
            openFixedDeposit: function(){
            	var that=this;
            	console.log("openFixedDeposit entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","depositoffers");
            	require(['jquery','views/wealth/deposits/opendeposit/openFixedDeposit'],
	                    function ($,openFixedDeposit) {
            		that.subview = that.disposeView(new openFixedDeposit());
                  	 that.subview.render();
            	});
            },
            openFixedDepositConfirm: function(){
            	var that=this;
            	console.log("openFixedDepositConfirm entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","openfixeddeposit");
            	require(['jquery','views/wealth/deposits/opendeposit/openFixedDepositConfirm'],
	                    function ($,openFixedDepositConfirm) {
            		that.subview = that.disposeView(new openFixedDepositConfirm());
                  	 that.subview.render();
            	});
            },
            openFixedDepositReview: function(){
            	var that=this;
            	console.log("openFixedDepositReview entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","wealth");
            	require(['jquery','views/wealth/deposits/opendeposit/openFixedDepositReview'],
	                    function ($,openFixedDepositReview) {
            		that.subview = that.disposeView(new openFixedDepositReview());
                  	 that.subview.render();
            	});
            },
            
           openRecurringDeposit: function(){
            	var that=this;
            	console.log("openRecurringDeposit entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","depositoffers");
            	require(['jquery','views/wealth/deposits/opendeposit/openRecurringDeposit'],
	                    function ($,openRecurringDeposit) {
            		that.subview = that.disposeView(new openRecurringDeposit());
                  	 that.subview.render();
            	});
            },
            openRecurringDepositConfirm: function(){
            	var that=this;
            	console.log("openRecurringDepositConfirm entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","openrecurringdeposit");
            	require(['jquery','views/wealth/deposits/opendeposit/openRecurringDepositConfirm'],
	                    function ($,openRecurringDepositConfirm) {
            		that.subview = that.disposeView(new openRecurringDepositConfirm());
                  	 that.subview.render();
            	});
            },
            openRecurringDepositReview: function(){
            	var that=this;
            	console.log("openRecurringDepositReview entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","wealth");
            	require(['jquery','views/wealth/deposits/opendeposit/openRecurringDepositReview'],
	                    function ($,openRecurringDepositReview) {
            		that.subview = that.disposeView(new openRecurringDepositReview());
                  	 that.subview.render();
            	});
            },
            
            closeRdReview: function(){
            	var that=this;
            	console.log("closeRdReview entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","wealth");
            	require(['jquery','views/wealth/deposits/closedeposit/closeRdReview'],
	                    function ($,closeRdReview) {
            		 that.subview = that.disposeView(new closeRdReview());
                  	 that.subview.render();
            	});
            },
            
            closeRdConfirm: function(){
            	var that=this;
            	console.log("closeRDConfirm entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  var depositID = els.get("depositindex");
                  els.set("iosNavigation","depositsummary/"+depositID);
            	require(['jquery','views/wealth/deposits/closedeposit/closeRdConfirm'],
	                    function ($,closeRdConfirm) {
            		that.subview = that.disposeView(new closeRdConfirm());
                  	 that.subview.render();
            	});
            },
            closeFixedDeposit: function(){
            	var that=this;
            	console.log("closeRDConfirm entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  var depositID = els.get("depositindex");
                  els.set("iosNavigation","depositsummary/"+depositID);
            	require(['jquery','views/wealth/deposits/closedeposit/closeFixedDeposit'],
	                    function ($,closeFixedDeposit) {
            		that.subview = that.disposeView(new closeFixedDeposit());
                  	 that.subview.render();
            	});
            },
            closeFixedDepositConfirm: function(){
            	var that=this;
            	console.log("closeFixedDepositConfirm entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","closefixeddeposit");
            	require(['jquery','views/wealth/deposits/closedeposit/closeFixedDepositConfirm'],
	                    function ($,closeFixedDepositConfirm) {
            		that.subview = that.disposeView(new closeFixedDepositConfirm());
                  	 that.subview.render();
            	});
            },
            closeFixedDepositReview: function(){
            	var that=this;
            	console.log("closeFixedDepositReview entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","wealth");
            	require(['jquery','views/wealth/deposits/closedeposit/closeFixedDepositReview'],
	                    function ($,closeFixedDepositReview) {
            		that.subview = that.disposeView(new closeFixedDepositReview());
                  	 that.subview.render();
            	});
            },
            
            loanSummary: function(id){
            	els.set("loanindex",id);
            	var that=this;
            	console.log("loanSummary entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","wealth");
            	require(['jquery','views/wealth/loan/loanSummary'],
	                    function ($,loanSummary) {
            		that.subview = that.disposeView(new loanSummary());
                  	 that.subview.render();
            	});
            },
            
            walletMiniStatement: function(id){
            	els.set("walletindex",id);
            	var that=this;
            	console.log("walletMiniStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
            	require(['jquery','views/wealth/wallet/walletMiniStatement'],
	                    function ($,walletMiniStatement) {
            		that.subview = that.disposeView(new walletMiniStatement());
                  	 that.subview.render();
            	});
            },
            
            prepaidCardMiniStatement: function(id){
            	els.set("cardindex",id);
            	var that=this;
            	console.log("pre-paidCardMiniStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
            	require(['jquery','views/wealth/prepaid/prepaidCardMiniStatement'],
	                    function ($,prepaidCardMiniStatement) {
            		that.subview = that.disposeView(new prepaidCardMiniStatement());
                  	 that.subview.render();
            	});
            },
            
            prepaidViewStatement: function(){
            	var that=this;
            	console.log("prepaidViewStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","viewstatement");
            	require(['jquery','views/wealth/prepaid/prepaidViewStatement'],
	                    function ($,prepaidViewStatement) {
            		that.subview = that.disposeView(new prepaidViewStatement());
                  	 that.subview.render();
            	});
            },
            
            walletViewStatement: function(){
            	var that=this;
            	console.log("walletViewStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("iosNavigation","viewstatement");
            	require(['jquery','views/wealth/wallet/walletViewStatement'],
	                    function ($,walletViewStatement) {
            		that.subview = that.disposeView(new walletViewStatement());
                  	 that.subview.render();
            	});
            },
            
            statementFilter: function(id){
            	var that=this;
            	console.log("statementFilter entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  els.set("statementFilter","statementFilter");
                  els.set("iosNavigation","wealth");
            	require(['jquery','views/wealth/statementFilter'],
	                    function ($,statementFilter) {
            		that.subview = that.disposeView(new statementFilter());
                  	 that.subview.render();
            	});
            },
            
            emailStatement: function(){
            	var that=this;
            	console.log("emailStatement entry");
            	$("#container").unbind();
            	$("#mobcontent").unbind();
                  $("#iosBackButton").show();
            	$("#loginfooter").unbind();
                  if(els.get("statementFilter") == "statementFilter"){
                     els.set("iosNavigation","statementfilter");   
                  }else{
                     els.set("iosNavigation","viewstatement");
                  }
            	require(['jquery','views/wealth/emailStatement'],
	                    function ($,emailStatement) {
            		that.subview = that.disposeView(new emailStatement());
                  	 that.subview.render();
            	});
            },
           disposeView: function(view){
   				Backbone.View.prototype.close = function () {
   					this.unbind();
      				this.undelegateEvents();
   				};

	   			/* --Destroy current view */
	   			if(this.currentView !== undefined) {
	   				this.currentView.close();
	   			}
	
	   			/* --Create new view */
	   			this.currentView = view;
	   			this.currentView.delegateEvents();
	   			return this.currentView;
           }    
	});
		
	return 	wealthRouter;
});
