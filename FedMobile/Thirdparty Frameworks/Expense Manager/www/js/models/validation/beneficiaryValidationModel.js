define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var benValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			
    			benefeciaryName: {
     				required: true,
    				msg: "validation.transfer.benefeciaryname"
    			},
    			nickName: {
     				required: true,
    				msg: "validation.transfer.nickname"
    			},
    			accountNumber: {
     				required: true,
    				msg: "validation.transfer.accountnumber"
    			},
    			confirmAccountNumber: {
     				required: true,
    				msg: "validation.transfer.confirmaccountnumber"
    			}
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return benValidationModel;
});