const jwt_decode = require('jwt-decode');

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log(!req,"Input parameters...",req.body)
        console.log(Object.keys(req.body).length,"...allowedRoles...",[...allowedRoles]);
        let roles = []
        if(req !== undefined && Object.keys(req.body).length > 0) 
       { 
        roles = req.body.holder_Role !== undefined ? req.body.holder_Role : [];

        }else{
            console.log("adding  Investor...",req.headers.authorization);
            const base64Credentials =  req.headers.authorization.split(' ')[1];
            console.log("base64Credentials: " + base64Credentials)
            var token=base64Credentials;
            var decoded=jwt_decode(token);
            let token_Data =decoded.result
            console.log(token_Data.holder_Role,"Token decoded:",token_Data);

            roles = token_Data.holder_Role;
        }

        if(!roles.length > 0){
            res.json({
                success: false, 
                message: "You are not authorized to perform this request.",
            });
        }
        console.log("Roles parameters...",roles)
        const rolesList = roles.split(',');
        console.log(rolesList,"Roles parameters...")
        // if (!req.headers.authorization) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result =rolesList.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log("Results..",result);
        if (!result) return res.json({
            success: false, 
            message: "You are not authorized to perform this request.",
        });
        next();
    }
}

module.exports = verifyRoles