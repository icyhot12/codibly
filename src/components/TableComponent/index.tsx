import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import FormComponent from "../FormComponent";
import LoaderComponent from "../LoaderComponent";
import PaginationComponent from "../PaginationComponent";

const TableComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowId, setRowId] = useState<string>("");
  const [rows, setRows] = useState<any>(<tr></tr>);

  const rowsPerPage: number = 5;

  const url: any = `https://reqres.in/api/products${
    rowId.length > 0
      ? `/${rowId}`
      : `?per_page=${rowsPerPage}&page=${currentPage}`
  }`;

  console.log(url);

  const getData = async () => {
    const res = await fetch(url);
    return res.json();
  };

  const { data, error, isLoading } = useQuery(
    ["data", currentPage, url],
    getData
  );

  useEffect(() => {
    if (rowId.length > 0 && !isLoading) {
      const { id, name, year, color } = data?.data;
      setRows(() => {
        return (
          <tr id={id} style={{ background: `${color}` }} className="h-10">
            <td className="text-center">{id}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">{year}</td>
          </tr>
        );
      });
    } else if (rowId.length === 0 && !isLoading) {
      setRows(() => {
        const tempRows = data?.data.map((row: any, index: number) => {
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
        return tempRows;
      });
    }
  }, [rowId, url, data, isLoading]);

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
        {rowId.length > 0 ? (
          ""
        ) : (
          <PaginationComponent
            pagesQuantity={data?.total_pages}
            currentPage={data?.page}
            setCurrentPage={setCurrentPage}
            itemsQuantity={data?.total}
            perPage={data?.per_page}
          />
        )}
      </div>
    </div>
  );
};

export default TableComponent;
