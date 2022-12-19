<div class="row">
                <label class="droplabel">
                    <select class="drophead">
                        <option><a href="#"><%-$.i18n.t('app.transfer.payee.branch')%>-Chennai</a></option>
                    </select>
                </label>
            </div>
            <div class="map">
                <!--<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7776.127054615758!2d77.6410037550025!3d12.967786767364013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14051e8b0e9d%3A0x654402fe80e44f9c!2sCarlton+Towers%2C+19th+Main+Rd%2C+HAL+2nd+Stage%2C+Kodihalli%2C+Bengaluru%2C+Karnataka+560008!5e0!3m2!1sen!2sin!4v1467971047862" width="100%" height="300" style="min-height: 100%;" frameborder="0" style="border:0" allowfullscreen></iframe>-->
                <div id="map_canvas" style="width:100%;height:430px">
                <div>
                
                </div>
                </div>
               
              <!--<div class="address" id="address"> -->
                 
            </div>
</div>
<script>
	$(".content").animate({ scrollTop: 0 }, "fast");	
	$('#preloginmobcontent').removeClass("pnkbg");
	$('#preloginmobcontent').removeClass("login-content");
	$('#preloginmobcontent').addClass("content");
	$("#address").show();
</script>
<script>	
$(document).ready( function () {
    $('.bodywrapper').addClass("noFooter");
    $("#preloginfooter").hide();
    $('.app_topbtn').show();
    $("#menuicon").show();
    $("#closeicon").hide();
    $("#termscloseicon").hide();
});
</script>