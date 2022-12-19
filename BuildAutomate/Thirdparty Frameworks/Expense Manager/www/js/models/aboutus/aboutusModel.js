define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		var aboutusModel = Backbone.Model.extend({
		errordet:[],
		aboutusContent:[],
		initialize:function(){
		
	    	console.log( 'Before bind events how is our model aboutusModel?', this.toJSON() );
	    	
	    	// if (this.get("mmid")) {
	    	// 	mmid=this.get("mmid");
	    	// 	els.set("mmid",mmid);
		    // }else{
		    // 	mmid=" ";
	    	// }

	    	

	    	if(this.get("aboutusContent"))
	    	{
	    		aboutusContent=this.get("aboutusContent");
	    	}else{
	    		aboutusContent='';
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
    return aboutusModel;
});