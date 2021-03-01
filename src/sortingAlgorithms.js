
/**https://www.sitepoint.com/delay-sleep-pause-wait/ */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sort(newArr) {
  let arr = newArr.slice();
  let lines = document.getElementsByClassName('bar');
  for (let i = 0; i < lines.length; i++) {
      lines[i].style.height = `${arr[i]}px`;
      lines[i].style.order = '-1';
  }
  
}
async function endAnimation(sortedArray, doSort) {
  let lines = document.getElementsByClassName('bar');
  for (let i = 0; i < lines.length; i++) {
      lines[i].style.backgroundColor = '#82D2EE';
  }
  await sleep(1000);
  for (let i = 0; i < lines.length; i++) {
      lines[i].style.backgroundColor = '#283054';
  }
  if (doSort) {
      sort(sortedArray);
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////               ALGORITHMS FOR SORTING AND ANIMATIONS WITH IN THE METHODS               /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let milisecond = 1500;

/**
* 
* @param {*Array with heights of bars} arr 
* This is the selectionSort Algorithm
* Uses inserBefore method in order to sort
*/
export async function selectionSort(arr){
  let miliseconds = milisecond;
  let newArray = arr.slice();
  let sortedArray = [];
  let lines = document.getElementsByClassName('bar');
  let wrap = document.getElementById('myBody'); 
  let lineCopies = [];
  for (let i = 0; i < lines.length; i++) {
      lineCopies.push(lines[i]);
  }
  let currentSmallest = null;
  while (lineCopies.length > 0) {
      miliseconds = milisecond;
      let index = 0;
      let size = 401;
      for(let i = 0; i < lineCopies.length; i++) {
          if (i > 0 && (i-1) !== index) {
              lineCopies[i-1].style.backgroundColor = "#283054";
          }
          miliseconds = milisecond;
          lineCopies[i].style.backgroundColor = "#8ED1C0";
          await sleep(miliseconds);
          if (newArray[i] < size) {
              if (currentSmallest != null) {
                  currentSmallest.style.backgroundColor = "#283054";
              }
              currentSmallest = lineCopies[i];
              size = newArray[i];
              currentSmallest.style.backgroundColor = "#DE9B59";
              await sleep(miliseconds);
              index = i;
          }
      }
      lineCopies[lineCopies.length - 1].style.backgroundColor = "#283054";
      currentSmallest.style.backgroundColor = '#D186A4';
      await sleep(miliseconds);
      wrap.insertBefore(currentSmallest, lines[lines.length]);
      await sleep(miliseconds);
      sortedArray.push(newArray[index]);
      newArray.splice(index, 1);
      lineCopies.splice(index, 1);
      currentSmallest = null;
  }
  endAnimation(sortedArray, false);
}
/**
* 
* @param {*Array with heights of bars} arr 
* 
* New method will be to set a order to each item according to their index 
* and then switch them when needed. The new list being created will be
* in front of the whole list.
* 
* Done using style.order to experiment with this method
*/
export async function insertionSort(arr) {
  let miliseconds = milisecond;
  let newArray = arr.slice();
  let sortedArray = [];
  let lines = document.getElementsByClassName('bar');
  let originalIndexToIndexNow = [];
  /** How to get style of an element
   * let style1 = window.getComputedStyle(lines[0]);
   * let style2 = window.getComputedStyle(lines[1]);
   * style1.order == `0`
   * https://attacomsian.com/blog/javascript-get-css-styles
   */
  for (let bar = 0; bar < newArray.length; bar++) {
      miliseconds = milisecond;
      lines[bar].style.backgroundColor = '#8ED1C0';
      await sleep(miliseconds);
      lines[bar].style.order = `${bar}`;
      originalIndexToIndexNow.push(bar);
      sortedArray.push(newArray[bar]);
      if (bar > 0) {
          if (sortedArray[bar] < sortedArray[bar - 1]) {
              for (let j = sortedArray.length - 1; j >= 0; j--) {
                  if (sortedArray[j] < sortedArray[j-1]) {
                      //lines[bar].style.backgroundColor = '#999999';
                      let clone = sortedArray[j];
                      sortedArray[j] = sortedArray[j-1];
                      sortedArray[j-1] = clone;
                      let indexClone = originalIndexToIndexNow[j];
                      miliseconds = milisecond;
                      await sleep(miliseconds);
                      lines[originalIndexToIndexNow[j]].style.order = `${j-1}`;
                      lines[originalIndexToIndexNow[j-1]].style.order = `${j}`;
                      originalIndexToIndexNow[j] = originalIndexToIndexNow[j-1];
                      originalIndexToIndexNow[j-1] = indexClone;
                  } else {
                      break;
                  }
              }
          }
      }
      await sleep(miliseconds);
      lines[bar].style.backgroundColor = '#D186A4';
      await sleep(miliseconds);
  }
  endAnimation(sortedArray, true);
}




/**
* 
* @param {*Array with heights of bars} arr 
* 
* The Algorithm for MergeSort 
* 
* Uses mergeSortHelper in order to use recursion from merge
* 
* Done using insertBefore since style.order was taking too long to make it work
* and insertBefore was much easier to think about recursively
*/
let lines = null;
let wrap = null;

export async function mergeSort(arr) {
  lines = document.getElementsByClassName('bar');
  wrap = document.getElementById('myBody'); 
  let numArray = [];
  for (let line = 0; line < lines.length; line++) {
      numArray[line] = line;
  }
  let sortedArray = await mergeSortHelper(arr, numArray);
  endAnimation(sortedArray, false);
  return sortedArray;
}

async function mergeSortHelper(arr, positionsArr) {
  if (arr.length <= 1) {
      return arr;
  }
  let mid = Math.floor(arr.length/2);
  let left = await mergeSortHelper(arr.slice(0, mid), positionsArr.slice(0, mid));
  let right = await mergeSortHelper(arr.slice(mid), positionsArr.slice(mid));
  return await merge(left, right, positionsArr);
}

async function merge(arr1, arr2, positionsArr) {
  let result = [];
  let i = 0;
  let j = 0;
  let counter = 0;
  let mid = Math.floor(positionsArr.length/2);
  let firstHalf = positionsArr.slice(0, mid);
  let secondHalf = positionsArr.slice(mid);
  let miliseconds = milisecond;
  let firstHalfOfElements = [];
  let secondHalfOfElements = [];
  for (let i = 0; i < firstHalf.length; i++) {
      firstHalfOfElements.push(lines[firstHalf[i]]);
  }
  for (let i = 0; i < secondHalf.length; i++) {
      secondHalfOfElements.push(lines[secondHalf[i]]);
  }
  //Once either i or j reached arr1.length or arr2.length it finishes!!
  while (i < arr1.length && j < arr2.length) {
      miliseconds = milisecond;
      if (arr1[i] < arr2[j]) {
          let lineOne = firstHalfOfElements[i];
          lineOne.style.backgroundColor = '#DE9B59';
          let lineTwo = secondHalfOfElements[j];
          lineTwo.style.backgroundColor = '#8ED1C0';
          await sleep(miliseconds);
          wrap.insertBefore(lineOne, lines[positionsArr[counter]]);
          await sleep(miliseconds);
          lineTwo.style.backgroundColor = '#283054';
          lineOne.style.backgroundColor = '#283054';
          await sleep(miliseconds);
          result.push(arr1[i]);
          i++;
      } else {
          let lineOne = firstHalfOfElements[i];
          lineOne.style.backgroundColor = '#DE9B59';
          let lineTwo = secondHalfOfElements[j];
          lineTwo.style.backgroundColor = '#8ED1C0';
          await sleep(miliseconds);
          wrap.insertBefore(lineTwo, lines[positionsArr[counter]]);
          await sleep(miliseconds);
          lineTwo.style.backgroundColor = '#283054';
          lineOne.style.backgroundColor = '#283054';
          await sleep(miliseconds);
          result.push(arr2[j]);
          j++;
      }
      counter ++;
  }
  //These while loops should take car of filling result 
  while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
      counter ++;
  }
  while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
      counter ++;
  }
  return result;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////               ANIMATIONS FOR SPEED TOGGLE               ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
* This section will be incharge of animations for speed toggle
*/
let x = 0;
let dragContainer = null;
let transimg = document.createElement('canvas');
transimg.id = "invisible";

window.onload=function(){
  dragContainer = document.getElementById("container");
  let elipse = document.getElementById("elipse");
  elipse.appendChild(transimg);
  elipse.addEventListener('dragstart', dragstarting);
  elipse.addEventListener('touchstart', touchstarting);
}

function dragstarting(event) {
  event.dataTransfer.setData('Test', 'some data');
  event.dataTransfer.setDragImage(transimg, 0, 0);
  this.addEventListener('drag', dragable);
}
function dragable(event) {
  x = event.pageX;
  let percent = 100;
  if (x <= (dragContainer.offsetWidth - 13) && x >= 13) {
      percent = ((dragContainer.offsetWidth - (dragContainer.offsetWidth - (x-13))) / dragContainer.offsetWidth) * 100;
      this.style.left = `${percent}%`;
  }
  this.addEventListener('dragend', dragending);
}
function dragending(event) {
  x = event.pageX;
  let percent = 0;
  if (x <= (dragContainer.offsetWidth - 13) && x >= 13) {
      percent = ((dragContainer.offsetWidth - (dragContainer.offsetWidth - (x-13))) / dragContainer.offsetWidth) * 100;
      this.style.left = `${percent}%`;
  } else if(x > dragContainer.offsetWidth - 13) {
      percent = 100;
  }
  milisecond = 1000 - (1000 * (percent/100));
  // console.log("percent: "+percent);
  // console.log("percent / 100: " + percent/100);
  // console.log(500 * (percent/100));
  // console.log(milisecond);
}

/**
* 
*  For Use of phones 
*/

function touchstarting(event) {
  this.addEventListener('touchmove', touchable);
}
function touchable(event) {
  x = event.touches[0].clientX;
  let percent = 100;
  if (x <= (dragContainer.offsetWidth - 13) && x >= 13) {
      percent = ((dragContainer.offsetWidth - (dragContainer.offsetWidth - (x-13))) / dragContainer.offsetWidth) * 100;
      this.style.left = `${percent}%`;
  }
  this.addEventListener('touchend', touchending);
}
function touchending(event) {
  //x = event.touches[0].clientX;
  let percent = 0;
  if (x <= (dragContainer.offsetWidth - 13) && x >= 13) {
      percent = ((dragContainer.offsetWidth - (dragContainer.offsetWidth - (x-13))) / dragContainer.offsetWidth) * 100;
      this.style.left = `${percent}%`;
  } else if(x > dragContainer.offsetWidth - 13) {
      percent = 100;
  }
  milisecond = 1000 - (1000 * (percent/100));
}

