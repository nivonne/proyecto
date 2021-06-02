const express=require ('express');
const app=express();
const morgan=require('morgan');
const path=require('path');
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');
const session=require('express-session');
require('./database');
const Handlebars=require('handlebars');
const{
    allowInsecurePrototypeAccess
}=require('@handlebars/allow-prototype-access');


app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    handlebars:allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret:'secretsession',
    resave:true,
    saveUninitialized:true
}));

//Routes
app.use(require('./routes/index'));
app.use('/api/notas',require('./routes/notas-api'));
app.use('/api/usuario',require('./routes/usuario-api'));
app.use(require('./routes/notas'));
app.use(require('./routes/usuario'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});