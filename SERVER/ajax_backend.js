function inLibSort(btn) {
    console.log("FF");
    let id = btn.id;

    ajaxGet(id, (response) => {
        let array_id = JSON.parse(response);
        console.log(array_id);
        let i=0;
        while(document.getElementById(i.toString()) !== null) {
            document.getElementById(i.toString()).style.display = "block";
            i++;
        }
        for(id of array_id) {
            let cur_th = document.getElementById(id);
            console.log(id);
            cur_th.style.display = "none";
        }
    });
}

function allBooksSort(btn) {
    let id = btn.id;

    ajaxGet(id, (response) => {
        let array_id = JSON.parse(response);
        console.log(array_id);
        let i=0;
        while(document.getElementById(i.toString()) !== null) {
            document.getElementById(i.toString()).style.display = "block";
            i++;
        }
        for(id of array_id) {
            let cur_th = document.getElementById(id);
            console.log(id);
            cur_th.style.display = "block";
        }
    });
}

function dateBooksFilter(btn) {
    let id = btn.id;
    ajaxGet(id, (response)=>{
        let booksArray = JSON.parse(response);
        let i=0;
        while(document.getElementById(i.toString()) !== null) {
            document.getElementById(i.toString()).style.display = "block";
            i++;
        }
        for(id of booksArray) {
            let cur_th = document.getElementById(id);
            cur_th.style.display = "none";
        }
    })
}

function dateBooksSort(btn) {
    let id = btn.id;
    ajaxGet(id, (response)=>{
        //let books = JSON.parse(response);
        console.log("RELOAD");
        sortListDir();

    });
}

function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("allBooks");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (dir == "asc") {
                if (parseInt(b[i].id) > parseInt(b[i + 1].id)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (parseInt(b[i].id) < parseInt(b[i + 1].id)) {
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {

            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function ajaxGet(id, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
            callback(this.responseText);
    };
    console.log("/book/"+id);
    xhttp.open("GET",`/book/${id}`,true);
    xhttp.send();
}

function openBookDialog(button) {
    let dialog = document.getElementById("bookDialog"+button.id.split('_')[1]);
    if(dialog.open === false)
        dialog.open = true;
    else
        dialog.open = false;
    console.log(dialog);
}