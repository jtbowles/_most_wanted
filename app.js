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

function searchByMultipleTraits(people) {
  let gender = promptFor("What is the person's gender?", chars);
  let eyeColor = promptFor("What is the eye color of the person?", chars);
  let occupation = promptFor("What is the person's occupation?", chars);

  let foundPerson = people.filter(function(person){
    if(person.gender == gender && person.eyeColor == eyeColor && person.occupation == occupation){
      return true;
    }
    else{
      return false;
    }
  })
  if (foundPerson.length === 0 || foundPerson.length === 1) {
    return foundPerson[0];
  }
  else {
    displayPeople(foundPerson);
    return foundPerson;
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

function mainMenu(person, people){

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

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true; 
}
