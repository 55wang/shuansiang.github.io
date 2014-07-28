/*******************************************************************************

======================
Items in localStorage
======================

	1. hasData 				: 	Indicates if all data is still in use/valid.
	2. budget 				: 	Stores budget by month.
	3. amountOverspent 		: 	Stores overspend by month.
	4. spendRecords 		: 	Stores individual records of spend on a per day basis.
								Stored as a string of list(<li>) elements.
	5. spendAmountRecords 	: 	Stores amount spent each day.
								null indicates that day is not valid in that month.

*******************************************************************************/



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
		$(".budgetBoxValue").html( 0 );
		$(".overspentBoxValue").html( 0 );
		$(".spentBoxValue").html( 0 );
		refreshCalender();
	}
}

function initLocalStorage() {

	// Initialize blank array of records
	var budget = {
		"jan" : 0,
		"feb" : 0,
		"mar" : 0,
		"apr" : 0,
		"may" : 0,
		"jun" : 0,
		"jul" : 0,
		"aug" : 0,
		"sep" : 0,
		"oct" : 0,
		"nov" : 0,
		"dec" : 0
	};

	var amountOverspent = {
		"jan" : 0,
		"feb" : 0,
		"mar" : 0,
		"apr" : 0,
		"may" : 0,
		"jun" : 0,
		"jul" : 0,
		"aug" : 0,
		"sep" : 0,
		"oct" : 0,
		"nov" : 0,
		"dec" : 0
	};

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

	var spendRecordsString 			= JSON.stringify( spendRecords );
	var spendAmountRecordsString 	= JSON.stringify( spendAmountRecords );
	var amountOverspentString 		= JSON.stringify( amountOverspent );

	localStorage.clear();
	localStorage.setItem( "spendRecords", spendRecordsString );
	localStorage.setItem( "spendAmountRecords", spendAmountRecordsString );
	localStorage.setItem( "amountOverspent", amountOverspentString );
	localStorage.setItem( "hasData", true );

	return;
}

function resetApplication() {
	localStorage.setItem( "hasData", false );
	return;
}

function showSpendItemsPopup() {
	$(".spentItemListPopup").removeClass("hide");
	$(".overlay").removeClass("hide");
	return;
}

function hideSpendItemsPopup() {
	$(".spentItemListPopup").addClass("hide");
	$(".overlay").addClass("hide");
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
	var budgetInput = Number( $(".setBudgetPopupValue").val() );

	if( budgetInput === "" || !$.isNumeric(budgetInput))  {
		alert("Not a valid input. Please try again.");
		return;
	}
	else {
		var budget = {
			"jan" : budgetInput,
			"feb" : budgetInput,
			"mar" : budgetInput,
			"apr" : budgetInput,
			"may" : budgetInput,
			"jun" : budgetInput,
			"jul" : budgetInput,
			"aug" : budgetInput,
			"sep" : budgetInput,
			"oct" : budgetInput,
			"nov" : budgetInput,
			"dec" : budgetInput
		};

		localStorage.setItem("budget", JSON.stringify(budget) );
		$(".budgetBoxValue").html( budgetInput );
		$(".spentBoxValue").html(0);
		$(".overspentBoxValue").html(0);
		hideBudgetBox();
		refreshCalender();
	}
}

// Due to presence of nulls in array, we need to find the actual day in the array without the nulls.
function getDayIndex( month, day ) {
	var index 				= 0;
	var day 				= Number( day );
	var spendRecordsString 	= localStorage.getItem( "spendRecords" );
	var spendRecordsObject 	= JSON.parse( spendRecordsString );
	var spendRecordsMonth 	= spendRecordsObject[month];

	for( var i=0; i<42; i++ ) {
		if( spendRecordsMonth[i] == null ) {
			index++;
		}
		else {
			i = 42;
		}
	}

	return ( day - 1 + index );
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

	// Validate input
	if( !isNewEntryValid( newTitle, newDate, newCategory, newAmount ) ) {
		return;
	}

	hideNewEntryPopup();

	var dayIndex 		= getDayIndex( currMonth, newDate )

	var budgetString 	= localStorage.getItem( "budget" );
	var budgetObject	= JSON.parse( budgetString );
	var budget			= Number( budgetObject[currMonth] );

	var spendAmountRecordsString 	= localStorage.getItem( "spendAmountRecords" );
	var spendAmountRecordsObject 	= JSON.parse( spendAmountRecordsString );
	var spendAmountRecord 			= Number( spendAmountRecordsObject[currMonth][dayIndex] );

	var amountOverspentString 	= localStorage.getItem( "amountOverspent" );
	var amountOverspentObject	= JSON.parse( amountOverspentString );
	var amountOverspent 		= Number( amountOverspentObject[currMonth] );

	spendAmountRecord 	= spendAmountRecord + Number( newAmount );
	budget 				= budget - spendAmountRecord;
	amountOverspent 	= spendAmountRecord - budget;

	$(".spentBoxValue").html( spendAmountRecord );
	$(".budgetBoxValue").html( budget );

	if( amountOverspent < 0 ) {
		$(".overspentBoxValue").html( 0 );
	}
	else {
		$(".overspentBoxValue").html( amountOverspent );
	}

	spendAmountRecordsObject[currMonth][dayIndex] 	= Number( spendAmountRecord );
	amountOverspentObject[currMonth] 				= Number( amountOverspent );
	budgetObject[currMonth]							= Number( budget );

	localStorage.setItem( "spendAmountRecords", JSON.stringify( spendAmountRecordsObject ) );
	localStorage.setItem( "amountOverspent", JSON.stringify( amountOverspentObject ) );
	localStorage.setItem( "budget", JSON.stringify( budgetObject ) );

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
	var index 						= 	getDayIndex( month, day );
	var spendRecordsString 			= 	localStorage["spendRecords"];
	var spendRecords 				= 	JSON.parse( spendRecordsString );
	var currSpendRecordString 		= 	spendRecords[month][index];

	var newRecordString 			= 	"<li>"
										+ "Date: " + day + "-" + month.toUpperCase() + "-14, " 
										+ "Title: " + title + ", " 
										+ "Category: " + category + ", " 
										+ "Amount: " + amount + 
										"</li>"


	spendRecords[month][index] 		= currSpendRecordString + newRecordString;

	localStorage.setItem( "spendRecords", JSON.stringify( spendRecords ) );

	refreshCalender();
}

function refreshCalender() {
	var index 						= 	0;
	var calenderEntryArray 			= 	$(".calenderEntry");
	var currMonth 					= 	$(".monthSelection").val();

	var spendRecordsString 			= 	localStorage["spendRecords"];
	var spendRecords 				= 	JSON.parse( spendRecordsString );

	var spendAmountRecordsString 	= 	localStorage["spendAmountRecords"];
	var spendAmountRecords 			= 	JSON.parse( spendAmountRecordsString );

	var amountOverspentString 		= 	localStorage["amountOverspent"];
	var amountOverspent 			= 	JSON.parse( amountOverspentString );

	var budgetString 				= 	localStorage["budget"];
	var budget 						= 	JSON.parse( budgetString );

	var budgetMonth 				= 	budget[currMonth];
	var spendRecordMonth 			= 	spendRecords[currMonth];
	var spendAmountRecordMonth 		= 	spendAmountRecords[currMonth];
	var amountOverspentMonth		= 	amountOverspent[currMonth];

	for( var i=0; i<42; i++ ) {
		var budget 		= Number( budgetMonth );
		var level0 		= 0;
		var level1 		= budget / 30 * 0.25;
		var level2 		= budget / 30 * 0.5;
		var level3 		= budget / 30 * 0.75;

		$( calenderEntryArray[i] ).empty().removeClass( 'level1 level2 level3 level4' );

		if( spendAmountRecordMonth[i] != null ) {
			var spendAmount = Number( spendAmountRecordMonth[i] );

			$( calenderEntryArray[i] ).html( index + 1 );

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

function showSpendRecord( e ) {
	var day 		= e.target.innerText;

	if( day == "" ) {
		return;
	}
	
	var currMonth 	= $(".monthSelection").val();
	var index 		= getDayIndex( currMonth, Number( day ) );
	var spendRecordsString 	= localStorage["spendRecords"];
	var spendRecordsObject 	= JSON.parse( spendRecordsString );
	var spendRecord 		= spendRecordsObject[currMonth][index];

	if( spendRecord == "" ) {
		$(".spentItemList").empty().html( "<li>No spend records for this day.</li>" );	
	}
	else {
		$(".spentItemList").empty().html( spendRecord );	
	}

	showSpendItemsPopup();

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
	hideNewEntryPopup();
});

$(".calenderEntry").click( function( e ) {
	console.log( "Calender entry clicked" );
	showSpendRecord( e );
});

$(".buttonSubmitNewEntry").click( function( e ) {
	console.log( "Submit new entry clicked" );
	recordNewEntry();
});

$(".closeSpentItemList").click( function( e ) {
	console.log( "Close spent item list clicked" );
	hideSpendItemsPopup();
});

$(".monthSelection").change( function( e ) {
	console.log("Month selection changed.");
	refreshCalender();
});