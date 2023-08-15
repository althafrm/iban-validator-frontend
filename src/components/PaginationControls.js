import React from 'react';

function PaginationControls({ currentPage, totalPages, onPageChange }) {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return (
        <div className="pagination-controls">
            {prevPage && <button className='pagination-button' onClick={() => onPageChange(prevPage)}>Previous</button>}
            {nextPage && <button className='pagination-button' onClick={() => onPageChange(nextPage)}>Next</button>}
        </div>
    );
};

export default PaginationControls;
