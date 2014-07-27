$(window).load(function() {
	init();
});

/*******************************************************************************
	FUNCTION DECLARATIONS HERE
*******************************************************************************/

function init() {
	var hasData = localStorage.getItem( "hasData" );
	if( hasData == null || hasData== "false" ) {
		alert( "Welcome! Please enter a budget to begin." );
		hideNewEntryPopup();
		showBudgetBox();
		initLocalStorage();
	}
	else {
		$(".budgetBoxButton").addClass("hide");
		$(".budgetBoxValue").html( localStorage["budget"] );
		if( localStorage["amountOverspent"] > 0 ) {
			$(".overspentBoxValue").html( localStorage["amountOverspent"] );
		}
		else {
			$(".overspentBoxValue").html(0);
		}
		$(".spentBoxValue").html( localStorage["amountSpent"] );
	}

	refreshCalender();
}

function initLocalStorage() {

	// Initialize blank array of records stored by month
	var spendRecords = {
		"jan" : [ null, null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null ],
		"feb" : [ null, null, null, null, null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null ],
		"mar" : [ null, null, null, null, null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null ],
		"apr" : [ null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null, null, null ],
		"may" : [ null, null, null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null ],
		"jun" : [ null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null, null, null, null, null ],
		"jul" : [ null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null, null ],
		"aug" : [ null, null, null, null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null ],
		"sep" : [ null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null, null, null, null ],
		"oct" : [ null, null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null ],
		"nov" : [ null, null, null, null, null, null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null ],
		"dec" : [ null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null, null, null, null, null, null, null, null, null, null ],
	};

	var spendAmountRecords = {
		"jan" : [ null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null ],
		"feb" : [ null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null ],
		"mar" : [ null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null ],
		"apr" : [ null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null, null ],
		"may" : [ null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null ],
		"jun" : [ null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null ],
		"jul" : [ null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null ],
		"aug" : [ null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null ],
		"sep" : [ null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null, null, null ],
		"oct" : [ null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null ],
		"nov" : [ null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null ],
		"dec" : [ null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null, null ],
	};

	var spendRecordsString = JSON.stringify( spendRecords );
	var spendAmountRecordsString = JSON.stringify( spendAmountRecords );

	localStorage.clear();
	localStorage.setItem( "spendRecords", spendRecordsString );
	localStorage.setItem( "spendAmountRecords", spendAmountRecordsString );
	localStorage.setItem( "hasData", true );

	return;
}

function resetApplication() {
	localStorage.setItem( "hasData", false );
	return;
}

function showNewEntryPopup() {
	$(".newEntryPopup").removeClass("hide");
	$(".overlay").removeClass("hide");
	$(".setBudgetPopup").addClass("hide");
	return;
}

function hideNewEntryPopup() {
	$(".newEntryPopup").addClass("hide");
	$(".overlay").addClass("hide");
	$(".setBudgetPopup").addClass("hide");
	return;
}

function showBudgetBox() {
	$(".setBudgetPopup").removeClass("hide");
	return;
}

function hideBudgetBox() {
	console.log("Function hide budget box");
	$(".setBudgetPopup").addClass("hide");
	$(".budgetBoxButton").addClass("hide");
}

function setNewBudget() {
	var budgetInput = $(".setBudgetPopupValue").val();

	if( budgetInput === "" || !$.isNumeric(budgetInput))  {
		alert("Not a valid input. Please try again.");
		return;
	}
	else {
		localStorage.setItem("budget", budgetInput);
		$(".budgetBoxValue").html(budgetInput);
		$(".spentBoxValue").html(0);
		$(".overspentBoxValue").html(0);
		hideBudgetBox();
	}
}

function recordNewEntry() {

	// Retrieve values from user input
	var currMonth 	= $(".monthSelection").val();
	var newDate 	= $(".newEntryPopupDate").val();
	var newTitle 	= $(".newEntryPopupTitle").val();
	var newAmount 	= $(".newEntryPopupAmount").val();
	var newCategory = $(".newEntryPopupCategory").val();

	// Date entry is a number representing day of that month
	console.log("Input received.", currMonth, newTitle, newCategory, newAmount, newDate);

	if( !isNewEntryValid( newTitle, newDate, newCategory, newAmount ) ) {
		return;
	}

	hideNewEntryPopup();

	var currentDate 	= $(".calenderEntry")[Number(newDate)-1];
	var currentSpent 	= localStorage.getItem("amountSpent");
	var amountSpent 	= Number(currentSpent) + Number(newAmount);

	localStorage.setItem("amountSpent", amountSpent);
	$(".spentBoxValue").html(localStorage["amountSpent"]);

	var amountOverspent = localStorage.getItem("amountSpent") - localStorage.getItem("budget");
	localStorage.setItem("amountOverspent", amountOverspent);
	$(".overspentBoxValue").html(localStorage["amountOverspent"]);

	modifySpendArray( currMonth, newDate, newTitle, newCategory, newAmount );
}

function isNewEntryValid( title, date, category, amount ) {
	if ( title === "" ) {
		alert("Title is invalid.");
		return false;
	}
	else if ( amount === "" || !$.isNumeric(amount) ) {
		alert("Only numbers are allowed for amount.");
		return false;
	}
	else if ( date === "" || !$.isNumeric(date) || date > 30 )  {
		alert("Invalid date.");
		return false;
	}
	else {
		return true;
	}
}

function modifySpendArray( month, day, title, category, amount ) {
	var index 						= 	0;
	var spendRecordsString 			= 	localStorage["spendRecords"];
	var spendRecords 				= 	JSON.parse( spendRecordsString );

	var spendAmountRecordsString 	= 	localStorage["spendAmountRecords"];
	var spendAmountRecords 			= 	JSON.parse( spendAmountRecordsString );

	var newRecordString 			= 	"<li>"
										+ "Date: " + day + "-" + month + "-14, " 
										+ "Title: " + title + ", " 
										+ "Category: " + category + ", " 
										+ "Amount: " + amount + 
										"</li>"

	var currSpendRecordString 		= spendRecords[month][day-1];
	var currSpendAmountRecord 		= Number(spendAmountRecords[month][day-1]);

	// Due to presence of nulls in array, we need to find the actual day in the array without the nulls.
	for( var i=0; i<42; i++ ) {
		if( spendRecords[month][i] == null ) {
			index++;
		}
		else {
			i = 42;
		}
	}

	spendRecords[month][ day - 1 + index ] 		= currSpendRecordString + newRecordString;
	spendAmountRecords[month][ day - 1 + index ]= Number(currSpendAmountRecord) + Number(amount);

	localStorage.setItem( "spendRecords", JSON.stringify( spendRecords ) );
	localStorage.setItem( "spendAmountRecords", JSON.stringify( spendAmountRecords ) );
}

function refreshCalender() {
	var index 						= 	0;
	var calenderEntryArray 			= 	$(".calenderEntry");
	var currMonth 					= 	$(".monthSelection").val();
	var spendRecordsString 			= 	localStorage["spendRecords"];
	var spendAmountRecordsString 	= 	localStorage["spendAmountRecords"];
	var spendRecords 				= 	JSON.parse( spendRecordsString );
	var spendAmountRecords 			= 	JSON.parse( spendAmountRecordsString );
	var spendRecordMonth 			= 	spendRecords[currMonth];
	var spendAmountRecordMonth 		= 	spendAmountRecords[currMonth];
	var budgetPerDay 				= 	

	console.log("spendRecordMonth : ", spendRecordMonth);
	console.log("spendAmountRecordMonth : ", spendAmountRecordMonth);

	for( var i=0, iLen=spendAmountRecordMonth.length; i<iLen; i++ ) {
		var spendAmount = Number( spendAmountRecordMonth[i] );
		var budget 		= Number( localStorage.getItem("budget") );
		var level0 		= 0;
		var level1 		= budget / 30 * 0.25;
		var level2 		= budget / 30 * 0.5;
		var level3 		= budget / 30 * 0.75;

		$( calenderEntryArray[i] ).empty();

		if( spendAmount != null ) {
			$( calenderEntryArray[i] ).html( index + 1 ).removeClass( 'level1 level2 level3 level4' );

			if( spendAmount > level0 && spendAmount <= level1 ) {
				$( calenderEntryArray[i] ).addClass( 'level1' );
			}
			else if( spendAmount > level1 && spendAmount <= level2 ) {
				$( calenderEntryArray[i] ).addClass( 'level2' );
			}
			else if( spendAmount > level2 && spendAmount <= level3 ) {
				$( calenderEntryArray[i] ).addClass( 'level3' );
			}
			else if( spendAmount > level3 ) {
				$( calenderEntryArray[i] ).addClass( 'level4' );
			}

			index++;
		}
	}
}

/*******************************************************************************
	EVENT HANDLERS HERE
*******************************************************************************/

$(".resetAllButton").click( function( e ) {
	console.log( "Reset all button clicked" );
	resetApplication();
});

$(".buttonSetNewBudget").click( function( e ) {
	console.log( "Set new budget button clicked" );
	setNewBudget();
});

$(".budgetBoxButton").click( function( e ) {
	console.log( "Budget box button clicked" );
	showBudgetBox();
});

$(".newEntryButton").click( function( e ) {
	console.log( "New entry button clicked" );
	showNewEntryPopup();
});

$(".buttonCancel").click( function( e ) {
	console.log( "Button cancel clicked" );
});

$(".calenderEntry").click( function( e ) {
	console.log( "Calender entry clicked" );
});

$(".buttonSubmitNewEntry").click( function( e ) {
	console.log( "Submit new entry clicked" );
	recordNewEntry();
});

$(".monthSelection").change( function( e ) {
	console.log("Month selection changed.");
	refreshCalender();
});