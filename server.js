var express = require('express');
var app = express(); 
var port = process.env.PORT || 3000;
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/',  function (req, res) {
    res.send(`<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head>
    <body><h1>Hello World!</h1></body></html>`);
});

app.get('/person/:id', function(req, res) {
    res.render('person',{ID: req.params.id, Message: req.query.message, Times: req.query.times});
});

app.get('/student', (req, res) => {
    res.render('index');
})

// El primer cambio que hice fue cambiar el eexpress.urlencoded a el metodo post ya que lo tenia en el metodo use
app.post('/student', express.urlencoded({ extended: false}),  (req, res) => {
    res.send(`First name es: ${req.body.fname}, Last name es: ${req.body.lname}`);
})

// Aqui se agregara otra ruta que tomara un un objeto tipo JSON del body y que se ejecute antes que el route handler
app.post('/personjson', express.json({ type: '*/*'}),  (req, res) => {
    console.log('El obejo contiene:', (req.body));
    console.log('Nombre:', (req.body.firstname));
    console.log('Apellido:', (req.body.lastname));
});

app.listen(port);