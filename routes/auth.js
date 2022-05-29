const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {DataValidation} = require('../Validation/DataValidation');


router.post('/register', async (req,res) => {
    //Validate body according to our requirements
    const {error} = DataValidation.registerValiation(req.body);
    if(error) return res.status(401).send(error);

    //check for user duplicates
    const userEmailExists = await User.findOne({email: req.body.email});
    if(userEmailExists) return res.status(409).send("A user with that email already exists.");

    //encrypt pass
    const encryptedPass = bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPass
    });

    try{
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    }
    catch(e){
        res.status(401).send(e);
    }
    

});
router.delete('/register/:id',  (req,res) => {
    User.findByIdAndRemove({_id: req.params.id}).then(async (user) =>{
        await res.send(user);
    });
});

module.exports = router;