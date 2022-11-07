let form = document.getElementById("add_music");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector("section").innerHTML = "";

    let formDATA = new FormData(form);
    
    let req = new Request("http://localhost:8080/api/create.php", {
        method: "POST",
        body: formDATA
    });

    try {
        let response = await fetch(req);

        let recourse = await response.json();

        console.log(response)
        
        if (recourse.error) {
            new_to_data(recourse);
            clearSerach();
        } else {
            new_to_data(recourse);
            clearSerach();
        }

    } catch (error) {

    }

});


function new_to_data (recourse) {
    let container = document.createElement("div");

    if (recourse.error) {
        container.innerHTML = `${recourse.error}`;
    } else {
        container.innerHTML = `
            <h3>${recourse.band} ${recourse.year}</h3>
            <p>${recourse.album}</p>
        `
    }

    document.querySelector("section").append(container);
}

function clearSerach () {
    document.getElementById("add_music").reset();
}


































// function add_another_song () {
//     let btn = document.querySelector(".add_another");

//     btn.addEventListener("click", () => {
//         new_song_input();
//     })
// }

// function new_song_input () {
//     let database_btn = document.getElementById("submit_btn");
//     let input = document.createElement("input");
    
//     input.classList.add("song");
//     input.name = "song";
//     input.type = "text";
//     input.placeholder = "Enter song";
//     document.querySelector("form").insertBefore(input, database_btn);
// }

// function clear_inputs () {
//     document.querySelectorAll("form > input").values = ""
// }

// add_another_song();

