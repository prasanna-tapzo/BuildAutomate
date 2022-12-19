define(['jquery', 'underscore', 'Backbone',
        'text!views/errors/error401.tpl',
        'text!views/errors/error401Footer.tpl'],
       // 'collections/wealth/wealthCollections'], 
function ($, _, Backbone,exceptionTemplate,exceptionFooterTemplate) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var exception = Backbone.View.extend({	 		
		el:'#mobcontent',
		
	    render:function()
		{
        	console.log("Inside exception render..........");
        	var errordesc = els.get("errordesc");
        	if(errordesc=="SUCCESS"){
    			els.set("errordesc","");
        	}
        	 errordesc = els.get("errordesc");
		    this.$el.html(_.template(exceptionTemplate)).i18n();
		    $("#screentitle").text("");
		    var footer = new exceptionFooter();
		    footer.render();
		    return this;
        }
        
	});
	
	//Footer Content
	var exceptionFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			"click #logoutapp":"BacktoLogin"
        },
      
        render:function()
		{
        	console.log("Inside exceptionFooter render..........");
        	this.$el.html(_.template(exceptionFooterTemplate)).i18n();
            var errBack=els.get("errback");
            console.log("renderrr  exception == ",errBack);
        	return this;
        },
        
        BacktoLogin:function(event){
        	var errBack=els.get("errback");
            console.log("BacktoLogin == ",errBack);
        		if(errBack=="services"){
	        		Backbone.history.navigate("#/services");
	        		hideSpinner();
        		}else if(errBack=="transfer"){
	    			Backbone.history.navigate("#/transfer");
	    			hideSpinner();
        		}else if(errBack=="wealth"){
        			Backbone.history.navigate("#/wealth");
        			hideSpinner();	
        		}else if(errBack=="settings"){
        			Backbone.history.navigate("#/settings");
        			hideSpinner();	
        		}else if(errBack=="stopchequerequest"){
                    Backbone.history.navigate("#/stopchequerequest");
                    hideSpinner();  
                }else if(errBack=="contactus"){
            			Backbone.history.navigate("#/contactus");
            			hideSpinner();	
        		}else if(errBack=="aboutus"){
        			Backbone.history.navigate("#/aboutus");
        			hideSpinner();	
        		}else if(errBack=="transfersi"){
        			Backbone.history.navigate("#/standingInstruction");
        			hideSpinner();		
        		}else if(errBack=="depositoffers"){
	                    Backbone.history.navigate("#/depositoffers");
	                    hideSpinner();  
	                }else{        	
        			Backbone.history.navigate("#/");
        			hideSpinner();
        		}
        }
       
       
	});
	return exception;
	
});