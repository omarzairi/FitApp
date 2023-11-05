const jwt= require('jsonwebtoken');
const generateToken=(user)=>{
    return jwt.sign(
        {
            _id:user._id,
            nom:user.nom,
            prenom:user.prenom,
            email:user.email,
            role:user.role
        },
        "FitAppSecretKey",
        {
            expiresIn:'30d',
        }
    );
}
module.exports=generateToken;