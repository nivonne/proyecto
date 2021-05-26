const {Router}=require('express');
const router=Router();
const _=require('underscore');

const usuario= require('../usuario.json');

 router.get('/', (req,res)=>{
     res.json(usuario);
 });


 router.post('/', (req,res)=>{
    const {name,email,password,date} =req.body;
    if(name && email && password && date){
        const id= usuario.length +1;
        const nuevoUsuario={...req.body, id};
        console.log(nuevoUsuario);
        usuario.push(nuevoUsuario);
        res.json(usuario);
    }else{
        res.status(500).json({error:"There was an error"});
    }
   
 });

 router.put('/:id', (req,res)=> {
    const{id}=req.params;
    const {name,email,password,date} =req.body;
    if(name && email && password && date){
        _.each(usuario, (u, i) =>{
            if(u.id == id){
                u.name=name;
                u.email=email;
                u.password=password;
                u.date=date;
            }
        }); res.json(usuario);
    }else{
        res.status(500).json({error: 'There was an error'});
    }
 });

 
 router.delete('/:id', (req,res)=>{
    const{id}=req.params;
    _.each(usuario, (u, i)=>{
       if(u.id == id){
           usuario.splice(i, 1);
       }
    });
    res.send(usuario);

});

module.exports=router;