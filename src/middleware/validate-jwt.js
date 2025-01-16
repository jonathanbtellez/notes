import { response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '../utils/config.js';

const validateJwt = ( req, res = response, next ) => {

    let token = req.header('authorization');

    if ( !token ) {
        return res.status(401).json({
            status: "error",
            msg: 'token not found'
        });
    }

    if(token.includes('Bearer ')){
        token = token.slice(7);
    }

    try {
        
        const { uid } = jwt.verify(
            token,
            SECRET_JWT
        );

        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            status: "error",
            msg: error.messge
        });
    }

    next();
}


export {
    validateJwt
}