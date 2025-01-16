import bcrypt from 'bcryptjs';
import { response } from 'express';
import { User } from '../model/user.js';
import { signJwt } from '../utils/jwt.js';
 
const signIn = async(req, res = response ) => {

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        console.log(user)
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El user ya existe'
            });
        }

        user = new User( req.body );
        console.log(user)
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        await user.save();

        // Generar JWT
        const token = await signJwt( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}


const login = async(req, res = response ) => {

    const { username, password } = req.body;

    try {
        
        const user = await User.findOne({ username });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The email in not registered'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        const token = await signJwt( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }

}


const revalidateToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await signJwt( uid, name );

    res.json({
        ok: true,
        token
    })
}


export {
    signIn,
    login,
    revalidateToken
}