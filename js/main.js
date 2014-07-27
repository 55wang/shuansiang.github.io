$(window).load(function() {
	if (localStorage.getItem("budget") == null) {
		alert("Welcome! Please enter a budget to begin!");
		$(".newEntryPopup").addClass("hide");
		$(".overlay").addClass("hide");
		$(".setBudgetPopup").removeClass("hide");
	}
	else {
		$(".budgetBoxValue").html(localStorage["budget"]);
		$(".budgetBoxButton").addClass("hide");
		budget = localStorage.getItem("budget");
	}

	if (localStorage.getItem("spendArray") == null) {
		var spendArray = new Array(30);
		for (var i=0; i<spendArray.length; i++) {
			spendArray[i] = 0;
		}
		localStorage.setItem("spendArray", spendArray);
	}
	else {
		refreshCalender();
	}

	if (localStorage.getItem("amountSpent") == null) {
		var amountSpent = 0;

		localStorage.setItem("amountSpent", amountSpent);
	}
	else {
		$(".spentBoxValue").html(localStorage["amountSpent"]);
	}

	if (localStorage.getItem("amountOverspent") == null) {
		var amountOverspent = 0;

		localStorage.setItem("amountOverspent", amountOverspent);
	}
	else {
		$(".overspentBoxValue").html(localStorage["amountOverspent"]);
	}

	if( localStorage.getItem("spentList") == null) {
		var spentListArray = {
			"Jan": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Feb": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Mar": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Apr": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"May": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Jun": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Jul": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Aug": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Sep": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Oct": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Nov": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
			"Dec": [ "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" ],
		};

		localStorage.setItem( "spentListArray", spentListArray.toString() );
	}

	if( localStorage.getItem("currentMonth") == null ) {
		localStorage.setItem("currentMonth") == "Jun";
	}

});

function modifySpendArray(day, value) {
	var spendArrayString = localStorage.getItem("spendArray");
	var spendArray = spendArrayString.split(",");

	spendArray[day-1] = Number(spendArray[day-1]) + Number(value);

	localStorage.setItem("spendArray", spendArray);
}

function refreshCalender() {	// can put month as parameter
	var spendArrayString = localStorage.getItem("spendArray");
	var spendArray = spendArrayString.split(",");
	var calenderEntryArray = $(".calenderEntry");


	for (var i=0; i<spendArray.length; i++) {
		var spend = spendArray[i];

		if (Number(spend) <= budget /30 * 0.25 && spend > 0) {
			$(calenderEntryArray[i]).removeClass("level1 level2 level3 level4").addClass("level1");
		}
		else if (Number(spend) > budget/30 * 0.25 && spend <= budget/30 * 0.5) {
			$(calenderEntryArray[i]).removeClass("level1 level2 level3 level4").addClass("level2");
		}
		else if (Number(spend) > budget/30 * 0.5 && spend <= budget/30 * 0.75) {
			$(calenderEntryArray[i]).removeClass("level1 level2 level3 level4").addClass("level3");
		}
		else if (Number(spend) > budget/30 * 0.75) {
			$(calenderEntryArray[i]).removeClass("level1 level2 level3 level4").addClass("level4");
		}
	}
}

/********************** reset all button actions *********************/
$(".resetAllButton").click( function( e ) {
	console.log("reset all button cllicked");
	
	var calenderEntryArray = $(".calenderEntry");
	for (var i=0; i<calenderEntryArray.length; i++) {
		$(calenderEntryArray[i]).removeClass("level1 level2 level3 level4");
	}

	localStorage.clear();
	$(".budgetBoxButton").removeClass("hide");
	$(".budgetBoxValue").html(null);
	$(".spentBoxValue").html(null);
	$(".overspentBoxValue").html(null);
	$(".historyBox").html(null);

	var spendArray = new Array(30);
	for (var i=0; i<spendArray.length; i++) {
		spendArray[i] = 0;
	}
	localStorage.setItem("spendArray", spendArray);
})

/********************** budget button actions *********************/

// action for pressing set budget button
$(".budgetBoxButton").click( function( e ) {
	console.log("set budget button clicked");

	$(".setBudgetPopup").removeClass("hide");
});

// action for setting new budget
$(".buttonSetNewBudget").click( function( e ) {
	console.log("button set new budget clicked")
	var budgetInput = $(".setBudgetPopupValue").val();

	if( budgetInput === "" || !$.isNumeric(budgetInput))  {
		alert("Not a valid input!");
		return;
	}
	else {
		$(".budgetBoxValue").html(budgetInput);
		localStorage.setItem("budget", budgetInput);
		budget = localStorage.getItem("budget");
		$(".setBudgetPopup").addClass("hide");
		$(".budgetBoxButton").addClass("hide");
	}
});

// action for cancelling a budget setting
$(".buttonCancel").click( function( e ) {
	console.log("Cancel clicked.");

	$(".setBudgetPopup").addClass("hide");
})

/********************** new entry button actions *********************/

// action for pressing new entry button
$(".newEntryButton").click( function( e ) {
	console.log("new entry button clicked");

	$(".newEntryPopup").removeClass("hide");
	$(".overlay").removeClass("hide");
});

// action for cancelling a new entry
$(".buttonCancel").click( function( e ) {
	console.log("Cancel clicked.");

	$(".newEntryPopup").addClass("hide");
	$(".overlay").addClass("hide");
});

// action for viewing spent items in a day
$(".calenderEntry").click( function( e ) {
	console.log("Calender entry box clicked.");
	$( e.target ).html();

});

// action for submitting a new entry
$(".buttonSubmitNewEntry").click( function( e ) {
	console.log("Submit new entry clicked.");

	// saving each inputs into separate variables
	var newTitle = $(".newEntryPopupTitle").val();
	var newCategory = $(".newEntryPopupCategory").val();
	var newAmount = $(".newEntryPopupAmount").val();
	var newDate = $(".newEntryPopupDate").val();

	// to check if each input is valid
	if (newTitle === "") {
		alert("Please enter a title!");
		return;
	}
	else if (newAmount === "" || !$.isNumeric(newAmount)) {
		alert("Please enter a numeric amount!");
		return;
	}
	else if (newDate === "" || !$.isNumeric(newDate) || newDate > 30) {
		alert("Please enter a valid date!");
		return;
	}

	// assume date entry is a number representing day of that month
	console.log("Input received.", newTitle, newCategory, newAmount, newDate);

	if (localStorage.getItem("budget") == null) {
		alert("Welcome! Please enter a budget to begin!");
		$(".newEntryPopup").addClass("hide");
		$(".overlay").addClass("hide");
		$(".setBudgetPopup").removeClass("hide");
		return;
	}

	// saving the calender entry grid to be changed
	var currentDate = $(".calenderEntry")[Number(newDate)-1];
	$(".newEntryPopup").addClass("hide");
	$(".overlay").addClass("hide");

	var currentSpent = localStorage.getItem("amountSpent");
	var amountSpent = Number(currentSpent) + Number(newAmount);

	localStorage.setItem("amountSpent", amountSpent);
	$(".spentBoxValue").html(localStorage["amountSpent"]);

	if (localStorage.getItem("amountSpent") > localStorage.getItem("budget")) {
		var amountOverspent = localStorage.getItem("amountSpent") - localStorage.getItem("budget");
		localStorage.setItem("amountOverspent", amountOverspent);
		$(".overspentBoxValue").html(localStorage["amountOverspent"]);
	}
	else {
		$(".overspentBoxValue").html("0");
	}

	modifySpendArray(newDate, newAmount);
	refreshCalender();

	var spentListString = "<li>Date: " + newDate + "/6/14, Title: " + newTitle + ", Category: " + newCategory + " Amount: " + newAmount + '</li>';
	var listOfEntries = localStorage.getItem("historyBox");
	$(".historyBox .list").append("<li>Date: " + newDate + "/6/14, Title: " + newTitle + ", Category: " + newCategory + " Amount: " + newAmount + '</li>');
	spentListArray[currentMonth][newDate+1] += spentListString;
	console.log(spentListArray);
});























