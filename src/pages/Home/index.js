import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../component/Card';
import Spinner from '../../component/Spinner';
import Select from '../../component/Select';
import ErrorMessage from '../../component/ErrorMessage';
import SearchBox from '../../component/SearchBox';

import './home.css';
import { UseApi } from '../../hooks/UseApi';
import UseDebounce from '../../hooks/UseDebounce';
import { API_BASE_URL } from '../../constant/apiConstant';

const Home = () => {
    const [searchInputValue, setSearchInputValue] = useState(null);
    const [sortByValue, setsortByValue] = useState(null);
    const [filterByValue, setfilterByValue] = useState(null);
    const [filterBy, setfilterBy] = useState(null);
    const debouncedSearchTerm = UseDebounce(searchInputValue, 300);
    let apiUrl = API_BASE_URL;

    if (debouncedSearchTerm) {
        apiUrl += `?phrase=${searchInputValue}`;
    }
    const { dataAPI, loading, error } = UseApi(apiUrl);
    const [data, setData] = useState(dataAPI);
    const [dataLength, setDataLength] = useState(dataAPI?.length);

    const handleSearchInputChange = (event) => {
        setSearchInputValue(event.target.value);
    }
    const handleFilterBySelection = (event) => {
        setfilterByValue(event.target.value);
    }
    const handleFilterBySorting = (event) => {
        setsortByValue(event.target.value);
    }

    useEffect(() => {
        setData(dataAPI);
        setDataLength(dataAPI?.length)
        setfilterBy([{ value: 'Default', id: 'default' }, ...[...new Set(dataAPI?.map(item => item.category))]?.map(item => ({ value: item, id: item }))])

        let updatedData = Array.isArray(dataAPI) ? [...dataAPI] : [];

        if (sortByValue) {
            if (sortByValue !== 'default') {
                updatedData.sort((a, b) => {
                    if (a[`${sortByValue}`]?.toLowerCase() < b[`${sortByValue}`]?.toLowerCase()) {
                        return -1;
                    } else if (a[`${sortByValue}`]?.toLowerCase() > b[`${sortByValue}`]?.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            }
            else {
                updatedData = Array.isArray(dataAPI) ? [...dataAPI] : [];
            }
        }

        if (filterByValue) {
            if (filterByValue !== 'default') {
                updatedData = updatedData.filter(item => item.category === filterByValue)
            }
        }

        setData(updatedData);
        setDataLength(updatedData?.length);

    }, [dataAPI, debouncedSearchTerm, sortByValue, filterByValue]);
    return (
        <div className='home'>
            <main className="container pt-2">
                <form className="overflow-hidden mt-3">
                    <div className="d-md-flex justify-content-md-between">
                        <SearchBox handleSearchInputChange={handleSearchInputChange} />
                        <div className="col-md-4">
                            <div className="select-container d-flex h-100">
                                <Select labelText={'Sort by:'} options={[{ value: 'Default', id: 'default' }, { value: 'Topic Title', id: 'topic' }, { value: 'Author Name', id: 'name' }]} selectId={'sort-by-select'} onChange={handleFilterBySorting} />
                                <Select labelText={'Filter By:'} options={filterBy} selectId={'filter-by-select'} onChange={handleFilterBySelection} />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="container-content">
                    <h1 className="py-4 fw-bold">
                        "{dataLength}" Web Topics Found
                    </h1>
                    <Spinner isDisplay={!loading} />
                    <div
                        className="courses row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 g-4"
                    >
                        {data?.map((x) => {
                            return (
                                <Link to={`/Details/${x.id}`} style={{ textDecoration: 'none' }}>
                                    <Card value={x} />
                                </Link>
                            );
                        })}
                    </div>
                    {error && <ErrorMessage />}
                </div>
            </main>
        </div>
    );
};

export default Home;  
