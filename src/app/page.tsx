"use client";

import { AddPaymentForm } from "@/components/AddPaymentForm";
import styles from "./page.module.css";
import { usePayments } from "@/hooks/useFetchPayments";
import type { Payment } from "@/types/payments";
import { PaymentCard } from "@/components/PaymentCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Home() {
  const { errorMessage, payments, addPayment, searchPayments } = usePayments();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const targetAmount = new FormData(event.currentTarget).get("targetAmount");

    searchPayments(Number(targetAmount));
  };

  const onAddFormSubmit = (payment: Payment) => {
    addPayment(payment);
  };

  return (
    <div className={styles.page}>
      <div>
        <h1>Your Payments</h1>
        <form className={styles.searchForm} onSubmit={onSubmit}>
          <Input
            required
            name="targetAmount"
            type="number"
            placeholder="Target Amount"
          />
          <Button label="Search" type="submit" />
        </form>
        {errorMessage && (
          <div className={styles.errorContainer}>
            <div className={styles.errorMessage}>
              <p className={styles.errorText}>
                Invalid payment amount. Please enter a valid number.
              </p>
            </div>
          </div>
        )}
        <div className={styles.grid}>
          {payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>

        <div className={styles.addForm}>
          <AddPaymentForm onSubmit={onAddFormSubmit} />
        </div>
      </div>
    </div>
  );
}
