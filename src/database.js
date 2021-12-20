const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Nadia_Matus:bottega123@cluster0.a1e6q.mongodb.net/NotesNeverForget?retryWrites=true&w=majority', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(db => console.log('DB  is connected'))
.catch(err => console.error(err));