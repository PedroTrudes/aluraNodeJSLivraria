import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class AutorController {

  static listarAutores = async(req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      if(!autorResultado){//404 para quando um id não é localizado
        next(new NaoEncontrado("Id não localizado"))
      }else{
        res.status(200).send(autorResultado);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };
  

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autoresId = await autores.findByIdAndUpdate(id, {$set: req.body});
      if(!autoresId){
        next(new NaoEncontrado("Id não localizado"))
      }else{
        res.status(200).send({message: "Autor atualizado com sucesso"});
      }
  
    } catch (erro) {
      next(erro);
    }
  };
  
  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autoresId = await autores.findByIdAndDelete(id);
      if(!autoresId){
        next(new NaoEncontrado("Id não localizado"))
      }else{
        res.status(200).send({message: "Autor removido com sucesso"});
      }
    } catch (erro) {
      next(erro)
    }
  };
  

}

export default AutorController;