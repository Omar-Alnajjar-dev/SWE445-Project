const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');


const DB_PATH = './src/SWE445.db';

function connectToDB() {
    return sqlite.open({
        filename: DB_PATH,
        driver: sqlite3.Database
    });
}

const getUsers = async () => {
    const db = await connectToDB();
    const users = await db.all('SELECT * FROM Persons')
    await db.close();
    return users;
}

module.exports = { connectToDB, getUsers };