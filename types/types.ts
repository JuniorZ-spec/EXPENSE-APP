import { Document, Types } from "mongoose";

export enum ExpenseCategory {
    Food = "Food",
    Transportation = "Transportation",
    Entertainment = "Entertainment",
    Utilities = "Utilities",
    Healthcare = "Healthcare",
    Other = "Other"
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

export interface IExpense extends Document {
    title: string;
    amount: number;
    date: Date;
    category: ExpenseCategory;
    userId: Types.ObjectId;
}
