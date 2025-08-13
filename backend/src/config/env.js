import dotenv from "dotenv";
dotenv.config();

export const env = {
    port: process.env.PORT ?? 4000,
    oracle: {
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNECT_STRING, // host:port/service
        poolMin: Number(process.env.ORACLE_POOL_MIN ?? 1),
        poolMax: Number(process.env.ORACLE_POOL_MAX ?? 5),
        poolTimeout: Number(process.env.ORACLE_POOL_TIMEOUT ?? 60),
    },
    jwtSecret: process.env.JWT_SECRET ?? "change-me",
};
