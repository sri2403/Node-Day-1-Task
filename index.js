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
    res.status(200).send(`File created at ${filepath} by this data => ${today}.
    
    Change the endpoint to /read to retrieve the all Timestamp's data.`);
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