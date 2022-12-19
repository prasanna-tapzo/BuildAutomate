define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var otpValidateModel = Backbone.Model.extend({
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
				errordet=this.get("error");
				els.set("errordesc",errordet.errorDescription);
				els.set("errorcod",errordet.errorCode);
			 }else{
				errordet='';
				els.set("errordesc",'');
				els.set("errorcod",'');
			}
			
			if(this.get("status")){

				var otpErrstatus = this.get("status");
				els.set("otpErrstatus",otpErrstatus);

			}else{
				els.set("otpErrstatus",'');
			}


			
			els.set("errback","wealth");
         }
    });	
    return otpValidateModel;
});