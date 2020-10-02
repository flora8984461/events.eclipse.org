import React, { useState, useEffect } from 'react';
import { alertTypes } from '../AlertsEnum';
import Alerts from '../Alerts';
import FilteredPastEventsList from './FilteredPastEventsList';
import { hasSelectedItems, getUrl } from '../EventHelpers';

const PastEventsDataFetcher = ({ eventTime, searchValue, checkedWorkingGroups, checkedTypes, setUpcomingReachEnd, past }) => {

  const [error, setError] = useState(null)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [reachEnd, setReachEnd] = useState(false)

  const [eventsData, setEventsData] = useState([])

  const fetchingDataWithParas = (page, searchParas, timeParas, groupParas, typeParas, forceUpdate) => {

    let url = getUrl(page, searchParas, timeParas, groupParas, typeParas)
    fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        setIsFetchingMore(false)
        if (result.events.length === 0) {
          setReachEnd(true)
          setUpcomingReachEnd(true)
        }
        if (forceUpdate) {
          setEventsData(result.events)
        }
        if (!forceUpdate) {
          setEventsData([...eventsData, ...result.events])
        }
      },
      (error) => {
        setIsFetchingMore(false)
        setError(error)
      }
    )
  }

  // Detect if searchValue, checkedEventTime, checkedWorkingGroups, checkedTypes has changed, do the following func
  useEffect(() => {
    let mounted = true // a local var to control clean up

    setCurrentPage(1)
    setReachEnd(false)
    if (eventTime === "upcoming") {
      setUpcomingReachEnd(false)
    }
    if (mounted) {
      fetchingDataWithParas(1, searchValue, eventTime, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), true)
    }
    // Clean up
    return () => mounted = false

  }, [searchValue, checkedWorkingGroups, checkedTypes])

  // get more when click on the button
  const fetchMoreWithParas = () => {
    setIsFetchingMore(true)
    fetchingDataWithParas((currentPage + 1), searchValue, eventTime, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), false)
    setCurrentPage(prev => prev + 1)
  }

  // if (loading) return <Loading />
  if (error) return <Alerts alertType={alertTypes.ERROR} message={error.message} />

  return (
    <>
      <FilteredPastEventsList
        events={eventsData} 
        isFetchingMore={isFetchingMore}
        fetchMore={fetchMoreWithParas}
        reachEnd={reachEnd}
        past={past}
      />
    </>
  )
}

export default PastEventsDataFetcher