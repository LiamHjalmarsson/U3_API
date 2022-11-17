// btn functions 
function edit_album_btn (recourse) {
    let btn_box = createElement("div");
    btn_box.classList.add("btn_box");
    querySelector("main").append(btn_box);
    
    let container = createElement("div");
    container.classList.add("change_music_container")
    querySelector("main").append(container);

    edit_btn(recourse);
    delete_btn(recourse);
}

function edit_btn (recourse) {
    let btn = createElement("button");
    btn.classList.add("edit_btn");
    btn.classList.add("band_btn");
    btn.innerHTML = "<a> EDIT Album </a>";
    querySelector(".btn_box").append(btn);

    btn.addEventListener("click", () => {
        let container = querySelector(".change_music_container");
        btn.classList.toggle("active");
        querySelector(".delete_btn").classList.remove("active");

        if (btn.classList.contains("active")) {
            edit_album_form(container, recourse);
        } else {
            container.innerHTML = "";
        }
    });
}

function delete_btn (recourse) {
    let btn_delete = createElement("button");
    btn_delete.classList.add("delete_btn");
    btn_delete.classList.add("band_btn");
    btn_delete.innerHTML = "<a>DELETE Album</a>";
    querySelector(".btn_box").append(btn_delete);

    btn_delete.addEventListener("click", async () => {

        querySelector(".edit_btn").classList.remove("active");

        btn_delete.classList.toggle("active");

        if (btn_delete.classList.contains("active")) {

            querySelector(".change_music_container").innerHTML = `<div class="delete_box"> 
                <p> Are you sure you want to delete the album: ${recourse.album} </p>
                <div class="button_container">
                    <button class="den_delete band_btn"> <a> No </a> </button> <button class="con_delete band_btn"> <a> Yes </a> </button>
                </div>
            </div>`;

        } else {
            document.querySelector(".change_music_container").innerHTML = "";
        }
        
        confirm_or_deny_Delete(recourse);

    })
}

function confirm_or_deny_Delete (recourse) {
    let delete_data = querySelector(".con_delete");
    let dont_delete_data = querySelector(".den_delete");
    
    if (delete_data != null) {

        delete_data.addEventListener("click", async () => {

            querySelector(".delete_btn").classList.remove("active");

            let req = new Request("http://localhost:8080/api/delete.php", {
                method: "DELETE",
                headers: {"content-type": "application/json, charset-utf-8"},
                body: JSON.stringify({
                    "id": recourse.id,
                })
            });
            
            try {
                let response = await fetch(req);
                let recourse = await response.json();

                deleted_album(recourse);
            } catch (error) {
                missing_data(error)
            }
        }) 
    } 

    if (dont_delete_data != null) {
        dont_delete_data.addEventListener("click", () => {
            querySelector(".delete_btn").classList.remove("active");
            querySelector(".change_music_container").innerHTML = "";
        })
    }
}

function deleted_album (recourse) {
    querySelector("main").innerHTML = "";

    let container = createElement("div");
    container.classList.add("delete_album");

    container.innerHTML = `<h2> The album ${recourse.band} was delete with all other information! </h2>
        <button class="band_btn"> <a href="all_albums.php"> Press to go back to all albums </a> </button>
        <button class="band_btn"> <a href="add_to_database.php"> Press to add music </a> </button>
    `
    querySelector("main").append(container);
}

// form function 
function edit_album_form (container, recourse) {

    container.innerHTML = `<form id="change_music" action="http://localhost:8080/api/update.php" method="PUT">
        <input class="band" type="text" name="band" placeholder="band" value="${recourse.band}">
        <input class="albu" type="text" name="albu" placeholder="album" value="${recourse.album}">
        <input class="genre" type="text" name="genre" placeholder="genre" value="${recourse.genre}">
        <input class="year" type="text" name="year" placeholder="year" value="${recourse.year}">
        <button type="submit" id="submit_btn" class="band_btn"> <a> Update Album </a> </button>
    </form>`

    document.querySelectorAll("input").forEach(input => { 
        input.addEventListener("click", () => {
            input.value = "";
        })    
    })

    let form = querySelector("#change_music");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        form_request(recourse);
    })
}

async function form_request (recourse) {

    let band = querySelector(".band").value;
    if (band == "") {
        band = recourse.band;
    }
    
    let album = querySelector(".albu").value;
    if (album == "") {
        album = recourse.album;
    }

    let genre = querySelector(".genre").value;
    if (genre == "") {
        genre = recourse.genre;
    }

    let year = querySelector(".year").value;
    if (year == "") {
        year = recourse.year;
    }

    let req = new Request("http://localhost:8080/api/update.php", {
        method: "PUT",
        headers: {"content-type": "application/json, charset-utf-8"},
        body: JSON.stringify({
            "id": recourse.id,
            "band": band,
            "album": album,
            "genre": genre,
            "year": year,
        })
    });
    
    try {

        let response = await fetch(req);
        let recourse_update = await response.json();
        
        try {
                let req = new Request(`http://localhost:8080/api/read-one.php?id=${recourse_update.id}`); 

                let response = await fetch(req);
                let recourse = await response.json();
            
                get_album_information(recourse);
            
            } catch (error) {
                missing_data(error)
            }
            
        } catch (error) {
            missing_data(error)
    }

}

function btn_song (recourse) {
    let btn = createElement("button");
    btn.classList.add("band_btn");
    btn.innerHTML = `<a> Want to Add a song </a>`
    querySelector("#songs_container").append(btn);
    
    let div = createElement("div");
    div.classList.add("add_music_container")
    div.innerHTML = "";
    querySelector("#songs_container").append(div);
    
    btn.addEventListener("click", (e) => {
        
        btn.classList.toggle("active")

        if (btn.classList.contains("active")) {

        div.innerHTML = `<form id="songs" action="http://localhost:8080/api/add_song.php" method="PUT"> 
        </form>`;

        let add = createElement("button");
        add.classList.add("band_btn");
        add.innerHTML = `<a> add song </a>`
    
        let input = createElement("input");
        input.type = "text";
        input.classList.add("song");
        input.name = "song";
        input.placeholder = "Add a song";
    
        querySelector("#songs").append(add, input);
            
        added_new(recourse, input)
        } else {
            div.innerHTML = "";
        }
        
    })
}

function added_new (recourse, input) {
    let form = querySelector("#songs");
            
    form.addEventListener("submit", async (e) => {
    
        e.preventDefault();
            
        let req = new Request(`http://localhost:8080/api/add_song.php`, {
                method: "PUT",
                headers: {"content-type": "application/json, charset-utf-8"},
                body: JSON.stringify({
                    "id": recourse.id,
                    "songs": input.value
                })
            });

            try {

                let response = await fetch(req);
                let recourse_update = await response.json();
                
                try {
                        let req = new Request(`http://localhost:8080/api/read-one.php?id=${recourse_update.id}`); 
        
                        let response = await fetch(req);
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