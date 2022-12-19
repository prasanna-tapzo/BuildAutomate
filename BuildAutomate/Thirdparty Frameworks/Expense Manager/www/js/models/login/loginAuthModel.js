define([ 'underscore', 'Backbone' ], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret');
	var loginAuthModel = Backbone.Model.extend({
		errordet : [],
		menuList : [],
		initialize : function() {
			if (this.get("access_token")) {
				accesstoken = this.get("access_token");
				els.set('access_token', accesstoken);
			}
			var loginprofile = new Array();
			if (this.get("userLoginProfile")) {
				userLoginProfile = this.get("userLoginProfile");
				loginprofile[0] = userLoginProfile.userProfile.firstName;
				loginprofile[1] = userLoginProfile.userProfile.lastName;
				loginprofile[2] = userLoginProfile.userProfile.middleName;
				loginprofile[3] = userLoginProfile.lastSuccessLogin;
				loginprofile[4] = userLoginProfile.lastFailureLogin;
				loginprofile[5] = userLoginProfile.userProfile.mobileNoMasked;
				loginprofile[6] = userLoginProfile.userProfile.emailid;
				loginprofile[7] = userLoginProfile.userProfile.mobile;
				loginprofile[8] = userLoginProfile.userProfile.birthdate;
				loginprofile[9] = userLoginProfile.id_type;
				loginprofile[10] = userLoginProfile.iqama_number;
				loginprofile[11] = userLoginProfile.isStaff;
				loginprofile[12] = userLoginProfile.segment;
				loginprofile[13] = userLoginProfile.userProfile.loyaltypoints;
				loginprofile[14] = userLoginProfile.userProfile.residence;
				loginprofile[15] = userLoginProfile.userProfile.statuscode;
				loginprofile[16] = userLoginProfile.userProfile.stopmailflag;
				loginprofile[17] = userLoginProfile.userProfile.occupation;
				loginprofile[18] = userLoginProfile.userProfile.nationality;
				loginprofile[19] = userLoginProfile.userProfile.idexpdate;
				loginprofile[20] = userLoginProfile.userProfile.gender;
				loginprofile[21] = userLoginProfile.userProfile.segment;
				
				
				
				console.log("******id_type*********"+loginprofile[9]);
				console.log("******iqama_number*********"+loginprofile[10]);
				els.set("LoginProfile", loginprofile);

				els.set("MaskMobile", loginprofile[5]);
				els.set("birthdate",loginprofile[8]);
				els.set("emailid", loginprofile[6]);
				els.set("usermobile",userLoginProfile.userProfile.mobile);
				
				els.set("loyaltypoints", loginprofile[13]);
				els.set("residence", loginprofile[14]);
				els.set("statuscode", loginprofile[15]);
				els.set("stopmailflag", loginprofile[16]);
				els.set("occupation", loginprofile[17]);
				els.set("nationality", loginprofile[18]);
				els.set("idexpdate", loginprofile[19]);
				els.set("gender", loginprofile[20]);
				els.set("upsegment", loginprofile[21]);
				/* SADAD DueBillpayment And Bill InquiryPayment idtype,iqamanumber Added  */
					
					els.set("id_type",loginprofile[9]);
					els.set("iqama_number",loginprofile[10]);
					els.set("isStaff", loginprofile[11]);
					els.set("segment", loginprofile[12]);
			
				/* END  SADAD DueBillpayment And Bill InquiryPayment idtype,iqamanumber Added  */

				//To Assign the input parameter of Within SHB Transfer Account Summary Call
				var segmentvalue = userLoginProfile.segment;
				els.set("segmentvalue", segmentvalue);

				//To Assign the input parameter(Customer Number) for SI Add Transfer Call
				var custno = userLoginProfile.userProfile.customernumber;
				els.set("custno", custno);

				//To Assign the input parameter(Customer firstName) for Local Transfer Posting Call
				var custname = userLoginProfile.userProfile.firstName;
				els.set("custname", custname);
				
				
				//var isMobileNoUpdated = userLoginProfile.isMobileNumberConfirmed;
				//els.set("isMobileNoUpdated",isMobileNoUpdated);
				
				els.set("actual_mob_no",loginprofile[7]);
//----Dynamic OTP Flag starts-------------------------------//				
				
				/* prelogin - mobile number updation flag */
				els.set("is_mobilenumber_confirmed", userLoginProfile.isMobileNumberConfirmed);
				if( userLoginProfile.dyanamicOTPDTO!=null){
				/* soft token general */
				els.set("soft_token", userLoginProfile.dyanamicOTPDTO.soft_token);
				//els.set("soft_token","Y");
				
				els.set("token_serno", userLoginProfile.dyanamicOTPDTO.token_serno);
				
				/* login */
				els.set("user_login", userLoginProfile.dyanamicOTPDTO.user_login);
				
				/* prelogin - login management  forgot user name & password */
				els.set("login_management", userLoginProfile.dyanamicOTPDTO.login_management);
				//els.set("login_management", "Y");
				
					window.localStorage.setItem("mpin_login_otp",userLoginProfile.mpin_login_otp);
				//window.localStorage.setItem("otpflag",userLoginProfile.dyanamicOTPDTO.otpflag);
				console.log("otpflag"+window.localStorage.getItem("mpin_login_otp"));
				
				/* prelogin - mpin otp login */
				els.set("mpin_login_otp", userLoginProfile.mpin_login_otp);

		
				/* prelogin - forgot mpin */
				els.set("forgot_mpin", userLoginProfile.dyanamicOTPDTO.forgot_mpin);

				/* prelogin - new registration */
				els.set("new_registration", userLoginProfile.dyanamicOTPDTO.new_registration);

				/* moi */
				els.set("moi_payments", userLoginProfile.dyanamicOTPDTO.moi_payments);

				/* sadad */
				els.set("one_time_payment", userLoginProfile.dyanamicOTPDTO.one_time_payment);
				els.set("sadad_manage_profile", userLoginProfile.dyanamicOTPDTO.sadad_manage_profile);
				els.set("bill_inquiry_and_payment", userLoginProfile.dyanamicOTPDTO.bill_inquiry_and_payment);

				/*  transfers */
				els.set("own_accounts", userLoginProfile.dyanamicOTPDTO.own_accounts);
				els.set("within_shb_transfer", userLoginProfile.dyanamicOTPDTO.within_shb_transfer);
				els.set("sarie_payments", userLoginProfile.dyanamicOTPDTO.sarie_payments);
				//els.set("sarie_payments", "Y");
				els.set("external_payments", userLoginProfile.dyanamicOTPDTO.external_payments);
				//els.set("external_payments", "N");
				els.set("charity_payments", userLoginProfile.dyanamicOTPDTO.charity_payments);
				//els.set("charity_payments", "Y");

				/*  credit cards  */
				els.set("card_payment", userLoginProfile.dyanamicOTPDTO.card_payment);
				els.set("activate_new_credit_card", userLoginProfile.dyanamicOTPDTO.activate_new_credit_card);
				els.set("reset_and_create_new_pin_credit_card", userLoginProfile.dyanamicOTPDTO.reset_and_create_new_pin_credit_card);
				els.set("cash_on_demand", userLoginProfile.dyanamicOTPDTO.cash_on_demand);
				els.set("card_increaselimit", userLoginProfile.dyanamicOTPDTO.card_increaselimit);
				els.set("block_credit_card", userLoginProfile.dyanamicOTPDTO.block_credit_card);
				els.set("reissue_credit_card_pin", userLoginProfile.dyanamicOTPDTO.reissue_credit_card_pin);
			
				/* more - update personal info */
				els.set("update_personal_information", userLoginProfile.dyanamicOTPDTO.update_personal_information);

				/* more - block debit card */
				els.set("debit_card_blocking", userLoginProfile.dyanamicOTPDTO.debit_card_blocking);

				/* more - debit card activation */
				els.set("debit_card_activation", userLoginProfile.dyanamicOTPDTO.debit_card_activation);

				/* others */
				els.set("iban_inquiry", userLoginProfile.dyanamicOTPDTO.iban_inquiry);
				els.set("opening_sub_account", userLoginProfile.dyanamicOTPDTO.opening_sub_account);
				els.set("redemption_of_points", userLoginProfile.dyanamicOTPDTO.redemption_of_points);
				els.set("order_basket", userLoginProfile.dyanamicOTPDTO.order_basket);
				els.set("redeem_tadallal_reward_points", userLoginProfile.dyanamicOTPDTO.redeem_tadallal_reward_points);
				els.set("previous_statement", userLoginProfile.dyanamicOTPDTO.previous_statement);
				els.set("forgot_transaction_password", userLoginProfile.dyanamicOTPDTO.forgot_transaction_password);
				els.set("soft_token_renewal", userLoginProfile.dyanamicOTPDTO.soft_token_renewal);
				els.set("ipo_information", userLoginProfile.dyanamicOTPDTO.ipo_information);
				
				/* Tedallal Rewards */
				els.set("lmsreqid", userLoginProfile.dyanamicOTPDTO.lmsreqid);
				
				//=====flag for queue mode ================//
				els.set("queueMode", userLoginProfile.dyanamicOTPDTO.queuemode);
			
				}
				//----Dynamic OTP Flag ends-------------------------------//
				
				//----Dynamic Menu Settings START-------------------------------//	
				
				/*var menuOrder=[];
            	menuOrder.push({"menu_order":3,"mtc_programid":"MTC2090"});//datleine
            	menuOrder.push({"menu_order":1,"mtc_programid":"MTC3000"}); //products
            	menuOrder.push({"menu_order":2,"mtc_programid":"MTC1007"}); //transfer
            	menuOrder.push({"menu_order":4,"mtc_programid":"MTC1008"}); //sadad
            	menuOrder.push({"menu_order":5,"mtc_programid":"MTC2050"}); //moi
            	menuOrder.push({"menu_order":6,"mtc_programid":"MTC1005"}); //credit card
            	menuOrder.push({"menu_order":7,"mtc_programid":"MTC9000"}); //tedallal 
            	menuOrder.push({"menu_order":8,"mtc_programid":"MTC3020"}); //more
            	menuOrder.sort(function (a, b) {
					 a = a.menu_order;
					    b = b.menu_order;
					    return a-b;
					});
            	var sortOrder=menuOrder;
            	els.set("mainMenuOrder",sortOrder);*/
            	//=========Menu Display Ordering ends==============//
            	
            	//=========Menu Visibility Display starts==============//
            			/*		var menuVisibilityArray={};
            					menuVisibilityArray["MTC2090"]={"menu_status":"Y","enabled":"Y"};//dateline main menu
            					menuVisibilityArray["MTC2091"]={"menu_status":"N"};//======dateline sub menu========// //Remainders 
            					
            					menuVisibilityArray["MTC3000"]={"menu_status":"Y","enabled":"Y"}; //Products Main Menu
		            			menuVisibilityArray["MTC3001"]={"menu_status":"N"};//======products sub menu========////notification
		            			menuVisibilityArray["MTC3002"]={"menu_status":"Y"};//accounts
		            			menuVisibilityArray["MTC3005"]={"menu_status":"N"};//finance
		            			menuVisibilityArray["MTC3004"]={"menu_status":"Y"};//credit
		            			menuVisibilityArray["MTC3003"]={"menu_status":"Y"};//invest
		            			menuVisibilityArray["MTC3006"]={"menu_status":"Y"};//time deposit
		            			menuVisibilityArray["MTC3007"]={"menu_status":"Y"};//ready cash
		            			
		            			menuVisibilityArray["MTC1007"]={"menu_status":"N","enabled":"Y"};//Transfer Main Menu
		            			menuVisibilityArray["MTC1018"]={"menu_status":"Y"};//======products sub menu========////own account
		            			menuVisibilityArray["MTC1019"]={"menu_status":"N"};//within SHB
		            			menuVisibilityArray["MTC1020"]={"menu_status":"Y"};//Local
		            			menuVisibilityArray["MTC1021"]={"menu_status":"N"};//international
		            			menuVisibilityArray["MTC2060"]={"menu_status":"Y"};//charity
		            			menuVisibilityArray["MTC2061"]={"menu_status":"N"};//si transfer
		            			menuVisibilityArray["MTC2063"]={"menu_status":"Y"};//manage bene
		            			menuVisibilityArray["MTC2062"]={"menu_status":"Y"};//transfer history
		            			
		            			menuVisibilityArray["MTC1008"]={"menu_status":"Y","enabled":"Y"};//Sadad Main Menu
		            			menuVisibilityArray["MTC2001"]={"menu_status":"N"};//due bill
		            			menuVisibilityArray["MTC2000"]={"menu_status":"Y"};//bill bay
		            			menuVisibilityArray["MTC1023"]={"menu_status":"N"};//One Time
		            			menuVisibilityArray["MTC2002"]={"menu_status":"Y"};//manageBill
		            			
		            			menuVisibilityArray["MTC2050"]={"menu_status":"Y","enabled":"Y"};//MOI Main Menu
		            			menuVisibilityArray["MTC1022"]={"menu_status":"N"};//======MOI sub menu========////moiPayments
		            			menuVisibilityArray["MTC2051"]={"menu_status":"Y"};//moiRefunds
		            			
		            			menuVisibilityArray["MTC1005"]={"menu_status":"N","enabled":"Y"};//Credit Card Main Menu            		
		                		menuVisibilityArray["MTC1017"]={"menu_status":""};//======Credit card sub menu========////card detail 
		                		menuVisibilityArray["MTC2070"]={"menu_status":"N"};	//OutStand
		                		menuVisibilityArray["MTC1016"]={"menu_status":"Y"};//UnBilled
		                		menuVisibilityArray["MTC2071"]= {"menu_status":"Y"};//Billed
		                		menuVisibilityArray["MTC1015"]={"menu_status":"N"};//payments	 
		                		menuVisibilityArray["MTC2072"]={"menu_status":"Y"};//ManageBene
		                		menuVisibilityArray["MTC2073"]={"menu_status":"N"};//CashOnDemand
		                		menuVisibilityArray["MTC2074"]={"menu_status":"Y"};	//Limit
		                		menuVisibilityArray["MTC2075"]={"menu_status":"N"};//ResetPin            		
		                		menuVisibilityArray["MTC2076"]={"menu_status":"Y"};//Activate            		
		                		menuVisibilityArray["MTC2077"]={"menu_status":"N"};//Block
		                		
		                		menuVisibilityArray["MTC9000"]={"menu_status":"Y","enabled":"N"};//Tedallal Main Menu
		                		menuVisibilityArray["MTC3020"]={"menu_status":"Y","enabled":"Y"};//More Main Menu 
		                		menuVisibilityArray["MTC3021"]={"menu_status":"N"};//======more sub menu starts========////Charts
		                		
		                		menuVisibilityArray["MTC3022"]={"menu_status":"Y"};//Service Request
    		            		menuVisibilityArray["MTC3023"]={"menu_status":"Y"};//======more sub menu child starts========////CheckBook
    		        			menuVisibilityArray["MTC3024"]={"menu_status":"N"};//ApplyCredit
    		        			menuVisibilityArray["MTC3025"]={"menu_status":"Y"};//ApplyPersonal
    		        			menuVisibilityArray["MTC3026"]={"menu_status":"N"};//Apply Home      			
    		        			menuVisibilityArray["MTC3027"]={"menu_status":"Y"};//Activate Debit
    		        			menuVisibilityArray["MTC3028"]={"menu_status":"N"};//block debit,
    		        			menuVisibilityArray["MTC3029"]={"menu_status":"N"};//apply for ready cash
		    		        			
		    		        	menuVisibilityArray["MTC3080"]={"menu_status":"N"};//Tools
    		            		menuVisibilityArray["MTC3081"]={"menu_status":"Y"};//Tools sub menu starts//credit Card Find
    		        			menuVisibilityArray["MTC3082"]={"menu_status":"N"};//Finance Cal
    		        			menuVisibilityArray["MTC3083"]={"menu_status":"Y"};//currency Convert
    		        			menuVisibilityArray["MTC3084"]={"menu_status":"N"};//fx Rate
    		        			menuVisibilityArray["MTC3085"]={"menu_status":"Y"};//td Rate
    		        			menuVisibilityArray["MTC3086"]={"menu_status":"N"};//available Limit
    		        			menuVisibilityArray["MTC3087"]={"menu_status":"N"};//locate us
    		        			
		    		        	menuVisibilityArray["MTC3040"]={"menu_status":"Y"};  //Preference 
    		            		menuVisibilityArray["MTC3041"]={"menu_status":"Y"};//Preference sub menu starts//Change Password
    		        			menuVisibilityArray["MTC3042"]={"menu_status":"N"};//Change Mpin
    		        			menuVisibilityArray["MTC3043"]={"menu_status":"Y"};//Change Language
    		        			menuVisibilityArray["MTC3044"]={"menu_status":"N"};//Enable Otp
    		        			menuVisibilityArray["MTC3045" ]={"menu_status":"N"};//Profile Update
		    		        			
    		        			menuVisibilityArray["MTC3046"]={"menu_status":"Y"};//Menu Settings
    		        			menuVisibilityArray["MTC3047"]={"menu_status":"Y"};//Theme Settings
		    		        	menuVisibilityArray["MTC3060"]={"menu_status":"N"};//moreMessage
    		            		menuVisibilityArray["MTC3061"]={"menu_status":"N"};//Message Center sub menu starts//compose message
    		        			menuVisibilityArray["MTC3062"]={"menu_status":"Y"};//Inbox
    		        			menuVisibilityArray["MTC3063"]={"menu_status":"N"};//Sent items
    		        			els.set("menuVisibilityList",menuVisibilityArray);*/
    		  //=========Menu Display Ordering starts==============//
				els.set("isAccountHolder",userLoginProfile.isAccountHolder);  //for account holder check
				if( userLoginProfile.userMenuSettingsListDTO!=null){
					var menuVisibilityArray={};
					menuList=userLoginProfile.userMenuSettingsListDTO;
					var menuKeyList=[];
					var menuOrder=[];
					$.each(menuList,function(datalist){						
						menuVisibilityArray[menuList[datalist].mtc_programid]={"menu_status":menuList[datalist].menu_status,"menu_status_at_admin":menuList[datalist].menu_status_at_admin};
						menuKeyList.push(menuList[datalist].mtc_programid);
						if(menuList[datalist].menu_order != "" && menuList[datalist].menu_order != "-1"){//read all the main menu
							menuOrder.push({"menu_order":menuList[datalist].menu_order,"mtc_programid":menuList[datalist].mtc_programid});
						}
						
					});
					els.set("menuKeyList",menuKeyList); //used in the menu setting save option
					$.each(menuKeyList,function(index){
	            		var programId=menuKeyList[index];
	            		var menuOrder=menuVisibilityArray[menuKeyList[index]].menu_status;
	            		
					});
					//sort the main menu
					menuOrder.sort(function (a, b) {
						 a = a.menu_order;
						    b = b.menu_order;
						    return a-b;
						});
	            	var sortOrder=menuOrder;
	            	els.set("mainMenuOrder",sortOrder); //sorted main menu order
					els.set("menuVisibilityList",menuVisibilityArray); // list of menu with  menu_status & admin status
	            	//=========Menu Visibility Display Ends==============//
				}
			}
			
			//***********************Start of Mininum Transfer Amount Validation ******************//
			if (this.get("commonParamListDTO") !=null) {
				var commomParamList = this.get("commonParamListDTO");
				$.each(commomParamList, function(index) {
					if(commomParamList[index].paramCode == "EXTERNAL"){
						els.set("ExternalPaymentMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "OWNACCOUNTS"){
						els.set("OwnAccountsMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "SARIE"){
						els.set("SarieMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "WITHINSHB"){
						els.set("WithinShbMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "SIOWNACCOUNTS"){
						els.set("SIOwnAccountsMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "SIWITHINSHB"){
						els.set("SIWithinShbMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "SISARIE"){
						els.set("SISarieMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "SIEXTERNAL"){
						els.set("SIExternalMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "CHARITY"){
						els.set("CharityMinAmount",commomParamList[index].paramDescription);
					}else if(commomParamList[index].paramCode == "SICHARITY"){
						els.set("SICharityMinAmount",commomParamList[index].paramDescription);
					}
					
				});
			}
			//***********************End of Mininum Transfer Amount Validation ******************//
			if (this.get("usermpinflag")) {
				//els.set("MPINFLAG","Y");
			}else{
				//els.set("MPINFLAG","N");
			}
			
			
			
			
			if (this.get("appSessionId")) {
				appSessionId = this.get("appSessionId");
				els.set("appSessionId", appSessionId);
			}
			if (this.get("appDeviceId")) {
				appDeviceId = this.get("appDeviceId");
				els.set("appDeviceId", appDeviceId);
			} else {
				els.set("appDeviceId", "");
			}

			userName = $('#userName').val();
			if (this.get("ackStatus")) {
				ackStatus = this.get("ackStatus");
			}
			if (this.get("mpinStatus")) {
				mpinStatus = this.get("mpinStatus");
				els.set("mpinStatus", mpinStatus);
			}else{
				mpinStatus = "";
			}
			
			if(mpinStatus=="0" || mpinStatus=="00")
				els.set("MPINFLAG","Y");
			else
				els.set("MPINFLAG","N");

			if (this.get("error")) {
				var errordet = this.get("error");
				els.set("errordesc", errordet.errorDescription);
				els.set("errorCode",errordet.errorCode);
				console.log("Test error code.."+els.get("errorCode"));
			} else {
				els.set("errordesc", "FAILURE");
				els.set("errorCode","");
			}
		}
	});
	return loginAuthModel;
});