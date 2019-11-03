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
 
 let User = require('./User.js');
 
 class MyAssetContract extends Contract {
 
     async init(ctx){
         console.log('instantiate was called!');
         let users = [];

         let user1 = await new User('V1', 'NY', 'Yusuf', 'Guest');
         users.push(user1);
         
         // TODO: need to create sample items
         // TODO: need to create storage objects
 
         return users;
     }
 
     async createUser(ctx, args) {
        args = JSON.parse(args);
        let newUser = await new User(args.userId, args.location, args.firstName, args.lastName);
        await ctx.stub.putState(newUser.userId, Buffer.from(JSON.stringify(newUser)));
        let response = `user with userId ${newUser.userId} is updated in the world state`;
        return response;
    }
     /*
     async donateItem(ctx, args){
         args = JSON.parse(args);
         let itemExists = await this.myAssetExists(ctx, args.itemId);
         if(itemExists){
             //make sure we have an election
             let itemAsBytes = await ctx.stub.getState(args.itemId);
             let item = await JSON.parse(itemAsBytes);
             let userAsBytes = await ctx.stub.getState(args.userId);
             let user = await JSON.parse(userAsBytes);
             
             user.items.push(item.itemId);
             
 
         }
 
     }*/
 
     async myAssetExists(ctx, myAssetId) {
         const buffer = await ctx.stub.getState(myAssetId);
         return (!!buffer && buffer.length > 0);
     }
 
     async createMyAsset(ctx, myAssetId, value) {
         const exists = await this.myAssetExists(ctx, myAssetId);
         if (exists) {
             throw new Error(`The my asset ${myAssetId} already exists`);
         }
         const asset = { value };
         const buffer = Buffer.from(JSON.stringify(asset));
         await ctx.stub.putState(myAssetId, buffer);
     }
 
     async readMyAsset(ctx, myAssetId) {
         const exists = await this.myAssetExists(ctx, myAssetId);
         if (!exists) {
             throw new Error(`The my asset ${myAssetId} does not exist`);
         }
         const buffer = await ctx.stub.getState(myAssetId);
         const asset = JSON.parse(buffer.toString());
         return asset;
     }
 
     async updateMyAsset(ctx, myAssetId, newValue) {
         const exists = await this.myAssetExists(ctx, myAssetId);
         if (!exists) {
             throw new Error(`The my asset ${myAssetId} does not exist`);
         }
         const asset = { value: newValue };
         const buffer = Buffer.from(JSON.stringify(asset));
         await ctx.stub.putState(myAssetId, buffer);
     }
 
     async deleteMyAsset(ctx, myAssetId) {
         const exists = await this.myAssetExists(ctx, myAssetId);
         if (!exists) {
             throw new Error(`The my asset ${myAssetId} does not exist`);
         }
         await ctx.stub.deleteState(myAssetId);
     }
 
 }
 
 module.exports = MyAssetContract;
 