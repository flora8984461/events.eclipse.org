import React from 'react';
import EventCard from '../EventCard';
import Loading from '../Loading';

const FilteredPastEventsList = ({ events, isFetchingMore, fetchMore, groupParas, typeParas }) => {

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
          { !isFetchingMore && <button className="btn btn-primary" onClick={() => fetchMore(groupParas, typeParas)}>New Load More</button>}
        </div>
      </div>

    </>
  )
}

export default FilteredPastEventsList