import React, { useState, useEffect } from 'react';
import { alertTypes } from '../AlertsEnum';
import Alerts from '../Alerts';
import EventLists from './EventLists';
import { hasSelectedItems, getUrl } from '../EventHelpers';
import PropTypes from 'prop-types';
import Loading from '../Loading';

const EventsDataFetcher = ({ searchValue, checkedWorkingGroups, checkedTypes, reachEnd, setReachEnd }) => {

  const [error, setError] = useState(null)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [eventsData, setEventsData] = useState([])

  const fetchingDataWithParas = (signal, page, searchParas, groupParas, typeParas, forceUpdate) => {

    if (page === 1) {
      setIsLoading(true);
    }

    let url = getUrl(page, searchParas, groupParas, typeParas)
    fetch(url, {signal: signal})
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.events.length < 10) {
          setReachEnd(true)
          if (forceUpdate) {
            setEventsData(result.events)
          }
        } else {
          // Force refresh when using filters
          if (forceUpdate) {
            setEventsData(result.events)
          }
          // Only append data when fetching more instead of replacing all data
          if (!forceUpdate) {
            setEventsData([...eventsData, ...result.events])
          }
        }
        setIsFetchingMore(false)
        setIsLoading(false)
      },
    )
    .catch((error) => {
      // no need to add this aborterror which is caused by user cancelation, to keep the useEffect clean
      if (error.name !== "AbortError") {
        console.log(error)
        setError(error)
      }
    })
  }

  // Detect if searchValue, checkedEventTime, checkedWorkingGroups, checkedTypes has changed, do the following func
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setCurrentPage(1)
    setReachEnd(false)
    fetchingDataWithParas(signal, 1, searchValue, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), true)
    // Clean up, when events list component is unmounted, cancel the fetch request
    return function cleanup() {
      abortController.abort()
    }
  }, [searchValue, checkedWorkingGroups, checkedTypes])

  // get more when click on the button
  const fetchMoreWithParas = () => {
    setIsFetchingMore(true)
    fetchingDataWithParas(null, (currentPage + 1), searchValue, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), false)
    setCurrentPage(prev => prev + 1)
  }

  if (isLoading) return <Loading />

  if (error) return <Alerts alertType={alertTypes.ERROR} message={error.message} />

  return (
    <>
      <EventLists
        events={eventsData} 
        isFetchingMore={isFetchingMore}
        fetchMore={fetchMoreWithParas}
        reachEnd={reachEnd}
      />
    </>
  )
}

EventsDataFetcher.propTypes = {
  searchValue: PropTypes.string,
  checkedWorkingGroups: PropTypes.object,
  checkedTypes: PropTypes.object,
  reachEnd: PropTypes.bool.isRequired,
  setReachEnd: PropTypes.func.isRequired
}

export default EventsDataFetcher