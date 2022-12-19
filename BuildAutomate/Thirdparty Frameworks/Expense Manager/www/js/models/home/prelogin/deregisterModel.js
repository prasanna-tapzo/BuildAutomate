define(['underscore', 'Backbone'], 
		function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var deregisterModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
				if (this.get("ackStatus")) {
					ackStatus=this.get("ackStatus");
				}else{
					ackStatus="";
				}
				
				if (this.get("transRefNumber")) {
					transRefNumber=this.get("transRefNumber");
				}else{
					transRefNumber="";
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
				els.set("errback","preloginsettings");
		  }
		});
    return deregisterModel;   
});