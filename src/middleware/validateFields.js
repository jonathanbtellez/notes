import { response } from "express";
import { validationResult } from "express-validator";


export const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array()
        });
    }
    next();
}