
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {selectionSort} from './sortingAlgorithms'
import {insertionSort} from './sortingAlgorithms'
import {mergeSort} from './sortingAlgorithms'

function randomNumber(start, end) {
  let randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
  return randomNumber;
}

function Bar(props) {
  return <div className = "bar" style={{ height: `${props.value}px` }} >  </div>
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
      deletedSorts: []
    };
  }
  componentDidMount(){
    this.resetArray();
    this.deleteExtraSorts();
  }
  
  //Animations for SelectionSort
  selection(){
    let arr = this.setArray();
    selectionSort(arr);
  }
  //Animations for InsertionSort
  insertion(){
    let arr = this.setArray();
    insertionSort(arr);
  }
  //Animations for MergeSort
  merge(){
    let arr = this.setArray();
    mergeSort(arr);
  }


  setArray() {
    let lines = document.getElementsByClassName('bar');
    let arr = [];
    for (let i = 0; i < lines.length; i++) {
      let style = window.getComputedStyle(lines[i]);
      arr.push(parseInt(style.height));
    }
    return arr;
  }
  

  resetArray() {
    let lines = document.getElementsByClassName('bar');
    for (let i = 0; i < lines.length; i++) {
      lines[i].style.order = -1;
      lines[i].style.backgroundColor = '#283054';
    }
    let bars = [];
    let numOfBars = document.getElementById("numOfBars");
    for (let i = 0; i < numOfBars.value; i++) {
      bars.push(randomNumber(45, 400));
    }
    this.setState({bars: bars});
  }

  goRight() {
    let popUp = document.getElementById('switch');
    let currentSort = popUp.getElementsByTagName('h3')[1];

    popUp.insertBefore(this.state.deletedSorts[0], currentSort);
    popUp.removeChild(currentSort);
    this.setState({deletedSorts: [this.state.deletedSorts[1], currentSort]});
  }
  goLeft() {
    let popUp = document.getElementById('switch');
    let currentSort = popUp.getElementsByTagName('h3')[1];

    popUp.insertBefore(this.state.deletedSorts[1], currentSort);
    popUp.removeChild(currentSort);
    this.setState({deletedSorts: [currentSort, this.state.deletedSorts[0]]});
  }

  deleteExtraSorts() {
    let popUp = document.getElementById('switch');
    let del1 = popUp.getElementsByTagName('h3')[2];
    let del2 = popUp.getElementsByTagName('h3')[3];
    popUp.removeChild(del1);
    popUp.removeChild(del2);
    this.setState({deletedSorts: [del1, del2]});
  }

  /**
   * https://unicode-table.com/en/1405/
   * This is where I got the arrows
   */
  render() {
    let {bars} = this.state;
    return (
      <div className = "wrapper">
        <div className = "header">
          <h1>Sorterer</h1>
          <div id = 'reset'>
            <h3 onClick = {() => this.resetArray()}>Reset Array</h3>
            <input id = "numOfBars" type = "number" defaultValue = "32" min = "2" max = "200"/>
          </div>
          <div id = "switch">
            <h3 onClick = {() => this.goLeft()}> ᐊ </h3>
            <h3 onClick = {() => this.selection()}>Selection Sort</h3>
            <h3 onClick = {() => this.insertion()}>Insertion Sort</h3>
            <h3 onClick = {() => this.merge()}>Merge Sort</h3>
            <h3 onClick = {() => this.goRight()}> ᐅ </h3>
          </div>
        </div>
        <div id = "myBody">
          {bars.map( (value, index) => (<Bar value = {value} key = {index}/>))}
        </div>
        <div className = "footer">
          <h2 className = "speedescription"> Drag and Release to increase speed </h2>
          <div id = "container"> <div id = "elipse" draggable = "true" dragconstraint = "horizontal"></div> </div>
        </div>
      </div>
    );
  }
}

class Sort extends React.Component {
  render() {
    return (
      <div>
        <Body/>
      </div>
    );
  }
}

ReactDOM.render(
  <Sort />,
  document.getElementById('root')
);
