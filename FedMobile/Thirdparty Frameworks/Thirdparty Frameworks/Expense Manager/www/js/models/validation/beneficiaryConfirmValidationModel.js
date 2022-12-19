define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var beneficiaryConfirmValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			otpValue: [{
      				required: true,
     				msg: "validation.transfer.paynowotpisnotnull"
    				},{
      				pattern: 'digits',
      				msg: "validation.transfer.validotp"
    				},{
      				length: 4,
      				msg: "validation.transfer.validotp"
    				}
    			]
    			
    		},    
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return beneficiaryConfirmValidationModel;
});