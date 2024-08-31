const express = require('express');
const app = express();
const port = 4567 || process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: './' });
});

app.get('/desktop', (req, res) => {
	res.sendFile('desktop.html', { root: './' });
});

app.get('/touch', (req, res) => {
	res.sendFile('touch.html', { root: './' });
})

app.post('/testdrop', (req, res) => {
	console.log(req.body);
	res.send('got it');
})

app.listen(port, () => { console.log(`Listening on ${port}`) });