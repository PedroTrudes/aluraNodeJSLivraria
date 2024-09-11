import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro){
        const messagesErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; "); 

        super(`Um ou mais campos obrigatorios: ${messagesErro}`)
    }
}

export default ErroValidacao;