export class users {
  constructor(email, nome, peso, idade, formacao, type, senhaCadastro, telefone, altura, data, sexo) {
    this.email = email;
    this.nome = nome;
    this.peso = peso;
    this.idade = idade;
    this.formacao = formacao;
    this.type = type;
    this.senhaCadastro = senhaCadastro;
    this.telefone = telefone;
    this.altura = altura;
    this.data = data;
    this.sexo = sexo;
  }
}

export default { users }