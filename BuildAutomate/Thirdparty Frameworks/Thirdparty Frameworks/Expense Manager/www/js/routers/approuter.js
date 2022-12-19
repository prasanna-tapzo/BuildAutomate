define(['jquery','underscore', 'Backbone',
        'backbonevalidation'],
function ($,_, Backbone,
		backbonevalidation) 
{
	
	var els = new EncryptedLocalStorage('secret');  
	var appRouter=Backbone.Router.extend({
		routes:{			
			"":"serveroptioncheck",
			"serverval":"serverval",
			"newregistration":"newregistration",
			"newmpingeneration":"newMpinGeneration",
			"login":"login",
			"mpintandc":"mpintandc",
			"forgotmpin":"forgotMpin",
			"createMPIN":"createMPIN",
			"loginlayout":"loginLayout",
			"expandico":"expandico",
			"smartBudget":"SmartBudget",
			"wealth":"wealth",
			"depositoffers":"depositOffers",
			"transfer":"transfer",
			"billpay":"billPay",
			"services":"Services",
			"mail":"mail",
			"settings":"Settings",
			"faq":"FAQFirst",
			"faqcategory/:id":"FAQ",
			"contactus":"contactUs",
			"aboutus":"aboutUs",
			"tandc":"tandc",
			"rewards":"rewards",
			"exception":"exception",
			"exceptionnew":"exception",
			"Loginexception":"Loginexception",
			"OTPException":"OTPException",
			"ServerConnectionexception":"ServerConnectionexception",	
			"InternetException":"InternetException",
			"logout":"logout",
			//prelogin bill pay starts
			//"gotobillpay":"gotobillpay",
			"gotobillpay":"addBiller",
			"billerSubCategorypreloin/:id":"billerSubCategory",
			"getBillerServicePrelogin/:id":"electricityAddBillerInitiate",
			"electricityaddbillerconfirm":"electricityAddBillerConfirm",
			"electaddbillersuccess":"electricityAddBillerSuccess",
			"electricitypaybillinitiate":"electricityPayBillInitiate",
			"electricitypaybillconfirm":"electricityPayBillConfirm",
			"electricitypaybillsuccess":"electricityPayBillSuccess",
			
			"rechargegetBillerService/:id":"rechargeElectricityAddBillerInitiate",
			"rechargeelectricityaddbillerconfirm":"rechargeElectricityAddBillerConfirm",
			"rechargeelectricityaddbillersuccess":"rechargeElectricityAddBillerSuccess",
			"rechargebillerlist":"rechargeBillerList",
			"rechargeinitiate":"rechargeInitiate",
			"rechargeconfirm":"rechargeConfirm",
			"rechargesuccess":"rechargeSuccess",
			
			"gaspaybillinitiate":"gasPayBillInitiate",
			"gaspaybillconfirm":"gasPayBillConfirm",
			"gaspaybillsuccess":"gasPayBillSuccess",
			
			
			"insurancepaybillinitiate":"insurancePayBillInitiate",
			"insurancepaybillconfirm":"insurancePayBillConfirm",
			"insurancepaybillsuccess":"insurancePayBillSuccess",
			
			"telephonepaybillinitiate":"telephonePayBillInitiate",
			"telephonepaybillconfirm":"telephonePayBillConfirm",
			"telephonepaybillsuccess":"telephonePayBillSuccess",
			"gotolocateus":"gotoLocateUs",
			"gotocontactus":"gotoContactUs",
			"promotions":"promotions",
			"gotorewards":"gotoRewards",
			"emicalculator":"emiCalculator",
			"gotoFAQ":"gotoFAQFirst",
			"gotofaqcategory/:id":"gotoFAQ",
			"offerings":"offerings",
			"gotosettings":"gotoSettings",
			"gotochangempin":"gotoChangeMpin",
			"gotochangempinreview":"gotoChangeMpinReview",
			"gotofavfunctions":"gotoFavFunctions",
			"gotofavfunctionsreview":"gotoFavFunctionsReview",
			"gotoderegister":"gotoDeRegister",
			"gotoderegisterreview":"gotoDeRegisterReview",
			"gotoDeRegisterReviewPostLogin":"gotoDeRegisterReviewPostLogin",
				
			"gotorecharge":"recharge",
			"telephonerechargeinitiate":"telephoneRechargeInitiate",
			"telephonerechargeconfirm":"telephoneRechargeConfirm",
			"telephonerechargesuccess":"telephoneRechargeSuccess",
			
			"dthrechargeinitiate":"dthRechargeInitiate",
			"dthrechargeconfirm":"dthRechargeConfirm",
			"dthrechargesuccess":"dthRechargeSuccess",
			"exception":"exception",
			"preloginexception":"preloginexception",

			"preloginoffersavings":"preloginoffersavings",
			"preloginoffersavingsreview":"preloginoffersavingsreview",
			"budgets":"budgets"
			
		     //prelogin bill pay ends
				
		},
		 preloginoffersavingsreview:function(){


			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/offerings/offerSavingsReview','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,offerSavingsReview,jshashtable,numberformatter) {
						that.subview = that.disposeView(new offerSavingsReview());
						that.subview.render();
		    });	

		 
		 },	
		 preloginoffersavings: function(){

			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/offerings/offerSavings','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,offerSavings,jshashtable,numberformatter) {
						that.subview = that.disposeView(new offerSavings());
						that.subview.render();
		    });	

		 },		
		 exception: function(id){
		     //$('#spinner').show();
		     //showSpinner();
		    	var that =this;
		    	require(['jquery','views/errors/exception','views/errors/error403','views/errors/error404','views/errors/error500'],
		    			function ($,exception,error403,error404,error500) {
		            	if(id == '403'){
		            		that.subview = that.disposeView(new error403());
						}else if(id == '404'){
							that.subview = that.disposeView(new error404());
						}else if(id == '500'){
							that.subview = that.disposeView(new error500());
						}else{
							that.subview = that.disposeView(new exception());
						}
		            	that.subview.render();
		    	 });
            },
            preloginexception: function(id){
   		     //$('#spinner').show();
   		     //showSpinner();
   		    	var that =this;
   		    	require(['jquery','views/prelogin/errors/exception','views/prelogin/errors/error403','views/prelogin/errors/error404','views/prelogin/errors/error500'],
   		    			function ($,exception,error403,error404,error500) {
   		            	if(id == '403'){
   		            		that.subview = that.disposeView(new error403());
   						}else if(id == '404'){
   							that.subview = that.disposeView(new error404());
   						}else if(id == '500'){
   							that.subview = that.disposeView(new error500());
   						}else{
   							that.subview = that.disposeView(new exception());
   						}
   		            	that.subview.render();
   		    	 });
               },
         /*serverval:function(){
			var that =this;
			require(['jquery','main'],
   		    function ($,main) {			
			that.subview = new main();
			that.subview.domReady();
			
			}
		 },*/
		serveroptioncheck: function(actions){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			var that = this;
			var firstTimeDemoCheck = "N";
			try{
				firstTimeDemoCheck = window.localStorage.getItem("firstTimeDemoCheck");
			}catch(e){
				firstTimeDemoCheck = "N";
			}
			var that=this;
			require(['jquery','views/home/applanding','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,serveroptioncheck,jshashtable,numberformatter) {
						that.view = new serveroptioncheck();
						that.view.render();
		    });
		},
		newregistration: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();

			var that=this;
			require(['jquery','views/home/registration/newRegistration','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,newRegistration,jshashtable,numberformatter) {
						that.view = new newRegistration();
						that.view.render();
		    });	
		},
		newMpinGeneration: function(){
			//Backbone.Validation.unbind(this);
			els.set("mpintandc","");
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/registration/newMpinGeneration','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,newMpinGeneration,jshashtable,numberformatter) {
						that.view = new newMpinGeneration();
						that.view.render();
		    });	
		},
		login: function(){
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			els.set('smartBudgetClickedLater',"");
			require(['jquery','views/home/login/login','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,login,jshashtable,numberformatter) {
						that.view = new login();
						that.view.render();
		    });	
		},
		
		mpintandc: function(){
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			//els.set("mpintandc","Y");
			var that=this;
			
			require(['jquery','views/common/tandc','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,tandc,jshashtable,numberformatter) {
						that.view = new tandc();
						that.view.render();
		    });	
		},
		
		
		
		forgotMpin:function(){

			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/forgotmpin/forgotMpin','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,forgotMpin,jshashtable,numberformatter) {
						that.view = new forgotMpin();
						that.view.render();
		    });
		},
		
		createMPIN:function(){

			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/forgotmpin/createNewPin','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,createNewPIN,jshashtable,numberformatter) {
						that.view = new createNewPIN();
						that.view.render();
		    });
		},
		expandico: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/expandico','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,expandico,jshashtable,numberformatter) {
						that.view = new expandico();
						that.view.render();
		    });	
		},
		
		loginLayout: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			var that=this;
			
			require(['jquery','views/layout/loginLayout','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,loginLayout,jshashtable,numberformatter) {
						that.view = new loginLayout();
						that.view.render();
		    });	
		},
		
		wealth: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").hide();
			$("#loginfooter").unbind();

			els.set("iosNavigation","wealth");

			var that=this;
			
			require(['jquery','views/wealth/wealth','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
				function ($,wealth,jshashtable,numberformatter) {
					that.view = new wealth();
					that.view.render();
			        $('aside.subnav nav ul li').removeClass('active');
			        $('aside.subnav nav ul li:first-child').addClass('active');
	    		});	
		},
		SmartBudget: function(){
			els.set("cate_chart_month_year","");
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").hide();
			$("#loginfooter").unbind();
			els.set("iosNavigation","wealth");
			els.set("quarterlyNavigation","");
			els.set("accountsNavigation","");
			els.set("categorize","");
			els.set("budgetcategorywise","");
			els.set("quarterlyNavigation","");
			els.set("categoryExpensesReport","");
			els.set("categoryExpenses","");
			var that=this;
			
			require(['jquery','views/budget/budget','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,budget,jshashtable,numberformatter) {
						that.view = new budget();
						that.view.render();
		    });	
		},
		
		 depositOffers: function(){
         	var that=this;
         	els.set("iosNavigation","wealth");
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
		transfer: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			els.set("IosFavortire","N");
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/transfer/fundTransfer','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,fundTransfer,jshashtable,numberformatter) {
						that.view = new fundTransfer();
						that.view.render();
		    });	
		},
		
		billPay: function(){
			//Backbone.Validation.unbind(this);
			els.set("setBackTabBills","billpay");
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			var that=this;
			els.set("iosNavigation","wealth");
			require(['jquery','views/billpay/paybills/payBills','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,payBills,jshashtable,numberformatter) {
						that.view = new payBills();
						that.view.render();
		    });	
		},
		Services: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").empty();
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/services/servicesGrid','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,servicesGrid,jshashtable,numberformatter) {
						that.view = new servicesGrid();
						that.view.render();
		    });	
		},
		
		mail:function(){
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/messagecenter/mail','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,mail,jshashtable,numberformatter) {
						that.view = new mail();
						that.view.render();
		    });	
		},
		Settings: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			var that=this;
			els.set("iosNavigation","wealth");
			require(['jquery','views/settings/mpin/changeMpin','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,changeMpin,jshashtable,numberformatter) {
						that.view = new changeMpin();
						that.view.render();
		    });	
		},
		
		FAQ: function(){
			//Backbone.Validation.unbind(this);

			els.set("categoryFaqShow","0");
			

			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").empty();
			var that=this;
			
			require(['jquery','views/faq/FAQ','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,FAQ,jshashtable,numberformatter) {
						that.view = new FAQ();
						that.view.render();
		    });	
		},
		FAQFirst:function(){

			els.set("categoryFaqShow",'1');
			
			els.set("faqCategorySelectedIndex","");

			// if(typeof els.get("faqCategorySelectedIndex")=='undefined' ||
			// 	els.get("faqCategorySelectedIndex")==null )
			// {
			// 	els.set("faqCategorySelectedIndex","0");
			// }

			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").empty();
			var that=this;
			
			require(['jquery','views/faq/FAQ','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,FAQ,jshashtable,numberformatter) {
						that.view = new FAQ();
						that.view.render();
		    });	
			
		}

		,
		contactUs: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			//$("#loginfooter").empty();
			$("#loginfooter").unbind();
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/contactus/contactUs','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,contactUs,jshashtable,numberformatter) {
						that.view = new contactUs();
						that.view.render();
		    });	
		},
		aboutUs: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").empty();
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/aboutus/aboutUs','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,aboutUs,jshashtable,numberformatter) {
						that.view = new aboutUs();
						that.view.render();
		    });	
		},
		tandc: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").empty();
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/terms/tandc','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,tandc,jshashtable,numberformatter) {
						that.view = new tandc();
						that.view.render();
		    });	
		},
		
		rewards: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").empty();
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/rewards/rewards','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,rewards,jshashtable,numberformatter) {
						that.view = new rewards();
						that.view.render();
		    });	
		},
		Settings: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			els.set("iosNavigation","wealth");
			var that=this;
			
			require(['jquery','views/settings/mpin/changeMpin','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,changeMpin,jshashtable,numberformatter) {
						that.view = new changeMpin();
						that.view.render();
		    });	
		},
		
		/**************************prelogin billpay starts*************************************/
		gotobillpay: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/billpay/billPay','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,billPay,jshashtable,numberformatter) {
						that.view = new billPay();
						that.view.render();
		    });	
		},
		addBiller:function(){
			els.set("electricityBillerIndex","0");
			var that=this;
			Backbone.Validation.unbind(this);        
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			els.set("iosNavigation","billpay");
			require(['jquery','views/home/login/expandico/billpay/addbiller/addBiller'],
                    function ($,addBiller) {
				that.subview = that.disposeView(new addBiller());
               	 that.subview.render();
               });
		},
		////////////////////////////////////////////////////////////////////////////
		billerSubCategory:function(id){

			els.set("electricityBillerIndex","0");
			els.set("id",id);
			var that=this;
			console.log("billerSubCategorybillerSubCategorybillerSubCategorybillerSubCategory");
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			els.set("iosNavigation","addbiller");
			require(['jquery','views/home/login/expandico/billpay/addbiller/billersubcategory'],
                    function ($,billerSubCategory) {
				that.subview = that.disposeView(new billerSubCategory());
               	 that.subview.render();
               });
		},
		electricityAddBillerInitiate:function(billerSubCatId){

			els.set("electricityBillerIndex","0");
			els.set("billerSubCatId",billerSubCatId);

			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			var id=els.get("id");
			els.set("iosNavigation","billerSubCategory/"+id);
			require(['jquery','views/home/login/expandico/billpay/addbiller/electricity/electricityAddBillerInitiate'],
                    function ($,electricityAddBillerInitiate) {
				that.subview = that.disposeView(new electricityAddBillerInitiate());
               	 that.subview.render();
               });
		},
		
		rechargeElectricityAddBillerInitiate:function(billerSubCatId){

			els.set("electricityBillerIndex","0");
			els.set("billerSubCatId",billerSubCatId);

			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			var id=els.get("id");
			els.set("iosNavigation","billerSubCategory/"+id);
			require(['jquery','views/home/login/expandico/billpay/recharge/electricityAddBillerInitiate'],
                    function ($,electricityAddBillerInitiate) {
				that.subview = that.disposeView(new electricityAddBillerInitiate());
               	 that.subview.render();
               });
		},
		
		electricityAddBillerConfirm:function(){
			console.log("routerrrrrrrrrrrrrrrrr");
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			var id=els.get("id");
			els.set("iosNavigation","billerSubCategory/"+id);
			//els.set("iosNavigation","electricityAddBillerInitiate/"+els.get("billerSubCatId"));

			 
			require(['jquery','views/home/login/expandico/billpay/addbiller/electricity/electricityAddBillerConfirm'],
                    function ($,electricityAddBillerConfirm) {
				that.subview = that.disposeView(new electricityAddBillerConfirm());
               	 that.subview.render();
               });
		},
		
		rechargeElectricityAddBillerConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			var id=els.get("id");
			els.set("iosNavigation","billerSubCategory/"+id);
			//els.set("iosNavigation","electricityAddBillerInitiate/"+els.get("billerSubCatId"));

			 
			require(['jquery','views/home/login/expandico/billpay/recharge/electricityAddBillerConfirm'],
                    function ($,electricityAddBillerConfirm) {
				that.subview = that.disposeView(new electricityAddBillerConfirm());
               	 that.subview.render();
               });
		},
		electricityAddBillerSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			require(['jquery','views/home/login/expandico/billpay/addbiller/electricity/electricityAddBillerSuccess'],
                    function ($,electricityAddBillerSuccess) {
				that.subview = that.disposeView(new electricityAddBillerSuccess());
               	 that.subview.render();
               });
		},
		
		rechargeElectricityAddBillerSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			$("#iosBackButton").show();
			require(['jquery','views/home/login/expandico/billpay/recharge/electricityAddBillerSuccess'],
                    function ($,electricityAddBillerSuccess) {
				that.subview = that.disposeView(new electricityAddBillerSuccess());
               	 that.subview.render();
               });
		},
		
		rechargeBillerList:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/rechargeBillersList'],
                    function ($,rechargeBillersList) {
				that.subview = that.disposeView(new rechargeBillersList());
               	 that.subview.render();
               });
		},
		
		rechargeInitiate:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/rechargeInitiate'],
                    function ($,rechargeInitiate) {
				that.subview = that.disposeView(new rechargeInitiate());
               	 that.subview.render();
               });
		},
		
		rechargeConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			require(['jquery','views/vbillpay/recharge/rechargeConfirm'],
                    function ($,rechargeConfirm) {
				that.subview = that.disposeView(new rechargeConfirm());
               	 that.subview.render();
               });
		},
		
		rechargeSuccess:function(){
			console.log("inside rechargesuccess");
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#mobcontent").unbind();
			$("#iosBackButton").show();
			$("#loginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/rechargeSuccess'],
                    function ($,rechargeSuccess) {
				that.subview = that.disposeView(new rechargeSuccess());
               	 that.subview.render();
               });
		},
		/////////////////////////////////////////////////////////////////////
		gasPayBillInitiate:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/gas/gasPayBillInitiate'],
                    function ($,gasPayBillInitiate) {
				that.subview = that.disposeView(new gasPayBillInitiate());
               	 that.subview.render();
               });
		},
		
		gasPayBillConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/gas/gasPayBillConfirm'],
                    function ($,gasPayBillConfirm) {
				that.subview = that.disposeView(new gasPayBillConfirm());
               	 that.subview.render();
               });
		},
		/**************************prelogin billpay starts*************************************/
		/*gotobillpay: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/billpay/billPay','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,billPay,jshashtable,numberformatter) {
						that.view = new billPay();
						that.view.render();
		    });	
		},
		electricityPayBillInitiate:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/electricity/electricityPayBillInitiate'],
                    function ($,electricityPayBillInitiate) {
				that.subview = that.disposeView(new electricityPayBillInitiate());
               	 that.subview.render();
               });
		},
		
		electricityPayBillConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/electricity/electricityPayBillConfirm'],
                    function ($,electricityPayBillConfirm) {
				that.subview = that.disposeView(new electricityPayBillConfirm());
               	 that.subview.render();
               });
		},
		
		electricityPayBillSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/electricity/electricityPayBillSuccess'],
                    function ($,electricityPayBillSuccess) {
				that.subview = that.disposeView(new electricityPayBillSuccess());
               	 that.subview.render();
               });
		},*/
		gasPayBillSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/gas/gasPayBillSuccess'],
                    function ($,gasPayBillSuccess) {
				that.subview = that.disposeView(new gasPayBillSuccess());
               	 that.subview.render();
               });
		},
		
		
		
		insurancePayBillInitiate:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/insurance/insurancePayBillInitiate'],
                    function ($,insurancePayBillInitiate) {
				that.subview = that.disposeView(new insurancePayBillInitiate());
               	 that.subview.render();
               });
		},
		
		insurancePayBillConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/insurance/insurancePayBillConfirm'],
                    function ($,insurancePayBillConfirm) {
				that.subview = that.disposeView(new insurancePayBillConfirm());
               	 that.subview.render();
               });
		},
		
		insurancePayBillSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/insurance/insurancePayBillSuccess'],
                    function ($,insurancePayBillSuccess) {
				that.subview = that.disposeView(new insurancePayBillSuccess());
               	 that.subview.render();
               });
		},
		
		telephonePayBillInitiate:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/telephone/telephonePayBillInitiate'],
                    function ($,telephonePayBillInitiate) {
				that.subview = that.disposeView(new telephonePayBillInitiate());
               	 that.subview.render();
               });
		},
		
		telephonePayBillConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/telephone/telephonePayBillConfirm'],
                    function ($,telephonePayBillConfirm) {
				that.subview = that.disposeView(new telephonePayBillConfirm());
               	 that.subview.render();
               });
		},
		
		telephonePayBillSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/telephone/telephonePayBillSuccess'],
                    function ($,telephonePayBillSuccess) {
				that.subview = that.disposeView(new telephonePayBillSuccess());
               	 that.subview.render();
               });
		},
		/**************************prelogin billpay ends*************************************/
		gotoContactUs: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/contactus/contactUs','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,contactUs,jshashtable,numberformatter) {
						that.view = new contactUs();
						that.view.render();
		    });	
		},
		gotoLocateUs: function(){
			//Backbone.Validation.unbind(this);
			console.log("inside gotoLocateUs");
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/locateus/locateUs','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,locateUs,jshashtable,numberformatter) {
						that.view = new locateUs();
						that.view.render();
		    });	
		},
		promotions: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/promotions/promotions','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,promotions,jshashtable,numberformatter) {
						that.view = new promotions();
						that.view.render();
		    });	
		},
		gotoRewards: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/rewards/rewards','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,rewards,jshashtable,numberformatter) {
						that.view = new rewards();
						that.view.render();
		    });	
		},
		emiCalculator: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/emicalculator/emiCalculator','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,emiCalculator,jshashtable,numberformatter) {
						that.view = new emiCalculator();
						that.view.render();
		    });	
		},
		gotoFAQ: function(){
			//Backbone.Validation.unbind(this);
			els.set("categoryFaqShow","0");

			/*if(typeof els.get("faqCategorySelectedIndex")=='undefined' ||
				els.get("faqCategorySelectedIndex")==null )
			{
				els.set("faqCategorySelectedIndex","0");

			}*/
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/faq/FAQ','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,FAQ,jshashtable,numberformatter) {
						that.view = new FAQ();
						that.view.render();
		    });	
		},
		gotoFAQFirst: function(){
			els.set("iosNavigation","faq");
			els.set("categoryFaqShow",'1');
			//Backbone.Validation.unbind(this);
			els.set("faqCategorySelectedIndex","");
			/*if(typeof els.get("faqCategorySelectedIndex")=='undefined' ||
				els.get("faqCategorySelectedIndex")==null )
			{
				els.set("faqCategorySelectedIndex","0");
			}*/
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/faq/FAQ','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,FAQ,jshashtable,numberformatter) {
						that.view = new FAQ();
						that.view.render();
		    });	
		},
		offerings: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/offerings/newOfferings','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,newOfferings,jshashtable,numberformatter) {
						that.view = new newOfferings();
						that.view.render();
		    });	
		},
		gotoSettings: function(){
			//Backbone.Validation.unbind(this);
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginloginfooter").unbind();
			var that=this;
			
			require(['jquery','views/home/login/expandico/settings/mpin/changeMpin','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
					function ($,changeMpin,jshashtable,numberformatter) {
						that.view = new changeMpin();
						that.view.render();
		    });	
		},
		gotoChangeMpin:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/settings/mpin/changeMpin'],
                    function ($,changeMpin) {
				that.subview = that.disposeView(new changeMpin());
               	 that.subview.render();
               });
		},
	
		gotoChangeMpinReview:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/settings/mpin/changeMpinReview'],
                    function ($,changeMpinReview) {
				that.subview = that.disposeView(new changeMpinReview());
               	 that.subview.render();
               });
		},
		
		gotoFavFunctions:function(){
			console.log("inside router");
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/settings/fav/favFunctions'],
                    function ($,favFunctions) {
				that.subview = that.disposeView(new favFunctions());
               	 that.subview.render();
               });
		},
		gotoFavFunctionsReview:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/settings/fav/favFunctionsReview'],
                    function ($,favFunctionsReview) {
				that.subview = that.disposeView(new favFunctionsReview());
               	 that.subview.render();
               });
		},
		gotoDeRegister:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/settings/deregister/deRegister'],
                    function ($,deRegister) {
				that.subview = that.disposeView(new deRegister());
               	 that.subview.render();
               });
		},
		gotoDeRegisterReview:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/settings/deregister/deRegisterReview'],
                    function ($,deRegisterReview) {
				that.subview = that.disposeView(new deRegisterReview());
               	 that.subview.render();
               });
		},
		gotoDeRegisterReviewPostLogin:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/settings/deregister/deRegisterReview'],
                    function ($,deRegisterReview) {
				that.subview = that.disposeView(new deRegisterReview());
               	 that.subview.render();
               });
		},
		
		recharge:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/recharge'],
                    function ($,recharge) {
				that.subview = that.disposeView(new recharge());
               	 that.subview.render();
               });
		},
		telephoneRechargeInitiate:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/telephone/telephoneRechargeInitiate'],
                    function ($,telephoneRechargeInitiate) {
				that.subview = that.disposeView(new telephoneRechargeInitiate());
               	 that.subview.render();
               });
		},
		
		telephoneRechargeConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/telephone/telephoneRechargeConfirm'],
                    function ($,telephoneRechargeConfirm) {
				that.subview = that.disposeView(new telephoneRechargeConfirm());
               	 that.subview.render();
               });
		},
		
		telephoneRechargeSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/telephone/telephoneRechargeSuccess'],
                    function ($,telephoneRechargeSuccess) {
				that.subview = that.disposeView(new telephoneRechargeSuccess());
               	 that.subview.render();
               });
		},
		dthRechargeInitiate:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/DTH/dthRechargeInitiate'],
                    function ($,dthRechargeInitiate) {
				that.subview = that.disposeView(new dthRechargeInitiate());
               	 that.subview.render();
               });
		},
		
		dthRechargeConfirm:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/DTH/dthRechargeConfirm'],
                    function ($,dthRechargeConfirm) {
				that.subview = that.disposeView(new dthRechargeConfirm());
               	 that.subview.render();
               });
		},
		
		dthRechargeSuccess:function(){
			var that=this;
			Backbone.Validation.unbind(this);                
			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginfooter").unbind();
			require(['jquery','views/home/login/expandico/billpay/recharge/DTH/dthRechargeSuccess'],
                    function ($,dthRechargeSuccess) {
				that.subview = that.disposeView(new dthRechargeSuccess());
               	 that.subview.render();
               });
		},
	    exception: function(id){
	    	var that =this;
	    	require(['jquery','views/errors/exception','views/errors/error403','views/errors/error404','views/errors/error500'],
	    			function ($,exception,error403,error404,error500) {
	            	if(id == '403'){
	            		that.subview = that.disposeView(new error403());
					}else if(id == '404'){
						that.subview = that.disposeView(new error404());
					}else if(id == '500'){
						that.subview = that.disposeView(new error500());
					}else{
						that.subview = that.disposeView(new exception());
					}
	            	that.subview.render();
	    	 });
        },
        
        ServerConnectionexception:function(){
            var that=this;
            require(['jquery','views/prelogin/errors/ServerConnectionexception'],
               function ($,ServerConnectionException) {
                 that.subview = that.disposeView(new ServerConnectionException());
       	      that.subview.render();
           });

       },
       
        InternetException:function(){
             var that=this;
             require(['jquery','views/prelogin/errors/Internetexception'],
                function ($,InternetException) {
                  that.subview = that.disposeView(new InternetException());
        	      that.subview.render();
            });

        },
        Loginexception: function(id){
            var that=this;
             require(['jquery','views/errors/error403','views/errors/error404','views/errors/error500','views/errors/loginexception'],
                function ($,error403,error404,error500,exception) {
                  if(id == '403'){
				        that.subview = that.disposeView(new error403());
     				}else if(id == '404'){
     					that.subview = that.disposeView(new error404());
     				}else if(id == '500'){
     					that.subview = that.disposeView(new error500());
     				}else{
     					that.subview = that.disposeView(new exception());
     				}
        				that.subview.render();
            });


        },
        OTPException: function(id){
  		     var that=this;
             require(['jquery','views/errors/OTPException'],
                function ($,OTPException) {
                    that.subview = that.disposeView(new OTPException());
                    that.subview.render();
            });

           },
		   logout:function(){
			   var that=this;
             require(['jquery','views/logout/logout'],
                function ($,logout) {
                    that.subview = that.disposeView(new logout());
                    that.subview.render();
            });
		   },
		   budgets:function(){
			   var that=this;
	             require(['jquery','views/budget/budgets/budgets'],
	                function ($,budgets) {
	                    that.subview = that.disposeView(new budgets());
	                    that.subview.render();
	            });  
		   },
        disposeView: function(view){
        	console.log("Entered into SUB View");
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
   			console.log("Exit From SUB View");
   			return this.currentView;
		}
	});
	return 	appRouter;
});
