async function get_band () {
    
    let id = getSubjectFromUrl()

    let req = new Request(`http://localhost:8080/api/read-one.php?id=${id}`); 

    try {
        let response = await fetch(req);
        
        let recourse = await response.json();

        get_album_information(recourse);

    } catch (error) {
        console.log(error);
    }

}

function getSubjectFromUrl () {
    let url = new URL(window.location)
    let params = url.searchParams
  
    return parseInt(params.get('id'))

}

function get_album_information (recourse) {

    document.querySelector("main").innerHTML = "";

    let container = document.createElement("div");

    container.id = "container_band";
    document.querySelector("main").append(container);

    if (!recourse.error) {

        let band = first_letter_big(recourse.band);
        let album = first_letter_big(recourse.album);
    
        if (recourse.src != "") {
            container.innerHTML = `
                <div class="text">
                    <h1> ${band} </h1>
                    <div class="album_info">
                        <p> The album: ${album} ${year_information(recourse)}. The album has ${recourse.songs.length} song added to its list of songs and style of music is ${recourse.genre}. </p>
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
                </div>

            `
            // form_img_function(recourse);
        }

        edit_album_btn(recourse)

    } else {
        container.textContent = `There was an error: ${recourse.error}`;
    }
    
}

// function form_img_function (recourse) {

//     let form = document.getElementById("add_image");

//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         let formDATA = new FormData(form);

//         let req = new Request("http://localhost:8080/api/update_image.php", {
//             method: "PATCH",
//             body: JSON.stringify({
//                 "id": recourse.id,
//                 "src": formDATA
//             })
//         });
    
//         try {
    
//             let response = await fetch(req);
//             // console.log(response)
    
//             let recourse = await response.json();

//             console.log(recourse)
//         } catch (error) {
//         }
//     })
// }



function year_information (recourse) {
    let text;
    if (recourse.year != "") {
        text = `was made ${recourse.year}`
    } else {
        text = `has no year added to when it was made!`
    }

    return text;
}

function first_letter_big (recourse) {
    let small_letters = recourse;
    let album = small_letters.charAt(0).toUpperCase() + small_letters.slice(1);

    return album;
} 

// btn functions 
function edit_album_btn (recourse) {
    let btn_box = document.createElement("div");
    btn_box.classList.add("btn_box");
    document.querySelector("main").append(btn_box);
    
    let btn = document.createElement("button");
    btn.classList.add("edit_btn");
    btn.classList.add("band_btn");
    btn.innerHTML = "<a>EDIT</a>";
    btn_box.append(btn);

    let container = document.createElement("div");
    container.classList.add("change_music_container")
    document.querySelector("main").append(container);

    delete_btn(btn_box, recourse);

    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        document.querySelector(".delete_btn").classList.remove("active");

        if (btn.classList.contains("active")) {
            edit_album_form(container, recourse);
        } else {
            container.innerHTML = "";
        }
    });

}

function delete_btn (btn_box, recourse) {
    let btn_delete = document.createElement("button");
    btn_delete.classList.add("delete_btn");
    btn_delete.classList.add("band_btn");
    btn_delete.innerHTML = "<a>DELETE</a>";
    btn_box.append(btn_delete);

    btn_delete.addEventListener("click", async () => {

        document.querySelector(".edit_btn").classList.remove("active");

        btn_delete.classList.toggle("active");

        if (btn_delete.classList.contains("active")) {
            document.querySelector(".change_music_container").innerHTML = `<div class="delete_box"> 
                <p> Are you sure you want to delete the album: ${recourse.album} </p>
                <div class="button_container">
                    <button class="den_delete band_btn"> <a> No </a> </button> <button class="con_delete band_btn"> <a> Yes </a> </button>
                </div>
            </div>`;
        } else {
            document.querySelector(".change_music_container").innerHTML = "";
        }
        
        let delete_data = document.querySelector(".con_delete");
        let dont_delete_data = document.querySelector(".den_delete");
        
        if (delete_data != null) {

            delete_data.addEventListener("click", async () => {
                document.querySelector(".delete_btn").classList.remove("active");
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

                    console.log(recourse)

                    deleted_album(recourse);
                } catch (error) {
                    console.log(error);
                }
            }) 
        } 

        if (dont_delete_data != null) {
            dont_delete_data.addEventListener("click", () => {
                document.querySelector(".delete_btn").classList.remove("active");
                document.querySelector(".change_music_container").innerHTML = "";
            })
        }
    })
}

function deleted_album (recourse) {
    document.querySelector("main").innerHTML = "";

    let container = document.createElement("div");
    container.classList.add("delete_album");

    container.innerHTML = `<h2> The album ${recourse.band} was delete with all other information! </h2>
        <button class="band_btn"> <a href="all_albums.php"> Press to go back to all albums </a> </button>
    `
    document.querySelector("main").append(container);
}


// form function 
function edit_album_form (container, recourse) {

    container.innerHTML = `<form id="change_music" action="http://localhost:8080/api/update.php">
        <input class="band" type="text" name="band" placeholder="band" value="${recourse.band}">
        <input class="albu" type="text" name="band" placeholder="album" value="${recourse.album}">
        <input class="genre" type="text" name="genre" placeholder="genre" value="${recourse.genre}">
        <input class="year" type="text" name="year" placeholder="year" value="${recourse.year}">
        <button type="submit" id="submit_btn" class="band_btn"> <a> Update Album </a> </button>
    </form>`

    document.querySelectorAll("input").forEach(input => { 
        input.addEventListener("click", () => {
            input.value = "";
        })    
    })

    let form = document.getElementById("change_music");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let band = document.querySelector(".band").value;
        if (band == "") {
            band = recourse.band;
        }
        
        let album = document.querySelector(".albu").value;
        if (album == "") {
            album = recourse.album;
        }

        let genre = document.querySelector(".genre").value;
        if (genre == "") {
            genre = recourse.genre;
        }

        let year = document.querySelector(".year").value;
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
                    console.log(error);
                }

                
            } catch (error) {
            
        }
    })
}

get_band()

        
