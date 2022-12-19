define(['jquery',
        'underscore',
        'Backbone',
        'jqmapservice',
        'collections/locator/locatorResultCollections',
        'text!views/home/login/expandico/locateus/locateUs.tpl',
        'text!views/home/login/expandico/locateus/locateUsAdress.tpl'
        ],
    function ($,
    		_, 
    		Backbone,
    		jqmapservice,
    		locatorResultCollections,
    		locateUsTemplate,
    		locateUsAdressTemplate
    		) {
		var els = new EncryptedLocalStorage('secret');
		els.set("selectedindex","0");
		var globalthat="";
        var locateUs = Backbone.View.extend({
        	el:'#preloginmobcontent',
        	e2:'#address',
        	events:{
        	  //'click #ccdata':'GetCreditcard',
        	},
			
			
        	render :function(){
        		console.log(this);
        		globalthat=this;
        		globalthat.showRegTemplate();
        		//return false;
        		/*console.log("Inside locateUs render..........");
        		var that = this;	
                var onDataHandler = function(collection) {that.showRegTemplate();}
	        	var onErrorHandler = function(collection) {that.errorresponse();}
	        	var appurl='json/ATM_Branch_location_response.json';
	        	showSpinner();
	        	$.ajax({       					
					url: appurl,
         			dataType: "json",
         			type: 'POST',
         			success : function(data){
         				console.log(data);
         				var responseData=data.atmBranchDetailDTO;
         				els.set("responseData",responseData);
						console.log("responseDataaaaaaaaaa",responseData);
         				if(data.ackStatus == "00000"){
         					if(responseData)
					    	{
         						onDataHandler(data);
					    	}else{
					    		onErrorHandler(data);
					    	}
         				}else{
    						console.log("else");
    					} 
         			},
	        		       error:onErrorHandler
	        	});
	        	var dataerror= function(error){alert(error)}*/
				
				
        	},
        	gotoaddress:function () {
        		console.log("gotoaddress");
        		hideSpinner();
        		this.$('#address').html(_.template(locateUsAdressTemplate, {})).i18n();
        		$("#address").show();
        		return this;
        	},
        	showRegTemplate:function () {
        		hideSpinner();
        		$("#screentitle").text($.i18n.t('app.settings.favfunctions.locateus'));
				this.$el.html(_.template(locateUsTemplate, {})).i18n();
                if(navigator.geolocation){
                	showSpinner();
                	console.log("inside geolocation");
                	navigator.geolocation.getCurrentPosition(showdirection, onError,{enableHighAccuracy: true,timeout :10000 ,maximumAge:10000 });
                	console.log("inside geolocation1");
                	
		        }
		        else{
		        	alert("Please Enable your GPS and try again");
		        	}
					
		       	function onError(error) {
					console.log("errrorr");
		       	    var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
	                if(!iOS){ // check only for android
	                	Backbone.history.navigate("#/login");
						
	                }
		       		//alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
		       		onGeoLocationError(error);
                 }
		       	
		       	
                function showdirection(position){
                	console.log("inside showdirection");
                	hideSpinner();
				    var coords = position.coords;
					//alert("coords"+coords);
               var BranchList= els.get("BranchAtmListview");//els.get("responseData");
               //var mapdata = new google.maps.LatLng(24.697260,46.702260);
			   // var latitude= '24.669170',longitude= '46.70533';
			   
			   /*==========lat & lan bind baesd on SIT & UAT=========*/
		       // var latitude,longitude;
		      /* var appContextPath = els.get('app.context.path');
		       if(appContextPath.indexOf('dev')!= -1){
		    	   latitude= '24.669170';
		    	   longitude= '46.70533';
		       }else{
		    	   latitude = position.coords.latitude;
		    	  alert("latitude*******",latitude);
		    	   longitude = position.coords.longitude;
		    	   alert("longitude",longitude);
		       }*/
		       /*==========lat & lan bind baesd on SIT & UAT=========*/
		       
			     //Get Latitude From Geolocation API
			     var latitude = position.coords.latitude;
			     els.set("latitude",latitude);
			     //alert("latitude*******"+latitude);
			     //Get Longitude From Geolocation API
			     var longitude = position.coords.longitude;
			     els.set("longitude",longitude);
			     //alert("longitude"+longitude);
			     
			     showSpinner();
	        		console.log("Inside locateUs render..........");
	        		hideSpinner();
	                var onDataHandler = function(collection) { globalthat.showReg();}
		        	var onErrorHandler = function(collection) {globalthat.errorresponse();}
		        	globalthat.collection= new locatorResultCollections([],{});
					var deviceId=getDeviceId();
		        	timestamp = new Date().getTime();
		        	showSpinner();
		        	globalthat.collection.fetch({
		        		data: $.param({device_id:deviceId,usrLat:latitude,usrLon:longitude}),
	         			dataType: "json",
	         			type: 'POST',
	         			cache: false,
	         			timeout:parseInt(els.get('calltimeout')),
	         			success : function(data){
	         				if(ackStatus == "00000"){
	         					onDataHandler(data);
	         				}else{
	         					onErrorHandler(data);
	         				}
	         			},
		        		error:onErrorHandler
		        	});
		        	var dataerror= function(error){alert(error)}
                   }//end of show direction


            },
            
            showReg: function(){
            	   var BranchList= els.get("BranchAtmListview");//els.get("responseData");
            	   var latitude= els.get("latitude");
            	   var longitude= els.get("longitude");
		            showSpinner();
				    //var mapdata = new google.maps.LatLng(12.96212139,77.59583229);
		            var mapdata = new google.maps.LatLng(latitude, longitude);
					cachedData=BranchList;
					$("#address").show();
		            $("#map_canvas").empty();
					var image="images/brand/pin_green.png";
		            	$('#map_canvas').gmap({
								'center': mapdata,
								'zoom':13,
								'callback': function (map) {
									console.log("inside map");
									var self=this;
									self.refresh();
		                            self.clear('markers');
		                            //$("#address").empty();
		                            $(cachedData).each(function (index, entry) {
		                            	console.log("addmarker");
										self.addMarker({'position': new google.maps.LatLng(entry.latitude,entry.longitude),'bounds':true,'icon':image})
										.click( function (map, marker) {
											    console.log("selectedindex",index);
												els.set("selectedindex",index.toString());
												console.log("selectedindex",index);
												console.log(els.get("selectedindex"));
											    
												/*console.log(marker);
												console.log(map);
												console.log(map.latLng);
												var latit=map.latLng.split(',');
												console.log(latit);
												els.set("latLng",map.latLng);*/
												self.openInfoWindow({'content': entry.branchATMName},this);
												var header=new locateUs();
												header.undelegateEvents();
												header.gotoaddress();
										});
									});
		                            var header=new locateUs();
									header.undelegateEvents();
									//header.gotoaddress();
		                            hideSpinner();
								}
							});
        },
            errorresponse: function(){
            	hideSpinner();
            	Backbone.history.navigate("#/preloginexception");
            	
            },
            disposeView: function(view){
   				Backbone.View.prototype.close = function () {
   					this.unbind();
      				this.undelegateEvents();
   				};

	   			// --Destroy current view */
	   			if(this.currentView !== undefined) {
	   				this.currentView.close();
	   			}

	   			// --Create new view */
	   			this.currentView = view;
	   			this.currentView.delegateEvents();
	   			return this.currentView;
			} 
        });
        return locateUs;
    });
    
  