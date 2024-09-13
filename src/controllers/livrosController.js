import NaoEncontrado from "../erros/NaoEncontrado.js";
import {livros} from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor", "nome")
        .exec();
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro)
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
      const {editora, titulo} = req.query;
      //Filtrando a nossa REQ pelo query
      const busca = {}
      if(editora) {
        busca.editora = editora
      }
      if (titulo){
        busca.titulo = titulo
      }
      //find pegando do objeito que vem dentro de busca
      const livrosResultado = await livros.find(busca);
      if(livrosResultado !== null){
        res.status(200).send(livrosResultado);//Ajustar o erro
      }else{
        res.status(404).send({message: "Editora não localizada"})
      }
    } catch (erro) {
      next(erro)
    }
  };
}

export default LivroController;