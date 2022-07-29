import mongoose from "mongoose";

let client: any;
export interface IDatabaseBootstrap {
  initialize(): any;
}

export class DatabaseBootstrap implements IDatabaseBootstrap {

  initialize() {
    const promise = new Promise((resolve, reject) => {
      const url = process.env.DATABASE_URL;
      mongoose.connect(url, {}, (err) => {
        if(err){
          reject(err);
        }
        console.log(`Connected to database ${process.env.DATABASE_NAME}`);
        client = mongoose.connection;
        resolve(true)
      });
    });
    return promise;
  }

  getConnection() {
    return client;
  }

}