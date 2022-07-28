import styles from "./InputBox.module.css";
import type { Action, ActionType } from "../../pages/Signup";
import type { ChangeEvent, Dispatch } from "react";

type InputBoxType = {
  labelName: string;
  inputType: string;
  actionType: string;
  //   onChange: (ChangeEvent<HTMLInputElement>) => void;
  onChange: (arg0: string) => void;
};
function InputBox({
  labelName,
  inputType,
  actionType,
  onChange,
}: InputBoxType) {
  return (
    <div className={styles.inputBox}>
      <label>{labelName}</label>
      <input
        // onChange={(e) => onChange({ type: actionType, value: e.target.value })}
        onChange={(e) => onChange(e.target.value)}
        type={inputType}
      />
    </div>
  );
}
export default InputBox;
