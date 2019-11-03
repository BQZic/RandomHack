/*
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * init
 * generateItems
 * createUser
 * donateItem
 * 
 * 
 * queryAll, queryWithQueryString, queryByObjectType
 * deleteMyasset, readMyAsset, myAssetExists
 */

'use strict';


const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');


let Item = require('./Item.js');
let Storage = require('./Storage.js');
let User = require('./User.js');

class MyContract extends Contract {

  //update ledger with a greeting to show that the function was called
  async instantiate(ctx) {
    let users = [];
    let items = [];
    let storages = [];

    let greeting = { text: 'INIT' };
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
  }

  //take argument and create a greeting object to be updated to the ledger
  async transaction2(ctx, arg1) {
    console.info('transaction1', arg1);
    let greeting = { text: arg1 };
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
    return JSON.stringify(greeting);
  }


  async generateItem(ctx, donator, storageId, description){
      itemId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
  }

}

module.exports = MyContract;