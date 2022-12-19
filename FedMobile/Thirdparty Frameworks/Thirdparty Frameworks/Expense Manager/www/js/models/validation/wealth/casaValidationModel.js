define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var casaValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				fromDate: {
	     			required: true,
	    			msg: "validation.wealth.general.fromdateisnotnull"
    			},
    			toDate: {
	      			required: true,
	     			msg: "validation.wealth.general.todateisnotnull"
    			}
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
							}
		});
    return casaValidationModel;
});