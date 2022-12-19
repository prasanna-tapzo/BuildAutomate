define(['underscore','Backbone','models/contactus/contactusModel'], 

	function(_, Backbone, contactusModel){
		var els = new EncryptedLocalStorage('secret'); 
		var contactusCollections = Backbone.Collection.extend({
			model: contactusModel,
			initialize: function(models, options) {
				console.log("inside collections");
		    	//this.id = options.id;
		  		},
	    	url:function() {
	    		
	    		var appurl = '';
	        	els.set("errordesc","");
	        	//Retrieve application response mode from local cache
		       	var appResponeMode = els.get('app.respone.mode');
		       	var appContextPath = els.get('app.context.path');
		       	var appStaticContextPath = els.get('app.static.context.path');
		       	var appLocalContextPath = els.get('app.local.context.path');
		       	
		      //Setting up application URL
	        

	        	if(appResponeMode == 'server-dynamic-response'){
	        		//appurl= appContextPath+'servicerequest/getofferings';
	        		appurl=appLocalContextPath+'contactus.json';
	        	}else if(appResponeMode == "server-static-response"){
	        		appurl=appStaticContextPath+'accountMiniStatement.json';
	        	}else if(appResponeMode == "local-static-response"){
	        		appurl=appLocalContextPath+'accountMiniStatement.json';
	        	}
	        	
	        	console.log(appurl);
	        	
	        	
	        	return appurl;
        	},
	      
	        
	      
	    });
	    
    return contactusCollections;
});
  
  
      