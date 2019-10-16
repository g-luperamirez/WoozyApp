$(() => {
  //SHOW MY MY DATA
  const response = apiData => {
    console.log("API send", apiData);

    // for(let i = 0; i < apiData.length; i++) {
    const DrinkName = $("<h1>")
      .text(apiData[1].strDrink)
      .appendTo($(".showMeTheData"));
    console.log(DrinkName);
    // }
  };

  //SEARCH BY ALCOHOL TYPE
  $(".clickSearch").on("click", event => {
    event.preventDefault();

    const searchBoxInput = $(".searchBoxInput");
    const searchBoxVal = searchBoxInput.val();
    console.log(searchBoxVal);

    //AJAX CONNECTION
    const drinksAPI = {
      async: true,
      crossDomain: true,
      url: `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${searchBoxVal}`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "439e57812bmsh2e86010b0756704p118e87jsne6da69923959"
      }
    };
    $.ajax(drinksAPI).done(function(response) {
      console.log(response);
    });
  });
});
