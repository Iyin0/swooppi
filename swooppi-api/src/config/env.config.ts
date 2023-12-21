export default () => ({
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT, 10) || 4000,
    DB: {
        HOST: process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT, 10) || 3306,
        USER: process.env.DB_USER,
        NAME: process.env.DB_NAME,
        PASSWORD: process.env.DB_PASSWORD
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
})