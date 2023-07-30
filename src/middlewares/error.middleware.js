import EErros from "../services/errors/enums.js";

export default (error, req, res, next) => {
    switch (error.code) {
        case EErros.INVALID_TYPES_ERROR:
            res.status(400).send({ status: 'error', error: error.name })
            break;
        case EErros.Authorized_ERROR:
            res.status(403).send({ status: 'error', error: error.name })
            break;
        case EErros.Auth_ERROR:
            res.status(401).send({ status: 'error', error: error.name })
            break;
        default:
            res.send({ status: 'error', error: 'Unhandled error' })
            break;
    }
}