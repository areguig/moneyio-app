var dbShell;


var ACTIVE_BOUHCONS = true; 

var INOUT_TABLE_CREATE = "CREATE TABLE IF NOT EXISTS INOUT (id INTEGER PRIMARY KEY AUTOINCREMENT,kind,firstname,lastname,amount,loanDate,returnDate,comment)";
var ARCHIVES_TABLE_CREATE = "CREATE TABLE IF NOT EXISTS ARCHIVES(id INTEGER PRIMARY KEY AUTOINCREMENT,kind,firstname,lastname,amount,loanDate,returnDate,archiveDate,comment)";


$(document).ready(function(){


/**
 * The database
 */
 
if(ACTIVE_BOUHCONS)
{
    getDataFromBOUCHON();
}
else
{
    dbShell = window.openDatabase("mainDB", "1","nameDB",10000 );
    dbShell.transaction(createTables,errorCB,successCB);
    dbShell.transaction(queryDB,errorCB);
}

/**
 *End Document Ready 
 */
});

function createTables(tx){
	
	tx.executeSql(INOUT_TABLE_CREATE);
	tx.executeSql(ARCHIVES_TABLE_CREATE);
}


function queryDB(tx)
{

	tx.executeSql('SELECT * FROM INOUT',[],querySuccess,errorCB);
}

function querySuccess(tx, results){

	displayDataDB(results,"#home");
}

function errorCB(err)
{
	alert("SQL error:"+ err.message);
}

function successCB()
{
	return true;
}

function saveData(data)
{
	var kind="";
	var firstname="";
	var lastname="";
	var amount="";
	var loanDate="";
	var returnDate="";
	var comment="";
	dbShell.transaction(function(tx){
		for(var i=0;i<data.length;i++){
			
			if(data[i].name == "kind")
			{
				kind = data[i].value;	
			}
			if(data[i].name == "firstname")
			{
				firstname = data[i].value;
			}
			if(data[i].name == "lastname")
			{
				lastname = data[i].value;
			}
			if(data[i].name == "amount")
			{
				amount = data[i].value;
			}
			if(data[i].name == "loandate")
			{
				loanDate = data[i].value;
			}
			if(data[i].name == "returndate" )
			{
				returnDate = data[i].value;				
			}
			if(data[i].name == "comment")
			{
				comment = data[i].value;
			}
		}

		tx.executeSql('INSERT INTO INOUT(kind,firstname,lastname,amount,loanDate,returnDate,comment) VALUES ("'+kind+'","'+firstname+'","'+lastname+'","'+amount+'","'+loanDate+'","'+returnDate+'","'+comment+'")')
	});
}

function getDataFromBOUCHON(){
    $.getJSON('bouchons/inOut.json', function(inout) {
        displayDataBOUCHON(inout,'#elements');
        setElementsEvents();
    });
}





