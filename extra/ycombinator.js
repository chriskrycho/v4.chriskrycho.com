// His implementation
var YOrig = function (F) {
 return (function (x) {
  return F(function (y) { return (x(x))(y);});
  })
        (function (x) {
  return F(function (y) { return (x(x))(y);});
  }) ;
} ;

const YOrigExpanded = function (F) {
  return (function (x) {
    return F(
      function (y) {
        const U_x = x(x)  // ends up being
        const U_x_y = U_x(y)
        return (x(x))(y);
      })
    })
         (function (x) {
    return F(
      function (y) {
        const U_x = x(x)
        const U_x_y = U_x(y)
        return (x(x))(y);
      })
    })
}

const YModern = (F) => (
  (x) => F((y) => x(x)(y))
)(
  (x) => F((y) => x(x)(y))
)


// My implementations.
const Ymine = (
  (h) =>
    (F) => F((x) => (h(h)(F))(x))
) (
  (h) =>
    (F) => F((x) => (h(h)(F))(x))
)

const YMineExpanded = (
  function(h) {
    return function(F) {
      return F(function(x) {
        const U_h = h(h)  // U = (f) => f(f) || function U(f) { return f(f) }
        const U_h_F = U_h(F)
        const U_h_F_x = U_h_F(x);
        return U_h_F_x;
      })
    }
  }
) (
  function(h) {
    return function(F) {
      return F(function(x) {
        const U_h = h(h)  // U = (f) => f(f) || function U(f) { return f(f) }
        const U_h_F = U_h(F)
        const U_h_F_x = U_h_F(x);
        return U_h_F_x;
      })
    }
  }
)

const FactGen =
  (fact) =>
    (n) => n === 0 ? 1 : n * fact(n - 1)
