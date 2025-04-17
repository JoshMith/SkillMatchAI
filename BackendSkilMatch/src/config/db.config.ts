import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

export default pool

// const waitForDb = async () => {
//     let retries = 5;
//     while (retries) {
//         try {
//             await pool.query("SELECT 1");
//             console.log("✅ DB Connected");
//             return;
//         } catch (err) {
//             console.log("❌ DB not ready, retrying...");
//             retries--;
//             await new Promise(res => setTimeout(res, 5000));
//         }
//     }
//     throw new Error("🚨 Could not connect to DB");
// };

// waitForDb();
