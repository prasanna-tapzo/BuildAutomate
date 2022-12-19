define(['underscore', 'Backbone'], 
		function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var loginModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){

				if(this.get("ackStatus")){
					ackStatus=this.get("ackStatus");
			    }
				else{
					ackStatus="";
				}
				//els.set("appSessionId","");
				/*if (this.get("access_token")) {
					access_token=this.get("access_token");
					els.set('appSessionId',access_token);
				}*/
			
				/*if (this.get("lastSuccessfulLogin")) {
					lastSuccessfulLogin=this.get("lastSuccessfulLogin");
				}
				else{lastSuccessfulLogin="";}*/
				
				/*if (this.get("ErrorDescription")) {
					var ErrorDescription = this.get("ErrorDescription");
					els.set("errordesc", ErrorDescription);
					console.log("Test error code.."+ErrorDescription);
				} else {
					els.set("errordesc", "FAILURE");
					console.log("Test error code..");
					els.set("errorCode","");
				}*/

				if (this.get("error")) {
					var errordet=this.get("error");
					els.set("errordet",errordet);
					els.set("errordesc",errordet.errorDescription);
					els.set("errorcode",errordet.errorCode);
				 }else{
					els.set("errordesc",'');
					els.set("errorcode",'');
				}
		  }
		});
    return loginModel;   
});