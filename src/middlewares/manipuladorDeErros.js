import mongoose from "mongoose";

//eles interceptan a req antes de ser feito de fato a chamada ((middlewares de erros))
function manipuladorDeErros(erro, req, res, next) {
    //O mongose usa 24 caracteres para ID então quando passamos algo diferente ele nos responde com esse erro
    if(erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados foram passados de maneira errada"})
    }else if(erro instanceof mongoose.Error.ValidationError) {
        const messagesErro = Object.values(erro.errors).map(erro => erro.message).join("; "); 
        res.status(400).send({message: "Um ou mais campos obrigatorios", errorName: messagesErro});
    }else {
        res.status(500).send({message: "Erro interno de servidor"});
    }
}

export default manipuladorDeErros;