const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {DataValidation} = require('../Validation/DataValidation');


router.post('/register', async (req,res) => {
    //Validate body according to our requirements
    const {error} = DataValidation.registerValiation(req.body);
    if(error) return res.status(401).send(error.details[0].message);

    //check for user duplicates
    const userEmailExists = await User.findOne({email: req.body.email});
    if(userEmailExists) return res.status(409).send("user already exists.");

    //encrypt pass
    const encryptedPass = await bcrypt.hash(req.body.password, 10);

    //lowercase name and email
    const name = req.body.name;
    const email = req.body.email;
    const lowerName = name.toLowerCase();
    const lowerEmail = email.toLowerCase();

    const user = new User({
        name: lowerName,
        email: lowerEmail,
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


router.post('/login', async (req,res) => {
    //Validate body according to our requirements
    const {error} = DataValidation.loginValiation(req.body);
    if(error) return res.status(401).send(error);

    //check if user exists
    const userEmailExists = await User.findOne({email: req.body.email.toLowerCase()});
    if(!userEmailExists) return res.status(401).send("User with that email does not exist");

    //compare password
    const validPass = await bcrypt.compare(req.body.password, userEmailExists.password);
    if(!validPass) return res.status(401).send('Wrong Password');

    res.status(200).send('Logged In');

});
router.delete('/register/:id',  (req,res) => {
    User.findByIdAndRemove({_id: req.params.id}).then(async (user) =>{
        await res.send(user);
    });
});

module.exports = router;