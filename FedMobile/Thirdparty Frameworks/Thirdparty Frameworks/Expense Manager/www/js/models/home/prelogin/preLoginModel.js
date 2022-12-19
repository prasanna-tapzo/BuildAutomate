define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var preLoginModel = Backbone.Model.extend({
		initialize:function(){
			
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");

		    		if(this.get("transRefNumber") && this.get("ackStatus")=="00000")
		    		{
		    			otpTransactionsEnabled=this.get("transRefNumber");

		    			console.log(otpTransactionsEnabled);
		    			
		    			if(otpTransactionsEnabled=="Y")
		    			{
		    				console.log(otpTransactionsEnabled);
		    				els.set("otpTransactionsEnabled",true);	
		    			}else{
		    				els.set("otpTransactionsEnabled",false);
		    			}
		    		}


		    		if(this.get("coolingPeriod") && this.get("ackStatus")=="00000")
		    		{
		    			coolingPeriod=this.get("coolingPeriod");

		    			console.log(coolingPeriod);
		    			els.set("coolingPeriod",coolingPeriod);	
		    			
		    		}

		    		if(this.get("emflag") && this.get("ackStatus")=="00000")
		    		{
		    			emflag=this.get("emflag");

		    			console.log(emflag);
		    			els.set("emflag",emflag);	
		    			
		    		}else{
		    			els.set("emflag","");	
		    		}
		    		//els.set("emflag","");//harded for testing purpose.. need to comment once releasing

					if(this.get("otpExpiryPeriod") && this.get("ackStatus")=="00000")
		    		{
		    			otpExpiryPeriod=this.get("otpExpiryPeriod");

		    			console.log(otpExpiryPeriod);
		    			els.set("otpExpiryPeriod",otpExpiryPeriod);	
		    			
		    		}else{
		    			els.set("otpExpiryPeriod","");	
		    		}
		    		
		    }
			

			


			if (this.get("customerID")) {
				customerID=this.get("customerID");
				els.set("customerID",customerID);
			 }
			
			if (this.get("ulpID")) {
				ulpID=this.get("ulpID");
				els.set("ulpID",ulpID);
			 }
			 els.set("customerID_EM",ulpID);
			//els.set("customerID_EM","1605632");
			 //els.set("customerID_EM","294915"); //SIT
			 //els.set("customerID_EM","262144"); //UAT
			
			if (this.get("error")) {
				var errordet = this.get("error");
				els.set("errordesc", errordet.errorDescription);
				els.set("errorCode",errordet.errorCode);
				console.log("Test error code.."+els.get("errorCode"));
			} else {
				els.set("errordesc", "FAILURE");
				els.set("errorCode","");
			}
			
			els.set("errback","");
         }

    });	
    return preLoginModel;
});