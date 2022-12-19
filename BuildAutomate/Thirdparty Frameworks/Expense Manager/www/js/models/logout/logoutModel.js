define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var logoutModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			if(this.get("error")){
				errordet=this.get("error");
				els.set("errordesc",errordet.errorDescription);
			}
			els.set("appSessionId","");
         }
    });	
    return logoutModel;
});