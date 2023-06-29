const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8080;
const web3Route = require("./routes/Web3route");

app.use(express.json());
app.use(cookiParser());
app.use(cors());


app.use("/api/web3", web3Route);

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})