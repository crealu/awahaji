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

app.get('/train', (req, res) => {
	res.sendFile('train.html', pagesRoot);
})

app.get('/caro', (req, res) => {
	res.sendFile('caro.html', pagesRoot);
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

app.get('/n5sent', (req, res) => {
	res.sendFile('./resources/sentex_n5.json', {root: './'});
});

app.get('/n4sent', (req, res) => {
	res.sendFile('./resources/sentex_n4.json', {root: './'});
});

app.get('/allKanji', (req, res) => {
	res.sendFile('./resources/all.json', {root: './'});
})

app.post('/testdrop', (req, res) => {
	console.log(req.body);
	res.send('got it');
})

app.listen(port, () => { console.log(`Listening on ${port}`) });