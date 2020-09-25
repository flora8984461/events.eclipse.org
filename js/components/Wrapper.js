import React, { useState } from 'react';
import EventsDataFetcher from './EventsDataFetcher';
import PastEventsDataFetcher from './pastEvents/PastEventsDataFetcher';

const Wrapper = () => {

  const [upcoming, setUpcoming] = useState(true)

  const showPastEvents = () => {
    setUpcoming(false)
  }

  const showUpcoming = () => {
    setUpcoming(true)
  }

  return (
    <div>
      <button className="btn btn-default margin-right-20" onClick={showUpcoming}> Upcoming events </button>
      <button className="btn btn-default" onClick={showPastEvents}> Past events </button>

      { upcoming == true ? <EventsDataFetcher /> : <PastEventsDataFetcher /> }
    </div>
  )
}

export default Wrapper