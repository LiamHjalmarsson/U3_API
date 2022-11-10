async function get_all () {
    
    let req = new Request("http://localhost:8080/api/read.php")

    try {
        let response = await fetch(req);
        
        let recourse = await response.json();

        if (recourse.error) {
            display_information(recourse)
        } else {
            display_information(recourse);
        }
    
    } catch (error) {
        console.log(error);
    }

}

async function display_information (recourse) {

    let container = document.createElement("div");
    container.id = "container";

    document.querySelector("main").append(container);

    if (!recourse.error) {

        recourse.forEach(res => {
            
            let box = document.createElement("div");
            box.classList.add("box");

            let band = first_letter_big(res.band)
            let genre = first_letter_big(res.genre)

            box.innerHTML = `<h3> ${band} : ${genre} </h3>`;
            
            image_Band(res, box);
            information_Band(res, box);
            
            container.append(box);

        });

    } else {
        container.innerHTML = recourse.error;
    }
}

function image_Band (res, box) {
    let img = document.createElement("div");
    
    if (res.src != "") {
        img.classList.add("img_pic");
        img.style.backgroundImage = `url(../api/${res.src})`;
    } else {
        img.classList.add("img_pic_none");
        add_new_image(img);
    }

    box.append(img);
}

function add_new_image (img) {
    let div = document.createElement("div");
    div.classList.add("add_new_image_input");

    div.innerHTML = `<form id="add_image" action="http://localhost:8080/api/update.php" method="PUT">
        <input type="file" name="image" class="image">
        <button type="submit" id="submit_btn"> Add image </button> 
    </form>`;

    img.append(div);
}

function information_Band (res, box) {
    let btn = document.createElement("div");
    btn.classList.add("band_btn");

    let album = first_letter_big(res.album);

    let album_url = album.split(' ').join('_').toLowerCase();

    btn.innerHTML = `<a href="album.php?album=${album_url}&id=${res.id}"> <button> Album: ${album}  </button> </a>`;

    box.append(btn);
}

function first_letter_big (recourse) {
    let small_letters = recourse;
    let album = small_letters.charAt(0).toUpperCase() + small_letters.slice(1);

    return album;
} 

get_all();