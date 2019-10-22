# Woozy
Cocktail search engine.

## Description
Woozy offers a wide variety of cocktail drink recipes at the touch of your fingertips! With Woozy users can search various easy to make cocktail recipes by alcohol name.

## Technologies
* HTML
* CSS
* JQuery

## Application Programming Interface (API)
The Cocktail DB via [rapidapi.com](https://rapidapi.com/theapiguy/api/the-cocktail-db/endpoints)
* Search ingredient by name
* Lookup full cocktail details by ID

## Approach

## Challenges
#### Challenge 1 -
**API Connection:** Woozy runs with the Cocktail DB (via Rapid API), however, the API requires the connection of different end-points to create a valuable user experience.

**Main Struggle:** Getting the recipe end-point to recognize the cocktail IDs without requesting a new key. 
```javascript
//SHOW ME THE DATA API
  const unpackMyAPI = apiData => {
    // console.log("API sent", apiData.drinks);

    for (let i = 0; i < apiData.drinks.length; i++) {
      //DRINK ID (NO SHOW) - USED TO PULL INGREDIENTS
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
        // console.log(unpackDrinkDetails);
        //END OF URL PUSH ---
...
...
...
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
  });
```


#### Challenge 2 -
**Array Concatenation:** 
The data from the Cocktail DB is organized in various arrays i.e. Cocktail Measurement is one array and Cocktail Ingredient is another array.  To be able to show the cocktail  ingredients I needed to concatenate both arrays 

**Main Struggle:** I was able to concatenate both arrays but I received "undefined" when the measurement and ingredient arrays per drink were not the same length.

#### Challenge 3 -
```javascript
//TOGGLE MY CONTENT
$(".showMeTheData").on("click", ".drinkClass", event => {
    console.log("clicked");
    console.log($(event.currentTarget));
    $(event.currentTarget.nextSibling).slideToggle("slow");
});
```

## Improvements

## Live Site
https://g-luperamirez.github.io/WoozyApp/

**Note** Site functionality on Safari is tricky.

**Responsiveness**  
![Responsivenes](images/responsive.png)
## Author
Guadalupe Ramirez

## Contributors
* Brian Carroll
* Joem Casusi
* Manny Santana

