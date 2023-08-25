const express = require('express');
const app = express();
const port = 4567;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: './'});
})

app.post('/testdrop', (req, res) => {
	console.log(req.body);
})

app.listen(port, () => { console.log(`Listening on ${port}`) });