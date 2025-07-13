import Tree from "./bst.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

const randomArray = Array.from({length:20}, (e) => Math.floor(Math.random()*100))
console.log(randomArray)
const newTree = Tree(randomArray)
//console.log(newTree.getRoot().data)
prettyPrint(newTree.getRoot())
console.log("// Level Order")
newTree.levelOrderForEach((node) => console.log(node.data))
console.log("// In Order")
newTree.inOrderForEach((node) => console.log(node.data))
console.log("// Pre Order")
newTree.preOrderForEach((node) => console.log(node.data))
console.log("// Post Order")
newTree.postOrderForEach((node) => console.log(node.data))
console.log(newTree.isBalanced())

newTree.insert(139)
newTree.insert(159)
newTree.insert(239)
newTree.insert(149)
newTree.insert(170)
prettyPrint(newTree.getRoot())
console.log(newTree.isBalanced())
newTree.rebalance()
prettyPrint(newTree.getRoot())
console.log(newTree.isBalanced())
console.log("// Level Order")
newTree.levelOrderForEach((node) => console.log(node.data))
console.log("// In Order")
newTree.inOrderForEach((node) => console.log(node.data))
console.log("// Pre Order")
newTree.preOrderForEach((node) => console.log(node.data))
console.log("// Post Order")
newTree.postOrderForEach((node) => console.log(node.data))