async function get_band () {
    
    let id = getUrl()

    let req = new Request(`http://localhost:8080/api/read-one.php?id=${id}`); 

    try {
        let response = await fetch(req);
        
        let recourse = await response.json();

        get_album_information(recourse);

    } catch (error) {
        missing_data(error);
    }

}

function getUrl () {
    let url = new URL(window.location)
    let params = url.searchParams
    return parseInt(params.get('id'))
}

// dispplay information about album
function get_album_information (recourse) {

    querySelector("main").innerHTML = "";

    let container = createElement("div");
    container.id = "container_band";
    querySelector("main").append(container);

    if (!recourse.error) {

        let band = first_letter_big(recourse.band);
        let album = first_letter_big(recourse.album);
    
        if (recourse.src != "") {
            container.innerHTML = `
                <div class="text">
                    <h1> ${band} </h1>
                    <div class="album_info">
                        <h3> The album: ${album} ${year_information(recourse)}. </h3>
                        <p> The album has ${recourse.songs.length} song added to its list of songs in the album and the typ of music is ${recourse.genre}. </p>
                    </div>
                </div>
                <div class="band_img" style="background-image: url(../api/${recourse.src})"> </div>
            `
        } else {
            container.innerHTML = `
                <div class="text">
                    <h1> ${band} </h1>
                    <div class="album_info">
                        <p> The album: <span class="album"> ${album} </span> ${year_information(recourse)}. The album has ${recourse.songs.length} song added to its list of songs. </p>
                    </div>
                </div>
                <div class="band_img no_img"> 
                <form id="add_image" action="http://localhost:8080/api/update_image.php" method="PUT">
                    <input type="file" name="image" class="image">
                    <button type="submit" id="submit_image"> Add image </button> 
                </form>
            </div> `;

            form_img_function(recourse);
        }

        edit_album_btn(recourse);
        songs_list(recourse);

    } else {
        container.textContent = `There was an error: ${recourse.error}`;
    }
    
}

function year_information (recourse) {
    let text;
        if (recourse.year != "") {
            text = `was made ${recourse.year}`;
        } else {
            text = `has no year added to when it was made!`;
        }
    return text;
} 

function songs_list (recourse) {

    let songs_container = document.createElement("div");
    songs_container.id = "songs_container";
    document.querySelector("main").append(songs_container);
    
    let box = document.createElement("div");
    box.id = "song_list";
    songs_container.append(box);

    let counter = 1;
    
    recourse.songs.forEach(song => {

        let index = counter++;
        
        let div = document.createElement("div");
        div.textContent = ` ${index}. ${first_letter_big(song)}`;
        box.append(div);
    });

    btn_song(recourse)
}

get_band()



        
function form_img_function (recourse) {

    let form = document.getElementById("add_image");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let formDATA = new FormData(form);
        formDATA.append("id", recourse.id);

        console.log(formDATA)

        let req = new Request("http://localhost:8080/api/update_image.php", {
            method: "POST",
            body: formDATA
        });

        try {
    
            let response = await fetch(req);
            let recourse = await response.json();

            let new_req = new Request(`http://localhost:8080/api/read-one.php?id=${recourse.id}`); 

            try {
                let response = await fetch(new_req);
                
                let recourse = await response.json();

                get_album_information(recourse);

            } catch (error) {
                missing_data(error)
            }

        } catch (error) {
            missing_data(error)
        }
    })
}

