import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../Api';
import { getRole } from '../Auth';
import PaginationControls from './PaginationControls';
import Loading from './Loading';

function IbanList({ authToken, setResponseMessage }) {
    const navigate = useNavigate();

    useEffect(() => {
        const role = getRole();

        if (role !== 'admin') {
            navigate('/');
        }
    }, []);

    const [ibanList, setIbanList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        if (authToken) {
            const onSuccess = (ibans, currentPage, lastPage, message) => {
                setIbanList(ibans);
                setCurrentPage(currentPage);
                setTotalPages(lastPage);
                setResponseMessage([1, message]);
                setIsLoading(false);
            };

            const onError = (error) => {
                setResponseMessage([2, error]);
                setIsLoading(false);
            };

            Api.listIbans(authToken, currentPage, onSuccess, onError);
        }
    }, [authToken, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='iban-list'>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h3>IBAN List</h3>
                    <ul>
                        <table className="iban-table">
                            <thead>
                                <tr>
                                    <th>IBAN</th>
                                    <th>Validated By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ibanList.map((iban) => (
                                    <tr key={iban.id}>
                                        <td>{iban.iban}</td>
                                        <td>{iban.user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </ul>
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default IbanList;
