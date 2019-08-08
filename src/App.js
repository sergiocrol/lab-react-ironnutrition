import React, { Component } from 'react';
import './App.css';
import foods from './data/foods.json';
import FoodBox from './components/FoodBox';
import Search from './components/Search';

class App extends Component {
  state = {
    name: '',
    calories: '',
    image: '',
    quantity: '0',
    foods,
    display: 'none',
    valueGuai: '',
    foodsToday: [],
    totalCalories: '0'
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  addFood = (event) => {
    const { display } = this.state;
    // event.preventDefault();
    const newDisplay = (display === 'block') ? 'none' : 'block';
    this.setState({
      display: newDisplay
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, calories, image, quantity, foods } = this.state;
    const newFoods = [...foods];
    const newFood = { name, calories, image, quantity };
    newFoods.push(newFood);

    this.setState({
      foods: newFoods,
      name: '',
      calories: '',
      image: ''
    })
    this.addFood();
  }

  compareValue = (newValue) => {
    this.setState({
      valueGuai: newValue
    })
  }

  addTodaysFood = (newTodayFood) => {
    const { foodsToday } = this.state;
    const newFoodsToday = [...foodsToday];
    const exists = newFoodsToday.map((food) => { return food.name }).indexOf(newTodayFood.name);
    exists === -1 ? newFoodsToday.push(newTodayFood) : newFoodsToday[exists].newValue++;
    this.setState({
      name: newTodayFood.name,
      calories: newTodayFood.calories,
      quantity: newTodayFood.newValue,
      foodsToday: newFoodsToday,
    })
  }

  delete = index => {
    const newFoodsToday = [...this.state.foodsToday];
    newFoodsToday.splice(index, 1);
    this.setState({
      foodsToday: newFoodsToday
    })
  }


  render() {
    const { name, calories, image, foods, display, valueGuai } = this.state;
    let sumCalories = 0;
    return (
      <div className="App">
        <button onClick={this.addFood}>Add food</button>
        <Search getvalue={this.compareValue} />
        <form onSubmit={this.handleSubmit} style={{ display }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={this.handleInputChange}
          />

          <label htmlFor="calories">Calories</label>
          <input type="number"
            name="calories"
            id="calories"
            placeholder="0"
            value={calories}
            onChange={this.handleInputChange}
          />

          <label htmlFor="image">image</label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={this.handleInputChange}
          />
          <button type="submit">add new food</button>
        </form>

        <div className="columns">
          <div className="column">
            {foods.map((food, index) => {
              if (food.name.toLowerCase().includes(valueGuai)) {
                return (
                  <FoodBox data={food} key={index} index={index} addParentTodayFood={this.addTodaysFood} />
                )
              } else {
                return null;
              }
            })}
          </div>
          <div className="column">
            <h3>Today's food</h3>
            <ul>
              {this.state.foodsToday.map((foodToday, index, arr) => {
                sumCalories = sumCalories + (foodToday.newValue * foodToday.calories);
                return (
                  <li key={index}>{foodToday.newValue} {foodToday.name} = {foodToday.newValue * foodToday.calories} cal<a className="delete" onClick={() => { this.delete(index) }}></a></li>
                )
              })
              }
            </ul>
            <p>Total calories: {sumCalories}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
