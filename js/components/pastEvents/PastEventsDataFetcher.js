import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { alertTypes } from '../AlertsEnum';
import Alerts from '../Alerts';
// import PastEventsList from './PastEventsList';
import FilteredPastEventsList from './FilteredPastEventsList';
import CustomSearch from '../CustomSearch';
import PastEventsFilters from './PastEventsFilters';
import { hasSelectedItems } from '../EventHelpers';

const PastEventsDataFetcher = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [events, setEvents] = useState([])
  // const [currentPage, setCurrentPage] = useState(1)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const [checkedWorkingGroups, setCheckedWorkingGroups] = useState({})
  const [checkedTypes, setCheckedTypes] = useState({})
  const [checkedEventTime, setCheckedEventTime] = useState({})
  const [currentPageWithFilters, setCurrentPageWithFilters] = useState(1)
  const [dataWithFilters, setDataWithFilters] = useState([])

  function getUrl(page, searchParas, timeParas, groupParas, typeParas) {
    let url = `https://newsroom.eclipse.org/api/events?&page=${page}&pagesize=6`
    if (timeParas && timeParas.length === 1) {
      url = url + `&parameters[${timeParas[0]}]=1`
      if (timeParas[0] === "upcoming_only") {
        url = url + "&options[orderby][field_event_date]=ASC"
      }
    }
    for (let i=0; i<groupParas.length; i++) {
      url = url + "&parameters[publish_to][]=" + groupParas[i]
    }
    for (let j=0; j<typeParas.length; j++) {
      url = url + "&parameters[type][]=" + typeParas[j]
    }
    if (searchParas) {
      url = url + "&parameters[search]=" + searchParas
    }
    return url
  }

  const fetchingDataWithParas = (page, searchParas, timeParas, groupParas, typeParas, forceUpdate) => {
    if (page === 1) {
      setLoading(true)
    }
    let url = getUrl(page, searchParas, timeParas, groupParas, typeParas)
    fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        setLoading(false)
        setIsFetchingMore(false)
        if (forceUpdate) {
          setDataWithFilters(result.events)
        } else {
          setDataWithFilters([...dataWithFilters, ...result.events])
        }
      },
      (error) => {
        setLoading(false)
        setIsFetchingMore(false)
        setError(error)
      }
    )

  }
  
  // Detect if searchValue, checkedEventTime, checkedWorkingGroups, checkedTypes has changed, do the following func
  useEffect(() => {
    setCurrentPageWithFilters(1)
    fetchingDataWithParas(1, searchValue, hasSelectedItems(checkedEventTime), hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), true)
    
  }, [searchValue, checkedWorkingGroups, checkedTypes, checkedEventTime])

  // get more when click on the button
  const fetchMoreWithParas = () => {
    setIsFetchingMore(true)
    fetchingDataWithParas((currentPageWithFilters + 1), searchValue, hasSelectedItems(checkedEventTime), hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), false)
    setCurrentPageWithFilters(prev => prev + 1)
  }

  if (error) return <Alerts alertType={alertTypes.ERROR} message={error.message} />

  return (
    <>
      <p>Past events and upcoming events</p>
      <div className="container">
        <div className="row margin-bottom-20">
          <div className="col-md-6">
            <CustomSearch searchValue={searchValue} setSearchValue={setSearchValue} />
            <PastEventsFilters
              checkedTypes={checkedTypes}
              setCheckedTypes={setCheckedTypes}
            />
            <PastEventsFilters
              checkedWorkingGroups={checkedWorkingGroups}
              setCheckedWorkingGroups={setCheckedWorkingGroups}
            />
            <PastEventsFilters
              checkedEventTime={checkedEventTime}
              setCheckedEventTime={setCheckedEventTime}
            />
          </div>
          { loading ? <Loading /> : 
            <FilteredPastEventsList
              events={dataWithFilters} 
              isFetchingMore={isFetchingMore} 
              fetchMore={fetchMoreWithParas}
            />
          }
        </div>
      </div>
    </>
  )
}

export default PastEventsDataFetcher