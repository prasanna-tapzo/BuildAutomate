define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret');
	var offersSearchResultModel = Backbone.Model.extend({
		initialize:function(){
			if (this.get("ackStatus")) {
				 ackStatus=this.get("ackStatus");				 
				 els.set('ackStatus', ackStatus);
			}
		    if (this.get("pushListDTO")) {
		    	pushListDTO=this.get("pushListDTO");
                els.set("pushListDTO",pushListDTO);
                console.log("resultssearchList------"+pushListDTO.length);
		    }else{
		    	pushListDTO = "";
		    }				 
	    }
    });
    return offersSearchResultModel;
});