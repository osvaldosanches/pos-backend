//Osvaldo Sanches
//Projeto - POC PUC Minas
//2020-2021

const express = require("express");
const bodyParse = require("body-parser");
//permite que o react acesse os dados da aplicação
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    //host: "localhost",
    //user: "root",
    //port: "3306",    
    //password: "password",
    //database: "gn",
    host: "sql10.freemysqlhosting.net",
    user: "sql10390375",
    port: "3306",
    password: "bNwmyj2pqM",
    database: "sql10390375",
    //acquireTimeout: 1000000,
    //queryTimeout: 1000000,

});

//chamada para banco - select
app.get("/api/get",(req,res)=>{
    
    //const sqlSelect = "SELECT * FROM `sql10390375`.`norma`;";
    const sqlSelect = "SELECT * FROM norma;";
        
    db.query(sqlSelect,(err,result)=>{
        
        console.log("teste >>>>>>>>>>>>>>> osvaldo");   
        console.log(result); 
        console.log(sqlSelect);
        console.log(err);
        //console.log(err.code);
        
        //linhas para resolver o erro do console - o cabeçalho CORS 'Access-Control-Allow-Origin' não está presente
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(result);
        //res.send('hello Osvaldo teste2 ');
    }); 

});

app.use(cors());

app.use(express.json());

app.use(bodyParse.urlencoded({extended:true}));

//chamada para banco - insert
app.post("/api/insert",(req,res)=>{
//app.post('/api/insert',(req,res)=>{   
    
    const nome = req.body.nome
    const descricao = req.body.descricao

    const sqlInsert = "INSERT INTO norma (nome, descricao, codigo, inicioVigencia, fimVigencia) VALUES ( ?, ?, '012', '01022021', '31122021');";
    
    
    db.query(sqlInsert,[nome, descricao],(err,result)=>{
        console.log(nome);
        console.log(descricao);
        console.log(result);        
        console.log(err); 
    }); 

});

//chamada para banco - delete
app.delete("/api/delete/:nome", (req,res) =>{
    const nome = req.params.nome;
    const sqlDelete = "delete from norma where nome = ?;";
    
    db.query(sqlDelete, nome, (err, result)=>{

        console.log("osvaldo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(nome);
        console.log(err);
        console.log(result);
        
        if(err) console.log(err);
        
    });

})

//chamada para banco - update
app.put("/api/update", (req,res) =>{
    const nome = req.body.nome;
    const descricao = req.body.descricao;

    const sqlUpdate = "update norma set descricao = ? where nome = ?;";
    
    db.query(sqlUpdate, [descricao,nome], (err, result)=>{

        console.log("osvaldo!");
        console.log(nome);
        console.log(descricao);
        console.log(err);
        console.log(result);
        
        if(err) console.log(err);
        
    });

})

app.listen(process.env.PORT || 3001);
//app.listen(3001,()=>{
//    console.log("running on port 3001");
//});


