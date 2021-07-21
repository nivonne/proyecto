const {Router}= require('express');
const router=Router();

const Note=require('../models/Note');
const {isAuthenticated}=require('../helpers/authentication');

router.get('/notes/add',isAuthenticated, (req,res)=>{
    res.render('notes/new-note');
});

router.post('/notes/new-note',isAuthenticated, async (req,res)=>{
    const {title,description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text:'Please write a title'});
    }
    if(!description){
        errors.push({text:'Please write a description'});
    }
    if(errors.length >0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }else{
       const newNote= new Note({title,description});
       newNote.user=req.user.id;
        await newNote.save();
        req.flash('success_msg','Note Added Successfully')
       res.redirect('/notes');
    }
    
});

router.get('/notes', isAuthenticated, async (req,res)=>{
   const notes=await Note.find({user:req.user.id}).sort({date: 'desc'});
   res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res)=>{
   const note= await Note.findById(req.params.id);
    res.render('notes/edit-note',{note});
});

router.post('/notes/edit-note/:id', isAuthenticated, async(req, res)=>{   /* Cambio */
    const {title,description}= req.body;
    console.log(req.body);
    await Note.findByIdAndUpdate(req.params.id,{title:title,description:description}); /* Cambio */
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated, async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
});

module.exports=router;