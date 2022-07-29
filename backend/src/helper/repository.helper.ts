import mongoose, { ClientSession } from "mongoose";
import { CustomError } from "./errors.handler";

type TransactionCallback = (session: ClientSession) => Promise<void>;

export class RepositoryHelper {
  static runInTransaction = async (callback: TransactionCallback): Promise<void> => {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      await callback(session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new CustomError(500, error.message);
    } finally {
      session.endSession();
    }
  };
}
