import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {useQuery} from 'react-query';
import FormComponent from "../FormComponent";
import LoaderComponent from "../LoaderComponent";
import PaginationComponent from "../PaginationComponent";

import "./styles.css";

const TableComponent = () => {

    const startingPage: number = 1

    const url: string = `https://reqres.in/api/products?page=${startingPage}`;

    const getData = async () => {
		const res = await fetch(url);
		return res.json();
	};

    const [rowId, setRowId] = useState<any>("")

	const {data, error, isLoading} = useQuery('data', getData);

    const rows = data?.data.map((row:any, index:any) => {

        const { id, name, year } = row

        if(rowId.length === 0){
            return (
                <tr key={index}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{year}</td>
                </tr>
            )
        } else if (Number(rowId) == id){
            return(
                <tr key={index}>
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
                <PaginationComponent />
            </div>
        </>
    );
    };

export default TableComponent;
