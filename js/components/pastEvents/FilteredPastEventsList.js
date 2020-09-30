import React from 'react';
import EventCard from '../EventCard';
import Loading from '../Loading';

const FilteredPastEventsList = ({ events, isFetchingMore, fetchMore }) => {

  return (
    <> 
      <div className="col-md-18 event-list-wrapper">
        {events.map((event) => (
          <div className="col-md-12 max-min-width" key={event.id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <div className="text-center">
        { isFetchingMore && <Loading /> }
        { !isFetchingMore && <button className="btn btn-primary margin-top-10" onClick={fetchMore}>Load More</button>}
      </div>

    </>
  )
}

export default FilteredPastEventsList