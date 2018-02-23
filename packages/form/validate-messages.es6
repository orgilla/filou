export default {
  default: 'Validation error on field %s',
  required: '%s is required',
  enum: '%s must be one of %s',
  whitespace: '%s cannot be empty',
  date: {
    format: '%s date %s is invalid for format %s',
    parse: '%s date could not be parsed, %s is invalid ',
    invalid: '%s date %s is invalid'
  },
  types: {
    string: 'Der Wert ist nicht vom Datentyp %s',
    method: 'Der Wert ist nicht vom Datentyp %s (function)',
    array: 'Der Wert ist nicht vom Datentyp %s',
    object: 'Der Wert ist nicht vom Datentyp %s',
    number: 'Der Wert ist nicht vom Datentyp %s',
    date: 'Der Wert ist nicht vom Datentyp %s',
    boolean: 'Der Wert ist nicht vom Datentyp %s',
    integer: 'Der Wert ist nicht vom Datentyp %s',
    float: 'Der Wert ist nicht vom Datentyp %s',
    regexp: 'Der Wert ist valide',
    email: 'Der Wert entspricht keiner E-Mail-Adresse',
    url: 'Der Wert entspricht keiner URL',
    hex: 'Der Wert entspricht keinem Hex-Wert'
  },
  string: {
    len: '%s must be exactly %s characters',
    min: '%s must be at least %s characters',
    max: '%s cannot be longer than %s characters',
    range: '%s must be between %s and %s characters'
  },
  number: {
    len: '%s must equal %s',
    min: '%s cannot be less than %s',
    max: '%s cannot be greater than %s',
    range: '%s must be between %s and %s'
  },
  array: {
    len: '%s must be exactly %s in length',
    min: '%s cannot be less than %s in length',
    max: '%s cannot be greater than %s in length',
    range: '%s must be between %s and %s in length'
  },
  pattern: {
    mismatch: '%s value %s does not match pattern %s'
  }
};
