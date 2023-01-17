window.addEventListener("load", main);

const students = {
    "Aryan": {
        "Circles": "aryan_circles.html"
    },
    "Daniel": {
        "Discs": "daniel_discs.html",
        "Fish": "daniel_fish.html",
        "Ulam Spiral": "daniel_ulam_spiral.html"
    },
    "Ganning": {
        "Airplane": "ganning_airplane.html",
        "Text Webcam": "ganning_text_webcam.html",
        "Visualizer": "ganning_visualizer.html"
    },
    "Jane": {
        "Image Blocks": "jane_image_blocks.html",
        "Landscape Generator": "jane_landscape_generator.html",
        "Perspective": "jane_perspective.html",
        "Social": "jane_social.html"
    },
    "Jolie": {
        "Lines": "jolie_lines.html",
        "Moody Owls": "jolie_moody_owls.html",
        "Pollution": "jolie_pollution.html"
    },
    "Max": {
        "A Zen Garden": "max_a_zen_garden.html",
        "Hyperspeed": "max_hyperspeed.html",
        "Visualizer": "max_visualizer.html"
    },
    "Nicholas": {
        "Dystopian Monotony": "nicholas_dystopian_monotony.html",
        "Human Drawing": "nicholas_human_drawing.html",
        "Tessellation": "nicholas_tessellation.html"
    },
    "Shreeya": {
        "Happy": "shreeya_happy.html",
        "Natya": "shreeya_natya.html",
        "Tessellation": "shreeya_tessellation.html"
    },
    "Thomas": {
        "E": "thomas_e.html",
        "Fireworks": "thomas_fireworks.html",
        "Income Inequality": "thomas_income_inequality.html",
        "Infinite Road": "thomas_infinite_road.html"
    },
    "Vibhu": {
        "Cult": "vibhu_cult.html",
        "Cult Movement": "vibhu_cult_movement.html",
        "Kults": "vibhu_kults.html"
    },
    "Zack": {
        "Circles": "zack_circles.html",
        "Eyes": "zack_eyes.html",
        "Interactivity": "zack_interactivity.html",
        "Pattern": "zack_pattern.html"
    }
};


function main() {
    // let order = shuffle(Object.keys(students));
    let order = Object.keys(students);


    let container = document.getElementsByTagName("main")[0];
    let navbar = document.getElementById("navbarlist");
    navbar.innerHTML = `
    <li class="nav-item">
        <a class="nav-link js-scroll-trigger" href="#overview">Overview&nbsp;</a>
    </li>`


    for (let i = 0; i < order.length; i++) {
        let section = document.createElement("section");
        section.id = order[i];
        if (i % 2 === 0) section.classList.add("bg-light");
        else section.classList.add("bg-light-alt");

        let inner = "";
        for (let key in students[order[i]]) {
            let title = key;
            let link = students[order[i]][title];
            inner += `                <p><span class="underline">${key}</span>: <a href="${link}">${link}</a></p>\n`;
        }

        section.innerHTML = `
        <div class="container">
            <div class="col-lg-12 mx-auto">
                <h2 class="font-weight-bold">${order[i]}</h2>
${inner}
            </div>
        </div>`
        container.append(section);
        navbar.innerHTML += `
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#${section.id}">${order[i]}&nbsp;</a>
        </li>`
    }


    // scrolling stuff
    (function ($) {
        "use strict"; // Start of use strict

        // Smooth scrolling using jQuery easing
        $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 56)
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        });

        // Closes responsive menu when a scroll trigger link is clicked
        $('.js-scroll-trigger').click(function () {
            $('.navbar-collapse').collapse('hide');
        });

        // Activate scrollspy to add active class to navbar items on scroll
        $('body').scrollspy({
            target: '#mainNav',
            offset: 56
        });

    })(jQuery); // End of use strict

}


function shuffle(list) {
    let currentIndex = list.length;
    let randomIndex = 0;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
    }
    return list
}
