define(['underscore', 'Backbone'], 
		function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var mpinValModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
	    	console.log( 'Before bind events how is our model mpinValModel ?', this.toJSON() );
				if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
			    }
				else{ackStatus="";}
				
				
				if (this.get("lastSuccessfulLogin")) {
					lastSuccessfulLogin=this.get("lastSuccessfulLogin");
				    }
					else{lastSuccessfulLogin="";}

				if(this.get("transRefNumber")){

					transRefNumber=this.get("transRefNumber");
					if(transRefNumber == null)
					{
						els.set("errback","mpinERRR"); 	
						console.log(els.get("errback"));
					}
					els.set("MpinErrstatus",transRefNumber);
				}else{
					transRefNumber=this.get("transRefNumber");
					if(transRefNumber == null)
					{
						els.set("errback","mpinERRR"); 	
						console.log(els.get("errback"));
					}
					transRefNumber="";
					els.set("MpinErrstatus",transRefNumber);
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
    return mpinValModel;   
});