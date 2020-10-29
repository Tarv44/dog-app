'use strict';

function getDogs() {
    const totalDogs = $('#displayCount').val();
    fetch(`https://dog.ceo/api/breeds/image/random/${totalDogs}`)
        .then(response => response.json())
        .then(responseJSON => displayDogs(responseJSON))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function handleBreedError(responseJSON) {
    if (responseJSON.status ==="error") {
        console.log(responseJSON)
        alert(responseJSON.message)
    } else {
        displayDogBreed(responseJSON)
    }
}

function getDogBreed(){
    const breedChoice = $('#breedChoice').val().replace(' ', '/');
    fetch(`https://dog.ceo/api/breed/${breedChoice}/images/random`)
        .then(response => response.json())
        .then(responseJSON => handleBreedError(responseJSON))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function dogImageElement(imageSrc) {
    return `<img src="${imageSrc}" alt="A random image of a dog."></img>`
}

function dogBreedElement(imageSrc) {
    return `<img src="${imageSrc}" alt="A random image of the chosen dog breed dog."></img>`
}

function generateDogs(responseJson) {
    const dogImages = responseJson.message.map(imageSrc => dogImageElement(imageSrc));
    return dogImages.join('')
}



function displayDogs(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  $('.dogPark').html(generateDogs(responseJson));
  $('.dogPark').removeClass('hidden');
}

function displayDogBreed(responseJson) {
    console.log(responseJson);
    //replace the existing image with the new one
    $('.dogBreedPark').html(dogBreedElement(responseJson.message));
    $('.dogBreedPark').removeClass('hidden');
  }

function handleCountSubmit() {
  $('.form1').submit(event => {
    event.preventDefault();
    getDogs();
  });
}

function handleBreedSubmit() {
    $('.form2').submit(event => {
      event.preventDefault();
      getDogBreed();
    });
  }



$(function() {
  handleCountSubmit();
  handleBreedSubmit();
});