
// var blink =
//     document.getElementById('blink');

// setInterval(function () {
//     blink.style.opacity =
//         (blink.style.opacity == 0 ? 1 : 0);
// }, 1000);

function myFunction() {
    let meal = document.querySelector('#search').value;
    let image = document.querySelector('#image');
    let mealname = document.querySelector('#meal');
    let ingredients = document.querySelector('#ingredients');
    let searchbtn = document.querySelector('.searchBtn');
    let recipe = document.querySelector('#recipestep');
    searchbtn.innerHTML = "<i class=\"fa fa-circle-o-notch fa-spin\"></i>";

    let data = {
        meal
    }

    fetch('http://127.0.0.1:5001/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            image.setAttribute('src', data.meal_image_b64);
            mealname.innerHTML = data.meal_name;
            let ing = data.ingredients;
            let ingr = "";
            ing.forEach(element => {
                ingr += "<li>"+element+"</li>";
            });
            ingredients.innerHTML = ingr;
            let recipesteps = data.recipe;
            recipesteps = recipesteps.split(". ");
            let steps = "<ul>";
            recipesteps.forEach(element => {
                steps += "<li>"+element+"</li>";
            });
            steps += "</ul>";
            recipe.innerHTML = steps;
            searchbtn.innerHTML = "<i class=\"fa fa-search\"></i> Search";
        })
        .catch(error => {
            console.error(error);
            searchbtn.innerHTML = "<i class=\"fa fa-search\"></i> Search";
        });
}

function loadRandom()
{
    let image = document.querySelector('#image');
    let meal = document.querySelector('#meal');
    let recipe = document.querySelector('#recipestep');
    let ingredients = document.querySelector('#ingredients');

    fetch('http://127.0.0.1:5001/random', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            image.setAttribute('src', data.meal_image_b64);
            meal.innerHTML = data.meal_name;
            let ing = data.ingredients;
            let ingr = "";
            ing.forEach(element => {
                ingr += "<li>"+element+"</li>";
            });
            ingredients.innerHTML = ingr;
            let recipesteps = data.recipe;
            recipesteps = recipesteps.split(". ");
            let steps = "<ul>";
            recipesteps.forEach(element => {
                steps += "<li>"+element+"</li>";
            });
            steps += "</ul>";
            recipe.innerHTML = steps;
        })
        .catch(error => {
            console.error(error);
        });
}

loadRandom();