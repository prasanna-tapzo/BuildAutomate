define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var preLoginModel = Backbone.Model.extend({
		loginerror:[],
		initialize:function(){
			
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			if (this.get("error")) {
				loginerror=this.get("error");
			 }
         }
    });	
    return preLoginModel;
});