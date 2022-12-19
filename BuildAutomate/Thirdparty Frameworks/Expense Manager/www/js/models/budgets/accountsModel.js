define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		
		var accountsModel = Backbone.Model.extend({
			initialize:function(){
				
				console.log("Inside Model.........................");
				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }
				console.log('ackStatus : '+ackStatus);
				
				
				
				if (this.get("accountListDTO")) {
					accountListDTO=this.get("accountListDTO");
					accountList = accountListDTO.accountList;
					if(accountList==null) {
						accountList="";
					}
				}else{
					accountList="";
			    }
				els.set("accountList",accountList);
				
				
				if (this.get("expencesCategoryDetailByAccountDTO")) {
					expencesCategoryDetailByAccountDTO=this.get("expencesCategoryDetailByAccountDTO");
					listExpencesCategoryDTO = expencesCategoryDetailByAccountDTO.listExpencesCategoryDTO;
					if(listExpencesCategoryDTO==null){
						listExpencesCategoryDTO="";
					}
				}else{
					listExpencesCategoryDTO="";
			    }
				els.set("ExpencesCategoryListAcct",listExpencesCategoryDTO);
				console.log("listExpencesCategoryDTO.................."+listExpencesCategoryDTO);
/*				
				
				if (this.get("Expense_Total_amount")) {
					Expense_Total_amount=this.get("Expense_Total_amount");
				}else{
					Expense_Total_amount="";
			    }
				console.log('Expense_Total_amount : '+Expense_Total_amount);
				
				if (this.get("Expense_month")) {
					Expense_month=this.get("Expense_month");
				}else{
					Expense_month="";
			    }
				console.log('Expense_month : '+ Expense_month);
				
				
				if (this.get("responseInfo")) {
					Expense1=this.get("responseInfo");
					Expense = Expense1.Expenses;
				}else{
					Expense="";
			    }*/

				
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
    return accountsModel;
});