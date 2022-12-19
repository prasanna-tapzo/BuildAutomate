<% var els = new EncryptedLocalStorage('secret'); 
var responseData=els.get("BranchAtmListview");//els.get("responseData");
var selectedindex=els.get("selectedindex");
console.log("==========",selectedindex);
var i=0;
%>
<!-- 
					<% _.each(responseData,function(datares){ %>
					<% if(selectedindex==i){%>
					<p class="col-sm-6">
                        <b><%-datares.branchATMName%></b><%-datares.branchATMAddress%><br/> <%-datares.area%>, <%-datares.city%>-<%-datares.poNo%>
                    </p>
                    <p class="col-sm-6">
                       IFSC Code: <%-datares.branchifsccode%><br/> <%-datares.workingHours%> <br/>all days except weekends and public holidays<br/> Contact: <%-datares.phoneNo%>
                    </p>
                    <%}%>
                    <% i++;});%>
-->
<script>
	$(".content").animate({ scrollTop: 0 }, "fast");	
	$('.content').removeClass("pnkbg");
	$("#address").show();
</script>
<script>	
$(document).ready( function () {
    $('.bodywrapper').addClass("noFooter");
    $("#preloginfooter").hide();
    $('.app_topbtn').show();
});
</script>