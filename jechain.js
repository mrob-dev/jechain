const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

// Block creation

class Block {
    constructor(timestamp= "", data= []) {
        this.timestamp = timestamp;
        this.data =  data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    }

    getHash() {
        return SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash + this.nonce);
    }

    mine(difficulty){
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        }
    }
}

// Blockchain creation class

class blockChain {
    constructor(){
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blockTime = 30000;
    }

    getLastBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(block){
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();

        block.mine(this.difficulty);
        
        this.chain.push(block);

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }

    isValid(blockchain = this) {
        for(let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            if (currentBlock.hash !== currentBlock.getHash() || currentBlock.prevHash !== prevBlock.hash){
                return false;
            }
        }
        return true;
    }
}

// JeChain creation

const JeChain = new blockChain();
JeChain.addBlock(new Block(Date.now().toString(), ["Hello", "Waarld"]));
JeChain.addBlock(new Block(Date.now().toString(), ["Hello", "Warld"]));
JeChain.addBlock(new Block(Date.now().toString(), ["Hello", "Wurld"]));
JeChain.addBlock(new Block(Date.now().toString(), ["Hello", "Werld"]));
console.log(JeChain.chain);