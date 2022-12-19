define(['underscore', 'Backbone'], function(_, Backbone) {
  var els = new EncryptedLocalStorage('secret');
	var locatorResultModel = Backbone.Model.extend({
		errordet:[],
		proximityListDTO:[],
		offersListDTO:[],
		atmBranchDetailDTO:[],
		initialize:function(){
			
			console.log( 'Before bind events how is our model locatorResultModel?', this.toJSON() );
			
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			
			if(this.get("locatorsearchList"))
			{
				locatorsearchList=this.get("locatorsearchList");
				els.set("locatorsearchList",locatorsearchList);
			}
		    
		    if (this.get("proximityListDTO")) {
		    	proximityListDTO=this.get("proximityListDTO");
		    	//console.log("proximityListDTO"+proximityListDTO);
		    	els.set("BranchAtmListview",proximityListDTO);
                els.set("BranchAtmList",proximityListDTO.branchatm_name);
                els.set("BranchAtmListno",proximityListDTO.branchatm_no);
                els.set("BranchLatitude",proximityListDTO.latitude);
                els.set("BranchLongitude",proximityListDTO.longitude);
		    }
		    else{
		    	proximityListDTO="";
		    	els.set("BranchAtmListview","");
                els.set("BranchAtmList","");
                els.set("BranchAtmListno","");
                els.set("BranchLatitude","");
                els.set("BranchLongitude",'');
		    }
		    
			if (this.get("atmBranchDetailDTO")) {
		    	atmBranchDetailDTO=this.get("atmBranchDetailDTO");
		    	//console.log("proximityListDTO"+proximityListDTO);
		    	els.set("BranchAtmListview",atmBranchDetailDTO);
                els.set("BranchAtmList",atmBranchDetailDTO.branchatm_name);
                els.set("BranchAtmListno",atmBranchDetailDTO.branchatm_no);
                els.set("BranchLatitude",atmBranchDetailDTO.latitude);
                els.set("BranchLongitude",atmBranchDetailDTO.longitude);
		    }
		    else{
		    	atmBranchDetailDTO="";
		    	els.set("BranchAtmListview","");
                els.set("BranchAtmList","");
                els.set("BranchAtmListno","");
                els.set("BranchLatitude","");
                els.set("BranchLongitude","");
		    }
			
		    offersListDTO = "";
		    if (this.get("offersListDTO")) {
		    	offersListDTO=this.get("offersListDTO");
                els.set("offersListDTO",offersListDTO);
                console.log("resultssearchList------"+offersListDTO.length);
                els.set("BranchLocation_latitude",offersListDTO.location_latitude);
                els.set("BranchLocation_longitude",offersListDTO.location_longitude);
		    }
		    if (this.get("offersLogoListDTO")) {
		    	var logoList=this.get("offersLogoListDTO");
		    	var mapList={};
		    	$.each(logoList,function(index){
		    		mapList[logoList[index].logoMerchant_ID]=logoList[index].merchant_logo;
		    	});
		    	els.set("offersLogoListDTO",mapList);
		    }
		    if (this.get("error")) {
				 errordet=this.get("error");
				els.set("errordesc",errordet.errorDescription);
				els.set("errorcode",errordet.errorCode);
			 }
		    else{
				els.set("errordesc",'');
				els.set("errorcode",'');
			}
		  }
	
	    
		});
    return locatorResultModel;   
});