const {Router}=require('express');
const router=Router();
const _=require('underscore');

const notas= require('../notas.json');

 router.get('/', (req,res)=>{
     res.json(notas);
 });

 router.post('/', (req,res)=>{
    const {title,description,user} =req.body;
    if(title && description && user){
        const id= notas.length +1;
        const nuevaNota={...req.body, id};
        console.log(nuevaNota);
        notas.push(nuevaNota);
        res.json(notas);
    }else{
        res.status(500).json({error:"There was an error"});
    }
   
 });


 router.put('/:id', (req,res)=> {
    const{id}=req.params;
    const {title,description,user} =req.body;
    if(title && description && user){
        _.each(notas, (nota, i) =>{
            if(nota.id == id){
                nota.title=title;
                nota.description=description;
                nota.user=user;
            }
        }); res.json(notas);
    }else{
        res.status(500).json({error: 'There was an error'});
    }
 });


 router.delete('/:id', (req,res)=>{
     const{id}=req.params;
     _.each(notas, (nota, i)=>{
        if(nota.id == id){
            notas.splice(i, 1);
        }
     });
     res.send(notas);

 });

module.exports=router;