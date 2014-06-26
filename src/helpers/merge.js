function merge(base, options) {
  for (var key in options) {
    base[key] = options[key];
  }

  return base;
}

module.exports = merge;
