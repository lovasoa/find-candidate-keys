
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

exports.maximize = maximize;
exports.candidate_keys = candidate_keys;

function maximize(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var rel = _x,
        fundeps = _x2;
    _again = false;

    var step = fundeps.filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var orig = _ref2[0];
      var target = _ref2[1];
      return orig.every(function (o) {
        return ~rel.indexOf(o);
      });
    }).reduce(function (rel, _ref3) {
      var _ref32 = _slicedToArray(_ref3, 2);

      var orig = _ref32[0];
      var target = _ref32[1];
      return ~rel.indexOf(target) ? rel : rel.concat(target);
    }, rel);
    if (step.length > rel.length) {
      _x = step;
      _x2 = fundeps;
      _again = true;
      step = undefined;
      continue _function;
    } else {
      return step;
    }
  }
}

function candidate_keys(rel, fundeps) {
  function withoutElem(array, index) {
    return array.slice(0, index).concat(array.slice(index + 1));
  }
  var maxlen = maximize(rel, fundeps).length;
  var minimized = rel.map(function (attr, i) {
    return withoutElem(rel, i);
  }).filter(function (newrel) {
    return maximize(newrel, fundeps).length === maxlen;
  }).map(function (newrel) {
    return candidate_keys(newrel, fundeps);
  }).reduce(function (prev, keys) {
    return prev.concat(keys.filter(function (cur) {
      return !prev.some(function (r) {
        return r.every(function (a) {
          return ~cur.indexOf(a);
        });
      });
    }));
  }, []);
  return minimized.length === 0 ? [rel] : minimized;
}
