import mongoose from "mongoose";

//Mongo tem jeitos de trabalhar a resposta do banco com [true, ""]
const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O titulo é obrigatorio"]},
    editora: {
      type: String, 
      required: [true, "A editora é obrigatorio"],
      enum: {
        values: ["casa do codigo", "alura"],
        message: "A editora {VALUE} não é um valor permitido" 
      }
    },
    numeroPaginas: {
      type: Number,
      min: [10, "Numero minimo de paginas é 10"],
      max: [5000, "Numero maximo de paginas é 5000"]
    },
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