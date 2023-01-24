import { useState } from 'react'
import Form from 'react-bootstrap/Form';

export interface IFormComponentProps {
    setRowId: any
}

const FormComponent = (props:IFormComponentProps) => {

    const [formValue, setFormValue] = useState<any>("")

    const handleChange = (e:any) => {
        const { value } = e.target

        setFormValue(value)
        props.setRowId(value)

    }

    return (
        <div className='col-2 my-2'>
            <Form.Control 
                type="text" 
                placeholder="123..."
                value={formValue}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

export default FormComponent