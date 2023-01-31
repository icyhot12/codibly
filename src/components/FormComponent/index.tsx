import { useEffect, useState } from "react";

export interface IFormComponentProps {
  setRowId: any
}

const FormComponent = (props: IFormComponentProps) => {

    const {setRowId} = props

    const [formValue, setFormValue] = useState<any>("");

    const handleChange = (event: any) => {
        const { value } = event.target;
        const numberRegex:RegExp = new RegExp(/^[0-9]+$|^$/)
        setFormValue((prevFormValue:any) => {
            if(numberRegex.test(value)){
                return value
            } else {
                return prevFormValue
            }
        })
    };

    useEffect(() => {
        setRowId(formValue)
    },[formValue])

  return (
    <form>
      <input
        className="border border-black rounded"
        type="text"
        name="id"
        placeholder=" ID number"
        value={formValue}
        onChange={(event) => handleChange(event)}
      />
    </form>
  );
};

export default FormComponent;
