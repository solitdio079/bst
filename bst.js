function Tree(sortedArray){
    let root = buildTree(sortedArray)

    function insert(value,node=root) {
        //console.log(typeof node)
        if(value === node.data) return 
        if(value > node.data && !node.right){
            node.right = createNode(value)
            return
        }else if(value > node.data && node.right) {
           insert(value,node.right)
        
        }

        else if(value < node.data && !node.left){
            node.left = createNode(value)
            return
        }else{
           insert(value,node.left)
        }

    }
    // iterative
    function levelOrderForEach(callback=null,node=root){
        if(callback === null) throw new Error("Provide a callback!")
      
        const q = [node]
        while(q.length>0){
            callback(q[0])
            if(q[0].left){
                q.push(q[0].left)
            }
            if(q[0].right){
                q.push(q[0].right)
            }
            q.shift()
        }
        

    }
    // recursive levelOrder
    
    function levelOrderForEachRec(callback=null, node=root,q=[]){
        if(callback === null) throw new Error("Provide a callback!")
        if(node !==null) callback(node)
       
        if(node.left) q.push(node.left)
        if(node.right) q.push(node.right)
        if(q.length<=0) return
        levelOrderForEachRec(callback,q.shift(),q)
        
        
    }
    //get depth
    function depth(value, node=root){
        const q = [node]
        while(q.length>0){
            if(q[0].data === value) return getDepth(q[0].data)
            if(q[0].left){
                q.push(q[0].left)
            }
            if(q[0].right){
                q.push(q[0].right)
            }
            q.shift()
        }

        return null


    }
    function getDepth(value, node=root,depth=0){
        //if(node !== null) return
        if(value === node.data) return depth
        depth += 1 
           
        if(node.left){
            if(value === node.left.data) return depth 
            if (getDepth(value,node.left,depth)) return getDepth(value,node.left,depth)
        } 
        if(node.right){
            if(value === node.right.data) return depth 
            if(getDepth(value,node.right,depth)) return getDepth(value,node.right,depth)
        }

    }

    // get hegiht 
    function height(value, node=root){
        const q = [node]
        while(q.length>0){
            if(q[0].data === value) return getHeight(q[0])
            if(q[0].left){
                q.push(q[0].left)
            }
            if(q[0].right){
                q.push(q[0].right)
            }
            q.shift()
        }

        return null

       
    }
    function getHeight(node){
        let levelLeft = 0
        let leftSide = node.left 
        let rightSide = node.right
        while(leftSide){
            leftSide = leftSide.left || leftSide.right
            levelLeft++
        }
        let levelRight = 0 
        while(rightSide){
            rightSide = rightSide.right || rightSide.left
            levelRight++
        }
        return levelLeft > levelRight ? levelLeft:levelRight

    }
    // depth first traversal
    function inOrderForEach(callback, node=root){
        if(callback === null) throw new Error("Provide a callback!")
        if(node === null) return 
        inOrderForEach(callback,node.left) 
        callback(node) 
        inOrderForEach(callback,node.right)
    }
    // depth first traversal
    function preOrderForEach(callback, node=root){
        if(callback === null) throw new Error("Provide a callback!")
        if(node === null) return 
        callback(node) 
        preOrderForEach(callback,node.left) 
        preOrderForEach(callback,node.right)
    }
    // depth first traversal
    function postOrderForEach(callback, node=root){
        if(callback === null) throw new Error("Provide a callback!")
        if(node === null) return 
        postOrderForEach(callback,node.left) 
        postOrderForEach(callback,node.right)
        callback(node) 
    }

    // isBalanced
    function isBalanced(node=root){
        if(node === null) return true
        const rightHeight =node.right ? height(node.right.data) || 0 : 0
        const leftHeight = node.left ?  height(node.left.data) || 0: 0
        //console.log(Math.abs(rightHeight - leftHeight))
        if(Math.abs(rightHeight - leftHeight) > 1){
            return false
        }else{
            return isBalanced(node.right) === true && isBalanced(node.left) === true
        }


    }

    function deleteItem(value, node=root){
        if(node.data === null) return 
        
        if(value > node.data){
            node.right = deleteItem(value, node.right)
        }else if(value < node.data){
            node.left = deleteItem(value, node.left)
        }else{
            // node has one child
            if(node.right && !node.left){
                node.data = node.right.data 
                node.right = null
               
            }else if(node.left && !node.right){
                node.data = node.left.data 
                node.left = null
            }
            // case:1 root is a leaf
            else if(!node.left && !node.right){
                node = null 
            }
            // case:2 root is has both children
            else{
                const succ = getSuccessor(node)
                node.data = succ.data 
                node.right =  deleteItem(succ.data, node.right)
            }
                


        }
        return node

    }

    function rebalance(){
        const arr = []
        inOrderForEach((node) => arr.push(node.data))
        root = buildTree(arr)
        //console.log(arr)
        //console.log(root.data)

    }


    function find(value,node=root){
        if(node === null) return null
        if(node.data === value) return node 
        if(value < node.data){
            return find(value, node.left)
        }else if(value > node.data){
            return find(value, node.right)
        }
       
    }

    function getSuccessor(node=root){
        node = node.right 
        while(node.left !==null && node !==null){
            node = node.left
        }
        return node

    }
    function buildTree(array){
        const sortedArr = Array.from(new Set(array)).sort((a,b) => a-b)
        //console.log(sortedArr)
        if(sortedArr.length<1) return null
    
        const middle = Math.floor((sortedArr.length-1)/2)
        const root = createNode(sortedArr[middle])
        if(0 >= sortedArr.length) return null
        root.left = buildTree(sortedArr.slice(0,middle))
        root.right = buildTree(sortedArr.slice(middle+1))
        return root
    
    }
    function getRoot(){
        return root
    }


    return {insert, getRoot, deleteItem,find,levelOrderForEach,levelOrderForEachRec, preOrderForEach,inOrderForEach,postOrderForEach,height,depth, isBalanced,rebalance}
}



export default Tree

function createNode(data,left=null,right=null){
    return {data,left, right}
}