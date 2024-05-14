const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');


const DB_PATH = './src/SWE445.db';

function connectToDB() {
    return sqlite.open({
        filename: DB_PATH,
        driver: sqlite3.Database
    });
}

const getAllUsers = async () => {
    const db = await connectToDB();
    const users = await db.all('SELECT * FROM Persons')
    await db.close();
    return users;
}

const getAllUserswithRoles = async () => {
    const db = await connectToDB();
    const users = await db.all("SELECT  p.PersonID, p.Email, CONCAT(p.FirstName, ' ', COALESCE(p.MiddleName, ''), ' ', p.LastName) AS FullName, r.RoleName FROM Persons p JOIN PersonRoles pr ON p.PersonID = pr.PersonID JOIN Roles r ON pr.RoleID = r.RoleID")
    await db.close();
    return users;
};

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

const getByID = async (id: number) => {
    const db = await connectToDB();
    const user = await db.get('SELECT * FROM Persons WHERE PersonID = ?', [id])
    await db.close();
    return user;
}

const checkUsers = async (username: string, email: string) => {
    const db = await connectToDB();
    const users = await db.get("SELECT COUNT(*) AS UserExists FROM Persons WHERE Username = ? OR Email = ?", [username, email])
    await db.close();
    return (users.UserExists > 0);
}

const insertUser = async (FName: string, MName: string, LName: string, Username: string, Email: string, Password: string, PhoneNumber: string, BirthDate: string, Gender: string, Address: string) => {
    const db = await connectToDB();
    try {
        await db.run("INSERT INTO Persons (FirstName, MiddleName, LastName, Username, Email, PasswordHash, PhoneNumber, DateOfBirth, Address, Gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [FName, MName, LName, Username, Email, Password, PhoneNumber, BirthDate, Address, Gender]);
        await db.run("INSERT INTO PersonRoles (PersonID, RoleID) SELECT PersonID, 1 FROM Persons WHERE Username = ?", [Username]);
    } catch (error) {
        return error;
    }
    await db.close();
    return true;
}

module.exports = { connectToDB, getAllUsers, getUser, isAdmin, getAllPatients, getAllUserswithRoles, getByID, checkUsers, insertUser };