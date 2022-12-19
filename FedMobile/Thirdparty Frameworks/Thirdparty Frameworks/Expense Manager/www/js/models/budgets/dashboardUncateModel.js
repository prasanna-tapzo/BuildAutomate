define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		
		var dashboardBandEModel = Backbone.Model.extend({
			initialize:function(){

				//console.log("dashboardBandEModel ........");

				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }
/*
				if (this.get("expenceAndBudgetListDTO")) {
					expenceAndBudgetListDTO=this.get("expenceAndBudgetListDTO");
					expenceAndBudgetList = expenceAndBudgetListDTO.expenceAndBudgetDTO;
					if(expenceAndBudgetList==null){
						expenceAndBudgetList="";
					}
				}else{
					expenceAndBudgetList="";
			    }
				
				els.set("expenceAndBudgetList", expenceAndBudgetList);
				//console.log("dashboardBandEModel ........"+expenceAndBudgetList);
				
				if (this.get("categorysListDTO")) {
					categorysListDTO=this.get("categorysListDTO");
					categorysList = categorysListDTO.categorys;
					if(categorysList==null){
						categorysList="";
					}
				}else{
					categorysList="";
			    }
				els.set("categorysList", categorysList);
				//console.log("dashboardBandEModel ........"+categorysList);
				*/
				if (this.get("unCategorysListDTO")) {
					unCategorysListDTO=this.get("unCategorysListDTO");
					unCategorysList = unCategorysListDTO.uncategorys;
					if(unCategorysList==null){
						unCategorysList="";
					}
				}else{
					unCategorysList="";
			    }
				els.set("AllunCategorysList", unCategorysList);
				//console.log("dashboardBandEModel ........"+unCategorysList);
				/*
				if (this.get("calendarMonthListDTO")) {
					calendarMonthListDTO=this.get("calendarMonthListDTO");
					calendarMonthList = calendarMonthListDTO.monthList;
					if(calendarMonthList==null){
						calendarMonthList="";
					}
				}else{
					calendarMonthList="";
			    }
				els.set("calendarMonthList", calendarMonthList);
				//console.log("dashboardBandEModel ........"+calendarMonthList);
				
				if (this.get("categoryNamesDTO")) {
					categoryNameDTO=this.get("categoryNamesDTO");
					categoryNames = categoryNameDTO.listCategoryNameDTO;
					if(categoryNames==null){
						categoryNames="";
					}
				}else{
					categoryNames="";
			    }
				els.set("categoryNames", categoryNames);
				//console.log("categoryNames ........"+categoryNames);
				*/
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
    return dashboardBandEModel;
});