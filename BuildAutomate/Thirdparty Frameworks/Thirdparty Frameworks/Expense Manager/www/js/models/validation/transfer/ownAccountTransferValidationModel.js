define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var ownAccountTransferValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				txnamt: {
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
    return ownAccountTransferValidationModel;
});