export default class Storage{

    static initTotalCalories(){
        let totalCalories = this.getTotalCalories();
        const meals = this.getMeals();
        const workouts = this.getWorkouts();
        for (let meal of meals){
            totalCalories += meal.calories;
        }
        for(let workout of workouts){
            totalCalories -= workout.calories;
        }
        this.setTotalCalories(totalCalories);
        return totalCalories;   
    }


    static getCalorieLimit(defaultLimit = 2000){
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null){
            calorieLimit = defaultLimit;
        }
        else{
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit(limit){
        localStorage.setItem('calorieLimit', limit);
    }
    
    static getTotalCalories(defaultTotal = 0){
        let totalCalories;
        if(localStorage.getItem('totalCalories') === null){
            totalCalories = defaultTotal;
        }
        else{
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static setTotalCalories(total){
        localStorage.setItem('totalCalories', total);
    }

    static getMeals(){
        let meals;
        if(localStorage.getItem('meals') === null){
            meals = [];
        }
        else{
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;
    }

    static saveMeals(meals){
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static removeMeal(id){
        const meals = this.getMeals();
        console.log(meals);
        meals.forEach((meal, index) => {
            if(meal.id === id){
                meals.splice(index, 1);
            }
        })
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static saveWorkouts(workouts){
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static getWorkouts(){
        let workouts;
        if(localStorage.getItem('workouts') === null){
            workouts = [];
        }
        else{
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    }

    static removeWorkout(id){
        const workouts = this.getWorkouts();
        workouts.forEach((workout, index) => {
            if(workout.id === id){
                workouts.splice(index, 1);
            }
        })
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static saveWorkouts(workouts){
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

}