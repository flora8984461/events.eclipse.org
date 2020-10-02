// import React, { useState, useEffect } from 'react';
// import Loading from '../Loading';
// import { alertTypes } from '../AlertsEnum';
// import Alerts from '../Alerts';
// import FilteredPastEventsList from './FilteredPastEventsList';
// import CustomSearch from '../CustomSearch';
// import PastEventsFilters from './PastEventsFilters';
// import { hasSelectedItems, getUrl } from '../EventHelpers';

// const PastEventsDataFetcher = () => {

//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [isFetchingMore, setIsFetchingMore] = useState(false)

//   const [searchValue, setSearchValue] = useState('')
//   const [checkedWorkingGroups, setCheckedWorkingGroups] = useState({})
//   const [checkedTypes, setCheckedTypes] = useState({})
//   const [showPastEvents, setShowPastEvents] = useState(false)

//   // For upcoming
//   const [upcomingEventsCurrentPage, setUpcomingEventsCurrentPage] = useState(1)
//   const [upcomingEvents, setUpcomingEvents] = useState([])
//   const [upcomingReachEnd, setUpcomingReachEnd] = useState(false)

//   // For past
//   const [pastEvents, setPastEvents] = useState([])
//   const [pastEventsCurrentPage, setPastEventsCurrentPage] = useState([])
//   const [pastReachEnd, setPastReachEnd] = useState(false)

//   const fetchingDataWithParas = (page, searchParas, timeParas, groupParas, typeParas, forceUpdate, eventTime) => {
//     if (page === 1) {
//       setLoading(true)
//     }
//     let url = getUrl(page, searchParas, timeParas, groupParas, typeParas, eventTime)
//     fetch(url)
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         setLoading(false)
//         setIsFetchingMore(false)
//         // ////////////////
//         if (eventTime === "upcoming") {
//           if (result.pagination.result_end === result.pagination.total_result_size) {
//             setUpcomingReachEnd(true)
//           }
//           if (forceUpdate) {
//             setUpcomingEvents(result.events)
//           }
//           if (!forceUpdate) {
//             setUpcomingEvents([...upcomingEvents, ...result.events])
//           }
//         }
//         // ////////////
//         if (eventTime === "past") {
//           if (result.pagination.result_end === result.pagination.total_result_size) {
//             setPastReachEnd(true)
//           }
//           if (forceUpdate) {
//             setPastEvents(result.events)
//           }
//           if (!forceUpdate) {
//             setPastEvents([...pastEvents, ...result.events])
//           }
//         }

//       },
//       (error) => {
//         setLoading(false)
//         setIsFetchingMore(false)
//         setError(error)
//       }
//     )

//   }
  
//   // Detect if searchValue, checkedEventTime, checkedWorkingGroups, checkedTypes has changed, do the following func
//   useEffect(() => {
//     setUpcomingEventsCurrentPage(1)
//     setUpcomingReachEnd(false)
//     fetchingDataWithParas(1, searchValue, showPastEvents, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), true)

//   }, [searchValue, checkedWorkingGroups, checkedTypes, showPastEvents])

//   // get more when click on the button
//   const fetchMoreWithParas = () => {
//     setIsFetchingMore(true)
//     fetchingDataWithParas((upcomingEventsCurrentPage + 1), searchValue, showPastEvents, hasSelectedItems(checkedWorkingGroups), hasSelectedItems(checkedTypes), false)
//     setUpcomingEventsCurrentPage(prev => prev + 1)
//   }

//   if (error) return <Alerts alertType={alertTypes.ERROR} message={error.message} />

//   return (
//     <>
//       <p>Past events and upcoming events</p>
//       <div className="container">
//         <div className="row margin-bottom-20">
//           <div className="col-md-6">
//             <CustomSearch searchValue={searchValue} setSearchValue={setSearchValue} />
//             <PastEventsFilters
//               checkedTypes={checkedTypes}
//               setCheckedTypes={setCheckedTypes}
//             />
//             <PastEventsFilters
//               checkedWorkingGroups={checkedWorkingGroups}
//               setCheckedWorkingGroups={setCheckedWorkingGroups}
//             />
//             <PastEventsFilters
//               showPastEvents={showPastEvents}
//               setShowPastEvents={setShowPastEvents}
//             />
//           </div>
//           { loading ? <Loading /> : 
//             <FilteredPastEventsList
//               events={upcomingEvents} 
//               isFetchingMore={isFetchingMore} 
//               fetchMore={fetchMoreWithParas}
//               forUpcoming={true}
//               upcomingReachEnd={upcomingReachEnd}
//             />
//           }

//           <hr /><p>Past events</p>
//            { loading ? <Loading /> : 
//             showPastEvents && upcomingReachEnd && 
//             <FilteredPastEventsList
//                events={pastEvents}
//                isFetchingMore={isFetchingMore} 
//                fetchMore={fetchMoreWithParas}
//              />
//            }

//         </div>
//       </div>
//     </>
//   )
// }

// export default PastEventsDataFetcher