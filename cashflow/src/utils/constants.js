// Import ALL icons needed
import {
  faUtensils,
  faCar,
  faBagShopping,
  faFileInvoiceDollar,
  faFilm,
  faHeartPulse,
  faWallet,
  faBook,
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";

export const CATEGORY_META = {
  Food: {
    icon: faUtensils,
    color: "#ef4444",
  },
  Transport: {
    icon: faCar,
    color: "#3b82f6",
  },
  Shopping: {
    icon: faBagShopping,
    color: "#8b5cf6",
  },
  Bills: {
    icon: faFileInvoiceDollar,
    color: "#f59e0b",
  },
  Entertainment: {
    icon: faFilm,
    color: "#ec4899",
  },
  Health: {
    icon: faHeartPulse,
    color: "#22c55e",
  },
  Salary: {
    icon: faWallet,
    color: "#1640a3ff",
  },
  Education: {
    icon: faBook,             // <-- FIXED
    color: "#c4cb44ff",         // <-- FIXED (correct spelling)
  },
  Others: {
    icon: faEllipsis,
    color: "#6b7280",
  },
};
