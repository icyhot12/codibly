import { useState, useEffect } from "react";
import { useQuery, setLogger } from "react-query";
import FormComponent from "../FormComponent";
import LoaderComponent from "../LoaderComponent";
import PaginationComponent from "../PaginationComponent";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  redirect,
} from "react-router-dom";
import axios from "axios";

const TableComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowId, setRowId] = useState<string>("");
  const [rows, setRows] = useState<any>(<tr></tr>);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [formValue, setFormValue] = useState<string>("");

  const urlId = searchParams.get("rowid");
  const urlPage = searchParams.get("page");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlId) {
      setRowId(urlId);
      setFormValue(urlId);
    } else if (!urlId) {
      setRowId("");
      setFormValue("");
    }
  }, [location]);

  useEffect(() => {
    if (urlPage) {
      setCurrentPage(Number(urlPage));
    } else if (!urlPage) {
      setCurrentPage(1)
    }
  }, []);

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString()
    })
  }, [currentPage]);

  useEffect(() => {
    if (rowId.length > 0) {
      setSearchParams({
        rowid: rowId,
      });
    }
  }, [rowId]);

  const rowsPerPage: number = 5;

  const url: string = `https://reqres.in/api/products${
    rowId.length > 0
      ? `/${rowId}`
      : `?per_page=${rowsPerPage}&page=${currentPage}`
  }`;

  const getData = async () => {
    const res = await axios.get(url);
    return res?.data;
  };

  setLogger({
    log: () => {},
    warn: () => {},
    error: () => {},
  });

  const { data, isLoading } = useQuery({
    queryKey: ["data", currentPage, url],
    queryFn: getData,
    retry: false,
    onError(err: any) {
      alert(err.message);
      navigate("/");
    },
  });

  useEffect(() => {
    if (rowId.length > 0 && !isLoading && data?.data) {
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
    } else if (rowId.length === 0 && !isLoading && data.data) {
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
  ) : data ? (
    <div className="mx-auto w-11/12 md:w-8/12 lg:w-5/12 mt-32 flex flex-col gap-4">
      <FormComponent
        setRowId={setRowId}
        setSearchParams={setSearchParams}
        formValue={formValue}
        setFormValue={setFormValue}
      />
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
  ) : (
    <></>
  );
};

export default TableComponent;

// add modal
