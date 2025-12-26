import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

/* ------------ Default Categories (Education added) ------------ */
const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Salary",
  "Education",   // 👈 NEW CATEGORY
  "Others",
];

export function ExpenseProvider({ children }) {
  /* -------------------- Transactions -------------------- */
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("cashflow-transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cashflow-transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function addTransaction(transaction) {
    setTransactions((prev) => [transaction, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  /* -------------------- Categories -------------------- */
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("cashflow-categories");
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // Merge new defaults only once — safe auto-sync
  useEffect(() => {
    setCategories((prev) => {
      const merged = Array.from(new Set([...DEFAULT_CATEGORIES, ...prev]));
      localStorage.setItem("cashflow-categories", JSON.stringify(merged));
      return merged;
    });
  }, []);

  function addCategory(name) {
    if (!name.trim()) return;

    setCategories((prev) => {
      if (prev.includes(name)) return prev;
      const updated = [...prev, name];
      localStorage.setItem("cashflow-categories", JSON.stringify(updated));
      return updated;
    });
  }

  function deleteCategory(name) {
    setCategories((prev) => {
      const updated = prev.filter((c) => c !== name);
      localStorage.setItem("cashflow-categories", JSON.stringify(updated));
      return updated;
    });
  }

  /* -------------------- Monthly Budget -------------------- */
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem("cashflow-budget");
    return saved ? Number(saved) : 30000;
  });

  useEffect(() => {
    localStorage.setItem("cashflow-budget", monthlyBudget);
  }, [monthlyBudget]);

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        categories,
        addCategory,
        deleteCategory,
        monthlyBudget,
        setMonthlyBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within ExpenseProvider");
  }
  return context;
}
