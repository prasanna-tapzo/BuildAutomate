define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var billPayValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			
  				billershortname: {
     				required: true,
    				msg: "validation.billpay.billershortnamenotnull"
    			},
    			billername: {
     				required: true,
    				msg: "validation.billpay.billernamenotnull"
    			},
    			billerrefno: {
     				required: true,
    				msg: "validation.billpay.billerrefnonotnull"
    			},
    			refnum: {
     				required: true,
    				msg: "validation.billpay.refnumnotnull"
    			},
    			telno: {
     				required: true,
    				msg: "validation.billpay.telnonotnull"
    			},
    			acno: {
     				required: true,
    				msg: "validation.billpay.acnonotnull"
    			},
    			remarks: {
     				required: true,
    				msg: "validation.billpay.remarksnotnull"
    			},
          Remarks:{
            required: true,
            msg: "validation.billpay.remarksnotnull"
          },
    			rechargeamt: {
     				required: true,
    				msg: "validation.billpay.rechargeamtnotnull"
    			},
    			billamount:{
    				required: true,
    				msg: "validation.billpay.billamtisnotnull"
    			},
    			amt: {
     				required: true,
    				msg: "validation.billpay.amtisnotnull"
    			},
    			mobno: {
     				required: true,
    				msg: "validation.billpay.mobnoisnotnull"
    			},
    			/*amount: {
     				required: true,
    				msg: "validation.billpay.autopaylimitnotnull"
    			}*/
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return billPayValidationModel;
});