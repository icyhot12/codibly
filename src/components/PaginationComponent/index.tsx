import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export interface IPaginationComponentProps {
    pagesQuantity: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsQuantity: number;
    perPage: any;
    setSearchParams:any
}

const PaginationComponent = (props: IPaginationComponentProps) => {

    const { pagesQuantity, currentPage, setCurrentPage, itemsQuantity, perPage, setSearchParams } = props;

    const handlePageChange = (direction: number) => {
        if (currentPage === pagesQuantity && direction === 1) {
        setSearchParams((prevSearchParams:any) => {
            return({
                ...prevSearchParams,
                page: prevSearchParams.page
            })
        })
        } else if (currentPage === 1 && direction === -1) {
            setSearchParams((prevSearchParams:any) => {
                return({
                    ...prevSearchParams,
                    page: prevSearchParams.page
                })
            })
        } else {
            setSearchParams((prevSearchParams:any) => {
                return({
                    ...prevSearchParams,
                    page: prevSearchParams.page + direction
                })
            })
        }
    };

    const paginationItems = [...Array(pagesQuantity)].map((element, index) => {
        return (
        <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ?
            "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
            :
            "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            }
        >
            {index + 1}
        </button>
        );
    });

return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            <button
            onClick={() => handlePageChange(-1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            Previous
            </button>
            <button
            onClick={() => handlePageChange(1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            Next
            </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                        Showing{" "}
                    <span className="font-medium">
                        {currentPage * perPage - perPage + 1}
                    </span>
                        {" "}to 
                    <span className="font-medium">
                        {" "}{currentPage * perPage > itemsQuantity ? itemsQuantity : currentPage * perPage}{" "}
                    </span>
                        of{" "}
                    <span className="font-medium">
                        {itemsQuantity}
                    </span>
                        {" "}results
                </p>
            </div>
            <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
            >
                <button
                    onClick={() => handlePageChange(-1)}
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    <AiOutlineArrowLeft className="h-5 w-5" />
                </button>
                {paginationItems}
                <button
                    onClick={() => handlePageChange(1)}
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    <AiOutlineArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
            </nav>
        </div>
    </div>
  );
};

export default PaginationComponent;
