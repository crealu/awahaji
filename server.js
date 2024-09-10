const express = require('express');
const app = express();
const port = process.env.PORT || 4567;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pagesRoot = { root: './public/pages' }

app.get('/', (req, res) => {
	res.sendFile('index.html', pagesRoot);
});

app.get('/desktop', (req, res) => {
	res.sendFile('desktop.html', pagesRoot);
});

app.get('/practice', (req, res) => {
	res.sendFile('practice.html', pagesRoot);
});

app.get('/touch', (req, res) => {
	res.sendFile('touch.html', pagesRoot);
});

app.post('/testdrop', (req, res) => {
	console.log(req.body);
	res.send('got it');
})

app.listen(port, () => { console.log(`Listening on ${port}`) });