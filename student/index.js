const express= require ("express");
const app= express();
const dotenv= require("dotenv");
const {Pool} = require("pg");
dotenv.config({
    path: "../config.env"
})

//connection to postgreSql
const Postgres = new Pool({ ssl: { rejectUnauthorized: false}});

app.use(express.json())

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

app.post("/students", async (req,res)=> {
    const studentName = req.body.name;
	console.log(studentName);
    try{
        await Postgres.query("INSERT INTO students(name) VALUES($1)", [ studentName ]);
    } catch(err){
        return res.status(400).json({
			message: "An error happened",
    })}
    res.status(201).json({
		message: "success",
})
});

app.listen(5432, () => console.log("Listening to port 5432"));