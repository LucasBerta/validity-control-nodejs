const getRequiredMessage = function (value, fields) {
  if (fields instanceof Array) {
    return `Os campos ${fields.filter(field => field == null).join(', ')} são obrigatórios.`;
  } else {
    return `O campo ${fields} é obrigatório.`;
  }
}

module.exports = {
  getRequiredMessage
};