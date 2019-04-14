import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';
import loadingGif from './loading.gif';


class App extends Component {
constructor(){
  super();
  this.state ={
    newTodo: '',
    editing: false,
    editingIndex: null,
    notification: null,
     todos: [],
     loading: true
  };


  this.apiUrl = 'https://5c78b1013a89af0014cd7103.mockapi.io/';



  
  // binding of function
  this.alert = this.alert.bind(this);
  this.updateTodo = this.updateTodo.bind(this);
  this.addTodo = this.addTodo.bind(this);  
  this.deleteTodo = this.deleteTodo.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.generateTodoId = this.generateTodoId.bind(this);


}



async componentDidMount() {
  const response = await axios.get(`${this.apiUrl}/todos`);
  setTimeout(() => {
    this.setState({
      todos: response.data,
      loading: false
    });
  }, 1000);
}
  



// addTodo function 

async addTodo() {
  // const newTodo = {
  //   name: this.state.newTodo, // current todo typed in the input box
  //   id: this.generateTodoId() // get the last element by id and adding 1 to the id
  // };

  const response = await axios.post(`${this.apiUrl}/todos`, {
    name: this.state.newTodo
  });

  const todos = this.state.todos;   // cloning old to  dos
  todos.push(response.data); // push in new to dos

  this.setState({
    todos: todos, // set state to the todos the need to be updated
    newTodo: ''
  });
  this.alert('Todo added successfully.');

}
// update to do funcion

async updateTodo() {

  const todo = this.state.todos[this.state.editingIndex];

  const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
    name: this.state.newTodo
  });

    const todos = this.state.todos;

    todos[this.state.editingIndex] = response.data;

    this.setState({
      todos,
      editing: false,
      editingIndex: null,
      newTodo: ''
    });
    this.alert('Todo updated successfully.');

}


// handleChange function

handleChange(event) {
//console.log(event.target.value, event.target.name)

  this.setState({
    newTodo: event.target.value
  });
}

// delete a todo function

async deleteTodo(index) {
  //console.log(index)
  const todos = this.state.todos;
  const todo = todos[index];


  await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
  delete todos[index];


  this.setState({ todos });
  this.alert('Todo deleted successfully.');

}


// alert notify


alert(notification) {
  this.setState({
    notification
  });

  setTimeout(() => {
    this.setState({
      notification: null
    });
  }, 2000);
}

// edit to do
editTodo(index) {
  const todo = this.state.todos[index];
  this.setState({
    editing: true,
    newTodo: todo.name,
    editingIndex: index
  });
}

// generate to do id


generateTodoId() {
  const lastTodo = this.state.todos[this.state.todos.length - 1];
  if (lastTodo) {
    return lastTodo.id + 1;
  }

  return 1;
}


  render() {
    return (
      <div className="App">
        <header className="">
          <img src={logo} className="App-logo" alt="logo" />
 
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
          <div  className="container" >
          <h2 className="text-center p-4"> Kenya To Do App</h2>
          {
            this.state.notification &&
            <div className="alert mt-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
          }


          
            <input 
            type="text" 
            name="todo"
            className="my-4 form-control"
            placeholder="Add A To Do"
            onChange={this.handleChange}
            value={this.state.newTodo}
            />

            <button 
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            className="btn-success mb-3 form-control" 
            disabled={this.state.newTodo.length < 5}
            >       
                 {this.state.editing ? 'Update List' : ' Add To Do'}
            </button>

            
                 {
                  this.state.loading &&
                  <img src={loadingGif} alt=""/>
                }
            

            {
            (!this.state.editing || this.state.loading) &&
            <ul className="list-group">
           {this.state.todos.map((item, index) => {
             return <ListItem
             key={item.id}
             item={item}
             editTodo={() => { this.editTodo(index); }}
             deleteTodo={() => { this.deleteTodo(index); }}
           />;

           })}


              {/* <li className="list-group-item"> Buy Some Clothes</li>
              <li className="list-group-item"> Write Some Code</li>
              <li className="list-group-item"> VRInvoke</li> */}
            </ul>
}
          </div>

      </div>
    );
  }
}
// Delete Functionality
// button takes in an onclick event listener then takes in a function with this.deleteTodo(index); parameters.
// we bind the function next and define the deleteTodo function by updating state and delete todos by the index in the array 
// and then set the state

//Updating to do will also takes in the index so we know which one to invoke
// set state ediiting to true
//             {this.state.editing ? 'Update todo' : 'Add todo'} ternanry function. if editing state is true then 
// button says update if false then add a to do



// Extracting an Input from textbox

// onChange={this.handleChange}
// handleChange event gets invoke when the handleChange is called.
// console.log(event.target.value, event.target.name) will get the inputs value being type and name of element
// newTodo is set to empty within constructor function. will be initialize when it get written to. 


// state is immutable, only way to set state is with the set state function

// Displaying Items in An Array
// [1,2,3,4].map(item =>{
//  return item + 1;
//  })
// [2,3,4,5]


export default App;
