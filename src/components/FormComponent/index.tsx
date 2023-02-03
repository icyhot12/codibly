export interface IFormComponentProps {
  setRowId: React.Dispatch<React.SetStateAction<string>>;
  setSearchParams: any;
  formValue: string;
  setFormValue: React.Dispatch<React.SetStateAction<string>>;
}

const FormComponent = (props: IFormComponentProps) => {
  const { setRowId, setSearchParams, formValue, setFormValue } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numberRegex: RegExp = new RegExp(/^[0-9]+$|^$/);
    setFormValue((prevFormValue: any) => {
      if (numberRegex.test(value)) {
        return value;
      } else {
        return prevFormValue;
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setRowId(formValue);
    event.preventDefault();
  };

  const handleButtonClick = () => {
    setRowId("");
    setFormValue("");
    setSearchParams("");
  };

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
      <div className="flex gap-1">
        <input
          type="submit"
          className="border border-black rounded py-1 px-4"
          value="Filter"
        />
        <button
          className="border border-black rounded py-1 px-4"
          onClick={handleButtonClick}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
