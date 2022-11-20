import ReactPaginate from 'react-paginate';

function SuggestionsPagination({ api, currentPage, totalPage, query }) {

    const handlePageBrowse = (e) => {
        let pageNum = (parseInt(e.selected) + 1);
        console.log("trying fetch", e.selected);
        if (currentPage > totalPage || pageNum < 1) return;
        api({ id: query, page: pageNum });
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
                nextLabel={currentPage !== totalPage && nextBtn}
                onPageChange={handlePageBrowse}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={totalPage}
                previousLabel={currentPage !== 1 && previousBtn}
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default SuggestionsPagination;