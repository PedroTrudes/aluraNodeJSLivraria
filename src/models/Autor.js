import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String, 
      required: [true, "O nome é obrigatorio"]//mensagem de erro personalizadas
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;