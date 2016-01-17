"use strict";

function maximize(rel, fundeps) {
  const step = fundeps
    .filter(([orig, target]) => orig.every(o=>~rel.indexOf(o)))
    .reduce((rel, [orig, target]) => ~rel.indexOf(target) ? rel : rel.concat(target), rel);
  return (step.length > rel.length) ? maximize(step, fundeps) : step;
}

function candidate_keys(rel, fundeps) {
  function withoutElem(array, index) {
    return array.slice(0,index).concat(array.slice(index+1));
  }
  const maxlen = maximize(rel, fundeps).length;
  const minimized = rel
    .map((attr, i) => withoutElem(rel, i))
    .filter(newrel => maximize(newrel, fundeps).length === maxlen)
    .map(newrel => candidate_keys(newrel, fundeps))
    .reduce((prev, keys) =>
      prev.concat(keys.filter(cur => !prev.some(r => r.every(a => ~cur.indexOf(a)))))
    , []);
  return minimized.length === 0 ? [rel] : minimized;
}
