$(() => {
  //SHOW ME THE API DATA
  const unpackMyAPI = apiData => {
    // console.log("API sent", apiData.drinks);

    for (let i = 0; i < apiData.drinks.length; i++) {
      //DRINK ID (NO SHOW) - USED ONLY TO PULL INGREDIENTS
      const drinkId = apiData.drinks[i].idDrink;
      console.log(drinkId);

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
        //console.log(unpackDrinkDetails);
        //END OF URL PUSH ---

        //STYLE SHOW ME THE DATA DIV
        $(".showMeTheData").css("padding", "1% 3% 1% 3%");

        //NEW DIV TO APPEND INGREDIENTS AND INSTRUCTIONS
        const newDiv = $("<div>").addClass("hideThis");

        //SHOW ME THE DRINK NAME
        const drinkName = $("<h3>").text(apiData.drinks[i].strDrink);
        drinkName.sort();
        drinkName
          .attr("id", "drinkName")
          .addClass("drinkClass")
          .css("text-transform", "uppercase")
          .css("text-align", "center")
          .appendTo(".showMeTheData");
        console.log(drinkName);

        //APENDING SO NEW DIV COULD BE THE NEXT DATA TO THE H3
        $(".showMeTheData").append(newDiv);

        //DRINK INGREDIENTS TITLE
        const ingredientsTitle = $("<p>")
          .text("INGREDIENTS: ")
          .css("text-align", "left")
          .css("font-weight", "600")
          .appendTo(newDiv);

        //CODE FOR CREATING A LIST ---
        //1. CREATE UL
        const myUL = $("<ul>").appendTo(newDiv);

        //2. CREATE AN ARRAY OF MEASUREMENTS & PUSH ITEMS INTO IT (ITEMS COME AS SINGLE STRING ITEMS)
        const measurements = [];
        for (properties in unpackDrinkDetails.drinks[0]) {
          if (
            properties.includes("strMeasure") &&
            unpackDrinkDetails.drinks[0][properties]
          ) {
            measurements.push(unpackDrinkDetails.drinks[0][properties]);
          }
        }
        //3. CREATE AN ARRAY OF INGREDIENTS & PUSH ITEMS INTO IT (ITEMS COME AS SINGLE STRING ITEMS)
        const ingredients = [];

        for (properties in unpackDrinkDetails.drinks[0]) {
          if (
            properties.includes("strIngredient") &&
            unpackDrinkDetails.drinks[0][properties]
          ) {
            ingredients.push(unpackDrinkDetails.drinks[0][properties]);
          }
        }

        //COMBINE INGREDIENTS AND MEASUREMTS ARRAYS
        //ERROR DUE TO REDEFINING SCOPE W/ CONST
        let mixDrink = "";
        const length = Math.max(ingredients.length, measurements.length);
        for (let i = 0; i <= length - 1; i++) {
          // console.log(ingredients, measurements);
          if (measurements[i] != undefined) {
            console.log(measurements[i]);
            mixDrink = ingredients[i] + " " + measurements[i];
          } else {
            mixDrink = ingredients[i];
          }
          console.log(mixDrink);
          //APPEND THE COMBINED STRING TO DRINK NAME/ AUTO HIDE DIV
          const ingredientList = $("<li>").text(mixDrink);
          ingredientList.css("text-align", "left");
          ingredientList.appendTo(newDiv);
        }
        //END OF LIST CREATION ---

        //DRINK INSTRUCTIONS TITLE
        const instructionsTitle = $("<p>")
          .text("Instructions: ")
          .css("text-align", "left")
          .css("font-weight", "600")
          .appendTo(newDiv);

        //DRINK INSTRUCTIONS CONTENT
        const drinkInstructions = $("<p>")
          .text(unpackDrinkDetails.drinks[0].strInstructions)
          .css("text-align", "left")
          .css("line-height", "1.6em")
          .appendTo(newDiv);
        //
      });
    }
  };
  //TOGGLE MY CONTENT
  $(".showMeTheData").on("click", ".drinkClass", event => {
    console.log("clicked");
    console.log($(event.currentTarget));
    $(event.currentTarget.nextSibling).slideToggle("slow");
  });

  //SEARCH BY ALCOHOL TYPE
  $(".clickSearch").on("click", event => {
    event.preventDefault();
    const searchBoxInput = $(".searchBoxInput");
    const searchBoxVal = searchBoxInput.val();
    const filter = `filter.php?i=${searchBoxVal}`;
    // console.log(searchBoxVal);

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
    //THE LINE BELOW CLEARS THE CONTENT BEFORE ANY NEW REQUEST
    $(".showMeTheData").html("");
  });
});
