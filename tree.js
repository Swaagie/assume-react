'use strict';

function Tree(src) {
  this.src = src;
}

Tree.prototype.findAll = function findAll(expressions) {
  return expressions.map(expression => this.find(expression));
};

Tree.prototype.find = function find(selectors, branch) {
  if (!branch) branch = this.src;

  return selectors.reduce((node, selector) => {
    return this.leaf(branch, selector) || node;
  }, {});
};

Tree.prototype.leaf = function leaf(child, selector) {
  let tree = this;

  return (function walk(leaf) {
    if (tree.match(leaf, selector)) return leaf;

    if (Array.isArray(leaf.props.children)) {
      return leaf.props.children.find(walk);
    }
  })(child);
};

Tree.prototype.match = function match(node, statement) {
  if (node.type.prototype) console.log(node.type.prototype.render());
  return statement.tag === node.type || statement.tag === (node.type.name || '').toLowerCase();
};

export default Tree;