import type { Payment } from "@/types/payments";
import { Input } from "../Input";
import { Button } from "../Button";

import styles from "./styles.module.css";

interface Props {
  onSubmit: (payment: Payment) => void;
}

export const AddPaymentForm = ({ onSubmit }: Props) => {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const amount = Number(formData.get("amount"));
    const id = String(formData.get("id"));
    const currency = String(formData.get("currency"));

    if (!id || !amount) {
      // show error message
      return;
    }

    onSubmit({ amount, currency, id });
  };

  return (
    <form className={styles.addPaymentForm} onSubmit={onFormSubmit}>
      <Input required name="amount" type="numbrt" placeholder="Amount" />
      <Input required name="id" type="text" placeholder="ID" />
      <Input name="currency" type="text" placeholder="Currency" />
      <Button label="Add" type="submit" />
    </form>
  );
};
