

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
      app(people); 
      break;
  }
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
    return app(people);
  }
}

function searchByCriteria(people) {
  let userInput = prompt('What would you like to search by? [gender] [eye color] [height] [weight] [occupation]');
  switch (userInput) {
      case 'gender':
        searchByGender(people);
        break;
      case 'eye color':
        searchByEyeColor(people);
        break;
      case 'height':
        searchByHeight(people);
        break;
      case 'weight':
        searchByWeight(people);
        break;
      case 'occupation':
        searchByOccupation(people);
        break;
      default:
        window.alert('Please enter a corresponding criterion');
        searchByCriteria(people);
        return;
  }
  return app(people);
}

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars);

  let foundPersons = people.filter(function(person) {
    if(person.gender === gender) {
      return true;
    }
    else {
      return false;
    }
  })

  displayPeople(foundPersons);
  return app(people);
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);

  let foundPersons = people.filter(function(person) {
    if(person.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  })

  displayPeople(foundPersons);
  return app(people);
}

function searchByHeight(people){
  let height = promptFor("What is the person's height in inches?", chars);

  let foundPersons = people.filter(function(person) {
    if(person.height == height) {
      return true;
    }
    else {
      return false;
    }
  })

  if (foundPersons.length === 0 || foundPersons.length === 1) {
    mainMenu(foundPersons[0], people);
  }
  else {
    displayPeople(foundPersons);
    return app(people);
  }
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight in pounds?", chars);

  let foundPersons = people.filter(function(person) {
    if(person.weight == weight) {
      return true;
    }
    else {
      return false;
    }
  })

  if (foundPersons.length === 0 || foundPersons.length === 1) {
    mainMenu(foundPersons[0], people);
  }
  else {
    displayPeople(foundPersons);
    return app(people);
  }
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", chars);

  let foundPersons = people.filter(function(person) {
    if(person.occupation == occupation) {
      return true;
    }
    else {
      return false;
    }
  })

  if (foundPersons.length === 0 || foundPersons.length === 1) {
    mainMenu(foundPersons[0], people);
  }
  else {
    displayPeople(foundPersons);
    return app(people);
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
        let family = findFamily(people, person);
        displayFamily(family);
        break;
      case "descendants":
        let descendants = [];
        findChildren(people, person, descendants);
        displayPeople(descendants);
        break;
      case "restart":
        app(people); // restart
        break;
      case "quit":
        return; // stop execution
      default:
        return mainMenu(person, people); // ask again
    }
    return app(people);
  }
}

function findFamily(people, person) {

  let foundFamily = people.filter(function(el){
    if(el.parents[0] === person.id || el.parents[1] === person.id) {
        el.relationship = "Child";
        return true;
    } 
    else if (el.currentSpouse === person.id) {
      el.relationship = "Spouse";
      return true; 
    }   
    else if (el.id === person.parents[0] || el.id === person.parents[1]) {
      el.relationship = "Parent";
      return true;
    }
    else{
      return false;
    }
  });  
  return foundFamily;
}

function findChildren(people, person, descendants) {

  let foundChildren = people.filter(function(el){
    if(el.parents[0] === person.id || el.parents[1] === person.id) {
      return true; 
    }   
    else{
      return false;
    }
  });  

  if(foundChildren.length === 0) {
    return;
  }
  else {
    for(let i = 0; i < foundChildren.length; i++){
      descendants.push(foundChildren[i]);
      findChildren(people, foundChildren[i], descendants);
    }
  }
  return descendants;
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
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

function displayFamily(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName + " | " + person.relationship;
  }).join("\n"));
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
