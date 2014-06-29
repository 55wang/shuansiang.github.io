$(window).load(function() {
	if (localStorage.getItem("budget") == null) {
		alert("Welcome! Please enter a budget to begin!");
		$(".newEntryPopup").addClass("hide");
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

		if (Number(spend) <= budget/30 * 0.25 && spend > 0) {
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
});

// action for cancelling a new entry
$(".buttonCancel").click( function( e ) {
	console.log("Cancel clicked.");

	$(".newEntryPopup").addClass("hide");
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

	// saving the calender entry grid to be changed
	var currentDate = $(".calenderEntry")[Number(newDate)-1];
	$(".newEntryPopup").addClass("hide");

	// recording the amount in spent box and making changes
	var currentSpentValue = $(".spentBoxValue").html();
	// if value already exist in currentSpentBox
	if ($.isNumeric(currentSpentValue)) {
		currentSpentValue = Number(currentSpentValue) + Number(newAmount);
	}
	// if currentSpentBox is empty
	else {
		currentSpentValue = newAmount;
	}

	modifySpendArray(newDate, newAmount);
	refreshCalender();

});