import express from "express";
import fs from "fs";
import {format} from "date-fns";
import path from "path";

const app=express();
const PORT=4000;


//middleware
app.use(express.json());

app.get("/",(req,res)=>{
    let today = format(new Date(),"dd-MM-yyyy-hh-mm-ss");
    const filepath=`Timestamp/${today}.txt`
    fs.writeFileSync(filepath,`${today}`,"utf8")
    res.status(200).send(
        `<div style="text-align: center;">
            <h3>File created at <strong>${filepath}</strong> by this data => <strong>${today}</strong>.</h3>
            <h3>Change the endpoint to <strong>/read</strong> to retrieve all Timestamp's data.</h3>
        </div>`
    );
})
app.get("/read",(req,res)=>{
    const directoryPath = "Timestamp"; 
    const filenames = fs.readdirSync(directoryPath);
    const filesData = [];
    filenames.forEach((filename) => {
        const filePath = path.join(directoryPath, filename);
        const data = fs.readFileSync(filePath, "utf8");
        filesData.push({ filename, data });
    });
    res.status(200).json(filesData);
    
})
app.listen(PORT,()=>{
    console.log(`App is listening on the port:${PORT}`);
})