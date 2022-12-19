define(['jquery', 'underscore', 'Backbone',
        'text!views/common/tandc.tpl',
        'models/tandc/tandcModel',
        'collections/tandc/tandcCollections'
      ],
function ($, _, Backbone,tandcTemplate,tandcModel,tandcCollections) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var tandc = Backbone.View.extend({	 		
		el:'#preloginmobcontent',
		
		initialize:function(){
       	},
	    render:function()
		{

                var that = this;
                var onDataHandler = function(collection) {  
                hideSpinner();
	            console.log("Inside tandc render..........");
			    that.$el.html(_.template(tandcTemplate)).i18n();
			    $("#screentitle").text($.i18n.t('app.login.layout.t&c'));
			    return that;
                };
                var onErrorHandler = function(collection) {
                	that.errorresponse(); 
                };
                showSpinner();
                  var appurl='json/tandc.json';
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
							var responseData=data.tandcContent;
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
						    		//tandcContent=this.get("tandcContent");
						    		els.set("tandcContent",responseData);
						    	}else{
						    		tandcContent='';
						    		els.set("tandcContent",tandcContent);
						    	}
								console.log("Inside contactus render..........");

								that.$el.html(_.template(tandcTemplate)).i18n();
								 $("#screentitle").text($.i18n.t('app.tandc.general.title'));
								return that;
							}
							else{
							//els.set("internetAccessFlag","false");
							//console.log("fafailure");
							//checkConnection();
							} 
						}
								
				});
                /*that.collection= new tandcCollections();
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
				        });  */  

        },
        errorresponse: function(){
            hideSpinner();
            Backbone.history.navigate("#/preloginexception");
         }
        
      
	});
	
	return tandc;
	
});