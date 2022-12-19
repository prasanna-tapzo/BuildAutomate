define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var closeDepositValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				transamt: {
	     			required: true,
	    			msg: "validation.wealth.general.transferAmount"
    			},
    			accnoforpayout: {
	      			required: true,
	     			msg: "validation.wealth.general.payoutAccNo"
    			}
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
							}
		});
    return closeDepositValidationModel;
});