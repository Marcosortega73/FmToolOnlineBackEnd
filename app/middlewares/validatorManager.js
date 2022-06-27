const { body, validationResult } = require('express-validator');

const validationResultExpress  = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

const bodyRegisterValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),

    body('password','La contraseña debe tener minimo 6 caracteres')
        .trim()
        .isLength({ min: 6 }),
        // body('password','Formato de password incorrecto').custom
        // ((value,{req}) => { 
        //     if(value !== req.body.repassword){
        //         throw new Error('No coinciden las contraseñas');
        //     }
        //     return value;
        // }),


    validationResultExpress
];

const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password','La contraseña debe tener minimo 6 caracteres')
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress
];



module.exports = {bodyRegisterValidator,bodyLoginValidator}


