import React from 'react';
import EventLists from '../../js/components/pastAndUpcomingEvents/EventLists';
import { testEventData } from './TestEventsData';
// Testing Lib
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test render events list and filters', () => {

  const firstEvent = testEventData.find(el => el.id == "37775")
  const secondEvent = testEventData.find(el => el.id == "37689")
  const thirdEvent = testEventData.find(el => el.id == "37765")  

  it('Can render an event card', () => {

    render(
      <EventLists events={testEventData} isFetchingMore={false} fetchMore={jest.fn()} reachEnd={true} />
    )
    expect(screen.getByText(firstEvent.title)).toBeInTheDocument()
    expect(screen.getByText(secondEvent.title)).toBeInTheDocument()
    expect(screen.getByText(thirdEvent.title)).toBeInTheDocument()
  });
  
});