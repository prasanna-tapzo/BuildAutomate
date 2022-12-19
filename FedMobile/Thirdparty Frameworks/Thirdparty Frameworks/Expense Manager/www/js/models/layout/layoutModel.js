define(['underscore', 'Backbone'], function(_, Backbone) {
	var layoutModel = Backbone.Model.extend({
	initialize:function()
	    {
	 		 if (this.get("access_token")) {
				 accesstoken=this.get("access_token");				 
			 }	
			 if (this.get("userProfile")) {
	    		userProfile=this.get("userProfile");
		     }
		     if (this.get("lastSuccessLogin")) {
	    		lastSuccessLogin=this.get("lastSuccessLogin");
		     }
		     if (this.get("lastFailureLogin")) {
	    		lastFailureLogin=this.get("lastFailureLogin");
		     }
		 }
    });
    return layoutModel;
});