define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var otpPreloginValidateModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
			 if (this.get("access_token")) {
				 accesstoken=this.get("access_token");				 
				 els.set('access_token', accesstoken);
			 }
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			if (this.get("error")) {
				var errordet=this.get("error");
				els.set("errordesc",errordet.errorDescription);
			 }else{
				 els.set("errordesc","FAILURE");
			 }
			//els.set("errback","wealth");
         }
    });	
    return otpPreloginValidateModel;
});