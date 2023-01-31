import {useState} from 'react'

export interface IModalComponentProps {
    id: number,
    name: string,
    year: number,
    color: string
}

const ModalComponent = (props:IModalComponentProps) => {

const [smShow, setSmShow] = useState(true);

const { id, name, year, color } = props

  return (
    <>
      
    </>
  )
}

export default ModalComponent