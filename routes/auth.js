const router = require('express').Router();
const User = require('../models/user');
const Joi = require('@hapi/joi');

const validationSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required()
});


router.post('/register', async (req,res) => {
    const {error} = validationSchema.validate(req.body);

    if(error) return res.status(401).send(error);
    else{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        try{
            const savedUser = await user.save();
            res.status(201).send(savedUser);
        }
        catch(e){
            res.status(401).send(e);
        }
    }

});
router.delete('/register/:id',  (req,res) => {
    User.findByIdAndRemove({_id: req.params.id}).then(async (user) =>{
        await res.send(user);
    });
});

module.exports = router;