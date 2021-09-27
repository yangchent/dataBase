const express= require ("express");
const app= express();
const dotenv= require("dotenv");
const {Pool} = require("pg");
dotenv.config({
    path: "./config.env"
})

//connection to postgreSql
const Postgres = new Pool({ ssl: { rejectUnauthorized: false}});

app.get("/", async (_req,res) => {
    let users;
	try {
		users = await Postgres.query("SELECT * FROM students");
	} catch (err) {
		return res.status(400).json({
			message: "An error happened",
		});
	}
	res.json({
		message: "success",
		data: users.rows,
	});
});

app.get("/:id", async (req, res) => {
	const userId = req.params.id;
	let user;

	try {
		user = await Postgres.query("SELECT * FROM students WHERE id=$1", [
			userId,
		]);
	} catch (err) {
		return res.status(400).json({
			message: "An error happened",
		});
	}
    res.json({
		message: "success",
	});
});
app.post("/students", async (req,res)=> {
    const studentName = req.body;
    try{
        await Postgres.query("INSERT INTO students(name, city) VALUES($1, $2)", [ studentName, city ]);
    } catch(err){
        return res.status(400).json({
			message: "An error happened",
    })}
    res.status(201).json({
		message: "success",
})
});
app.listen(5432, () => console.log("Listening"));