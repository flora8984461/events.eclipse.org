import React, { useState } from 'react';
import CustomSearch from './CustomSearch';
import EventsCheckboxFilters from './pastAndUpcomingEvents/EventsCheckboxFilters';
import EventsDataFetcher from './pastAndUpcomingEvents/EventsDataFetcher';
import Legend from "./Legend";

const Wrapper = () => {

  const [triggerSearchValue, setTriggerSearchValue] = useState("")
  const [checkedWorkingGroups, setCheckedWorkingGroups] = useState({})
  const [checkedTypes, setCheckedTypes] = useState({})

  const [upcomingReachEnd, setUpcomingReachEnd] = useState(false)

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
            <a className="btn btn-primary" href="https://newsroom.eclipse.org/node/add/events">Submit Your Event</a>
            <Legend />
          </div>

          <div className="col-md-18 event-list-wrapper">
          <EventsDataFetcher
            eventTime="upcoming"
            searchValue={triggerSearchValue}
            checkedWorkingGroups={checkedWorkingGroups}
            checkedTypes={checkedTypes}
            reachEnd={upcomingReachEnd}
            setReachEnd={setUpcomingReachEnd}
          />
          </div>
        </div>
      </div>
    </>
  )
}

export default Wrapper