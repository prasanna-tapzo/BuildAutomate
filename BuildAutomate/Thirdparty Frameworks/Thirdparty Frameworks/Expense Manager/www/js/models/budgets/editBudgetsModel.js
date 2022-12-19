define(['underscore', 'Backbone'], 
	function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
		var editBudgetsModel = Backbone.Model.extend({
			
			initialize:function(){
				console.log('accountModel'+this.get("ackStatus"));
				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }
				
				if (this.get("ransactionEnquiry")) {
					ransactionEnquiry=this.get("ransactionEnquiry");
					els.set('ransactionEnquiry',ransactionEnquiry)
			    }else{
			    	FTFavorites="";
			    }
				
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
    return editBudgetsModel;
});