import { Expense } from "../modeles/expenseModele";


export const createExpense = async (req: any, res: any) => {
    try {
        const { title, amount, date, category, description } = req.body;
        const userId = req.user._id;

        const newExpesnse = new Expense({
            title,
            amount,
            date,
            category,
            description,
            userId
        })

        const savedExpense = await newExpesnse.save();
        res.status(201).json(savedExpense);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create expense", error });
    }

}


export const getAllExpenses = async (req: any, res: any) => {
    try {
        const userId = req.user._id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch expenses", error });
    }
}


export const oneExpense = async (req: any, res: any) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user._id;
        const expense = await Expense.findOne({ _id: expenseId, userId });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch expense", error });
    }
}




export const updateExpense = async (req: any, res: any) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user._id;
        const { title, amount, date, category, description } = req.body;

        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: expenseId, userId },
            { title, amount, date, category, description },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Failed to update expense", error });
    }
}


export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user._id;
        const deletedExpense = await Expense.findOneAndDelete({ _id: expenseId, userId });
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete expense", error });
    }
};



export const getExpensesByCategory 