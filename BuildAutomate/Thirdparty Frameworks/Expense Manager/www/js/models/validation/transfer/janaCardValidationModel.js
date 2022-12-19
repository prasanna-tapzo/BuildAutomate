define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var janaCardValidationModel = Backbone.Model.extend({
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
    return janaCardValidationModel;
});