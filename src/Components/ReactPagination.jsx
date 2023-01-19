import ReactPaginate from 'react-paginate';
import useSearchResults from '../Services/ResultFetch';
import { scrollToTop } from '../Utils';

function PaginatedItems({ data }) {
    const { page, total_pages } = data;
    const getResults = useSearchResults(s => s.getResults);
    const query = useSearchResults(s => s.query);

    const handlePageBrowse = (e) => {
        let pageNum = (parseInt(e.selected) + 1);
        if (page > total_pages || pageNum < 1) return;
        getResults(query, pageNum);
        return scrollToTop();
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
};

export default PaginatedItems;