
let form = querySelector("#add_music");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    querySelector("section").innerHTML = "";

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
    querySelector("#add_music").reset();
}

function new_data_added (recourse) {
    let container = createElement("div");
    container.id = "add_new_data";

    if (recourse.src != "") {
        container.style.backgroundImage = `url(../api/${recourse.src})`;
    } else {
        container.classList.add("no_imag_added");
    }

    let album = first_letter_big(recourse.album);
    let band = first_letter_big(recourse.band);
    let album_url = album.split(' ').join('_').toLowerCase();

    container.innerHTML = `
        <button class="band_btn"> <h2> The band: ${band} was added! </h2> <a href="album.php?album=${album_url}&id=${recourse.id}?"> Do you want to edit the album: ${album}  </a> </button>`;
    
    querySelector("section").append(container);
}
