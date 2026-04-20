import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Expense } from '../models/Expense'



export const getExpensesByCategory = async (req: Request, res: Response) => {
    try {
        const expenses = await Expense.aggregate([
            // Étape 1 — garde seulement les dépenses de l'user connecté
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user!.id)
                }
            },
            // Étape 2 — regroupe par catégorie et calcule
            {
                $group: {
                    _id: "$category",       // groupe par catégorie
                    total: { $sum: "$amount" }, // additionne les montants
                    count: { $sum: 1 }      // compte le nombre de dépenses
                }
            },
            // Étape 3 — trie du plus grand au plus petit total
            {
                $sort: { total: -1 }
            }
        ])

        // Si aucune dépense trouvée
        if (!expenses.length) {
            return res.status(404).json({ message: "No expenses found" })
        }

        // Retourne le résultat
        res.status(200).json(expenses)

    } catch (error) {
        console.error(`[ExpenseController] Get expenses by category error:`, error)
        res.status(500).json({ message: "Internal server error" })
    }
}


export const getMonthlyTotals = async (req: Request, res: Response) => {
    try {
        const expenses = await Expense.aggregate([
            // Étape 1 — filtre les dépenses de l'user
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user!.id)
                }
            },
            // Étape 2 — regroupe par mois et année
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },   // extrait le mois de la date
                        year: { $year: "$date" }       // extrait l'année de la date
                    },
                    total: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            // Étape 3 — trie du plus récent au plus ancien
            {
                $sort: {
                    "_id.year": -1,
                    "_id.month": -1
                }
            }
        ])

        if (!expenses.length) {
            return res.status(404).json({ message: "No expenses found" })
        }

        res.status(200).json(expenses)

    } catch (error) {
        console.error(`[ExpenseController] Get monthly totals error:`, error)
        res.status(500).json({ message: "Internal server error" })
    }
}