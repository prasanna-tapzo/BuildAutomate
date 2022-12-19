define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		var clicktocallModel = Backbone.Model.extend({
		errordet:[],
		contactDetails:[],
		initialize:function(){
		
	    	console.log( 'Before bind events how is our model clicktocallModel?', this.toJSON() );

		    if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
		    else{
		    	ackStatus=' ';
		    }
		    
	    	if(this.get("listOfClickToCalls"))
	    	{
	    		listOfClickToCalls=this.get("listOfClickToCalls");
	    	}else{
	    		listOfClickToCalls='';
	    	}
	    	 els.set("listOfClickToCalls",listOfClickToCalls);
		    
		    if (this.get("error")) {
				var errordet=this.get("error");
				els.set("errordet",errordet);
				els.set("errordesc",errordet.errorDescription);
				els.set("errorcode",errordet.errorCode);
			 }else{
				els.set("errordesc",'');
				els.set("errorcode",'');
			}
		 
		    els.set("errback","contactus");
		  }
	    
		});
    return clicktocallModel;
});