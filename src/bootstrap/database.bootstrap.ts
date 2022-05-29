import mongoose from "mongoose";
import yenv from "yenv";

const env = yenv();

export interface IDatabaseBootstrap {
  initialize(): any;
}

export class DatabaseBootstrap implements IDatabaseBootstrap {

  initialize() {
    const promise = new Promise((resolve, reject) => {
      const url = env.DATABASE.URL;
      mongoose.connect(url, {}, (err) => {
        if(err){
          reject(err);
        }
        console.log(`Connected to database ${env.DATABASE.NAME}`);
        resolve(true)
      });
    });
    return promise;
  }

}