import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {useQuery} from 'react-query';
import FormComponent from "../FormComponent";
import LoaderComponent from "../LoaderComponent";
import PaginationComponent from "../PaginationComponent";
import ModalComponent from "../ModalComponent";

import "./styles.css";

const TableComponent = () => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pagesQuantity, setPagesQuantity] = useState<number>(1)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [choosedModal, setChoosedModal] = useState<number>(1)

    const perPage: number = 5

    const url: string = `https://reqres.in/api/products?per_page=${perPage}&page=${currentPage}`;

    const getData = async () => {
		const res = await fetch(url);
		return res.json();
	};

    const [rowId, setRowId] = useState<any>("")

	const {data, error, isLoading} = useQuery(['data', currentPage, perPage], getData);

    useEffect(() => {
        if(!isLoading){
            setPagesQuantity(data.total_pages)
        }
    },[isLoading])

    const handleRowClick = (id:number) => {
        setChoosedModal(id - 1)
        setModalVisible(prevModalVisible => !prevModalVisible)
    }

    const rows = data?.data.map((row:any, index:number) => {

        const { id, name, year, color } = row

        if(rowId.length === 0 || Number(rowId) == id){
            return (
                <tr 
                id={id}
                key={index} 
                style={{background:`${color}`}}
                onClick={() => handleRowClick(id)}
                >
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{year}</td>
                </tr>
            )
        }
    })

    return (
        isLoading ? 
        <div className="row">
            <div className="col d-flex justify-content-center">
                <LoaderComponent />
            </div>
        </div>
        :
        <>
            <div className="row">
                <FormComponent 
                    setRowId={setRowId}
                />
            </div>
            <div className="row">
                <div className="col md:col-6 lg:col-9 mx-auto">
                    <Table bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                    </Table>
                </div>
            </div>
            <div className="row">
                <PaginationComponent 
                    pagesQuantity={pagesQuantity}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            {modalVisible ? 
            <ModalComponent 
                id={data.data[choosedModal].id}
                name="a"
                year={1992}
                color="#1231231"
            />
            :
            null
            }
        </>
    );
    };

export default TableComponent;
