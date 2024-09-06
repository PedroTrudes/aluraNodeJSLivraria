import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O titulo é obrigatorio"]},
    editora: {
      type: String, 
      required: [true, "A editora é obrigatorio"]},
    numeroPaginas: {type: Number},
    preco: {
      type: mongoose.Types.Decimal128,
      required: [true, "O campo valor é obrigatorio"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "O autor é obrigatorio"]}
  }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;