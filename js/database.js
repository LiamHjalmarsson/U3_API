async function table () {

    let container = createElement("div");
    container.id = "container";
    querySelector("main").append(container);

    let req = new Request(`http://localhost:8080/api/read.php`);

    try {
        
        let response = await fetch(req);

        if (response.ok) {
            let recourse = await response.json();

            create_info(recourse);

        } else {
            console.log(response);
        }

    } catch (error) {
        console.log(error);
    }
}

function create_info (recourse) {

    let table = createElement("table");
    querySelector("#container").append(table);
    
    table.innerHTML = `<thead> <tr> </tr> </thead>`; 

    get_keys(recourse);
    display_recourses(recourse);
}

function get_keys (recourse) {

    let keys_object = Object.keys(recourse[0]);

    keys_object.forEach(key => {
        let th = createElement("th");

        th.id = key;
        th.scope = "col";

        let text = key == "id" ? key : `key: ${key}`; 

        th.textContent = text

        querySelector("thead > tr").append(th);
    });

}

function display_recourses (recourse) {

    let tbody = createElement("tbody");
    tbody.id = "tbody";
    querySelector("table").append(tbody);

    recourse.forEach(data => {
        let tr = createElement("tr");
        tr.classList.add("keys");
        tbody.append(tr);

        let songs = data.songs.length;
        let genres = data.genre == "" ? "Emptey" : first_letter_big(data.genre);
        let year = data.year == "" ? "Emptey" : data.year;
        let src = data.src == "" ? "Emptey" : data.src;

        tr.innerHTML = `<th scope="row">${data.id}</th>
            <td class="bandKey">${first_letter_big(data.band)}</td>
            <td class="albumKey">${first_letter_big(data.album)}</td>
            <td>${songs}</td>
            <td>${genres}</td>
            <td>${year}</td>
            <td class="srcKey">${src}</td>
        `;
    });

}

table();