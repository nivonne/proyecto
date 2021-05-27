const {Router}= require('express');
const router=Router();


router.get('/', (req, res) =>{
    res.send('Home');
});

router.get('/about', (req, res) =>{
    res.send('About');
});

module.exports=router;