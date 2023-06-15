const SearchBox = ({ handleSearchInputChange }) => {

    return (
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

    );
};

export default SearchBox;