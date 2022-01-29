import { useState, useEffect, Fragment } from "react";
import SearchResults from "./SearchResults/SearchResults";
import HeroSection from "../UI/HeroSection";
import LoadingSpinner from "../UI/LoadingSpinner";
const SearchTemplates = () => {
  const [templates, setTemplates] = useState(null);
  const [isFetchingTemplates,setIsFetchingTemplates] = useState(false);
  const [userSearchInput, setUserSearchInput] = useState(null);
  const [currentPage,setCurrentPage] = useState(1);
  const [searchItemsCount,setSearchItemsCount] = useState(null);
  const userSearchInputChangeHandler = (searchInput) => {
      if(searchInput!==userSearchInput) {
        //User is searching for something new
        setCurrentPage(1);
      }
      setUserSearchInput(searchInput);
  }
  const currentPageChangeHandler = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    if (userSearchInput) {
        setIsFetchingTemplates(true);
        let url = "http://192.168.0.108:8000/movie?movie="+userSearchInput
        if(currentPage !== 1) {
          //User has request for next page
          let pageNumberForAPICall = currentPage - 1;
          url = "http://192.168.0.108:8000/movie?movie="+userSearchInput+"&start="+pageNumberForAPICall*10+"&end="+((pageNumberForAPICall*10)+10)
        }
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          const postIds = Object.keys(response.templates);
          const templateDetails = [];
          for (let post of postIds) {
            templateDetails.push(response.templates[post][0]);
          }
          setSearchItemsCount(response['number_of_records'])
          setTemplates(templateDetails);
          setIsFetchingTemplates(false);
        });
    }
  }, [userSearchInput,currentPage]);
  return (
    <Fragment>
      <HeroSection userSearchInputChangeHandler={userSearchInputChangeHandler} />
      {isFetchingTemplates && <LoadingSpinner loadingMessage="Fetching Templates.. Please wait"/>}
      {!isFetchingTemplates && templates && <SearchResults templates={templates} pageChangeHandler={currentPageChangeHandler} searchItemsCount={searchItemsCount} currentPage={currentPage}/>}
      
    </Fragment>
  );
};

export default SearchTemplates;
