/* 
1. name id
2. location
3. list of assets
*/

class Storage {
    constructor(storageId, location){
        if (this.validInput(userId, location)) {
            this.storageId = storageId;
            this.location = location;
            this.itemList = [];
            
            this.type = 'storage';

            if (this.__isContract) {
              delete this.__isContract;
            }
            
            return this;
      
        } else {
        throw new Error('Invalid Input.');
        } 
    }

    async validInput(storageId, location) {
        return true;
    }
}

module.exports = User; 