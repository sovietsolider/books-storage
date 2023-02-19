const express = require("express");
const router = express.Router();
let booksJson = require('../JSON/lib.json');


router.get("/", (req, res, next) => {
    res.render("index");
    next();
});
router.get("/library", (req, res, next)=>{
    res.render("library", {books: booksJson});
    next();
});
router.get("/new", (req, res, next)=>{
    res.render("newBook", {books: booksJson});
});
router.post("/new", (req, res, next)=>{
    let last = 0;
    for (let book of booksJson) {
        if (book.id == req.body.bookId) {
            res.redirect('/library');
            return;
        }
        last = parseInt(book.id)+1;
    }
    //res.send(JSON.stringify(req.body));
    booksJson.push({
        "id": last,
        "name": req.body.bookName,
        "author": req.body.bookAuthor,
        "date": req.body.bookDate,
        "in_library": "да",
        "person": "-",
        "date_return": "-"
    });
    res.redirect('/library');
});
router.get('/book/:num', (req, res, next) => {
    console.log(req.params.num);
    if (req.params.num === 'in_library') {
        let id_array = [];
        booksJson.forEach((v, i) => {
            if (v.in_library === "нет")
                id_array.push(v.id)
        });
        res.end(JSON.stringify(id_array));
        return;
    }
    if(req.params.num==="showAllBooks") {
        let booksArray = [];
        booksJson.forEach((v, i) => {
            booksArray.push(v.id)
        });
        res.end(JSON.stringify(booksArray));
        return;
    }
    if(req.params.num==="dateBooksFilter") {
        console.log("DATE SORT");
        let dateArray = [];
        var currentDate = new Date();
        console.log(currentDate);
        booksJson.forEach((v, i) => {
            let v_date = new Date(v.date_return + 'T23:59:59.999Z')
            if (v_date > currentDate || v.in_library == "да") {
                dateArray.push(v.id);
            }
        });
        res.end(JSON.stringify(dateArray));
        return;
    }

    if(req.params.num==="dateBooksSort") {
        let clone = JSON.parse(JSON.stringify(booksJson));

        console.log(typeof(clone));
        console.log("OBJECT CLONE: ");
        console.log(clone);
        clone.sort((a, b) => b.id - a.id);
        console.log(clone);
        res.render("library", {books: clone});
        res.end(JSON.stringify(clone));
        return;
    }
    for(book of booksJson) {
        if (book.id == req.params.num)
            res.render('bookEditor', {
                title: 'library', book_id: `${book.id}`, name: `${book.name}`,
                author: `${book.author}`, date: `${book.date}`, in_library: `${book.in_library}`,
                person: `${book.person}`, date_return: `${book.date_return}`
            });
    }
});
router.post('/book/edit/:num', (req, res, next) => {
    for(book of booksJson) {
        if (book.id == req.params.num) {
            book.name = req.body.bookName;
            book.author = req.body.bookAuthor;
            book.date = req.body.bookDate;
        }
    }
    res.redirect('/library');
});
router.post('/book/delete/:num', (req, res, next) => {
    booksJson.forEach((elem, i) => {
        if (elem.id == req.params.num) {
            booksJson.splice(i, 1);
            res.redirect('/library');
        }
    })
});

router.post('/book/give/:num', (req, res, next) => {
    for(book of booksJson) {
        if (book.id == req.params.num) {
            book.person = req.body.name;
            //if(req.body.date!=="")
            book.date_return = req.body.date;
            book.in_library = "нет";
        }
    }
    res.redirect('/library');
});

router.post('/book/back/:num', (req, res, next) => {
    for(book of booksJson) {
        if (book.id == req.params.num) {
            book.person = "-";
            book.in_library = "да";
            book.date_return = "-"
        }
    }
    res.redirect('/library');
});


router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});
module.exports = router;