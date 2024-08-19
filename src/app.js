/*<link rel="stylesheet" href="css/fontawesome.css" />
    <link rel="stylesheet" href="css/bootstrap.css" />
    <link rel="stylesheet" href="css/style.css" /> 
    <script src="js/bootstrap.bundle.min.js" defer></script>*/

import '@fortawesome/fontawesome-free/js/all';
import {Modal, Collapse} from 'bootstrap';
import './css/bootstrap.css';
import './css/style.css';

import Meal from './Meal';
import Workout from './Workout';
import Tracalories from './Tracalories';

//APP
class App{
    constructor(){
        this._tracker = new Tracalories();
        document.getElementById('meal-form')
            .addEventListener('submit', this._newMeal.bind(this));
        document.getElementById('workout-form')
            .addEventListener('submit', this._newWorkout.bind(this)); 
        document.getElementById('meal-items')
            .addEventListener('click', this._removeItem.bind(this, 'meal'));
        document.getElementById('workout-items')
            .addEventListener('click', this._removeItem.bind(this, 'workout'));
        document.getElementById('filter-meals')
            .addEventListener('keyup', this._filterItem.bind(this, 'meal'));    
        document.getElementById('filter-workouts')
            .addEventListener('keyup', this._filterItem.bind(this, 'workout'));
        document.getElementById('reset')
            .addEventListener('click', this._reset.bind(this));
        document.getElementById('limit-form')
            .addEventListener('submit', this._setLimit.bind(this));
        document.addEventListener('DOMContentLoaded', this._loadItems.bind(this));    
    }
    _newMeal(e){
        e.preventDefault();
        const name = document.getElementById('meal-name');
        const calorie = document.getElementById('meal-calories');

        if(name.value === '' || calorie.value === ''){
            alert('Please input');
            return;
        }
        const meal = new Meal(name.value, Number(calorie.value));
        this._tracker.addMeal(meal);
        this._displayNewMeal(meal)
        
        name.value = '';
        calorie.value = '';
    }
    _newWorkout(e){
        e.preventDefault();
        const name = document.getElementById('workout-name');
        const calorie = document.getElementById('workout-calories');

        if(name.value === '' || calorie.value === ''){
            alert('Please input');
            return;
        }
        const workout = new Workout(name.value, Number(calorie.value));
        this._tracker.addWorkout(workout);
        this._displayNewWorkout(workout);

        name.value = '';
        calorie.value = '';
    }
    _displayNewMeal(meal){
        const mealCard = document.createElement('div');
        mealCard.classList.add('card', 'my-2');
        mealCard.setAttribute('data-id', meal.id);
        mealCard.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`
        const mealItems = document.getElementById('meal-items');
        mealItems.appendChild(mealCard);
    }
    _displayNewWorkout(workout){
        const workoutCard = document.createElement('div');
        workoutCard.classList.add('card', 'my-2');
        workoutCard.setAttribute('data-id', workout.id);
        workoutCard.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">z
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`
        const workoutItems = document.getElementById('workout-items');
        workoutItems.appendChild(workoutCard);
    }
    _removeItem(type, e){   
        if(
            e.target.classList.contains('delete') ||
            e.target.classList.contains('fa-xmark')
        ){
            if (confirm('Delete?')){
                const id = e.target.closest('.card').getAttribute('data-id');
                console.log(id);
                type === 'meal'
                    ? this._tracker.removeMeal(id) 
                    : this._tracker.removeWorkout(id);
                e.target.closest('.card').remove();
            }
        }
    }

    _filterItem(type, e){
        const filter = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
            const text = item.firstElementChild.firstElementChild.firstElementChild.textContent;
            if(text.toLowerCase().indexOf(filter) !== -1){
                item.style.display = 'block';
            }
            else{
                item.style.display = 'none';
            }
        })
    }

    _setLimit(e){
        e.preventDefault();
        const limit = document.getElementById('limit');
        if(limit.value === ''){
            alert('Please Input');
            return;
        }
        this._tracker.setLimit(+limit.value);
        limit.value = '';

        const modalEl = document.getElementById('limit-modal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();    
    }

    _reset(){
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _loadItems(){
        console.log(JSON.parse(localStorage.getItem('meals')));
        JSON.parse(localStorage.getItem('meals'))
            .forEach((meal) => {
                this._displayNewMeal(meal);
                this._tracker._meals.push(meal);
            });
        JSON.parse(localStorage.getItem('workouts'))
            .forEach((workout) => {
                this._displayNewWorkout(workout);
                this._tracker._workouts.push(workout);
            });    
    }

}

const app = new App();

localStorage.setItem('totalCalories', 0);

