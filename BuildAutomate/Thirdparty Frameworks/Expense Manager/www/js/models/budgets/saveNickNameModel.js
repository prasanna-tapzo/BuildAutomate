define(['underscore', 'Backbone'], 
	function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
		var saveNickNameModel = Backbone.Model.extend({
			
			initialize:function(){
				if (this.get("ackStatus")) {
		    		ackStatus=this.get("ackStatus");
			    }else{
			    	ackStatus="";
			    }
				console.log("ackStatus---------------->"+ackStatus);
				if (this.get("ackMessage")) {
					ackMessage=this.get("ackMessage");
			    }else{
			    	ackMessage="";
			    }
				console.log("ackMessage---------------->"+ackMessage);
				if (this.get("error")) {
					var errordet=this.get("error");
					els.set("errordet",errordet);
					els.set("errordesc",errordet.errorDescription);
					els.set("errorcode",errordet.errorCode);
				}else{
					els.set("errordet",'');
					els.set("errordesc",'');
					els.set("errorcode",'');
				}
			  }
	    
		});
    return saveNickNameModel;
});