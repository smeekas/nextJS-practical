import styles from "./InputBox.module.css";

type InputBoxType = {
  labelName: string;
  inputType: string;
  actionType: string;
  onChange: (arg0: string) => void;
};
function InputBox({ labelName, inputType, onChange }: InputBoxType) {
  return (
    <div className={styles.inputBox}>
      <label>{labelName}</label>
      <input onChange={(e) => onChange(e.target.value)} type={inputType} />
    </div>
  );
}
export default InputBox;
