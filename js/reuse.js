// select one element
let querySelector = select => document.querySelector(select)

let querySelectorAll = select => document.querySelectorAll(select)

// creates a element
let createElement = element => document.createElement(element)

let first_letter_big = (recourse) => {

    let small_letters = recourse;
    let album = small_letters.charAt(0).toUpperCase() + small_letters.slice(1);

    return album;
} 
