import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);
//criando um middlware de erro
/* 
Isso porque a ordem em que os middlewares são registrados na aplicação é importante. 
Como o middleware acima foi registrado antes dos métodos dos controladores, seu código
 será executado primeiro para qualquer requisição. E se um middleware enviar uma 
 resposta para o cliente (nesse caso, com o método send), o fluxo da requisição 
 encerra nessa resposta, e quaisquer middlewares registrados depois desse não serão 
 executados. Afinal, apenas uma resposta pode ser enviada para cada requisição.
*/
app.use(manipuladorDeErros)

export default app;