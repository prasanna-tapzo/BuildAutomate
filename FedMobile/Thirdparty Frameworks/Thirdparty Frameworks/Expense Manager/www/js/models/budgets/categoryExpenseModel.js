define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		
		var categoryExpenseModel = Backbone.Model.extend({
			initialize:function(){

				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }

	// 1.Category wise expenses data
				var categoryWiseExpnses="";
				if (this.get("expCatByPerticularTypeDTO")) {
					expCatByPerticularTypeDTO=this.get("expCatByPerticularTypeDTO");
					categoryWiseExpnses = expCatByPerticularTypeDTO.listOfExpenceCategoryByPerticularDTO;
					if(categoryWiseExpnses==null){
						categoryWiseExpnses="";
					}
				}else{
					categoryWiseExpnses="";
			    }				
				els.set("categoryWiseExpnses", categoryWiseExpnses);


	// 2. Category wise Transaction List data
				var cateWiseTxnReport="";
				if (this.get("accountTransactionReport")) {
					accountTransactionReport=this.get("accountTransactionReport");
					cateWiseTxnReport = accountTransactionReport.listOfAccountTransactionDTO;
				}else{
					cateWiseTxnReport="";
			    }				
				els.set("cateWiseTxnReport", cateWiseTxnReport);
				

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
    return categoryExpenseModel;
});