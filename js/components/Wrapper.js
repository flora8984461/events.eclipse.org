import React, { useState } from 'react';
import CustomSearch from './CustomSearch';
import EventsCheckboxFilters from './pastAndUpcomingEvents/EventsCheckboxFilters';
import EventsDataFetcher from './pastAndUpcomingEvents/EventsDataFetcher';

const Wrapper = () => {

  const [triggerSearchValue, setTriggerSearchValue] = useState("")
  const [checkedWorkingGroups, setCheckedWorkingGroups] = useState({})
  const [checkedTypes, setCheckedTypes] = useState({})

  const [pastReachEnd, setPastReachEnd] = useState(false)
  const [upcomingReachEnd, setUpcomingReachEnd] = useState(false)
  const [showPastEvents, setShowPastEvents] = useState(false)

  return (
    <>
      <div className="container">
        <div className="row margin-bottom-20">
          <div className="col-md-6">
            <CustomSearch triggerSearchValue={triggerSearchValue} setTriggerSearchValue={setTriggerSearchValue} />
            <EventsCheckboxFilters
              checkedTypes={checkedTypes}
              setCheckedTypes={setCheckedTypes}
            />
            <EventsCheckboxFilters
              checkedWorkingGroups={checkedWorkingGroups}
              setCheckedWorkingGroups={setCheckedWorkingGroups}
            />
            <EventsCheckboxFilters
              showPastEvents={showPastEvents}
              setShowPastEvents={setShowPastEvents}
            />
          </div>
          <div className="col-md-18 event-list-wrapper">

          <EventsDataFetcher
            eventTime="upcoming"
            searchValue={triggerSearchValue}
            checkedWorkingGroups={checkedWorkingGroups}
            checkedTypes={checkedTypes}
            reachEnd={upcomingReachEnd}
            setReachEnd={setUpcomingReachEnd}
            showPastEvents={showPastEvents}
          />

            { showPastEvents && upcomingReachEnd && 
            <>
            <div className="event-load-more"><p className="past-events-line">Past Events</p></div>
            <EventsDataFetcher
              eventTime="past"
              searchValue={triggerSearchValue} 
              checkedWorkingGroups={checkedWorkingGroups} 
              checkedTypes={checkedTypes}
              reachEnd={pastReachEnd}
              setReachEnd={setPastReachEnd}
              past={true}
            />
            </> }

          </div>
        </div>
      </div>
    </>
  )
}

export default Wrapper