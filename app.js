const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) =>{
    res.json({
        message: 'Welcome to API'
    });
});

// verifyToken es un middleware
app.post('/api/posts', verifyToken, (req, res) =>{

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'POST created',
                authData: authData
            });
        }
    });
   
});


app.post('/api/login', (req, res) =>{
    
    //emulamos la base de datos, esto deberia devolver la busqueda de usuario y password en la base
    
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@mail.com'
    };

    jwt.sign({user:user},'secretkey', {expiresIn:'30s'}, (err, token) => {
        res.json({
            token : token
        });
    });
});

//format token
// Authorization: Bearer <access_token>

// verify Token
function verifyToken(req,res,next){
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if a bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        // next middleware
        console.log(bearerToken);
        next();

    }else{
        // forbidden
        res.sendStatus(403);
    }

};


app.listen(5000, ()=> console.log('Server started on PORT 5000'));