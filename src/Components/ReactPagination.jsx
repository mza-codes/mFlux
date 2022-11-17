import ReactPaginate from 'react-paginate';
import useSearchResults from '../Services/ResultFetch';

function PaginatedItems({ itemsPerPage, data }) {
    const { resultData } = data;
    const { page, total_pages } = resultData;
    const { getResults, query, getPage } = useSearchResults();

    const handlePageBrowse = (e) => {
        let pageNum = (parseInt(e.selected) + 1);
        console.log("trying fetch", e.selected);
        if (page > total_pages || pageNum < 1) return;
        // console.log(pageNum);
        // getPage(e.selected);
        // return;
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
// Add a <div id="container"> to your HTML to see the componend rendered.
    // <PaginatedItems itemsPerPage={4} />