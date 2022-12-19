define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var profileUpdationValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				phonenumber: {
	     			required: true,
	    			msg: "validation.profileupdate.phonenumber"
    			},
    			telephonenumber: {
	      			required: true,
	     			msg: "validation.profileupdate.telephonenumber"
    			},
    			email: {
    				pattern:'email',
	      			required: true,
	     			msg: "validation.profileupdate.email"
    			},   
    			poboxnumber:{    				
	      			required: true,
	     			msg: "validation.profileupdate.poboxnumber"
    			},   
    			postalnumber:{        			
    	      		required: true,
    	     		msg: "validation.profileupdate.postalnumber"
        		},   
    					
    			town:{        			
    	      		required: true,
    	     		msg: "validation.profileupdate.town"
        		}   
    		},    
  			initialize: function(props){  				
				this.url = props.url;
			}
		});
    return profileUpdationValidationModel;
});