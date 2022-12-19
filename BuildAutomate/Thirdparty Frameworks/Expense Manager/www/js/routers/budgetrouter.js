define(['jquery','underscore', 'Backbone',
       // 'views/common/exception'
       	],
    function ($,_, Backbone,
    	exception
    		) {
	var els = new EncryptedLocalStorage('secret');  
	var budgetRouter=Backbone.Router.extend({
				  routes:{
						"dashboard":"dashboard",
						"dashboards/:id":"dashboards",
						"accounts":"accounts",
						"accountss/:id":"accountss",
						"budgets":"budgets",
						"reports":"reports",
						"budgetCategorise/:name/:id":"budgetCategorise",
						"budgetCategorises/:name/:id/:rnd":"budgetCategorises",
						"categorize":"categorize",
						"splittrans":"splittrans",
						"splittransedit":"splittransedit",
						"cashwidhdral":"cashwidhdral",
						"cashwidhdralfrombudg/:p1/:p2/:p3/:p4/:p5/:p6":"cashwidhdralfrombudg",
						"addnewbudget":"addnewbudget",
						"budgetedit/:amt/:desc/:id":"editbudget",
						"weekly":"weeklyreport",
						"monthly":"monthlyreport",
						"quarterly":"quarterlyreport",
						"year":"yearreport",
						"daily":"dailyreport",
						"daily/:id":"dailyreportswipe",
						"budgetcategorywise":"budgetcategorywise",
						"budgetcategorywise/:id":"budgetcategorywise",
						"categoryexpensesreport":"categoryexpensesreport",
						"categoryexpensesreportquarterly":"categoryexpensesreportquarterly",
						"accountsexpensesreport":"accountsexpensesreport",
						"accountsexpensesreports/:id":"accountsexpensesreports"
				  },
				  budgetcategorywise:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#loginfooter").unbind();
						if(els.get("quarterlyNavigation") == "report_Reports"){
							els.set("iosNavigation","reports");
						}else{
							els.set("iosNavigation","smartBudget");
						}
						//els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/budgetCategoryWise'],
						  function($,budgetcategorywise){
							that.subview=that.disposeView(new budgetcategorywise());
							that.subview.render();
						});
				  },
				  budgetcategorywise:function(id){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#loginfooter").unbind();
						els.set("budgetcategorywise","budgetcategorywise");
						if(els.get("quarterlyNavigation") == "report_Reports"){
							els.set("iosNavigation","reports");
						}else{
							els.set("iosNavigation","smartBudget");
						}
						//els.set("iosNavigation","budgetcategorywise");
						//els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/budgetCategoryWise'],
						  function($,budgetcategorywise){
							that.subview=that.disposeView(new budgetcategorywise());
							that.subview.render();
						});
				  },
				  categoryexpensesreport:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#loginfooter").unbind();
						if(els.get("categoryExpensesReport") == "Expensesreport"){
							els.set("iosNavigation","budgets");
						}else{
							els.set("iosNavigation","budgetcategorywise");
						}
						els.set("categoryExpenses","Expensesreport");
						//els.set("iosNavigation","budgets");
						//els.set("categoryExpensesReport","categoryexpensesreport");
						
						require(['jquery','views/budget/reports/categoryWiseExpnReport'],
						  function($,categoryWiseExpnReport){
							that.subview=that.disposeView(new categoryWiseExpnReport());
							that.subview.render();
						});
				  },
				  categoryexpensesreportquarterly:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#loginfooter").unbind();
						if(els.get("categoryExpensesReport") == "Expensesreport"){
							els.set("iosNavigation","budgets");
						}else{
							els.set("iosNavigation","budgetcategorywise");
						}
						els.set("categoryExpenses","Expensesreport");
						//els.set("iosNavigation","budgets");
						//els.set("categoryExpensesReport","categoryexpensesreport");
						require(['jquery','views/budget/reports/categoryWiseExpnReportQuarterly'],
						  function($,categoryWiseExpnReportQuarterly){
							that.subview=that.disposeView(new categoryWiseExpnReportQuarterly());
							that.subview.render();
						});
				  },
				  accountsexpensesreport:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#loginfooter").unbind();
						els.set("iosNavigation","budgetcategorywise");
						els.set("categoryExpenses","Expensesreport");
						//els.set("iosNavigation","reports");
						//els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/accountsWiseExpnReport'],
						  function($,accountsWiseExpnReport){
							that.subview=that.disposeView(new accountsWiseExpnReport());
							that.subview.render();
						});
				  },
				  accountsexpensesreports:function(id){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#loginfooter").unbind();
						
						/*if(els.get("categoryExpensesReport") == "categoryexpensesreport"){
							els.set("iosNavigation","categoryexpensesreport");
						}else{
							els.set("iosNavigation","accountsexpensesreport");
						}*/
						els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/accountsWiseExpnReport'],
						  function($,accountsWiseExpnReport){
							that.subview=that.disposeView(new accountsWiseExpnReport());
							that.subview.render();
						});
				  },
				  weeklyreport:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#iosBackButton").show();
						$("#loginfooter").unbind();
						//els.set("iosNavigation","smartBudget");
						els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/weeklyReport'],
						  function($,weeklyReport){
							that.subview=that.disposeView(new weeklyReport());
							that.subview.render();
						});
				  },
				  monthlyreport:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#iosBackButton").show();
						$("#loginfooter").unbind();
						if(els.get("quarterlyNavigation") == "report_Reports"){
							els.set("iosNavigation","reports");
						}else{
							els.set("iosNavigation","smartBudget");
						}
						//els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/monthlyReport'],
						  function($,monthlyReport){
							that.subview=that.disposeView(new monthlyReport());
							that.subview.render();
						});
				  },
				  quarterlyreport:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#iosBackButton").show();
						$("#loginfooter").unbind();
						//els.set("iosNavigation","smartBudget");
						if(els.get("quarterlyNavigation") == "report_Reports"){
							els.set("iosNavigation","reports");
						}else{
							els.set("iosNavigation","smartBudget");
						}
						require(['jquery','views/budget/reports/quaterlyReport'],
						  function($,quaterlyReport){
							that.subview=that.disposeView(new quaterlyReport());
							that.subview.render();
						});
				  },
				  yearreport:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#iosBackButton").show();
						$("#loginfooter").unbind();
						els.set("iosNavigation","reports");
						//els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/yearlyReport'],
						  function($,yearlyReport){
							that.subview=that.disposeView(new yearlyReport());
							that.subview.render();
						});
				  },
				  dailyreportswipe:function(id){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#iosBackButton").show();
						$("#loginfooter").unbind();
						els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/dailyReport'],
						  function($,dailyReport){
							that.subview=that.disposeView(new dailyReport());
							that.subview.update();
						});
				  },
				  dailyreport:function(){
						var that=this;
						$("#container").unbind();
						$("#mobcontent").unbind();
						$("#iosBackButton").show();
						$("#loginfooter").unbind();
						els.set("iosNavigation","reports");
						//els.set("iosNavigation","budgetNavigation");
						require(['jquery','views/budget/reports/dailyReport'],
						  function($,dailyReport){
							that.subview=that.disposeView(new dailyReport());
							that.subview.render();
						});
				  },
	              dashboard:function(){
	            	  	els.set("cate_chart_month_year","");
	                 	var that=this;
	                 	$("#container").unbind();
	                 	$("#mobcontent").unbind();
	                 	$("#iosBackButton").show();
	                 	$("#loginfooter").unbind();
	                 	require(['jquery','views/budget/dashboard/dashboard'],
	                 	  function($,dashboard){
	                 		that.subview=that.disposeView(new dashboard());
	                 		that.subview.render();
	                 	});
	               },
	               dashboards: function(id){
		    			//Backbone.Validation.unbind(this);
		    			$("#container").unbind();
		    			$("#mobcontent").unbind();
		    			$("#iosBackButton").show();
		    			$("#loginfooter").unbind();
		    			var that=this;
		    			els.set("dashboardsID",id);
		    			els.set("iosNavigation","wealth");
		    			require(['jquery','views/budget/budget','libs/utility/jshashtable-2.1','libs/utility/jquery.numberformatter-1.2.3.min'],
		    					function ($,budget,jshashtable,numberformatter) {
		    						that.view = new budget();
		    						that.view.render();
		    		    });	
		    	   },
                   accounts:function(){
                	    els.set("cate_chart_month_year","");
	                  	var that=this;
	                  	$("#container").unbind();
	                  	$("#mobcontent").unbind();
	                  	$("#iosBackButton").show();
	                  	$("#loginfooter").unbind();
	                  	els.set("iosNavigation","smartBudget");
	                  	els.set("accountsNavigation","accounts_Account");
	                  	require(['jquery','views/budget/accounts/accounts'],
	                  	  function($,accounts){
	                  		that.subview=that.disposeView(new accounts());
	                  		that.subview.render();
	                  	});
                   },
                   accountss:function(id){
	                  	var that=this;
	                  	$("#container").unbind();
	                  	$("#mobcontent").unbind();
	                  	$("#iosBackButton").show();
	                  	$("#loginfooter").unbind();
	                  	els.set("iosNavigation","accounts");
	                  	els.set("accountsNavigation","");
	                  	//els.set("iosNavigation","budgetNavigation");
	                  	require(['jquery','views/budget/accounts/accounts'],
	                  	  function($,accounts){
	                  		that.subview=that.disposeView(new accounts());
	                  		that.subview.render();
	                  	});
                  },
                  budgets:function(){
                	  els.set("cate_chart_month_year","");
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","smartBudget");
                    	els.set("categorize","");
                    	els.set("categoryExpensesReport","Expensesreport");
                    	require(['jquery','views/budget/budgets/budgets'],
                    	  function($,budgets){
                    		that.subview=that.disposeView(new budgets());
                    		that.subview.render();
                    	});
                    },
                    reports:function(){
                    	els.set("cate_chart_month_year","");
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","smartBudget");
                    	els.set("accountsNavigation","");
                    	els.set("categoryExpensesReport","");
                    	els.set("categoryExpenses","");
                    	els.set("quarterlyNavigation","report_Reports");
                    	require(['jquery','views/budget/reports/reports'],
                    	  function($,reports){
                    		that.subview=that.disposeView(new reports());
                    		that.subview.render();
                    	});
                    },
                    budgetCategorise:function(name,id){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","accounts");
                    	els.set("budgetCateName",name);
                    	els.set("budgetCateId",id);
                    	//els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/dashboard/budgetCategorise'],
                    	  function($,budgetCategorise){
                    		that.subview=that.disposeView(new budgetCategorise());
                    		that.subview.render(name,id);
                    	});
                    },
                    budgetCategorises:function(name,id,rnd){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	//els.set("iosNavigation","budgets");
                    	els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/dashboard/budgetCategorise'],
                    	  function($,budgetCategorise){
                    		that.subview=that.disposeView(new budgetCategorise());
                    		that.subview.update();
                    	});
                    },
                    splittrans:function(){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","cashwidhdral");
                    	//els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/accounts/splitTransaction'],
                    	  function($,splitTransaction){
                    		that.subview=that.disposeView(new splitTransaction());
                    		that.subview.render();
                    	});
                    },
                    splittransedit:function(){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/accounts/splitTransactionEdit'],
                    	  function($,splitTransactionEdit){
                    		that.subview=that.disposeView(new splitTransactionEdit());
                    		that.subview.render();
                    	});
                    },
                    cashwidhdral:function(){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	if(els.get("iosNavigation") == "smartBudget" && els.get("budgetcategorywise") == "budgetcategorywise"){
							els.set("iosNavigation","budgetcategorywise");
						}else if(els.get("quarterlyNavigation") == "report_Reports" && els.get("categoryExpenses") == ""){
							els.set("iosNavigation","budgetcategorywise");
						}else if(els.get("accountsNavigation")=="accounts_Account"){
                           var name = els.get("budgetCateName");
                    	   var id = els.get("budgetCateId");
                    	   els.set("iosNavigation","budgetCategorise/"+name+"/"+id);
						}else if(els.get("categorize") == "categorize"){
							els.set("iosNavigation","categorize");
						}else if(els.get("categoryExpenses") == "Expensesreport"){
							els.set("iosNavigation","accountsexpensesreport");
						}else {
							els.set("iosNavigation","smartBudget");
						}
                    	//els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/dashboard/cashWithdrawal'],
                    	  function($,cashWithdrawal){
                    		that.subview=that.disposeView(new cashWithdrawal());
                    		that.subview.render();
                    	});
                    },
                    cashwidhdralfrombudg:function(p1,p2,p3,p4,p5,p6){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","smartBudget");
                    	//els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/dashboard/cashWithdrawal'],
                    	  function($,cashWithdrawal){
                    		that.subview=that.disposeView(new cashWithdrawal());
                    		that.subview.update(p1,p2,p3,p4,p5,p6);
                    	});
                    },
                    addnewbudget:function(){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","budgets");
                    	//els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/budgets/add_new_budget'],
                    	  function($,add_new_budget){
                    		that.subview=that.disposeView(new add_new_budget());
                    		that.subview.render();
                    	});
                    },
                    editbudget:function(amt, desc, id){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
                    	els.set("iosNavigation","budgets");
                    	//els.set("iosNavigation","budgetNavigation");
                    	if(desc=="food_and_drinks")
                    	{
                    		desc="Food and Drinks/Dineout";
                    	}
                    	require(['jquery','views/budget/budgets/add_new_budget'],
                    	  function($,add_new_budget){
                    		that.subview=that.disposeView(new add_new_budget());
                    		that.subview.update(amt, desc, id);
                    	});
                    },
                    categorize:function(){
                    	var that=this;
                    	$("#container").unbind();
                    	$("#mobcontent").unbind();
                    	$("#iosBackButton").show();
                    	$("#loginfooter").unbind();
						els.set("iosNavigation","smartBudget");
						els.set("categorize","categorize");
                    	//els.set("iosNavigation","budgetNavigation");
                    	require(['jquery','views/budget/budgets/categorize'],
                    	  function($,categorize){
                    		that.subview=that.disposeView(new categorize());
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
		
		return 	budgetRouter;
});

