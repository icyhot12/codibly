import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import FormComponent from "../FormComponent";
import LoaderComponent from "../LoaderComponent";
import PaginationComponent from "../PaginationComponent";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const TableComponent = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesQuantity, setPagesQuantity] = useState<number>(1);
  const [rowId, setRowId] = useState<any>("");
  const [searchParams, setSearchParams] = useSearchParams({});

  // take params from url
  const rowid = searchParams.get('rowid'); //not working - manage situation when data is only object - not an array of objects
  const perPage = searchParams.get('per_page');
  const page = searchParams.get('page');

  console.log(searchParams)
  
  useEffect(() => {
    setSearchParams({
      rowid: "",
      per_page: "5",
      page: "1"
    })
  },[])
  
  const url: any = `https://reqres.in/api/products${rowid ? `/${rowid}` : `?per_page=${perPage}&page=${page}`}`
  
  const getData = async () => {
    const res = await fetch(url);
    return res.json();
  };
  
  const { data, error, isLoading } = useQuery(
    ["data"],
    getData
    );

    console.log(data)

  const rows = data?.data.map((row: any, index: number) => {
    const { id, name, year, color } = row;
    return (
      <tr
        id={id}
        key={index}
        style={{ background: `${color}` }}
        className="h-10"
      >
        <td className="text-center">{id}</td>
        <td className="text-center">{name}</td>
        <td className="text-center">{year}</td>
      </tr>
    );
  });

  return isLoading ? (
    <div className="flex justify-content-center items-center">
      <LoaderComponent />
    </div>
  ) : (
    <div className="mx-auto w-11/12 md:w-8/12 lg:w-5/12 mt-32 flex flex-col gap-4">
      <FormComponent setRowId={setRowId} />
      <table className="table-fix w-full rounded-lg overflow-hidden">
        <thead className="bg-slate-200">
          <tr className="h-16">
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div className="row">
        <PaginationComponent
          pagesQuantity={data?.total_pages}
          currentPage={data?.page}
          setCurrentPage={setCurrentPage}
          itemsQuantity={data?.total}
          perPage={data?.per_page}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};

export default TableComponent;
