const regex_validate = {
  email: (value) =>
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : "Email inválido!",
  name: (value) =>
    value.length >= 3 && value.length <= 50 ? null : "Tamanho inválido [3..50]",
  username: (value) =>
    value.length >= 3 && value.length <= 50 ? null : "Tamanho inválido [3..20]",
  password: (value) =>
    value.length >= 6 && value.length <= 20 ? null : "Tamanho inválido [6..20]",
};

export default regex_validate;
