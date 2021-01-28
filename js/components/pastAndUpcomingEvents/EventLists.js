import React from 'react';
import EventCard from '../EventCard';
import Loading from '../Loading';
import PropTypes from 'prop-types';
import { checkDatePast } from "../EventHelpers";

const EventLists = ({ events, isFetchingMore, fetchMore, reachEnd }) => {

  if (events.length === 0 && !isFetchingMore) {
    return <p style={{marginLeft: "auto", marginRight: "auto"}}>We have reached the end of results for the current filters</p>
  }

  return (
    <> 
      {events.map((event) => (
        <div className={`col-md-12 max-min-width ${checkDatePast(event['end-date']) ? "event-past" : ""}`} key={event.id}>
          <EventCard event={event} />
        </div>
      ))}

      <div className="event-load-more">
        { reachEnd ?
        <p className="margin-5">We have reached the end of results for the current filters</p>  : 
         ( isFetchingMore ? <Loading /> : 
          !isFetchingMore && <button className="btn btn-primary margin-top-10" onClick={fetchMore}>Load More</button> )}
      </div>
    </>
  )
}

EventLists.propTypes = {
  events: PropTypes.array.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  reachEnd: PropTypes.bool.isRequired
}

export default EventLists