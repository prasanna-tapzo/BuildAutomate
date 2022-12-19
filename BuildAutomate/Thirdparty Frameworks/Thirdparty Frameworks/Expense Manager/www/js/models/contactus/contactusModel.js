define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		var contactusModel = Backbone.Model.extend({
		errordet:[],
		contactDetails:[],
		initialize:function(){
		
	    	console.log( 'Before bind events how is our model contactusModel?', this.toJSON() );
	    	
	    	// if (this.get("mmid")) {
	    	// 	mmid=this.get("mmid");
	    	// 	els.set("mmid",mmid);
		    // }else{
		    // 	mmid=" ";
	    	// }

	    	

	    	if(this.get("contactDetails"))
	    	{
	    		contactDetails=this.get("contactDetails");
	    	}else{
	    		contactDetails='';
	    	}

		/*if (this.get("externalReferenceNo")) {
	    		externalReferenceNo=this.get("externalReferenceNo");
	    		els.set("externalReferenceNo",externalReferenceNo);
		    }else{
		    	externalReferenceNo=" ";
	    	}
	    */	
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
		 
		    els.set("errback","services");
		  }
	    
		});
    return contactusModel;
});