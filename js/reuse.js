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

function missing_data (recourse) {
    let container = createElement("div");
    container.id = "add_new_data";
    container.classList.add("no_imag_added");

    container.innerHTML = ` <p class="error_msg"> ${recourse.error} </p>`;
    querySelector("section").append(container);
} 
