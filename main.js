// import library
const SHA256 = require('crypto-js/sha256');

// Create Block
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index; // tell you know where the block on the chain
        this.timestamp = timestamp; // when the block is created
        this.data = data; //
        this.previousHash = previousHash; // The previousHash is a string contain the block before this one
        this.hash = this.calculateHash();
    }

    // Calculate hash || Generate  hash
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class  BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }


    // ຕົ້ນກຳເນີດ Block
    createGenesisBlock(){
        return new Block(0, "27/03/2021", "Genesis Block", "0"); //"0"  = previousHash;

    }


    // Latest Block
    getLatestBlock(){
        return this.chain[this.chain.length -1]; //connect chain to latest block using previousHash
    }



    // Create new Block
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }



    // Check valid of chain "true or false"
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]; // Create a variable for equa this.chain on line 22 (constructor)
            const previousBlock = this.chain[i -1]; //Create a variable for connect to previousBlock

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
    
            if(previousBlock.hash !== previousBlock.calculateHash()){
                return false;
            }
        }

        return true;
    }
}

let nouCoin = new BlockChain();
nouCoin.addBlock(new Block(1, "27/03/2021", {amount : 4}));
nouCoin.addBlock(new Block(2, "28/03/2021", {amount : 10}));



// Console.log for check is valid
// console.log("Is BlockChain isValid? " + nouCoin.isChainValid());

// nouCoin.chain[1].data = {amount: 100};

// console.log("Is BlockChain isValid? " + nouCoin.isChainValid());

 
console.log(JSON.stringify(nouCoin, null, 1))