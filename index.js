const searchFoodBox = document.getElementById("search");
const search = document.getElementById("submit");
const random = document.getElementById("random");
const result_heading = document.getElementById("result_heading");
const meal = document.getElementById("meal");
const overlays = document.querySelector(".overlay");
const fa_xmark = document.querySelector(".fa-xmark");
let searchBoxValue = "";

function moreitems(ids) {
  let {
    strMealThumb,
    strArea,
    strCategory,
    strMeal,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strInstructions,
    strYoutube,
  } = ids;
  meal.innerHTML = `
  
  <div class="single_meal">
  <div class='specific_meal'> 
      <img src= ${strMealThumb} alt = ${strMeal}/>
       <h1>${strMeal}</h1>  
       <h3>${strArea} </h3>
       <p>${strCategory}</p>
      
       <a href= ${strYoutube} ><i class="fa-brands fa-youtube"></i> </a>
       <p>${strInstructions} </p>

        <div class="ingridients"> 
          <h3> Ingridients List </h3>
             <div class="ingridient">
           <span>${strIngredient1}</span>
       <span>${strIngredient2}</span>
       <span>${strIngredient3}</span>
       <span>${strIngredient4}</span>
       <span>${strIngredient5}</span>
       <span>${strIngredient6}</span>
       <span>${strIngredient7}</span>
       </div>
        </div>
  </div>
  </div>
    `;
}
function foodData(x) {
  searchBoxValue = searchFoodBox.value;
  x.preventDefault();
  if (searchBoxValue.length > 0) {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBoxValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        result_heading.innerHTML = `<h2>Results for ${searchBoxValue} is :</h2>`;
        if (data.meals === null) {
          result_heading.innerHTML = `<h2>Results for ${searchBoxValue} is not found :</h2>`;
        } else {
          meal.innerHTML = data.meals
            .map((e) => {
              let { strMealThumb, idMeal, strMeal } = e;

              return `
              <div class='meals'>
                <img src="${strMealThumb}" alt="${strMeal}"> 
                <div class='meal-info' meal-id='${idMeal}'>
                  <h3>${strMeal}</h3>
                  <button onClick="moreitems(${JSON.stringify(e).replace(
                    /"/g,
                    "&quot;"
                  )})" id="more_items" class="more-items">Details</button>                  
                </div>
              </div>`;
            })
            .join("");
        }
      });
  } else {
    search.addEventListener("click", (e) => {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      overlays.classList.remove("overlay");
      return;
    });
  }
}

search.addEventListener("submit", foodData);
fa_xmark.addEventListener("click", () => {
  overlays.classList.add("overlay");
});

random.addEventListener("click", (e) => {
  async function random() {
    const data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const apiData = await data.json();
    result_heading.innerHTML = apiData.meals.map((e) => {
      let {
        strMealThumb,
        strArea,
        strCategory,
        strMeal,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strInstructions,
        strYoutube,
      } = e;
      return `  
       <div class="single_meal">
      <div class='specific_meal'>
      <img src= ${strMealThumb} alt = ${strMeal}/>
       <h1>${strMeal} </h1>
       <h3>${strArea} </h3>
       <p>${strCategory}</p>
       <a href= ${strYoutube} ><i class="fa-brands fa-youtube"></i> </a>
       <p>${strInstructions} </p>
        <div class="ingridients"> 
        <h3> Ingridients List </h3>
          <div class="ingridient">
           <span>${strIngredient1}</span>
       <span>${strIngredient2}</span>
       <span>${strIngredient3}</span>
       <span>${strIngredient4}</span>
       <span>${strIngredient5}</span>
       <span>${strIngredient6}</span>
       <span>${strIngredient7}</span></div>
        </div>
       </div>
  </div>`;
    });
  }
  random();
});
