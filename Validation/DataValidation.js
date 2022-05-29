const Joi = require('@hapi/joi');

class DataValidation{
    static registerValiation(request){
        const validationSchema = Joi.object({
            name: Joi.string().min(2).max(255).required(),
            email: Joi.string().min(6).max(255).required().email(),
            password: Joi.string().min(8).max(1024).required()
        });
    
        return validationSchema.validate(request);
    }
    static loginValiation(request){
        const validationSchema = Joi.object({
            email: Joi.string().min(6).max(255).required().email(),
            password: Joi.string().min(8).max(1024).required()
        });
    
        return validationSchema.validate(request);
    }
}

module.exports = {DataValidation};