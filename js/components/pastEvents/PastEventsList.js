import React from 'react';
import EventCard from '../EventCard';
import Loading from '../Loading';

const PastEventsList = ({ events, isFetchingMore, fetchMore, paras }) => {

  return (
    <> 
      <div className="col-md-18 event-list-wrapper">
        {events.map((event) => (
          <div className="col-md-12 max-min-width" key={event.id}>
            <EventCard event={event} />
          </div>
        ))}
  
        <div className="past-event-container">
          { isFetchingMore && <Loading /> }
          { !isFetchingMore && !paras && <button className="btn btn-primary" onClick={fetchMore}>Load More</button>}
          { !isFetchingMore && paras && <button className="btn btn-primary" onClick={() => fetchMore(paras)}>Load More</button>}
        </div>
      </div>

    </>
  )
}

export default PastEventsList