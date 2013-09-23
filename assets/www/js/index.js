/*
* Statics
*/

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
 * Static
 */
var IN = "IN";
var OUT = "OUT";
var ARCHIVE = "ARCHIVE";

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

function displayData(data, location) {
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

function showEditForm(id) {
	alert($('#div_' + id).val());
	$('#span_' + id).hide();
	$('#div_' + id).show();
}

function hideDisplayDetails(id) {
	var details = $('#details_' + id);
	if ($(details).isVisible()) {
		$(details).show();
	} else {
		$(details).hide();
	}
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
