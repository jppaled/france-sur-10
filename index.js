const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const { URLSearchParams } = require('url');

const villeIdeal = "https://www.ville-ideale.fr";

async function getNote(url) {
    const note = await fetch(villeIdeal + url)
    .then(res => res.text())
    .then(html => cheerio.load(html))
    .then($ => {
        $("#ng").each((index, element) => {
            return $(element).text();
        })
    }).catch(e => {
        console.log(e);
    })

    return note;
}

function getAllCityInfosByDepartement(departement) {
    const meta = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=f22be54e61d986812aadaa6d3c00b1c8'
    };

    const params = new URLSearchParams();

    params.append('dept', departement);

    fetch(villeIdeal + "/scripts/cherche.php", { method: 'POST', headers: meta, body: params})
    .then(res => res.text())
    .then(html => cheerio.load(html))
    .then($ => {        
        $("p").each((index, element) => {       
            $(element).children("a").each( async (index, aled)  => {
                const name = $(aled).text()
                const link = $(aled).attr("href");
                const note = await getNote(link);
                const color = getColorByNote(note);
                
                const ville = {
                    "dpt": departement,
                    "name": name,
                    "color": color,
                    "note": note,
                    "link": link
                }

               console.log(ville);
            });
        })
    })
}

function sortOn(property) {
    return function(a, b) {
        if (a[property] < b[property]) {
            return -1;
        } else if(a[property] > b[property]) {
            return 1;
        } else {
            return 0;   
        }
    }
}

function getColorByNote(note) {
    const colors = {
        9: "#84da65",
        8: "#a2d465",
        7: "#c1cd65",
        6: "#e0c765",
        5: "#ffc165",
        4: "#ffb365",
        3: "#ffa165",
        2: "#ff8f65",
        1: "#ff7865",
    }  

    note = Math.trunc(note);

    if (note <= 0) {
        return colors[1];
    }

    return colors[note];
}

function getDomTomCity() {
    for (let i = 1; i <= 6; i++) {
        if(i !== 5) {
            getAllCityInfosByDepartement('97'+i);
        }
    }
}

function getFrenchCity() {
    for (let i = 1; i <= 95; i++) {
        if (i < 10) {
            i = '0'+i
        }

        getAllCityInfosByDepartement(i);
    }
}

getFrenchCity();
getDomTomCity();