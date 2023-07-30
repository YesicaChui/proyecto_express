import dotenv from 'dotenv' 
dotenv.config()
export default {
    apiserver: {
        port: process.env.PORT
    },
    persistence: process.env.PERSISTENCE,
    mongo: {
        uri: process.env.MONGO_URI,
        dbname: process.env.MONGO_DB_NAME
    },
    passport:{
        clientId:process.env.PASSPORT_CLIENT_ID,
        clientSecret:process.env.PASSPORT_CLIENT_SECRET,
        clientCallbackUrl:process.env.PASSPORT_CALLBACK_URL,
    }
}