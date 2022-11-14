// export const dogs = [
//     {name: "Nemo", age: 6, breed: "Golden Retriver"},
//     {name: "Murphy", age: 4, breed: "Golden Retriver"}
// ]

// export const det = [
//     {name: "sad", age: 6, breed: "Golden Retriver"},
//     {name: "Muadarphy", age: 224, breed: "Golden Retriver"}
// ]


// select one element
export const querySelector = select => document.querySelector(select)

export const querySelectorAll = select => document.querySelectorAll(select)

// creates a element
export const createElement = element => document.createElement(element)

export const first_letter_big = (recourse) => {

    let small_letters = recourse;
    let album = small_letters.charAt(0).toUpperCase() + small_letters.slice(1);

    return album;
} 

