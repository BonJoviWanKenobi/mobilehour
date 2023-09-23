import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: "localhost",
    database: "themobilehourdb",
    user: "root",
    password: "root",
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});

export default db;