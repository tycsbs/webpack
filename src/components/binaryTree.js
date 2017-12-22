
function BinaryTree (){
    let Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    let root = null;

    this.insert = function (key) {
        let newNode = new Node(key);
        if(root === null){
            root = newNode;
        }else{
            this.insertNode(root,newNode)
        }
    }

    this.insertNode = function (node,newnode) {
        if(newnode.key < node.key){
            if(node.left === null){
                node.left = newnode;  
            }else{
                this.insertNode(node.left,newnode);
            }
        } else {
            if(node.right === null){
                node.right = newnode;
            }else{
                this.insertNode(node.right,newnode);
            }
        }
    }

    this.inOrderTravals = function(callback){
        this.inOrderTravalsNode(root,callback);
    }

    let order = [];
    this.inOrderTravalsNode = function(key,cb){
        
        if(key !== null){
           
            this.inOrderTravalsNode(key.left,cb);
        
            this.inOrderTravalsNode(key.right,cb);
            order.push(key.key)
            cb(order);

        }
    }

    return this;
    
}


let arr = [8,12,9,3,7,1,5,13,16,11];
let binaryTree = new BinaryTree();
arr.forEach((key) => {
    binaryTree.insert(key);
})


binaryTree.inOrderTravals(function(key){
    console.log(key)
})