define(['underscore','Backbone','models/settings/changeMpinModel'], 

	function(_, Backbone, changeMpinModel){
		var els = new EncryptedLocalStorage('secret'); 
		var changeMpinCollections = Backbone.Collection.extend({
			model: changeMpinModel,
			initialize: function(models, options) {
				console.log("collections");
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
	        		appurl= appContextPath+'prelogin/changeMPIN';
	        		//appurl=appLocalContextPath+'Settings_ChangeMPIN_Res.json';
	        	}else if(appResponeMode == "server-static-response"){
	        		appurl=appStaticContextPath+'accountMiniStatement.json';
	        	}else if(appResponeMode == "local-static-response"){
	        		appurl=appLocalContextPath+'accountMiniStatement.json';
	        	}
	        	
	        	return appurl;
        	},
	      
	        
	      
	    });
	    
    return changeMpinCollections;
});
  
  
      