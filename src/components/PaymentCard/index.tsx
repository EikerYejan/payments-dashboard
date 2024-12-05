import type { Payment } from "@/types/payments";

import styles from "./styles.module.css";

interface Props {
  payment: Payment;
}

export const PaymentCard = ({ payment }: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.amount}>
        {payment.amount} <span className="currency">{payment.currency}</span>
      </p>
      <p className={styles.id}>Payment ID: {payment.id}</p>
    </div>
  );
};
