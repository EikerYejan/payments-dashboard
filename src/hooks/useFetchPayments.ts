"use client";

import { useCallback, useEffect, useState } from "react";
import { mockPayments } from "@/mocks/payments";
import type { Payment } from "@/types/payments";

const PAYMENT_NOT_FOUND = "No payments found";

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentsToRender, setPaymentsToRender] = useState<Payment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setTimeout(() => {
      setPayments(mockPayments);
      setPaymentsToRender(mockPayments);
    }, 500);
  }, []);

  // find two payments that sum to targetAmount
  const searchPayments = useCallback(
    (targetAmount: number) => {
      const seen = new Map();

      for (let i = 0; i < payments.length; i++) {
        const transaction = payments[i];
        const complement = targetAmount - transaction.amount;

        // Check if the complement (target - current transaction amount) exists in the map
        if (seen.has(complement)) {
          const ids = [seen.get(complement), transaction.id];
          const foundPayments = payments.filter((payment) => {
            return ids.includes(payment.id);
          });

          setPaymentsToRender(foundPayments);
          return;
        }

        // Add the current transaction amount to the map
        seen.set(transaction.amount, transaction.id);
      }

      setErrorMessage(PAYMENT_NOT_FOUND);
      setPaymentsToRender([]);
    },
    [payments]
  );

  const addPayment = (payment: Payment) => {
    const newPayments = [...payments, payment];

    setPayments(newPayments);
    setPaymentsToRender(newPayments);
  };

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    errorMessage,
    payments: paymentsToRender,
    addPayment,
    searchPayments,
  };
};
