define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var preLoginOauthVerify = Backbone.Model.extend({
		initialize:function(){
			console.log( 'Before bind events how is our model preLoginOauthVerify?', this.toJSON() );
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			
			if(this.get("userLogin"))
			{
				sessionid=this.get("userLogin");
				els.set("sessionid",sessionid);
			}else{
				sessionid='';
				els.set("sessionid",sessionid);
			}


			if (this.get("customerID")) {
				customerID=this.get("customerID");
				els.set("customerID",customerID);
			 }
			
			if (this.get("ulpID")) {
				ulpID=this.get("ulpID");
				els.set("ulpID",ulpID);
			 }
			
			if (this.get("error")) {
				var errordet = this.get("error");
				els.set("errordesc", errordet.errorDescription);
				els.set("errorCode",errordet.errorCode);
				console.log("Test error code.."+els.get("errorCode"));
			} else {
				els.set("errordesc", "FAILURE");
				els.set("errorCode","");
			}
         }
    });	
    return preLoginOauthVerify;
});