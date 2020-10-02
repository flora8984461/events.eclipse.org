import React, { useState } from 'react';
import CustomSearch from './CustomSearch';
import PastEventsFilters from './pastEvents/PastEventsFilters';
import PastEventsDataFetcher from './pastEvents/PastEventsDataFetcher';

const Wrapper = () => {

  const [triggerSearchValue, setTriggerSearchValue] = useState("")
  const [checkedWorkingGroups, setCheckedWorkingGroups] = useState({})
  const [checkedTypes, setCheckedTypes] = useState({})

  const [upcomingReachEnd, setUpcomingReachEnd] = useState(false)
  const [showPastEvents, setShowPastEvents] = useState(false)

  return (
    <>
      <div className="container">
        <div className="row margin-bottom-20">
          <div className="col-md-6">
            <CustomSearch triggerSearchValue={triggerSearchValue} setTriggerSearchValue={setTriggerSearchValue} />
            <PastEventsFilters
              checkedTypes={checkedTypes}
              setCheckedTypes={setCheckedTypes}
            />
            <PastEventsFilters
              checkedWorkingGroups={checkedWorkingGroups}
              setCheckedWorkingGroups={setCheckedWorkingGroups}
            />
            <PastEventsFilters
              showPastEvents={showPastEvents}
              setShowPastEvents={setShowPastEvents}
            />
          </div>
          <div className="col-md-18 event-list-wrapper">

          <PastEventsDataFetcher
            eventTime="upcoming"
            searchValue={triggerSearchValue}
            checkedWorkingGroups={checkedWorkingGroups}
            checkedTypes={checkedTypes}
            setUpcomingReachEnd={setUpcomingReachEnd}
          />

            { showPastEvents && upcomingReachEnd && 
            <>
            <div className="event-load-more"><p>Past Events</p></div>
            <PastEventsDataFetcher
              eventTime="past"
              searchValue={triggerSearchValue} 
              checkedWorkingGroups={checkedWorkingGroups} 
              checkedTypes={checkedTypes}
              upcomingReachEnd={upcomingReachEnd}
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