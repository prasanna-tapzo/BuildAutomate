define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		
		var AllUnCategorizedTxnsModel = Backbone.Model.extend({
			initialize:function(){

				console.log("AllUnCategorizedTxnsModel ........");

				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }
				
				if (this.get("unCategorysListDTO")) {
					unCategorysListDTO=this.get("unCategorysListDTO");
					AllunCategorysList = unCategorysListDTO.uncategorys;
					if(AllunCategorysList==null){
						AllunCategorysList="";
					}
				}else{
					AllunCategorysList="";
			    }
				els.set("AllunCategorysList", AllunCategorysList);
				console.log("AllUnCategorizedTxnsModel ........"+AllunCategorysList);

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
    return AllUnCategorizedTxnsModel;
});