define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var preloginValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			
  				loanamt: {
     				required: true,
    				msg: "validation.wealth.general.loanamtnotnull"
    			},
    			tenureyear: {
     				required: true,
    				msg: "validation.wealth.general.tenureyearisnotnull"
    			},
    			tenuremonth: {
     				required: true,
    				msg: "validation.wealth.general.tenuremonthisnotnull"
    			},
    			intrate: {
     				required: true,
    				msg: "validation.wealth.general.intratenullerr"
    			}
    			
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return preloginValidationModel;
});