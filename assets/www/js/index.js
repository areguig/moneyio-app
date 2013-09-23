/**
 * Static
 */
var IN = "IN";
var OUT = "OUT";
var ARCHIVE = "ARCHIVE";
var input_img_path = "images/input.png";
var output_img_path = "images/output.png";
var archive_img_path = "images/archive.png";

var GENERATOR = new Generator();



$(document).ready(function() {

	var theScroll;
	function scroll() {
		theScroll = new iScroll('wrapper');
	}

	document.addEventListener('DOMContentLoaded', scroll, false);
	
	/**
	 * Pour switcher entre les 3 pages principales accessibles depuis le footer
	 */
	$('#tab-bar a').on('click', function(e) {
		e.preventDefault();
		var nextPage = $(e.target.hash);
		$("#pages .current").removeClass("current");
		nextPage.addClass("current");
	});

	/**
	 * Submit the 'add' form
	 */
	//$('#addForm').validate();

	$('#addForm').submit(function(e) {
		var inputs = $(this).serializeArray();
		if(validateAddForm())
		{
			saveData(inputs);
		}
		else 
		{
			e.preventDefault();
			return false;
		}
	});
	
	/**
	* Calendar 
	*/

	$('#add input.calendar').focus(function() {
		this.blur();
	});
	$(function() {
		$("#add input.calendar").datepicker({
			showAnim : "fadeIn",
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy"
		});
	});
	/**
	 * END DOCUMENT READY
	 */
});


/**
 * For some animations when going from one page to another
 */
function page(toPage) {
	var toPage = $(toPage);
	fromPage = $("#pages .current");
	if (toPage.hasClass("current") || toPage == fromPage) {
		return;
	}
	toPage.addClass("current fade in").one("webkitAnimationEnd", function() {
		fromPage.removeClass("current fade out");
		toPage.removeClass("fade in");
	});
	fromPage.addClass("fade out");
}

function displayDataDB(data, location) {
	var len = data.rows.length;
	var consultationTable = "<table>";
	var modificationTable = "<table>";
	var img;
	var id;
	var output;
	for (var i = 0; i < len; i++) {
		// The unique id of the entry from the database
		id = data.rows.item(i).id;
		//the kind of the entry
		if (data.rows.item(i).kind == IN) {
			img = "images/input.png";
		} else if (data.rows.item(i).kind == OUT) {
			img = "images/output.png";
		} else if (data.rows.item(i).kind == ARCHIVE) {
			img = "images/archive.png";
		} else {
			return false;
		}
		consultationTable += "<span class=\"element\"> <img src=\""+img+"\" />"
		consultationTable += "<table class=\"element\">" + "<tr> <td onclick=\"hideDisplayDetails(" + id + ");\">" 
		+ data.rows.item(i).amount + "&#x20AC;" 
		+ "</td> <td> <a  onclick=\"getContact('"+data.rows.item(i).lastname+"');\" >" + data.rows.item(i).firstname + "&nbsp;" + data.rows.item(i).lastname +"</a>"
		+ "</td></tr>" + "<tbody id=\"details_" + id + "\" class=\"details\" style=\"display:none\">" + "<tr><td>" + "Since " + data.rows.item(i).loanDate 
		+ "</td><td>" + "To" + data.rows.item(i).returnDate + " <a>Add an event to the calendar</a>" 
		+ "</td></tr>" + "<tr><td>" + "" + "</td><td>" + data.rows.item(i).comment + "</td></tr>" + "</tbody></table>";

	}
	$(location).html(consultationTable + "</table></span>");
}

function displayDataBOUCHON(data,location)
{
    var br = "<br/>";
    var id = "";
    var img ;
    var elements_content = ""
    var element_div = "";
    var element_logo_div = "";
    var element_content_div = "";
    var contact_div = "";
    var amount_div = "";
    var details_div = "";
    var dates_div = ""; 
    var loan_date_div = "";
    var return_date_div = "";
    var comment_div = "";
    var element_actions_div = "";

    for(var i = 0; i< data.length;i++)
    {
        id = data[i].id;
        if (data[i].kind == IN) {
			img = "<img src='"+input_img_path+"'/>";
		} else if (data[i].kind == OUT) {
			img = "<img src='"+output_img_path+"'/>";
		} else if (data[i].kind == ARCHIVE) {
			img = "<img src='"+archive_img_path+"'/>";
		} else {
			return false;
		}
		element_logo_div = GENERATOR.div("element-logo_"+id,["element-logo"],img);
		
	    var a = GENERATOR.a("contact_a_"+id,[],data[i].firstname+" "+data[i].lastname, "tel:0685897912");
	    contact_div = GENERATOR.div("contact_"+id,["contact"], a);

		amount_div = GENERATOR.div("amount_"+id,["amount"],data[i].amount +"&#x20AC;");

		loan_date_div = GENERATOR.div("loan-date_"+id,["loan-date"],data[i].loandate);
		
		return_date_div = GENERATOR.div("return-date_"+id,["return-date"],data[i].returndate);
		
		comment_div = GENERATOR.div("comment_"+id,["comment"],data[i].comment); 
		
		dates_div = GENERATOR.div("dates_"+id,["dates"],loan_date_div+br+return_date_div);
		
		details_div = GENERATOR.div("details_"+id,["details"],dates_div+br+comment_div);
		
		element_content_div = GENERATOR.div("element-content_"+id,["element-content"],contact_div+br+amount_div+br+details_div);
		
		var a1 = GENERATOR.a("",["hide-details", "zip-button"],"-");
		var a2 = GENERATOR.a("",["delete"],"Delete");
		var a3 = GENERATOR.a("",["modify"],"Modify");
		var a4 = GENERATOR.a("",["calendar-event"],"Add to Calendar");
		
		
		element_actions_div = GENERATOR.div("element-actions_"+id,["element-actions"],a1+br+a2+br+a3+br+a4);
		
		element_div = GENERATOR.div("element_"+id, ["element"], element_logo_div+element_content_div+element_actions_div);
		
		elements_content += element_div;
    }
    $(location).html(elements_content);
}

function setElementsEvents()
{
    	/**
	 * Display hide element details and actions
	 */
	$('#home div.element div.element-content, #home div.element div.element-logo').bind('click', function(e){
		var details = $(this).parents('div.element').find('div.details');
		var actions = $(this).parents('div.element').find('div.element-actions')
		if(!details.is(':visible'))
		{
			details.show();
		}
		if(!actions.is(':visible'))
		{
			actions.show();	
		}
	});
	
	$('#home div.element-actions a.hide-details').bind('click', function(e){
		e.preventDefault();
		var details = $(this).parents('div.element').find('div.details'); 
		var actions = $(this).parents('div.element').find('div.element-actions');
		if(details.is(':visible'))
		{
			details.hide();
		}
		if(actions.is(':visible'))
		{
			actions.hide();
		}
	});

}



function showEditForm(id) {
	alert($('#div_' + id).val());
	$('#span_' + id).hide();
	$('#div_' + id).show();
}


function validateAddForm(inputs) {
	return true;
}

function getContact(name){
	var options = new ContactFindOptions();
	options.filter = name;
	var fields = ["displayName", "name","phoneNumbers"];
	navigator.contacts.find(fields, contactSuccess, contactError, options);
}

function contactSuccess(contacts) {
      for (var i=0; i<contacts.length; i++) {
      		$('#dialog').html("<a href=\"tel:"+ contacts[i].phoneNumbers[0].value+"\"></a>");
             $( "#dialog" ).dialog();
        }
};

function contactError(contactError) {
    alert('onError!');
};


