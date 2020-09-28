import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { alertTypes } from '../AlertsEnum';
import Alerts from '../Alerts';
import PastEventsList from './PastEventsList';
import PastEventsFilters from './PastEventsFilters';
import { getSelectedItems } from '../EventHelpers';

const PastEventsDataFetcher = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const [checkedWorkingGroups, setCheckedWorkingGroups] = useState({})
  const [checkedTypes, setCheckedTypes] = useState({})

  const [dataWithFilters, setDataWithFilters] = useState([])

  const fetchingData = (page) => {
    let url = `https://newsroom.eclipse.org/api/events?page=${page}&pagesize=6`
    fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        setLoading(false)
        setIsFetchingMore(false)
        setEvents([...events, ...result.events])
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setLoading(false)
        setIsFetchingMore(false)
        setError(error)
      }
    )
  }

  const fetchingDataWithParas = (page, para) => {
    let url = `https://newsroom.eclipse.org/api/events?page=${page}&pagesize=6&parameters[publish_to]=${para}`
    fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        setLoading(false)
        setIsFetchingMore(false)
        setDataWithFilters([...dataWithFilters, ...result.events])
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setLoading(false)
        setIsFetchingMore(false)
        setError(error)
      }
    )
  }
  
  // only load once first time
  useEffect(() => {
    let selectedWorkingGroups = getSelectedItems(checkedWorkingGroups)
    if (selectedWorkingGroups && selectedWorkingGroups.length > 0) {
      fetchingDataWithParas(currentPage, selectedWorkingGroups[0])
    } else {
      fetchingData(currentPage)
    }
  }, [checkedWorkingGroups])

  // get more when click on the button
  const fetchMore = () => {
    setIsFetchingMore(true)
    fetchingData(currentPage + 1)
    setCurrentPage(prev => prev + 1)
  }

  const fetchMoreWithParas = (para) => {
    setIsFetchingMore(true)
    fetchingDataWithParas((currentPage + 1), para)
    setCurrentPage(prev => prev + 1)
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
            (getSelectedItems(checkedWorkingGroups) && getSelectedItems(checkedWorkingGroups).length > 0) ? 
            <PastEventsList events={dataWithFilters} isFetchingMore={isFetchingMore} fetchMore={fetchMoreWithParas} paras={getSelectedItems(checkedWorkingGroups)[0]} /> :
            <PastEventsList events={events} isFetchingMore={isFetchingMore} fetchMore={fetchMore} />}
        </div>
      </div>
    </>
  )
}

export default PastEventsDataFetcher