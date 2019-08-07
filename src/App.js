import React, { Component } from 'react';
import './App.css';
import foods from './data/foods.json';
import FoodBox from './components/FoodBox';

class App extends Component {
  state = {
    name: '',
    calories: '',
    image: '',
    quantity: '1',
    foods,
    display: 'none',
    valueInput: ''
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value 
    })
  }

  addFood = (event) => {
    const {display} = this.state;
    // event.preventDefault();
    const newDisplay = (display === 'block') ? 'none' : 'block';
    this.setState({
      display: newDisplay
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, calories, image, quantity, foods} = this.state;
    const newFoods = [...foods];
    const newFood = {name, calories, image, quantity}; 
    newFoods.push(newFood);
    
    this.setState({
      foods: newFoods,
    })
    this.addFood();    
  }

  searchFood = (event) => {
    const newValue = event.target.value;
    this.setState({
      valueInput: newValue
    })
  }


  render() {
    const {name, calories, image, foods, display, valueInput} = this.state;
    return (
      <div className="App">

        <button onClick={this.addFood}>Add food</button>

        <input type="text" name="" value={valueInput} onChange={this.searchFood} />

        <form onSubmit={this.handleSubmit} style={{display}}>
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

        { foods.map((food, index) => {
          if(food.name.toLowerCase().includes(valueInput)){
            return(
              <FoodBox data={food} key={index}/>
            )
          } else {
            return null;
          }
        })

        }
      </div>
    );
  }
}

export default App;
