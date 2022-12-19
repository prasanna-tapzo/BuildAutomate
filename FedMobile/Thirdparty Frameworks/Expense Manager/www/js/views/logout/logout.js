define(['jquery','underscore', 'Backbone',
        'collections/logout/logoutCollections',
        'text!views/home/login/login.tpl',
        'text!views/home/login/loginFooter.tpl'
		//'collections/home/prelogin/preLoginCollections'
    ],
    function ($,_, Backbone,
    		logoutCollections,
    		loginTemplate,
    		loginFooterTemplate
			//preLoginCollections
    ) {
       var els = new EncryptedLocalStorage('secret'); 
	 
	var logout = Backbone.View.extend({
	 		
			el:'#preloginmobcontent',
			events:{				
				
            },
            render:function()
			{
            
            	console.log("Inside Logout render..........");
            	//this.preLogin();
            	var that = this;
      			var onDataHandler = function(collection) { that.preLogin(); }
  				var onErrorHandler = function(collection) {that.errorresponse(); }
  				showSpinner();
  				var deviceId=getDeviceId();	    
  				that.collection= new logoutCollections();
	  			that.collection.fetch({
	     			//data: $.param({device_id:deviceId}),
	     			dataType: "json",
	     			type: 'POST',
	     			cache: false,
	     			success : function(data)
	     			{
	     				if(ackStatus == "00000"){
	     					console.log("inside ackStatus");
	     					onDataHandler(data);
	     				}else{
	     					onErrorHandler(data);
	     				}
	     			},
	     			error:onErrorHandler
	  			});
    		 },
			
            preLogin:function(){
              console.log('prelogin');
              this.$el.html(_.template(loginTemplate)).i18n();
              console.log("App logouttt===========....................1");
            
              Backbone.history.navigate("#/");
              try{
      			navigator.app.exitApp();
      		  } catch(ee){ }
    		    
            },
            errorresponse: function(){
            	hideSpinner();
            	//Backbone.history.navigate("#/preloginexception");
				//Backbone.history.navigate("#/exception");
				Backbone.history.navigate("#/");
            },
			disposeView: function(view){
   				Backbone.View.prototype.close = function () {
   					this.unbind();
      				this.undelegateEvents();
   				};

	   			// -- Destroy current view
	   			if(this.currentView !== undefined) {
	   				this.currentView.close();
	   			}

	   			// -- Create new view
	   			this.currentView = view;
	   			this.currentView.delegateEvents();
	   			return this.currentView;
			}
           
        });
           
       
        return logout;
    });