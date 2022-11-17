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
        missing_data(error);
    }

}

async function display_information (recourse) {

    let container = createElement("div");
    container.id = "container";

    querySelector("main").append(container);

    if (!recourse.error) {

        recourse.forEach(res => {
            
            let box = createElement("div");
            box.classList.add("box");

            let band = first_letter_big(res.band)
            let genre = first_letter_big(res.genre)

            box.innerHTML = `<h3> ${band} : ${genre} </h3>`;
            
            image_Band(res, box);
            information_Band(res, box);
            
            container.append(box);

        });

    } else {
        container.id = "empety_container";
        container.innerHTML = ` <h2> ${recourse.error} </h2>
            <button class="band_btn"> <a href="add_to_database.php"> Press here to add </a> </button>
        `;
    }
}

function image_Band (res, box) {
    let img = createElement("div");
    
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
    let div = createElement("div");
    div.classList.add("add_new_image_input");
    div.textContent = `No image added`;
    img.append(div);
}

function information_Band (res, box) {
    let btn = createElement("div");
    btn.classList.add("band_btn");

    let album = first_letter_big(res.album);

    let album_url = album.split(' ').join('_').toLowerCase();

    btn.innerHTML = `<a href="album.php?album=${album_url}&id=${res.id}"> Album: ${album} </a>`;

    box.append(btn);
}

get_all();