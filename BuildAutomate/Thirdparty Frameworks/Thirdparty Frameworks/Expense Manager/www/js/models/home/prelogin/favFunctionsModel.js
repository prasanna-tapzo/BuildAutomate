define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		var favFunctionsModel = Backbone.Model.extend({
			otpTransactionsEnabled:'',
		errordet:[],
		initialize:function(){
		
	    	console.log( 'Before bind events how is our favFunctions model?', this.toJSON() );


	    	if (this.get("responseInfo")) {
	    		billpay=this.get("billpay");
	    		locateus=this.get("locateus");
	    		contactus=this.get("contactus");
	    		promotion=this.get("promotion");
	    		calculator=this.get("calculator");
	    		faq=this.get("faq");
	    		offerings=this.get("offerings");

	    		els.set("billpay",billpay);
	    		els.set("locateus",locateus);
	    		els.set("contactus",contactus);
	    		els.set("promotion",promotion);
	    		els.set("calculator",calculator);
	    		els.set("faq",faq);
	    		els.set("offerings",offerings);


		    }else{
		    	billpay="";
		    	locateus="";
		    	contactus="";
		    	promotion="";
		    	calculator="";
		    	faq="";
		    	offerings="";
		    	els.set("billpay","");
	    		els.set("locateus","");
	    		els.set("contactus","");
	    		els.set("promotion","");
	    		els.set("calculator","");
	    		els.set("faq","");
	    		els.set("offerings","");
	    	}
	    	





		    if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
		    else{
		    	ackStatus=' ';
		    }
		    if (this.get("error")) {
				var errordet=this.get("error");
				els.set("errordet",errordet);
				els.set("errordesc",errordet.errorDescription);
				els.set("errorcode",errordet.errorCode);
			 }else{
				els.set("errordesc",'');
				els.set("errorcode",'');
			}
		 
		    els.set("errback","settings");
		  }
	    
		});
    return favFunctionsModel;
});