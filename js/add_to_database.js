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

        clearSerach();

        if (recourse.error) {
            missing_data(recourse);
        } else {
            new_data_added(recourse);
        }

    } catch (error) {
        missing_data(error);
    }

});

function clearSerach () {
    document.getElementById("add_music").reset();
}

function new_data_added (recourse) {
    let container = document.createElement("div");
    container.id = "add_new_data";

    if (recourse.src != "") {
        container.style.backgroundImage = `url(../api/${recourse.src})`;
    } else {
        container.classList.add("no_imag_added");
    }

    let album = first_letter_big(recourse);

    container.innerHTML = ` <div class="box">
        <h3> The band: ${album} was added! </h3>
        <p> The album that was added: ${recourse.album} </p>
    </div>`

    document.querySelector("section").append(container);
}

function missing_data (recourse) {
    let container = document.createElement("div");
    container.id = "add_new_data";

    container.classList.add("no_imag_added");

    container.innerHTML = ` <p class="error_msg"> ${recourse.error} </p>`;

    document.querySelector("section").append(container);
} 

function first_letter_big (recourse) {
    let small_letters = recourse.album;
    let album = small_letters.charAt(0).toUpperCase() + small_letters.slice(1);

    return album;
} 