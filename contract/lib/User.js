'use strict';

class User {
    constructor(userId, location, firstName, lastName){
        if (this.validInput(userId, location)) {
            this.userId = userId;
            this.location = location;
            this.firstName = firstName;
            this.lastName = lastName;

            this.type = 'user';
            if (this.__isContract) {
              delete this.__isContract;
            }
            if (this.name) {
              delete this.name;
            }
            return this;
      
        } else {
        throw new Error('Invalid Input.');
        } 
    }

    async validInput(userId, location) {
        if(userId && location){
            return true;
        } else {
            return false;
        }
    }
}

module.exports = User;