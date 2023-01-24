import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

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
        <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Element #id information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                {id}<br/>
                {name}<br/>
                {year}<br/>
                {color}<br/>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalComponent