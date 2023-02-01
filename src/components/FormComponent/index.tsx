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

    // useEffect(() => {
    //     setRowId(formValue)
    // },[formValue])

    const handleSubmit = (event:any) => {
      setRowId(formValue)
      event.preventDefault()
    }

  return (
    <form className="flex gap-5" onSubmit={(event) => handleSubmit(event)}>
      <input
        className="border border-black rounded"
        type="text"
        name="id"
        placeholder=" ID number"
        value={formValue}
        onChange={(event) => handleChange(event)}
      />
      <input 
        type="submit"
        className="border border-black rounded py-1 px-4"
        value="Filter"
      />
    </form>
  );
};

export default FormComponent;
