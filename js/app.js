$(() => {
  //SHOW ME THE DATA
  const unpackMyAPI = apiData => {
    // console.log("API sent", apiData.drinks);

    for (let i = 0; i < apiData.drinks.length; i++) {
      //DRINK NAME
      const drinkName = $("<h2>")
        .text(apiData.drinks[i].strDrink)
        .appendTo(".showMeTheData");
      console.log(drinkName);

      //DRINK ID (NO SHOW) - USE TO PULL INGRIDIENTS
      const drinkId = apiData.drinks[i].idDrink;
      console.log(drinkId);

      //PUSH ID TO FULL DRINK DETAILS URL ----------------------------------
      const URLPush = {
        async: true,
        crossDomain: true,
        url: `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkId}`,
        method: "GET",
        headers: {
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "439e57812bmsh2e86010b0756704p118e87jsne6da69923959"
        }
      };
      //   $.ajax(URLPush).done(function(unpackDrinkDetails) {
      console.log(URLPush);
      //   });
      //
      /// END URL PUSH -----------------------------------------------------
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
  });
});

//FULL COCKTAIL DETAILS API
url: "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007";
