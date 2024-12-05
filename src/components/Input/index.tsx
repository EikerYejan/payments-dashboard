import styles from "./styles.module.css";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, name, ...props }: Props) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={name} className={styles.inputLabel}>
          {label}
        </label>
      )}
      <div className="currency">
        <input {...props} name={name} className={styles.inputField} />
      </div>
    </div>
  );
};
