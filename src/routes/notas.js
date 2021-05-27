const {Router}= require('express');
const router=Router();

router.get('/notes', (req,res)=>{
    res.send('Notas');
});

module.exports=router;