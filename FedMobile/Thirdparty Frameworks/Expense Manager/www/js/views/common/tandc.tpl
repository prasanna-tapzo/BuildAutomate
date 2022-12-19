<%
 
var els = new EncryptedLocalStorage('secret'); 
var tandcContent=els.get("tandcContent");
 %>
   <div class="read-form tspace terms">
     <% _.each(tandcContent,function(data){ %>
        <p><%-data.message%></p><br>
     <% }) %>   
    </div>
		

<script>
	$(".content").animate({ scrollTop: 0 }, "fast");	
</script>
<script>
$('.content').removeClass("pnkbg");
$("#menuicon").hide();
$("#closeicon").hide();
$("#termscloseicon").show();

</script>
<script>	
$(document).ready( function () {
    $('.bodywrapper').addClass("noFooter");
    $("#preloginfooter").hide();
});
</script>

