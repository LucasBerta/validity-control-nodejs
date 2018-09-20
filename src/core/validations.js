const notNull = function (value, fields) {
  if (fields instanceof Array) {
    for (let i = 0; i < fields.length; i++) {
      if (value[fields[i]] == null) {
        return false;
      }
    }
    return true;
  } else {
    return value != null;
  }
}

const getNullFields = function (value, fields) {
  return fields.filter(field => value[field]);
}

module.exports = {
  notNull,
  getNullFields
};