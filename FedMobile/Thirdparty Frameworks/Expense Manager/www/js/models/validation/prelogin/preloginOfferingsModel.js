define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var preloginOfferingsModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				customerName: {
      				required: true,
     				msg: "validation.newofferssavings.name"
    				},
			mobileNumber: {
            		pattern: 'number',
      			required: true,
     				msg: "validation.newofferssavings.mobile"
			}
    				// },
        //  email:{
        //    required: false,
        //    pattern:'email'
        //   }    
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return preloginOfferingsModel;
});