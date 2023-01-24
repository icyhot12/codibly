import Pagination from "react-bootstrap/Pagination";

export interface IPaginationComponentProps {
    pagesQuantity:number,
    currentPage:number,
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}

const PaginationComponent = (props:IPaginationComponentProps) => {

    const { pagesQuantity, currentPage, setCurrentPage } = props

    const handlePageChange = (direction:number) => {
        if(currentPage === pagesQuantity && direction === 1){
            setCurrentPage(currentPage)
        } else if(currentPage === 1 && direction === -1){
            setCurrentPage(currentPage)
        } else {
            setCurrentPage(currentPage + direction)
        }
    }

    const paginationItems = [...Array(pagesQuantity)].map((element,index) => {
        return (
            <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </Pagination.Item>
        )
    })

  return (
    <div className="col d-flex justify-content-center">
      <Pagination>
        <Pagination.Prev 
            onClick={() => handlePageChange(-1)}
        />
            {paginationItems}
        <Pagination.Next 
            onClick={() => handlePageChange(1)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
