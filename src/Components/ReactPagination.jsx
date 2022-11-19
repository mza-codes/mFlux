import ReactPaginate from 'react-paginate';
import useSearchResults from '../Services/ResultFetch';

function PaginatedItems({ data }) {
    console.log("props Data from pagination",data);
    const { page, total_pages } = data;
    const { getResults, query } = useSearchResults();

    const handlePageBrowse = (e) => {
        let pageNum = (parseInt(e.selected) + 1);
        console.log("trying fetch", e.selected);
        if (page > total_pages || pageNum < 1) return;
        getResults(query, pageNum);
        return;
    };

    const nextBtn = <iconify-icon icon="material-symbols:arrow-circle-right-rounded" height="34" width={"34"} />;
    const previousBtn = <iconify-icon icon="material-symbols:arrow-circle-left-rounded" height="34" width={"34"} />;

    return (
        <div className='mypagination' >
            <ReactPaginate className='text-white flex-row flex gap-2'
                breakLabel="..."
                containerClassName='pagination'
                activeClassName="activePg"
                nextLabel={page !== total_pages && nextBtn}
                onPageChange={handlePageBrowse}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={total_pages}
                previousLabel={page !== 1 && previousBtn}
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default PaginatedItems;