define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var DTHValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				amount: {
	     			required: true,
	    			msg: "validation.mpingeneration.mpinnotnull"
    			}
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
							}
		});
    return DTHValidationModel;
});