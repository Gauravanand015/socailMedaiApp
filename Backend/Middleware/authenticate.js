const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        var decoded = jwt.verify(token, process.env.secretKey);
        console.log(decoded)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID;
            next()
        }
    } catch (error) {
        res.send("You Are Not Authorised")
    }
}

module.exports={
    authenticate
}