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

**Main Struggle:** Combined both arrays but received "undefined" when the measurement and ingredient arrays per drink were not the same length.

```javascript
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
 ```

#### Challenge 3 -
**JQuery Toggle:** 
A jQuery function I wanted for Woozy users was for them to be able to click on the drink name and have the drink recipe slide down. 

**Main Struggle:**
Implemented the jQuery slideToggle function, however, the function looped based on the search result count and opened all drink results at once.

```javascript
//TOGGLE MY CONTENT
$(".showMeTheData").on("click", ".drinkClass", event => {
    console.log("clicked");
    console.log($(event.currentTarget));
    $(event.currentTarget.nextSibling).slideToggle("slow");
});
```

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

