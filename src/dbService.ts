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

const getUser = async (username: string, password: string) => {
    const db = await connectToDB();
    const user = await db.get('SELECT * FROM Persons WHERE Username = ? AND PasswordHash = ?', [username, password])
    await db.close();
    return user;
}

const isAdmin = async (username: string) => {
    const db = await connectToDB();
    const user = await db.get("SELECT COUNT(*) AS IsAdmin FROM Persons p JOIN PersonRoles pr ON p.PersonID = pr.PersonID JOIN Roles r ON pr.RoleID = r.RoleID WHERE p.Username = ? AND r.RoleName = 'Admin'", [username]);
    await db.close();
    return user.IsAdmin;
}

const getAllPatients = async () => {
    const db = await connectToDB();
    const patients = await db.all("SELECT * FROM Persons p JOIN PersonRoles pr ON p.PersonID = pr.PersonID JOIN Roles r ON pr.RoleID = r.RoleID WHERE r.RoleName = 'Patient'")
    await db.close();
    console.log("patients were fetched");
    return patients;
}

module.exports = { connectToDB, getUsers, getUser, isAdmin, getAllPatients };