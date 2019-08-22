"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application

function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  let searchByGenderResults;
  let userInput;

  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;

    case 'no':
      userInput = prompt('Would you like to search by one or multiple criterion? [one] or [multiple]');

      if(userInput === 'one') {
        searchResults = searchByCriteria(people);
      }
      else if(userInput === 'multiple'){
        searchResults = searchByMultipleTraits(people);
      }
      break;

    default:
      app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

function determineSearchType(){

  if (userInput === 'one') {
    return
  }
}

function searchByCriteria(people) {
  let userInput = prompt('What would you like to search by? [gender] [eye color] [height] [weight] [occupation]');
  switch (userInput) {
      case 'gender':

        break;
      case 'eye color':
        break;
      case 'height':
        break;
      case 'weight':
        break;
      case 'occupation':
        break;
      default:
        window.alert('Please enter a corresponding criterion');
        searchByCriteria(people);
        return;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  else {

    window.alert('Found ' + person.firstName + ' ' + person.lastName + '.');
    let displayOption = prompt("Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

    switch(displayOption){
      case "info":
        displayPerson(person);
        break;
      case "family":
      // TODO: get person's family
        break;
      case "descendants":
      // TODO: get person's descendants
        break;
      case "restart":
      app(people); // restart
        break;
      case "quit":
        return; // stop execution
      default:
        return mainMenu(person, people); // ask again
    }
  }
}


function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";

  alert(personInfo);
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.firstName == firstName && person.lastName == lastName){
      // foundPerson.push(person);
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
