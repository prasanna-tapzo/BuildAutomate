define(['jquery', 'underscore', 'Backbone',
        'text!views/prelogin/errors/Internetexception.tpl',
        'text!views/prelogin/errors/InternetexceptionFooter.tpl'],
    function ($, _, Backbone,
    		InternetexceptionTemplate,
    		InternetexceptionFooterTemplate) {
       var els = new EncryptedLocalStorage('secret');
		var Internetexception = Backbone.View.extend({
			el:'#preloginmobcontent',
			events:{
            },
            render:function () {
            	var errordesc = els.get("errordesc");
            	console.log("EXCEPTION");
            	this.$el.html(_.template(InternetexceptionTemplate)).i18n();
            	 $("#screentitle").text("");
     		    var footer = new InternetexceptionFooter();
     		    footer.render();
                return this;
            }
        });
		//Footer Content
		var InternetexceptionFooter = Backbone.View.extend({
	 		el:'#preloginfooter',
			events:{
				"click #logoutapp":"BacktoLogin"
	        },
	      
	        render:function()
			{
	        	console.log("Inside exceptionFooter render..........");
	        	this.$el.html(_.template(InternetexceptionFooterTemplate)).i18n();
	        	return this;
	        },
	        
	        BacktoLogin:function(){
				showSpinner();
	        	console.log("Internet Exception");
	        			//Backbone.history.navigate("//");
	        			window.location.href="";
	        			
	        }
	       
	       
		});
		
        return Internetexception;
    });
     