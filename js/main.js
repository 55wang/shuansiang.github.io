// action for pressing new entry button
$(".newEntryButton").click( function( e ) {
	console.log("BUTTON CLICKED");

	$(".newEntryPopup").removeClass("hide");
});

// action for inputing total budget for the month
$(".budgetBoxButton").click( function( e ) {
	console.log("Budget box button clicked.");

	// saving the input into a variable
	var budgetInput = $(".budgetInput").val();

	if( budgetInput === "" || !$.isNumeric(budgetInput))  {
		alert("Not a valid input!");
		return;
	}
	else {
		$(".budgetBoxValue").html(budgetInput);
	}
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

	// to check if there is a budget already entered
	var budget = $(".budgetBoxValue").html();
	if (budget === "")	{
		alert("Please enter a budget to begin!");
		$(".newEntryPopup").addClass("hide");
		return;
	}

	// saving the calender entry grid to be changed
	var currentDate = $(".calenderEntry")[Number(newDate)-1];
	$(".newEntryPopup").addClass("hide");

	var currentSpentValue = $(".spentBoxValue").html();
	if ($.isNumeric(currentSpentValue)) {
		console.log("first if and my currentSpentValue: " + currentSpentValue);
		currentSpentValue += newAmount;
	}
	else {
		currentSpentValue = newAmount;
		console.log("else " + currentSpentValue + budget);
	}

	if (currentSpentValue <= budget/30 * 0.25) {
		$(currentDate).removeClass("level1 level2 level3 level4").addClass("level1");
		$(".spentBoxValue").html(currentSpentValue);
		console.log("finally");
	}




});