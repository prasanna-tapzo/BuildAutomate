define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		
		var accountsExpenseModel = Backbone.Model.extend({
			initialize:function(){

				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }

	// 1.Accounts wise expenses chart data
				var accountsWiseExpnses="";
				if (this.get("accountWiseSpecialCategorysDTO")) {
					accountWiseSpecialCategorysDTO=this.get("accountWiseSpecialCategorysDTO");
					accountsWiseExpnses = accountWiseSpecialCategorysDTO.listOfAccoutwiseSpecialCategory;
					if(accountsWiseExpnses==null){
						accountsWiseExpnses="";
					}
				}else{
					accountsWiseExpnses="";
			    }				
				els.set("accountsWiseExpnses", accountsWiseExpnses);


	// 2. Accounts wise Transaction List data
				var acctWiseTxnReport="";
				if (this.get("accountTransactionReport")) {
					accountTransactionReport=this.get("accountTransactionReport");
					acctWiseTxnReport = accountTransactionReport.listOfAccountTransactionDTO;
				}else{
					acctWiseTxnReport="";
			    }				
				els.set("acctWiseTxnReport", acctWiseTxnReport);
				

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
    return accountsExpenseModel;
});