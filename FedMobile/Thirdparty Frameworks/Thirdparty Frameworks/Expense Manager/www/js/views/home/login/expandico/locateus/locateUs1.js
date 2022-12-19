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
        var locateUs = Backbone.View.extend({
        	el:'#preloginmobcontent',
        	e2:'#address',
        	events:{
        	  //'click #ccdata':'GetCreditcard',
        	},
			
			
        	render :function(){
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
				
				showSpinner();
        		console.log("Inside locateUs render..........");
        		var that = this;	
        		hideSpinner();
                var onDataHandler = function(collection) { that.showRegTemplate();}
	        	var onErrorHandler = function(collection) {that.errorresponse();}
	        	that.collection= new locatorResultCollections([],{});
				var deviceId=getDeviceId();
	        	timestamp = new Date().getTime();
	        	showSpinner();
	        	that.collection.fetch({
	        		data: $.param({device_id:deviceId}),
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
                	navigator.geolocation.getCurrentPosition(mapshow, onError,{enableHighAccuracy: true,timeout :10000 ,maximumAge:10000 });
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
		       	function degreesToRadians(degrees) {
                        var radians = (degrees * Math.PI)/180;
                        return radians;
                    }
		       	
               function mapshow(position){
            			hideSpinner();
				       var coords = position.coords;
					    var latitude,longitude;
					   latitude = position.coords.latitude;
				       longitude = position.coords.longitude;
					   var BranchList= els.get("BranchAtmListview");
					   var distance;
					   var finalArray=[];
				      $.each(BranchList, function(index) {									
										var tmp=BranchList[index];
										console.log("BranchListBranchListBranchList",tmp);
										var dislat = tmp.latitude;
										var dislong = tmp.longitude;										
										var startLatRads = degreesToRadians(latitude);
										var startLongRads = degreesToRadians(longitude);
										var destLatRads = degreesToRadians(dislat);
										var destLongRads = degreesToRadians(dislong);
										var Radius = 6371; // radius of the Earth in km
										distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
										Math.cos(startLatRads) * Math.cos(destLatRads) *
										Math.cos(startLongRads - destLongRads)) * Radius;
										els.set("distance",distance);
										//console.log("distance",distance);
										finalArray.push(BranchList[index].latitude,BranchList[index].longitude,Math.floor(distance));
										//console.log("============",finalArray.push(BranchList[index].latitude,BranchList[index].longitude));
										
								});
								var locationslist=finalArray;
									console.log("locationslist",locationslist);
				     
				     //Get Latitude From Geolocation API
				       
				       var branchno = els.get("distkm");
				       
				       var proximityListDTO= els.get("BranchAtmListview");
						 
							 	
							 var proximityListArray=[];
								$.each(locationslist, function(index) {
										var tmp=locationslist[index];
										console.log("tmptmptmp",tmp);
										proximityListArray.push(tmp);
										var myloc = new google.maps.LatLng(latitude,longitude);
										//var mydest = new google.maps.LatLng(tmp.Lattitude, tmp.Longitude);
										var mydest = new google.maps.LatLng(tmp.latitude, tmp.longitude);



										var service = new google.maps.DistanceMatrixService();
										service.getDistanceMatrix(
										  {
											origins: [myloc],
											destinations: [mydest],
											travelMode: google.maps.TravelMode.DRIVING,
											unitSystem: google.maps.UnitSystem.METRIC,
											avoidHighways: false,
											avoidTolls: false
										  }, callback);


										function callback(response, status) {
										if (status != google.maps.DistanceMatrixStatus.OK) {
											proximityListArray.pop();
										 // alert('Error was: ' + status);
										} else {
											var caldis = response.rows[0].elements;
											var dis=caldis[0].distance.text;
											var disMeter =caldis[0].distance.value/1000;
											
											//var disMeter =caldis[0].distance.value;
											/*if(dis >= 0){
											dis=caldis[0].distance.text;
											}else{
												dis="";
											}
											*/
											
											
											
											
											} //end of else
										}
								});// end of each
								
									$.each(proximityListArray,function(index){
										
										if(proximityListArray[index] != undefined){
										var dis =proximityListArray[index].distance;
										if(dis == undefined){
											proximityListArray.splice(index,1);
										}
										}
									});
									proximityListArray.sort(function (a, b) {
										 a = a.disMeter;
										    b = b.disMeter;
										    return a-b;
										});
									
									var proximityListArraySort=proximityListArray;
									
									
									$.each(proximityListArraySort, function(index) {
										var tmp=proximityListArraySort[index];
										var accepttype=proximityListArraySort[index].accepttype;
										var dis=proximityListArraySort[index].dis;
										var disMeter =proximityListArraySort[index].distance;
										console.log("disMeterdisMeter",disMeter);
										var selectedRadius=els.get("distkm");
										if( dis == undefined || dis == null)
											dis ='';
										
											if(disMeter >= 0 && disMeter <= selectedRadius) {
												
											}
										
									});
									hideSpinner();
													
								
						 
                     

            	}


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
    
  