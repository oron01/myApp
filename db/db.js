import dotenv from "dotenv";
dotenv.config();

import {Pool} from 'pg';

// create a connection pool using DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// console.log(pool.query("INSERT INTO skibidi (test) values('BillyBob')"))
let a = await pool.query("SELECT * from skibidi")
console.log(a.rows)

export default {
  query: (text) => pool.query(text),
};