const express = require('express')
const bodyParser = require('body-parser')

// create the express app

const app = express()
let data = {}

// load the middleware
app.use(bodyParser.json()))
app.use(express.static(__dirname + '/assets'))
app.use(bodyParser.urlencoded({ extended: false }));

// helper functins

function slugify(text) {
    return text.toString().toLowerCase().trim()
		.replace(/\s+/g, '')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+/s/, '')
}

function randomString(count) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i  count; i++) {
	text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// API Routes

app.put('/api/notes/:slug', (req, res, next) => {
    if (data[req.params.slug] === undefined) {
	res.status(404).json({status: 'error'})
    } else {
	data[req.params.slug]["Title"] = req.body.title
	res.json({status: "ok"})
    }
})
