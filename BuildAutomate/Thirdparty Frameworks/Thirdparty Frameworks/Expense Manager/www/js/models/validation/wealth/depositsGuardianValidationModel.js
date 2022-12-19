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
    			interestrate: {
	     			required: true,
	    			msg: "validation.wealth.general.interestrateisnotnull"
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
                acctnum:{
                    required: true,
                    msg: "validation.wealth.general.sourceAccNum"
                },
                maturityoption:{
                    required: true,
                    msg: "validation.wealth.general.maturityOpt"
                },
                intpayout:{
                    required: true,
                    msg: "validation.wealth.general.intpayout"
                },
                payoutaccno:{
                    required: true,
                    msg: "validation.wealth.general.accPayout"
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
	     			msg: "validation.wealth.general.general.todateisnotnull"
    			}
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
							}
		});
    return depositsValidationModel;
});