import React, { createContext, useContext, useState } from "react";
import type { VoucherForm, VoucherContextType } from "../types";

const defaultForm: VoucherForm = {
  name: "",
  id: "",
  flightNumber: "",
  date: "",
  aircraft: "ATR",
};

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

export const VoucherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form, setForm] = useState<VoucherForm>(defaultForm);
  const [seats, setSeats] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  const generateVouchers = async () => {
    try {
      setError(null);
      setSeats([]);
      setLoading(true);

      const checkRes = await fetch(`${API_BASE}/api/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightNumber: form.flightNumber,
          date: form.date,
        }),
      });

      if (!checkRes.ok) throw new Error("Failed to check flight");
      const checkData = await checkRes.json();

      if (checkData.exists) {
        setError("Vouchers already generated for this flight/date.");
        setLoading(false);
        return;
      }

      const genRes = await fetch(`${API_BASE}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!genRes.ok) throw new Error("Failed to generate vouchers");
      const genData = await genRes.json();

      if (genData.error) setError(genData.error);
      else setSeats(genData.seats);
    } catch (err) {
      console.error(err);
      setError("Network or server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VoucherContext.Provider
      value={{
        form,
        setForm,
        seats,
        error,
        loading,
        generateVouchers,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucher = () => {
  const context = useContext(VoucherContext);
  if (!context) throw new Error("useVoucher must be used within VoucherProvider");
  return context;
};
