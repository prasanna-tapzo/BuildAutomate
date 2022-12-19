define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		
		var reportsModel = Backbone.Model.extend({
			initialize:function(){

				//console.log("dashboardBandEModel ........");

				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }


	// 1. Yearly
				if (this.get("listDashboardExpAndBudgetCategoryYearly")) {
					listDashboardExpAndBudgetCategoryYearly=this.get("listDashboardExpAndBudgetCategoryYearly");
					reportYearlyTxn = listDashboardExpAndBudgetCategoryYearly.listDashboardExpAndCategorysDTO;
					if(reportYearlyTxn==null){
						reportYearlyTxn="";
					}
				}else{
					reportYearlyTxn="";
			    }				
				els.set("reportYearlyTxn", reportYearlyTxn);

				
	// 2. Monthly
				if (this.get("listDashboardExpAndBudgetCategoryMonthly")) {
					listDashboardExpAndBudgetCategoryMonthly=this.get("listDashboardExpAndBudgetCategoryMonthly");
					reportMontlyTxn = listDashboardExpAndBudgetCategoryMonthly.expenceAndBudgetDTO;
					if(reportMontlyTxn==null){
						reportMontlyTxn="";
					}
				}else{
					reportMontlyTxn="";
			    }				
				els.set("reportMontlyTxn", reportMontlyTxn);
				
				
	// 3. Daily			
				if (this.get("listDashboardExpAndBudgetCategoryDaily")) {
					listDashboardExpAndBudgetCategoryDaily=this.get("listDashboardExpAndBudgetCategoryDaily");
					reportDailyTxn = listDashboardExpAndBudgetCategoryDaily.listDashboardExpAndCategorysDTO;
					if(reportDailyTxn==null){
						reportDailyTxn="";
					}
				}else{
					reportDailyTxn="";
			    }				
				els.set("reportDailyTxn", reportDailyTxn);
				
				
	// 4. Weekly			
				if (this.get("listDashboardExpAndBudgetCategoryWeekly")) {
					listDashboardExpAndBudgetCategoryWeekly=this.get("listDashboardExpAndBudgetCategoryWeekly");
					reportWeeklyTxn = listDashboardExpAndBudgetCategoryWeekly.listDashboardExpAndCategorysDTO;
					if(reportWeeklyTxn==null){
						reportWeeklyTxn="";
					}
				}else{
					reportWeeklyTxn="";
			    }				
				els.set("reportWeeklyTxn", reportWeeklyTxn);
				
				
	// 5. Quartely			
				if (this.get("listDashboardExpAndBudgetCategoryQuartely")) {
					listDashboardExpAndBudgetCategoryQuartely=this.get("listDashboardExpAndBudgetCategoryQuartely");
					reportQuartelyTxn = listDashboardExpAndBudgetCategoryQuartely.listDashboardExpAndCategorysDTO;
					if(reportQuartelyTxn==null){
						reportQuartelyTxn="";
					}
				}else{
					reportQuartelyTxn="";
			    }				
				els.set("reportQuartelyTxn", reportQuartelyTxn);
				
				
	// 6. Txn List			
				if (this.get("listAccountTransactionReport")) {
					listAccountTransactionReport=this.get("listAccountTransactionReport");
					reportTxnList = listAccountTransactionReport.listOfAccountTransactionDTO;
				}else{
					reportTxnList="";
			    }				
				els.set("reportTxnList", reportTxnList);
				

				if (this.get("error")) {
					var errordet=this.get("error");
					els.set("errordet",errordet);
					els.set("errordesc",errordet.errorDescription);
					els.set("errorcode",errordet.errorCode);
				}else{
					els.set("errordet",'');
					els.set("errordesc",'');
					els.set("errorcode",'');
				}
			}
	    
		});
    return reportsModel;
});