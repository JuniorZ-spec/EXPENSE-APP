import mongoose from "mongoose";
import { IExpense } from "../types/types";

const expenseSchema = new mongoose.Schema<IExpense>({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Expense = mongoose.model<IExpense>("Expense", expenseSchema);