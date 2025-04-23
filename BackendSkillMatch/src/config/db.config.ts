import { Pool } from 'pg';
import dotenv from 'dotenv';
import { ConnectionOptions } from 'tls';

dotenv.config();

const ssl: ConnectionOptions = {
    rejectUnauthorized: false, // for development (set true in production with valid cert)
};

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl,
});

export default pool;
