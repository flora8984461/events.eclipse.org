import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { alertTypes } from '../AlertsEnum';
import Alerts from '../Alerts';
import PastEventsList from './PastEventsList';

const PastEventsDataFetcher = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const fetchingData = (page) => {
    fetch(`https://newsroom.eclipse.org/api/events?page=${page}&pagesize=4`)
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
  
  // only load once first time
  useEffect(() => {
    fetchingData(currentPage)
  }, [])

  // get more when click on the button
  const fetchMore = () => {
    setIsFetchingMore(true)
    fetchingData(currentPage + 1)
    setCurrentPage(prev => prev + 1)
  }

  if (loading) return <Loading />
  if (error) return <Alerts alertType={alertTypes.ERROR} message={error.message} />


  return (
    <>
      <p>Past events showing</p>
      <PastEventsList events={events} />

      <div className="container">
        <div className="row margin-bottom-20">
          <div className="col-md-6"></div>
          <div className="col-md-18 past-event-container">
            { isFetchingMore && <Loading /> }
            { !isFetchingMore && <button className="btn btn-primary" onClick={fetchMore}>Load More</button>}
          </div>
        </div>
      </div>
    </>
  )
}

export default PastEventsDataFetcher