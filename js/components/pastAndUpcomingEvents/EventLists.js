import React from 'react';
import EventCard from '../EventCard';
import Loading from '../Loading';
import PropTypes from 'prop-types';

const EventLists = ({ events, isFetchingMore, fetchMore, reachEnd, eventTime, showPastEvents }) => {

  if (events.length === 0 && !isFetchingMore) {
    return <p style={{marginLeft: "auto", marginRight: "auto"}}>Sorry, we could not find the match in {eventTime} events</p>
  }

  return (
    <> 
      {events.map((event) => (
        <div className={`col-md-12 max-min-width event-${eventTime}`} key={event.id}>
          <EventCard event={event} />
        </div>
      ))}

      <div className="event-load-more">
        { reachEnd ?
        ( eventTime === "upcoming" && showPastEvents ? null : <p className="margin-5">Sorry, we reached the end with this search</p> ) : 
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
  reachEnd: PropTypes.bool.isRequired,
  eventTime: PropTypes.string
}

export default EventLists