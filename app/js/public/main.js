// ============== Functions ==============
function percent (valOne, valTwo) {
    console.log(valOne, valTwo)
    let totalValues = valOne + valTwo;

    let oneValue = (valOne / totalValues) * 100;
    let twoValue = (valTwo / totalValues) * 100;
    oneValue = oneValue.toFixed(1);
    twoValue = twoValue.toFixed(1);
    percentOne = parseFloat(oneValue);
    percentTwo = parseFloat(twoValue);
    return {
        like: percentOne,
        dislike: percentTwo
    }
}

function elmId (selector) {
    return document.getElementById(selector);
}

// ============== DOM ==============
(function () {
    // Menu mobile
    elmId("btn-mobile").addEventListener("click", function (e) {
        e.preventDefault();

        if ( e.currentTarget.classList.contains("is-active") ) {
            e.currentTarget.classList.remove("is-active");
            document.getElementById("nav-main").classList.remove("is-active");
        } else {
            e.currentTarget.classList.add("is-active");
            document.getElementById("nav-main").classList.add("is-active");
        }
    });

    //Banner info
    elmId("button-info").addEventListener("click", function () {
        elmId("banner-info").classList.add("slide-up");
    })

    // Sticky menu 
    window.addEventListener("scroll", function () {
        if ( window.scrollY > 50 ) {
            elmId("header-main").classList.add("is-sticky");
        } else{
            elmId("header-main").classList.remove("is-sticky");
        }
    })
})();

// ============== VUE ==============
const app = new Vue({
    el: '#app',
    data() {
        return {
            voted: false,
            like: false,
            dislike: false,
            candidates: [
                {
                    "id": 1,
                    "name": "Kayne West",
                    "desc": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                    "img": "assets/kanye-west.jpg",
                    "like": 0,
                    "dislike": 0,
                    "percentLike": 0,
                    "percentDislike": 0
                },
                {
                    "id": 2,
                    "name": "Mark Zuckerberg",
                    "desc": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                    "img": "assets/kanye-west.jpg",
                    "like": 0,
                    "dislike": 0,
                    "percentLike": 0,
                    "percentDislike": 0
                },
                {
                    "id": 3,
                    "name": "Cristina Fernández de Kirchner",
                    "desc": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                    "img": "assets/kanye-west.jpg",
                    "like": 0,
                    "dislike": 0,
                    "percentLike": 0,
                    "percentDislike": 0
                },
                {
                    "id": 4,
                    "name": "Malala Yousafzai",
                    "desc": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                    "img": "assets/kanye-west.jpg",
                    "like": 0,
                    "dislike": 0,
                    "percentLike": 0,
                    "percentDislike": 0
                }
            ]
        }
    },
    methods: {
        updatedata (el) {
            let dataStorage = JSON.parse(localStorage.getItem(el.name));
            el.like = dataStorage.like;
            el.dislike = dataStorage.dislike;
            el.percentLike = dataStorage.percentLike;
            el.percentDislike = dataStorage.percentDislike;
        },
        voteLike (e) {
            this.like = true;
            this.dislike = false;
            [...document.querySelectorAll(".card_actions button")].forEach((item) => {
                item.classList.remove("is-active");
            });

            e.currentTarget.classList.add("is-active");
            console.log("Like");
            
        },
        voteDislike (e) {
            this.like = false;
            this.dislike = true;
            [...document.querySelectorAll(".card_actions button")].forEach((item) => {
                item.classList.remove("is-active");
            });
            e.currentTarget.classList.add("is-active");
            console.log("Dislike")
        },
        vote (e) {

            let elm = e.currentTarget; 
            let id = elm.getAttribute("data-id");

            elm.textContent = "Thank you for voting!";

            if ( this.like ) {
                this.candidates.forEach(el => {
                    if ( el.id == id ) {
                        el.like++;    
                        localStorage.setItem(el.name, 
                            `{ "like": ${ el.like }, "dislike": ${ el.dislike }, "percentLike": ${ percent (el.like, el.dislike).like }, "percentDislike": ${ percent (el.like, el.dislike).dislike } }`
                        ); 
                        this.updatedata (el);
                    }
                }); 
            } else{
                this.candidates.forEach(el => {
                    if ( el.id == id ) {
                        el.dislike++;    
                        localStorage.setItem(el.name, 
                            `{ "like": ${ el.like }, "dislike": ${ el.dislike }, "percentLike": ${ percent (el.like, el.dislike).like },"percentDislike": ${ percent (el.like, el.dislike).dislike } }`
                        ); 
                        this.updatedata (el);
                    }
                });
            }

            this.like = false;
            this.dislike = false;

            [...document.querySelectorAll(".card_actions button")].forEach((item) => {
                item.classList.remove("is-active");
            });

            setInterval (() => {
                elm.textContent = "Vote now";
            }, 5000)
        }   
    },
    beforeMount () {
        if ( !localStorage.getItem("Kayne West") ) {
            localStorage.setItem('Kayne West', '{"like": 0, "dislike": 0, "percentLike": 0, "percentDislike": 0}');
        }
        if ( !localStorage.getItem("Mark Zuckerberg") ) {
            localStorage.setItem('Mark Zuckerberg', '{"like": 0, "dislike": 0, "percentLike": 0, "percentDislike": 0}');
        }
        if ( !localStorage.getItem("Cristina Fernández de Kirchner") ) {
            localStorage.setItem('Cristina Fernández de Kirchner', '{"like": 0, "dislike": 0, "percentLike": 0, "percentDislike": 0}');
        }
        if ( !localStorage.getItem("Malala Yousafzai") ) {
            localStorage.setItem('Malala Yousafzai', '{"like": 0, "dislike": 0, "percentLike": 0, "percentDislike": 0}');
        }
    },
    mounted () {
        this.candidates.forEach( el => {
            this.updatedata (el);
        })
    }
});