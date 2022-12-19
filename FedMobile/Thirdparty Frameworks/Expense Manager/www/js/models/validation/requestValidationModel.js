define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var requestValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				mm: {
     				required: true,
    				msg: "validation.request.monthisnotnull"
    			},
    			yy: {
     				required: true,
    				msg: "validation.request.yearisnotnull"
    			},
  				cardno: {
  					required: true,
  					msg: "validation.request.accnoisnotnull"
  			  	},
    			accno: {
     				required: true,
    				msg: "validation.request.cardisnotnull"
    			},
    			/*fintype: {
     				required: true,
    				msg: "validation.request.fintypeisnotnull"
    			},*/
    			applyfor: {
     				required: true,
    				msg: "validation.request.applyforisnotnull"
    			},
    			city: {
     				required: true,
    				msg: "validation.request.cityisnotnull"
    			},
    			branch: {
     				required: true,
    				msg: "validation.request.branchisnotnull"
    			},
    			financetype: {
     				required: true,
    				msg: "validation.request.financetypeisnotnull"
    			},
    			chequeleaves:[{
     				required: true,
    				msg: "validation.request.chequeleavesisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validchequeleaves"
    				}
    			],
    			
        		/*mmyy:[{
         				required: true,
        				msg: "validation.request.mmyyisnotnull"
        			},{
          				pattern: 'digits',
          				msg: "validation.request.validmmyy"
        				}
        		],*/
    			employername: {
     				required: true,
    				msg: "validation.request.employernameisnotnull"
    			},
    			length:[ {
     				required: true,
    				msg: "validation.request.lengthisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validlength"
    				}
    			],
    			sal:[ {
     				required: true,
    				msg: "validation.request.salisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validsal"
    				}
    			],
    			amt:[ {
     				required: true,
    				msg: "validation.request.mmyyisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validamt"
    				}
    			],
    			
    			zipcode: {
     				required: true,
    				msg: "validation.request.zipcodeisnotnull"
    			},
    			branch: {
     				required: true,
    				msg: "validation.request.branchisnotnull"
    			},
    			chequeleaves: [{
      				required: true,
     				msg: "validation.request.chequeleavesisnotnull"
    				},{
      				pattern: 'digits',
      				msg: "validation.request.validchequeleaves"
    			}],
    			cardtype: {
     				required: true,
    				msg: "validation.request.cardtypeisnotnull"
    			},
    			cardname: {
     				required: true,
    				msg: "validation.request.cardnameisnotnull"
    			},
    			product: {
     				required: true,
    				msg: "validation.request.productisnotnull"
    			},
    			employername: {
     				required: true,
    				msg: "validation.request.employernameisnotnull"
    			},
    			mothersname: {
     				required: true,
    				msg: "validation.request.mothersnameisnotnull"
    			},
    			embossname: {
     				required: true,
    				msg: "validation.request.embossnameisnotnull"
    			},
    			maritalstatus: {
     				required: true,
    				msg: "validation.request.maritalstatusisnotnull"
    			},
    			noofdep: [{
     				required: true,
    				msg: "validation.request.noofdepisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validdep"
    				}
    			],
    			relmobno: {
     				required: true,
    				msg: "validation.request.relisnotnull"
    			},
    			
    			addr1: {
     				required: true,
    				msg: "validation.request.addr1isnotnull"
    			},

    			addr2: {
     				required: true,
    				msg: "validation.request.addr2isnotnull"
    			},
    			
    			buildno:[ {
     				required: true,
    				msg: "validation.request.buildnoisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validbuildno"
    				}
    			],
    			mailaddr: {
     				required: true,
    				msg: "validation.request.mailaddrisnotnull"
    			},
    			addrcity: {
     				required: true,
    				msg: "validation.request.addrcityisnotnull"
    			},
    			empphno: [{
     				required: true,
    				msg: "validation.request.empphnoisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validempph"
    				}
    			],

    			income: [{
     				required: true,
    				msg: "validation.request.incomeisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validincome"
    				}
    			],
    			payoption: {
     				required: true,
    				msg: "validation.request.payoptionisnotnull"
    			},
    			payopt: {
     				required: true,
    				msg: "validation.request.payoptisnotnull"
    			},
    			amt: [{
     				required: true,
    				msg: "validation.request.amtisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validamt"
    				}
    			],
    			frmacno: {
     				required: true,
    				msg: "validation.request.frmacnoisnotnull"
    			},
    			selectcity: {
     				required: true,
    				msg: "validation.request.selectcityisnotnull"
    			},
    			empname: {
     				required: true,
    				msg: "validation.request.empnameisnotnull"
    			},

    			los: [{
     				required: true,
    				msg: "validation.request.losisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validlos"
    				}
    			],

    			sal: [{
     				required: true,
    				msg: "validation.request.salisnotnull"
    			},{
      				pattern: 'digits',
      				msg: "validation.request.validsal"
    				}
    			],
    			payeeName: {
     				required: true,
    				msg: "validation.request.payeenameisnotnull"
    			},
    			stopReason: {
     				required: true,
    				msg: "validation.request.stopreasonisnotnull"
    			},
    			noOfLeaves: [{
      				required: true,
     				msg: "validation.request.noofleavesisnotnull"
    				},{
      				pattern: 'digits',
      				msg: "validation.request.validnoofleaves"
    			}]
    		},    
  			initialize: function(props){	
				this.url = props.url;			
			}
		});
    return requestValidationModel;
});