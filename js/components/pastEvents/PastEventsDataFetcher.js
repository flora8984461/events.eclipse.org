import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { alertTypes } from '../AlertsEnum';
import Alerts from '../Alerts';
// import PastEventsList from './PastEventsList';
import FilteredPastEventsList from './FilteredPastEventsList';
import PastEventsFilters from './PastEventsFilters';
import { getSelectedItems } from '../EventHelpers';

const PastEventsDataFetcher = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [events, setEvents] = useState([])
  // const [currentPage, setCurrentPage] = useState(1)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const [checkedWorkingGroups, setCheckedWorkingGroups] = useState({})
  const [checkedTypes, setCheckedTypes] = useState({})
  const [currentPageWithFilters, setCurrentPageWithFilters] = useState(1)
  const [dataWithFilters, setDataWithFilters] = useState([])

  function hasSelectedWorkingGroups(items) {
    let selectedWorkingGroups = getSelectedItems(items)
    if (selectedWorkingGroups && selectedWorkingGroups.length > 0) {
      return selectedWorkingGroups
    } else return false
  }

  function hasSelectedEventTypes(items) {
    let selectedEventTypes = getSelectedItems(items)
    if (selectedEventTypes && selectedEventTypes.length > 0) {
      return selectedEventTypes
    } else return false
  }

  function getUrl(page, groupParas, typeParas) {
    let url = `https://newsroom.eclipse.org/api/events?parameters[past_event_only]=1&page=${page}&pagesize=6`
    for (let i=0; i<groupParas.length; i++) {
      url = url + "&parameters[publish_to][]=" + groupParas[i]
    }
    for (let j=0; j<typeParas.length; j++) {
      url = url + "&parameters[type][]=" + typeParas[j]
    }
    return url
  }

  const fetchingDataWithParas = (page, groupParas, typeParas, forceUpdate) => {

    let url = getUrl(page, groupParas, typeParas)
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
  
  // Detect if checkedWorkingGroups, checkedTypes has changed, do the following func
  useEffect(() => {
    setCurrentPageWithFilters(1)
    fetchingDataWithParas(1, hasSelectedWorkingGroups(checkedWorkingGroups), hasSelectedEventTypes(checkedTypes), true)
    
  }, [checkedWorkingGroups, checkedTypes])

  // get more when click on the button
  const fetchMoreWithParas = (groupParas, typeParas) => {
    setIsFetchingMore(true)
    fetchingDataWithParas((currentPageWithFilters + 1), groupParas, typeParas, false)
    setCurrentPageWithFilters(prev => prev + 1)
  }

  if (error) return <Alerts alertType={alertTypes.ERROR} message={error.message} />

  return (
    <>
      <p>Past events showing</p>
      <div className="container">
        <div className="row margin-bottom-20">
          <div className="col-md-6">
            <PastEventsFilters
              checkedTypes={checkedTypes}
              setCheckedTypes={setCheckedTypes}
            />
            <PastEventsFilters
              checkedWorkingGroups={checkedWorkingGroups}
              setCheckedWorkingGroups={setCheckedWorkingGroups}
            />
          </div>
          { loading ? <Loading /> : 
            // ( hasSelectedWorkingGroups(checkedWorkingGroups) === false && hasSelectedEventTypes(checkedTypes) === false ) ? 
            // <PastEventsList events={events} isFetchingMore={isFetchingMore} fetchMore={fetchMore} /> :
            <FilteredPastEventsList
              events={dataWithFilters} 
              isFetchingMore={isFetchingMore} 
              fetchMore={fetchMoreWithParas} 
              groupParas={hasSelectedWorkingGroups(checkedWorkingGroups)} 
              typeParas={hasSelectedEventTypes(checkedTypes)}
            />
          }
        </div>
      </div>
    </>
  )
}

export default PastEventsDataFetcher