define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var depositsValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
                recfrmacct: {
                    required: true,
                    msg: "validation.wealth.general.sourceAccNum"
                },
  				/*depamt: {
	     			required: true,
	    			msg: "validation.wealth.general.depamtisnotnull"
    			},*/
                frequency:{
                    required: true,
                    msg: "validation.wealth.general.interestrateisnotnull"
                },
                tenureyear: {
                    required: true,
                    msg: "validation.wealth.general.tenureyearisnotnull"
                },
                tenuremonth: {
                    required: true,
                    msg: "validation.wealth.general.tenuremonthisnotnull"
                },
    			interestrate: {
	     			required: true,
	    			msg: "validation.wealth.general.interestrateisnotnull"
    			},
                maturityamt: {
                    required: true,
                    msg: "validation.wealth.general.maturityAmt"
                },
                maturityaccno:{
                    required: true,
                    msg: "validation.wealth.general.maturityAccount"
                },
                dateforinstalment:{
                    required: true,
                    msg: "validation.wealth.general.dateforinstalment"
                },
    			nomineeurn: [{
	     			required: true,
	    			msg: "validation.wealth.general.nomurnisnotnull"
    			},{
                   minLength : 16,
                   msg: "validation.wealth.general.nomineeURN" 
                }],
    			nomineename: {
	     			required: true,
	    			msg: "validation.wealth.general.nomineenameisnotnull"
    			},
    			nomDOB: {
	     			required: true,
	    			msg: "validation.wealth.general.nomDOBisnotnull"
    			},
    			nomcontactno: {
	     			required: true,
	    			msg: "validation.wealth.general.nomcontactnoisnotnull"
    			},
    			nomaddr1: {
	     			required: true,
	    			msg: "validation.wealth.general.nomaddr1tisnotnull"
    			},
    			nomaddr2: {
	     			required: true,
	    			msg: "validation.wealth.general.nomaddr2isnotnull"
    			},
    			/*nomaddr3: {
	     			required: true,
	    			msg: "validation.wealth.general.nomaddr3isnotnull"
    			},
    			landmark: {
	     			required: true,
	    			msg: "validation.wealth.general.landmarkisnotnull"
    			},
    			tenuremonth: {
	     			required: true,
	    			msg: "validation.wealth.general.tenuremonthisnotnull"
    			},*/
                acctnum:{
                    required: true,
                    msg: "validation.wealth.general.sourceAccNum"
                },
    			
    			depositamt: {
	     			required: true,
	    			msg: "validation.wealth.general.depositamtisnotnull"
    			},
    			interest: {
	     			required: true,
	    			msg: "validation.wealth.general.interestrateisnotnull"
    			},
    		
    			toDate: {
	      			required: true,
	     			msg: "validation.wealth.general.todateisnotnull"
    			},
                nomcountry:{
                    required: true,
                    msg: "validation.wealth.general.countryNull"
                },
                nompincode:[{
                    required: true,
                    msg: "validation.wealth.general.pincode" 
                },
                {
                    length: 6,
                    msg: "validation.wealth.general.pincodeLength"
                }],
                nomcity:{
                    required: true,
                    msg: "validation.wealth.general.city"
                },
                nomstate:{
                    required: true,
                    msg: "validation.wealth.general.state"
                },
                deptype:{
                    required: true,
                    msg: "validation.wealth.general.fixedDepositType"
                },
                maturityoption:{
                    required: true,
                    msg: "validation.wealth.general.maturityOpt"
                },
                payoutaccno:{
                    required: true,
                    msg: "validation.wealth.general.accPayout"
                },
                relationship:{
                    required: true,
                    msg: "validation.wealth.general.relationship"
                },
                intpayout:{
                    required: true,
                    msg: "validation.wealth.general.intpayout"
                }
    		},    
  			initialize: function(props){
				this.url = props.url;
							}
		});
    return depositsValidationModel;
});