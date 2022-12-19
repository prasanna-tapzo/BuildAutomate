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
				chequeno: {
	     			required: true,
	    			msg: "validation.services.chequenonotnull"
				},
				chequestartno: {
	     			required: true,
	    			msg: "validation.services.chequestartnonotnull"
				},
				chequeendno: {
	     			required: true,
	    			msg: "validation.services.chequeendnonotnull"
				},
				/*oldemail: {
					pattern:'email',
	     			required: true,
	    			msg: "validation.services.oldemailnotnull"
				},*/
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
				},
				loanType: {
	     			required: true,
	    			msg: "validation.wealth.general.selectloantype"
				},
				loanamt: {
	     			required: true,
	    			msg: "validation.wealth.general.loanamtnotnull"
				},
				intrate: {
	     			required: true,
	    			msg: "validation.wealth.general.intratenullerr"
				},
				tenuremonth: {
	     			required: true,
	    			msg: "validation.wealth.general.tenuremonthisnotnull"
    			},
    			tenuredate: {
	     			required: true,
	    			msg: "validation.wealth.general.tenuredateisnotnull"
    			},
    			tenureyear: {
	     			required: true,
	    			msg: "validation.wealth.general.tenureyearisnotnull"
    			},
    			reason: {
	     			required: true,
	    			msg: "validation.services.reasonnotnull"
    			}
				
	    		},    
	  			initialize: function(props){	
	  				this.url = props.url;			
				}
		});
    return servicesValidationModel;
});