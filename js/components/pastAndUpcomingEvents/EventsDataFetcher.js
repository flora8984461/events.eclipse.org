import React, { useState, useEffect } from 'react';
import { alertTypes } from '../AlertsEnum';
import Alerts from '../Alerts';
import EventLists from './EventLists';
import { hasSelectedItems, getUrl } from '../EventHelpers';
import PropTypes from 'prop-types';

const EventsDataFetcher = ({ eventTime, searchValue, checkedWorkingGroups, checkedTypes, reachEnd, setReachEnd, showPastEvents }) => {

  const [error, setError] = useState(null)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [eventsData, setEventsData] = useState([])

  const fetchingDataWithParas = (signal, page, searchParas, timeParas, groupParas, typeParas, forceUpdate) => {

    let url = getUrl(page, searchParas, timeParas, groupParas, typeParas)
    fetch(url, {signal: signal})
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.events.length === 0) {
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
    fetchingDataWithParas(signal, 1, searchValue, eventTime, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), true)
    // Clean up, when events list component is unmounted, cancel the fetch request
    return function cleanup() {
      abortController.abort()
    }
  }, [searchValue, checkedWorkingGroups, checkedTypes])

  // get more when click on the button
  const fetchMoreWithParas = () => {
    setIsFetchingMore(true)
    fetchingDataWithParas(null, (currentPage + 1), searchValue, eventTime, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), false)
    setCurrentPage(prev => prev + 1)
  }

  if (error) return <Alerts alertType={alertTypes.ERROR} message={error.message} />

  return (
    <>
      <EventLists
        events={eventsData} 
        isFetchingMore={isFetchingMore}
        fetchMore={fetchMoreWithParas}
        reachEnd={reachEnd}
        eventTime={eventTime}
        showPastEvents={showPastEvents}
      />
    </>
  )
}

EventsDataFetcher.propTypes = {
  eventTime: PropTypes.string.isRequired,
  searchValue: PropTypes.string,
  checkedWorkingGroups: PropTypes.object,
  checkedTypes: PropTypes.object,
  reachEnd: PropTypes.bool.isRequired,
  setReachEnd: PropTypes.func.isRequired
}

export default EventsDataFetcher