const express=require ('express');
const app=express();
const morgan=require('morgan');

app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));
app.use('/api/notas',require('./routes/notas'));
app.use('/api/usuario',require('./routes/usuario'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});