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
        values: ["casa do codigo", "alura"],//validador de forma nativa do mongoose
        message: "A editora {VALUE} não é um valor permitido" 
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {//precisa ter esse mesmo nome caso contrario não vai funcionar
        validator: (valor) => {
        return valor >= 10 && valor <= 5000;//validador personalizado
      },
      message: "O numero de paginas deve estar entre 10 e 5000, valor colocado: {VALUE}"
    }
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