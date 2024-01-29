const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const app = express();

/*

EVERYTHING BELOW IS JUST FOR TESTING PURPOSES
IT'S SUPER BAD PRACTICE AND ALL THAT, AND THE CREATEUSER DOESN'T WORK VIA FRONTEND
BUT IT DOES HOWEVER WORK VIA POSTMAN

*/

app.use(cors());

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/createuser", async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
        "INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, username, email, hashedPassword],
        (err, results) => {
            if (err) throw err;
            res.json(results);
        }
    );
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
