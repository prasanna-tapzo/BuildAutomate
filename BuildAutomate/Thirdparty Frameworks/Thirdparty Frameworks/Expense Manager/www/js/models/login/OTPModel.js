define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var OTPModel = Backbone.Model.extend({
		errordet:[],
		
		initialize:function(){
	    	//console.log( 'Before bind events how is our model?', this.toJSON() );
	    	
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			if (this.get("userProfile")) {
				userProfile=this.get("userProfile");
		    }
			if (this.get("error")) {
				var errordet=this.get("error");
				els.set("errordesc",errordet.errorDescription);
				els.set("errorcod",errordet.errorCode);
			}else{
				els.set("errordesc","FAILURE");
			}
		    
		  }
	    
		});
    return OTPModel;   
});