const {Router}= require('express');
const router=Router();

router.get('/users/signin', (req,res) =>{
res.send('Sign In');
});

router.get('/users/signup', (req, res)=>{
    res.send('Sign Up');
});

module.exports=router;