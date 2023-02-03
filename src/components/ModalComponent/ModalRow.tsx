interface IModalRowProps {
  label: string;
  value: string;
}

const ModalRow = (props: IModalRowProps) => {
  const { label, value } = props;

  return (
    <div>
      <span className="font-thin">{label}: </span>
      <span className="font-bold">{value}</span>
    </div>
  );
};

export default ModalRow;
