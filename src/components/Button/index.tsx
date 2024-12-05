import styles from "./styles.module.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, ...restProps }: Props) => {
  return (
    <div className={styles.buttonContainer}>
      <button {...restProps} className={styles.button}>
        {label}
      </button>
    </div>
  );
};
