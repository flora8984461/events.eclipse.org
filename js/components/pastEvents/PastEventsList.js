import React from 'react';
import EventCard from '../EventCard';

const PastEventsList = ({ events }) => {
    return (
        <div className="container">
          <div className="row margin-bottom-20">
            <div className="col-md-6">
              {/* Filters will be here */}
              Filters...
            </div>
    
            <div className="col-md-18 event-list-wrapper">
              {events.map((event) => (
                <div className="col-md-12 max-min-width past-event-fade-in" key={event.id}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
}

export default PastEventsList