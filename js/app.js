$(() => {
  //SHOW ME THE DATA
  const unpackMyAPI = apiData => {
    // console.log("API sent", apiData.drinks);

    for (let i = 0; i < apiData.drinks.length; i++) {
      //DRINK ID (NO SHOW) - USED TO PULL INGRIDIENTS
      const drinkId = apiData.drinks[i].idDrink;
      //   console.log(drinkId);

      //PUSH ID TO FULL DRINK DETAILS URL ---
      const pushIdToURL = {
        async: true,
        crossDomain: true,
        url: `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkId}`,
        method: "GET",
        headers: {
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "439e57812bmsh2e86010b0756704p118e87jsne6da69923959"
        }
      };
      $.ajax(pushIdToURL).done(function(unpackDrinkDetails) {
        console.log(unpackDrinkDetails);
        //END URL PUSH ---------------------
        //DRINK NAME
        const drinkName = $("<h3>").text(apiData.drinks[i].strDrink);
        drinkName
          .css("text-transform", "uppercase")
          .css("text-align", "center")
          .appendTo(".showMeTheData");
        console.log(drinkName);

        //GROUP INGREDIENTS
        const ingredients = [];

        for (properties in unpackDrinkDetails.drinks[0]) {
          if (
            properties.includes("strIngredient") &&
            unpackDrinkDetails.drinks[0][properties]
          ) {
            ingredients.push(unpackDrinkDetails.drinks[0][properties] + " ");
          }
        }
        // console.log(ingredients);
        const ingredientsTitle = $("<p>")
          .text("INGREDIENTS: ")
          .css("text-align", "left")
          .css("font-weight", "600")
          .appendTo(drinkName);

        const ingredientList = $("<p>").text(ingredients);
        ingredientList.css("text-align", "left");
        ingredientList.appendTo(drinkName);

        //GROUP MEASUREMENTS
        const measurements = [];

        for (properties in unpackDrinkDetails.drinks[0]) {
          if (
            properties.includes("strMeasure") &&
            unpackDrinkDetails.drinks[0][properties]
          ) {
            measurements.push(unpackDrinkDetails.drinks[0][properties]);
          }
        }
        //CREATE UL
        const measurementsUL = $("<ul>").appendTo(drinkName);
        //CREATED LI
        const measurementsLI = $("<li>").text(measurements);
        measurementsLI.appendTo(measurementsUL);

        //DRINK INSTRUCTIONS
        const instructionsTitle = $("<p>")
          .text("Instructions: ")
          .css("text-align", "left")
          .css("font-weight", "600")
          .appendTo(drinkName);

        const drinkInstructions = $("<p>")
          .text(unpackDrinkDetails.drinks[0].strInstructions)
          .css("text-align", "left")
          .appendTo(drinkName);

        const lineBreak = $("<p>").text("__________________");
        lineBreak
          .css("text-align", "center")
          .css("font-weight", "600")
          .appendTo(drinkInstructions);
      });
      //
    }
  };

  //SEARCH BY ALCOHOL TYPE
  $(".clickSearch").on("click", event => {
    event.preventDefault();

    const searchBoxInput = $(".searchBoxInput");
    const searchBoxVal = searchBoxInput.val();
    const filter = `filter.php?i=${searchBoxVal}`;
    console.log(searchBoxVal);

    //AJAX CONNECTION
    const drinksAPI = {
      async: true,
      crossDomain: true,
      url: `https://the-cocktail-db.p.rapidapi.com/${filter}`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "439e57812bmsh2e86010b0756704p118e87jsne6da69923959"
      }
    };
    $.ajax(drinksAPI).then(unpackMyAPI);
    //THE 2 LINE BELOW CLEAR THE CONTENT BEFORE PLACING MY NEW REQUEST
    $(".showMeTheData").html("");
    $(".showMeTheData").html(html);
  });
});
