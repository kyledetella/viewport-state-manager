function bind (fn, ctx) {
  return function () {
    fn.apply(ctx, arguments);
  }
}

module.exports = bind;
