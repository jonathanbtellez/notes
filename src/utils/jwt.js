import jwt from 'jsonwebtoken';
import { SECRET_JWT } from './config.js';

const signJwt = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, name };
        jwt.sign( payload, SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('The token could not be generated');
            }
            resolve( token );

        })


    })
}

export {
    signJwt
}