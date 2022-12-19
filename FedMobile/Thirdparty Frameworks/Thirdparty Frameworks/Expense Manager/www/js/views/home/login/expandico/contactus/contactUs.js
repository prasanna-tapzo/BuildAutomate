define(['jquery', 'underscore', 'Backbone',
        'text!views/home/login/expandico/contactus/contactUs.tpl',
        'models/contactus/contactusModel',
        'collections/contactus/contactusCollections'
      ],
function ($, _, Backbone,contactUsTemplate,contactusModel,contactusCollections) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var contactus = Backbone.View.extend({	 		
		el:'#preloginmobcontent',
		
		initialize:function(){
       	},
	    render:function()
		{

			$("#container").unbind();
			$("#preloginmobcontent").unbind();
			$("#preloginloginfooter").unbind();
			console.log("inside render");
                var that = this;
              

                var onDataHandler = function(collection) {  
                hideSpinner();
	            console.log("Inside contactus render..........");
			    that.$el.html(_.template(contactUsTemplate)).i18n();
			    $("#screentitle").text($.i18n.t('app.contactus.general.title'));
			    return that;
                };
                var onErrorHandler = function(collection) {
                	that.errorresponse(); 
                };
                showSpinner();




var appurl='json/contactus.json';
				//var appurl=appLoginContextPath+'mtc/selectimage';
				$.ajax({       					
						url: appurl,
						//data: $.param({device_id:device_id,platform :platform,osVersion :els.get("device.version"),deviceModel:els.get("device.model"),appVersion :els.get("app.versionCode"),appVersionHashing:appVersionHashing}),
						type: 'POST',
						dataType: 'json',
						success : function(data){
							//alert("serverstatus :"+data.serverstatus);
							var finalArray=[];
							console.log(data);
							var responseData=data.contactDetails;
							console.log("responseDataresponseData",responseData);
							//els.set("responseDataresponseData",responseData);
							//els.set("allowAppAccessFlag","true");
							if(data.ackStatus == "00000" ){
								//els.set("internetAccessFlag","true");
								//console.log("success");
								//checkConnection();
								hideSpinner();
								console.log('-------');

								if(responseData)
						    	{
						    		//contactDetails=this.get("contactDetails");
						    		els.set("contactDetails",responseData);
						    	}else{
						    		contactDetails='';
						    		els.set("contactDetails",contactDetails);
						    	}
								console.log("Inside contactus render..........");

								that.$el.html(_.template(contactUsTemplate)).i18n();
								$("#screentitle").text($.i18n.t('app.contactus.general.title'));
								return that;
							}
							else{
							//els.set("internetAccessFlag","false");
							//console.log("fafailure");
							//checkConnection();
							} 
						}
								
				});



/*                that.collection= new contactusCollections();
                var dataObject={};
				        that.collection.fetch({
				            data: $.param(dataObject),
				            dataType: "json",
				            type: 'POST',
				            cache: false,
				            success : function(data)
				            {

				                if(ackStatus == "00000")
				                {
				                    onDataHandler(data);
				                }else{
				                    onErrorHandler(data);
				                }
				            },
				            error:function(err){
				            	onErrorHandler(err);	
				            }
				        });    */

        },
        errorresponse: function(){
            hideSpinner();
            Backbone.history.navigate("#/preloginexception");
         }
        
      
	});
	
	return contactus;
	
});