define(['underscore', 'Backbone'], 
		function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var preLoginDTHModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
				if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			else{ackStatus="";}
			if (this.get("error")) {
					var errordet = this.get("error");
					els.set("errordet",errordet);
					els.set("errordesc", errordet.errorDescription);
					els.set("errorCode",errordet.errorCode);
					console.log("Test error code.."+els.get("errorCode"));
				} else {
					els.set("errordesc", "FAILURE");
					els.set("errorCode","");
				}
		  }
		});
    return preLoginDTHModel;   
});