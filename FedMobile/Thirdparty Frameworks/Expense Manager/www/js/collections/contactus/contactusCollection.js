define(['underscore','Backbone','models/contactus/contactusModel'], 

	function(_, Backbone, emailAdviceModel){
		var els = new EncryptedLocalStorage('secret'); 
		var contactusCollections = Backbone.Collection.extend({
			model: emailAdviceModel,
			initialize: function(models, options) {
		    	this.id = options.id;
		  		},
		  		url:function() {
	    		
	    		var appurl = '';
	        	//Retrieve application response mode from local cache
		       	var appResponeMode = els.get('app.respone.mode');
		       	var appContextPath = els.get('app.context.path');
		       	var appStaticContextPath = els.get('app.static.context.path');
		       	var appLocalContextPath = els.get('app.local.context.path');
		       	
		      //Setting up application URL
	        	if(appResponeMode == 'server-dynamic-response'){
	        		console.log("collection");
	        		appurl= appContextPath+'biller/appparameterslist';
	        		//appurl=appLocalContextPath+'contactus.json';
	        	}else if(appResponeMode == "server-static-response"){
	        		appurl=appStaticContextPath+'contactus.json';
	        	}else if(appResponeMode == "local-static-response"){
	        		appurl=appLocalContextPath+'contactus.json';
	        	}
	        	return appurl;
        	},
	    });
	    
    return contactusCollections;
});
  
  
      