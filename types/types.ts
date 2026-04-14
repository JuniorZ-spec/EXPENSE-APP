
export enum ExpenseCategory {
    Food = "Food",
    Transportation = "Transportation",
    Entertainment = "Entertainment",
    Utilities = "Utilities",
    Healthcare = "Healthcare",
    Other = "Other"
}

export interface Expense {
    id: number;
    userid: number;
    description: string;
    amount: number;
    date: string; // ISO format date string
    category: ExpenseCategory;
}



export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // In a real application, passwords should be hashed
}