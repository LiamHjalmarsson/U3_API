// select one element
const querySelector = select => document.querySelector(select)

const querySelectorAll = select => document.querySelectorAll(select)

// creates a element
const createElement = element => document.createElement(element)

const first_letter_big = (recourse) => {

    let small_letters = recourse;
    let album = small_letters.charAt(0).toUpperCase() + small_letters.slice(1);

    return album;
} 

