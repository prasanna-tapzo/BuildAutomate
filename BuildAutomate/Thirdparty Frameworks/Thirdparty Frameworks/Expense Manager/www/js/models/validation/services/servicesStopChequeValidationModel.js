define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var servicesValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
				
	  			acctno: {
	     			required: true,
	    			msg: "validation.services.acctnonotnull"
				},
				
				oldpin:{
					required:true,
					msg:"validation.services.oldpinnotnull"
				},
				newpin:{
					required:true,
					msg:"validation.services.newpinnotnull"
				},
				reconfirmpin:{
					required:true,
					msg:"validation.services.reconfirmpinnotnull"
				},
				chequenum: {
	     			required: true,
	    			msg: "validation.services.chequenonotnull"
				},
				/*chequestartno: {
	     			required: true,
	    			msg: "validation.services.chequestartnonotnull"
				},
				chequeendno: {
	     			required: true,
	    			msg: "validation.services.chequeendnonotnull"
				},*/
				oldemail: {
					pattern:'email',
	     			required: true,
	    			msg: "validation.services.oldemailnotnull"
				},
				newemail: {
					pattern:'email',
	     			required: true,
	    			msg: "validation.services.newemailnotnull"
				},
				reenteremail:{
					pattern:'email',
	     			required: true,
	    			msg: "validation.services.reenteremailnotnull"
				},
				mobno: {
	     			required: true,
	    			msg: "validation.services.mobnonotnull"
				},
				currentpin: {
	     			required: true,
	    			msg: "validation.settings.currentpinnotnull"
				},
				newpin: {
	     			required: true,
	    			msg: "validation.settings.newpinnotnull"
				},
				confirmpin: {
	     			required: true,
	    			msg: "validation.settings.confirmpinnotnull"
				}
				
				
	    		},    
	  			initialize: function(props){	
	  				this.url = props.url;			
				}
		});
    return servicesValidationModel;
});