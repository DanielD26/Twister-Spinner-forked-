// Import stylesheets
import './style.css';
import { Colours, ColoursHelper } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;



// container for the spinner 
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];



const colourDiv = document.getElementById('colourResult');

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
  }
}

// Inserts the values from the colours.enums into the dropdown menu
const colourSelector: HTMLSelectElement = document.getElementById('colourSelect') as HTMLSelectElement;
for (let i=0; i < coloursArray.length; i++) {
  let newOption: HTMLOptionElement = document.createElement('option');
  newOption.innerHTML = coloursArray[i];
  newOption.value = i.toString();
  colourSelector.add(newOption);
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let body in BodyParts) {
  if (isNaN(Number(body))) {
    bodyPartsArray.push(body);
  }
}
// Inserts the values from the bodyParts.enums into the dropdown menu
const bodyPartSelector: HTMLSelectElement = document.getElementById('bodyPartSelect') as HTMLSelectElement;
for (let i=0; i < bodyPartsArray.length; i++) {
  let newOption: HTMLOptionElement = document.createElement('option');
  newOption.innerHTML = bodyPartsArray[i];
  newOption.value = i.toString();
  bodyPartSelector.add(newOption);
}


// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement> document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100)); 

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  spinCount++;
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array
  let colourIndex: number = 0;
  colourIndex = Math.floor(Math.random() * 4)
  selectedColour = coloursArray[colourIndex];


  // TODO randomly select bodyPart from array
  let bodyPartIndex: number = 0;
  bodyPartIndex = Math.floor(Math.random() * 4)
  selectedBodyPart = bodyPartsArray[bodyPartIndex];




  spinBtn.disabled = true;
  
  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.  
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor = coloursArray[spinnerCounter%coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter%bodyPartsArray.length];
}


// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle)
  // TODO set colourDiv and bodyPartP to the randomly spun results
  colourDiv.style.backgroundColor = selectedColour.toString();
  bodyPartP.innerHTML = selectedBodyPart.toString();

  spinBtn.disabled = false;
  addToHistory();
}

const historyTable: HTMLTableElement = document.getElementById('historyTableBody') as HTMLTableElement
// TODO add the newly spun result to the history table
function addToHistory() {
  let newRow = historyTable.insertRow(-1)
  let numCell = newRow.insertCell(-1);
  numCell.innerHTML = spinCount.toString();
  let cCell = newRow.insertCell(-1);
  cCell.innerHTML = selectedColour;
  let bCell = newRow.insertCell(-1);
  bCell.innerHTML = selectedBodyPart;

  let colourEnum: Colours = ColoursHelper.get(selectedColour)
  let bodyPartEnum: BodyParts = BodyPartsHelper.get(selectedBodyPart)
  let spin: SpinRecord = new SpinRecord(colourEnum, bodyPartEnum, spinCount)
  spinHistoryArray.push(spin)
  console.log(spinHistoryArray);
  console.log(BodyParts[spinHistoryArray[0].bodyPart]);
}

const statsButton: HTMLElement = document.getElementById('statsBtn') as HTMLElement;
statsButton.addEventListener('click', statsBtnHandler);
const statsResultsDiv: HTMLElement = document.getElementById('statsResults') as HTMLElement;
function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23

  for (let i=0; i < spinHistoryArray.length; i++) {
    console.log(Colours[spinHistoryArray[i].colour])
  }
  
  statsResultsDiv.innerHTML = `${Colours[colourSelector.value]} spun ${spinCount} times`
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, bodyPart): number {
  return 0;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
  return 0;
}