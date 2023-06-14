import React, { useEffect, useState } from 'react';
import Card from '../../component/Card';
import './Home.css';
import Spinner from '../../component/Spinner';
import Select from '../../component/Select';
import ErrorMessage from '../../component/ErrorMessage';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState(null);
    const [dataLength, setDataLength] = useState(null);
    const [searchInputValue, setSearchInputValue] = useState(null);
    const [sortByValue, setsortByValue] = useState(null);
    const [filterByValue, setfilterByValue] = useState(null);
    const [isDisplayData, setisDisplayData] = useState(false);
    const [filterBy, setfilterBy] = useState(null);
    const handleSearchInputChange = (event) => {
        setSearchInputValue(event.target.value);
    }
    const handleFilterBySelection = (event) => {
        setfilterByValue(event.target.value);
    }
    const handleFilterBySorting = (event) => {
        setsortByValue(event.target.value);
    }
    const fetchData = async (searchInputValue, sortByValue, filterByValue) => {
        let apiUrl = 'https://tap-web-1.herokuapp.com/topics/list';

        if (searchInputValue) {
            apiUrl += `?phrase=${searchInputValue}`;
        }
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            setisDisplayData(true)
            setDataLength(jsonData.length)
            setfilterBy([{ value: 'Default', id: 'default' }, ...[...new Set(jsonData.map(item => item.category))].map(item => ({ value: item, id: item }))])
            if (sortByValue) {
                jsonData.sort((a, b) => {
                    if (a[`${sortByValue}`]?.toLowerCase() < b[`${sortByValue}`]?.toLowerCase()) {
                        return -1;
                    } else if (a[`${sortByValue}`]?.toLowerCase() > b[`${sortByValue}`]?.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            }
            setData(jsonData);
            if (filterByValue) {
                setData(jsonData.filter(item => item.category === filterByValue))
            }
            else setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData(searchInputValue, sortByValue, filterByValue);
    }, [searchInputValue, sortByValue, filterByValue]);
    return (
        <div className='home'>
            <main className="container pt-2">
                <form className="overflow-hidden mt-3">
                    <div className="d-md-flex justify-content-md-between">
                        <div className="search-container d-flex position-relative p-1 col-md-8">
                            <span className="d-flex align-items-center px-2">
                                <ion-icon name="search-outline"></ion-icon>
                            </span>
                            <input
                                type="text"
                                placeholder="Search the website..."
                                className="search-input w-100 border-0"
                                onInput={handleSearchInputChange}
                            />
                        </div>
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
                    <Spinner isDisplay={isDisplayData} />
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
                    <ErrorMessage />
                </div>
            </main>
        </div>
    );
};

export default Home;  
