define(['underscore', 'Backbone'], 
		function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var loginModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
		    	//console.log( 'Before bind events how is our model?', this.toJSON() );
				if (this.get("access_token")) {
					access_token=this.get("access_token");
					els.set('appSessionId',access_token);
				}
				
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
    return loginModel;   
});