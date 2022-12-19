define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var otherBankValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				amount: {
      				required: true,
     				 msg: "validation.transfer.amountisnotnull"
    				},
          remarks: {
              required: true,
             msg: "validation.transfer.remarksisnotnull"
          }  

    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return otherBankValidationModel;
});