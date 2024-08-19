import Storage from './Storage';

export default class Tracalories{
    constructor(){
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        console.log(this._calorieLimit, this._totalCalories);
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();
        this._render();
    }
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += Number(meal.calories);
        Storage.saveMeals(this._meals);
        console.log(meal);
        this._render();
    }
    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= Number(workout.calories);
        Storage.saveWorkouts(this._workouts);
        console.log(workout);
        this._render();
    }
    setLimit(limit){
        this._calorieLimit = limit;
        Storage.setCalorieLimit(limit);
        this._displayCaloriesLimit();
        this._render();
    }
    removeMeal(id){
        const index = this._meals.findIndex((m) => m.id === id);
        console.log(this._meals);
        if (index!==-1){
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            this._meals.splice(index,1);
            Storage.removeMeal(id);
            this._render();
        }
    }
    removeWorkout(id){
        const index = this._workouts.findIndex((w) => w.id === id);
        if (index!==-1){
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            this._workouts.splice(index,1);
            Storage.removeWorkout(id);
            this._render();
        }
    }
    _displayCaloriesTotal(){
        document.getElementById('calories-total').textContent = this._totalCalories;
        console.log(this._totalCalories, 'display')
    }
    _displayCaloriesLimit(){
        document.getElementById('calories-limit').textContent = this._calorieLimit;
    }
    _displayCaloriesConsumed(){
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const caloriesConsumed = this._meals.reduce(
            (accumulator, meal) => accumulator + Number(meal.calories), 0
        )
        caloriesConsumedEl.textContent = caloriesConsumed;
    }
    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const caloriesBurned = this._workouts.reduce(
            (accumulator, workout) => accumulator + Number(workout.calories), 0
        )
        caloriesBurnedEl.textContent = caloriesBurned;
    }
    _displayCaloriesRemaining(){
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const caloriesRemaining = this._calorieLimit - this._totalCalories;
        caloriesRemainingEl.textContent = caloriesRemaining;

        if (caloriesRemaining <= 0){
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
        }
        else{
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
        }
    }
    _displayCaloriesProgress(){
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        let width = Math.min(percentage, 100);
        if(this._totalCalories < 0){
            width = 0;
        }
        progressEl.style.width = width + '%';
    }
    _render(){
        Storage.setCalorieLimit(this._calorieLimit);
        Storage.setTotalCalories();
        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesBurned();
        this._displayCaloriesConsumed();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
    reset(){
        this._meals = [];
        this._workouts = [];
        this._calorieLimit = Storage.getCalorieLimit(this._calorieLimit);
        this._totalCalories = Storage.getTotalCalories(this._totalCalories);
        this._render();
    }
}