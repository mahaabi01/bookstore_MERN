import express from "express";
import connection from "./models/index.js"
import bookRoute from "./routes/bookRoute.js";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend is working.");
});

app.use("/book", bookRoute);
app.use(express.static("public"))



app.listen(process.env.PORT || 8000, async ()=> {
    console.log("Server has started.");

    try {
    await connection.authenticate();
    connection.sync();
    console.log("Successfully connected to the database.");
    } 
    catch(err) {
        console.log("Error during connectiion to database.", err);
    }
});