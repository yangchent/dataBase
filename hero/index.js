const express= require ("express");
const app= express();
const dotenv= require("dotenv");
const {Pool} = require("pg");
dotenv.config({
    path: "../config.env"
})

//connection to postgreSql
const Postgres = new Pool({ ssl: { rejectUnauthorized: false}});

app.use(express.json());

app.post("/powers", async (req,res)=> {
    const powerName = req.body.name;
	console.log(powerName)
    try{
        await Postgres.query("INSERT INTO powers(name) VALUES($1)", [ powerName ]);
    } catch(err){
        return res.status(400).json({
			message: "An error happened",
    })}
    res.status(201).json({
		message: "success",
})
});

app.post("/heroes", async (req,res)=> {
    const bname = req.body;

    try{
        await Postgres.query("INSERT INTO heroes(name, color, is_alive, age, image) VALUES($1,$2,$3,$4,$5)", 
        [ bname.name, bname.color, bname.is_alive, bname.age, bname.image ]);
    } catch(err){
        return res.status(400).json({
			message: "An error happened",
    })}
    res.status(201).json({
		message: "success",
})
});
app.get('/', async (_req, res) =>{
    let heroes;
    try{
        heroes= await Postgres.query("SELECT * FROM heroes");
    } catch(err){
        return res.status(400).json({
            message: "Error"
        });
    }
    res.json({
        message: "success",
        data: heroes.rows
    });
});
app.post("/heroes_power", async (req,res)=> {
    const hero = req.body;

    try{
        await Postgres.query("INSERT INTO heroes_power(heroes_id, power_id) VALUES($1,$2)", 
        [ hero.heroes_id, hero.power_id ]);
    } catch(err){
        return res.status(400).json({
			message: "An error happened",
    })}
    res.status(201).json({
		message: "success",
})
});

app.listen(5432, () => console.log("Listening to port "));