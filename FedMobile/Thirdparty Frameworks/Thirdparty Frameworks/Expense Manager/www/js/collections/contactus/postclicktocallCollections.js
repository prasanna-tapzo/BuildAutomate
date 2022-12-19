define(['underscore','Backbone','models/contactus/postclicktocallModel'], 

	function(_, Backbone, postclicktocallModel){
		var els = new EncryptedLocalStorage('secret'); 
		var postclicktocallCollections = Backbone.Collection.extend({
			model: postclicktocallModel,
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
	        		appurl= appContextPath+'servicerequest/clickToCall';
	        	}else if(appResponeMode == "server-static-response"){
	        		appurl=appStaticContextPath+'accountMiniStatement.json';
	        	}else if(appResponeMode == "local-static-response"){
	        		appurl=appLocalContextPath+'accountMiniStatement.json';
	        	}
	        	
	        	console.log(appurl);
	        	
	        	
	        	return appurl;
        	},
	      
	        
	      
	    });
	    
    return postclicktocallCollections;
});
  
  
      