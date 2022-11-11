function navigation () {
    let burger_menu = querySelector(".burger-menu");
    let navUl = querySelector("ul");

    burger_menu.addEventListener("click", () => {
        navUl.classList.toggle("nav-active");
        links();
        burger_menu.classList.toggle("toggle-burger");
    });

}

function links () {
    let links = querySelectorAll("ul li");

    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = ``;
        } else {
            link.style.animation = `linksFadeIn 0.5s ease forwards ${index / 7 + .5}s`;
        }
    });

}

navigation();