const express = require('express')
const bodyParser = require('body-parser')

// create the express app

const app = express()
let data = {}

// load the middleware
app.use(bodyParser.json())
app.use(express.static(__dirname + '/assets'))
app.use(bodyParser.urlencoded({ extended: false }));

// helper functins

function slugify(text) {
    return text.toString().toLowerCase().trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+s/, '')
}

function randomString(count) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < count; i++) {
	text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// API Routes

app.get('/api/notes/:slug', (req, res, next) => {
    if (data[req.paraams.slug] === undefined) {
	res.status(404).json({status: 'error'})
    } else {
	res.json({data:data[req.params.slug]})
    }
})

app.put('/api/notes/:slug', (req, res, next) => {
    if (data[req.params.slug] === undefined) {
	res.status(404).json({status: 'error'})
    } else {
	data[req.params.slug]["Title"] = req.body.title
	res.json({status: "ok"})
    }
})

app.get('/api/notes', (req, res, next) => res.json({data}))

app.post('/api/notes', (req, res, next) => {
    const title = randomString(24)
    res.json({data: data[title] = {slug: title, Title: "Untitled Note"}})
})

// Define routes static

app.get('/notes/slug', (req, res) => res.sendFile(__dirname + '/views/editor.html'))
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

// start application

app.listen(3000, () => console.log('App listening on port 3000!'))

