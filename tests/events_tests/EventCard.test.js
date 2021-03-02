import React from 'react';
import EventCard from '../../js/components/EventCard';
import { testEventData } from './TestEventsData';
import { generateDate, generateTime } from '../../js/components/EventHelpers';
// Testing Lib
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test an event card', () => {

  it('Can render an event card', () => {
    const firstEvent = testEventData.find(el => el.id == "37775")
    const firstEventDate = generateDate(new Date(firstEvent.date))
    const generateTime = generateDate(new Date(firstEvent.date))
    render(
      <EventCard event={firstEvent} />
    )
    expect(screen.getByText(firstEvent.title)).toBeInTheDocument()
    expect(screen.getByText(firstEventDate)).toBeInTheDocument()
    expect(screen.getByText(generateTime)).toBeInTheDocument()
  });

  it('Can show description', () => {
    const firstEvent = testEventData.find(el => el.id == "37775")
    render(
      <EventCard event={firstEvent} />
    )
    fireEvent.click(screen.getByText('Learn More'))
    expect(screen.getByTestId("event-description")).toBeInTheDocument()
    expect(screen.getByText('More Info')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
    expect(screen.getByText('Address: Canada')).toBeInTheDocument()
  });

  it('Can hide description', () => {
    const firstEvent = testEventData.find(el => el.id == "37775")
    render(
      <EventCard event={firstEvent} />
    )
    fireEvent.click(screen.getByText('Learn More'))
    fireEvent.click(screen.getByText('Learn More'))
    expect(screen.queryByTestId("event-description")).not.toBeInTheDocument()
    expect(screen.queryByText('More Info')).not.toBeInTheDocument()
    expect(screen.queryByText('Register')).not.toBeInTheDocument()
    expect(screen.queryByText('Address: Canada')).not.toBeInTheDocument()
  });
});