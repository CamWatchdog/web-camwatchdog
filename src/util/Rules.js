export default {
  required(val) {
    return !!val || 'Campo obrigatório';
  },
  passwordMinChar(val) {
    return !val || val.length >= 8 || 'Senha deve ter no mínimo 8 caracteres';
  },
  passwordHasSpecialChar(val) {
    return (
      val === '' ||
      !/[^a-zA-Z0-9@!#$&\.]/g.test(val) ||
      'Senha não pode conter caracteres especiais além de @!#$&.'
    );
  },
  email(val) {
    return (val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) || 'E-mail inválido';
  },
};
