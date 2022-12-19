define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var els = new EncryptedLocalStorage('secret'); 
		var offerSavingsModel = Backbone.Model.extend({
		errordet:[],
		caseNo:'',
		initialize:function(){
		
	    	console.log( 'Before bind events how is our model offerSavingsModel?', this.toJSON() );
	    	/*if (this.get("mmid")) {
	    		mmid=this.get("mmid");
	    		els.set("mmid",mmid);
		    }else{
		    	mmid=" ";
	    	}*/
		if (this.get("caseNo")) {
	    		caseNo=this.get("caseNo");
	    		els.set("caseNo",caseNo);
		    }else{
		    	caseNo=" ";
		    	els.set("caseNo","");
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
		 
		    els.set("errback","services");
		  }
	    
		});
    return offerSavingsModel;
});