require('dotenv-flow').config();

const {
    PORT: port,
    JWT_SECRET: jwtSecret,
    JWT_REFRESH_SECRET: jwtRefreshSecret,
    JWT_EXPIRATION: jwtExpiration,
    JWT_REFRESH_TOKEN_EXPIRATION: jwtRefreshTokenExpiration,
    SALT: salt,
    UPLOAD_DIR: uploadDir,
    DATA_STORED_DIR: dataStoredDir,
    ELASTICSEARCH_ELASTIC_ENDPOINT: elasticEndPoint,
    ELASTICSEARCH_ELASTIC_USERNAME: elasticUsername,
    ELASTICSEARCH_ELASTIC_PASSWORD: elasticPassword,

    POPETY_END_POINT: popetyEndPoint,
    POPETY_TOKEN: popetyToken,
    SCRAP_SIZE: scrapPopetySize,
    //
    TYPEORM_CONNECTION: typeORMConnection,
    TYPEORM_CONNECTION_URL: typeORMConnectionURL,
    TYPEORM_HOST: typeORMHost,
    MONGO_ROOT_USERNAME: typeORMUserName,
    MONGO_ROOT_PASSWORD: typeORMPassword,
    TYPEORM_DATABASE: typeORMDatabase,
    TYPEORM_PORT: typeORMPort,
    TYPEORM_SYNCHRONIZE: typeORMSynchronize,
    TYPEORM_LOGGING: typeORMLogging
} = process.env;

export const configs = {
    port,
    jwtSecret,
    jwtRefreshSecret,
    jwtExpiration,
    jwtRefreshTokenExpiration,
    salt,
    uploadDir,
    dataStoredDir,
    elasticEndPoint,
    elasticUsername,
    elasticPassword,
    popetyEndPoint,
    popetyToken,
    scrapPopetySize,
    //
    typeORMConnection,
    typeORMConnectionURL,
    typeORMHost,
    typeORMUserName,
    typeORMPassword,
    typeORMDatabase,
    typeORMPort,
    typeORMSynchronize,
    typeORMLogging
}