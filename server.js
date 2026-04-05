const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Şəkildə bazanın adının aeroport_db olduğunu gördüm
const pool = new Pool({
    user: 'postgres',          
    host: 'localhost',
    database: 'aeroport_db', 
    password: '1234', // Öz Postgres şifrənizi yazın
    port: 5432,                
});

pool.connect()
    .then(() => console.log("PostgreSQL Bazasına uğurla qoşulduq!"))
    .catch(err => console.error("Baza qoşulma xətası:", err));

app.post('/api/register', async (req, res) => {
    const { fullname, finCode, phone } = req.body;
    try {
        const queryText = 'INSERT INTO passengers(fullname, fin_code, phone) VALUES($1, $2, $3) RETURNING *';
        const values = [fullname, finCode, phone];
        const result = await pool.query(queryText, values);
        res.status(200).send({ message: "Uğurla yadda saxlanıldı!", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Xəta baş verdi!" });
    }
});

app.listen(3000, () => {
    console.log("Server 3000-ci portda işləyir...");
});