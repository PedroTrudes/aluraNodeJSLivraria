import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";


class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find().populate("autor", "nome");
      req.resultado = buscaLivros;//guardando informacoes para usar no middleware
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
        if(!livroResultados){
          next(new NaoEncontrado("Id não localizado"))
        }else{
          res.status(200).send(livroResultados);
        }
    } catch (erro) {
      next(erro)
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroId = await livros.findByIdAndUpdate(id, {$set: req.body});
      if(!livroId){
        next(new NaoEncontrado("Id não localizado"));
      }else{
        res.status(200).send({message: "Livro atualizado com sucesso"});
      }
    } catch (erro) {
      next(erro)
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroId = await livros.findByIdAndDelete(id);
      if(!livroId){
        next(new NaoEncontrado("Id não localizado"));
      }else{
        res.status(200).send({message: "Livro removido com sucesso"});
      }
    } catch (erro) {
      next(erro)
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query)
      if(busca !== null){
        const livrosResultado = livros.find(busca)
        .populate("autor").sort({numeroPaginas : 1});

        req.resultado = livrosResultado;
        next();
        /* 
          if(livrosResultado !== null){ 
            res.status(200).send(livrosResultado);//Ajustar o erro
          }else{
            res.status(404).send({message: "Dados não localizados"})
          }
        */
      }else{
        res.status(200).send([])
      }
      //find pegando do objeito que vem dentro de busca
    } catch (erro) {
      next(erro)
    }
  };
}

async function processaBusca(parametros) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;
  const regex = new RegExp(titulo, "i")//fazendo regex de forma nativa do JS

  //Filtrando a nossa REQ pelo query
  let busca = {}

  

  if(editora) {
    busca.editora = { $regex: editora, $options: "i"}//fazendo REGEX nativo do mongoose
  }
  if(titulo){
    busca.titulo = regex
  }
  if(minPaginas || maxPaginas){
    busca.numeroPaginas = {};
  }
  
  if(minPaginas) busca.numeroPaginas.$gte = minPaginas
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas
   
  if(nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor});
    if(autor !== null) {
      const autorId = autor._id;
      busca.autor = autorId;
    }else{
      busca = null
    }
  }
  
  return busca
}

export default LivroController;