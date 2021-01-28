import React from 'react';
import EventsCheckboxFilters from '../../js/components/pastAndUpcomingEvents/EventsCheckboxFilters';
// Testing Lib
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Render checkbox filters', () => {
  const checkedWorkingGroups = {
      ecd_tools: true,
      edge_native: true
    }  
  const setCheckedWorkingGroups = jest.fn()

  const checkedTypes = {
    abc: true,
    def: true
  }  
  const setCheckedTypes = jest.fn()

  const type_I = 'Virtual Events'
  const type_II = 'Working Group Events'
  const type_III = 'Other interesting Events'

  const group_I = 'Eclipse Cloud Development Tools'
  const group_II = 'Edge Native'
  const group_III = 'Eclipse IoT'

  const show_past_events = 'Show Past Events'

  it('Render working groups checkbox filters', () => {
    render(
      <EventsCheckboxFilters
        checkedWorkingGroups={checkedWorkingGroups}
        setCheckedWorkingGroups={setCheckedWorkingGroups}
      />
    )

    expect(screen.getByText(group_I)).toBeInTheDocument()
    expect(screen.getByText(group_II)).toBeInTheDocument()

    const checkbox = screen.getByTestId('sparkplug')
    fireEvent.click(checkbox)
    expect(setCheckedWorkingGroups).toBeCalledWith({
        ...checkedWorkingGroups,
        ['sparkplug']: true
    })
  })

  it('Render event types checkbox filters', () => {
    render(
      <EventsCheckboxFilters
        checkedTypes={checkedTypes}
        setCheckedTypes={setCheckedTypes}
      />
    )

    expect(screen.getByText(type_I)).toBeInTheDocument()
    expect(screen.getByText(type_II)).toBeInTheDocument()

    const checkbox = screen.getByTestId('ve')
    fireEvent.click(checkbox)
    expect(setCheckedTypes).toBeCalledWith({
        ...checkedTypes,
        ['ve']: true
    })
  })

  it('Can collapse event type filters', () => {
 
    render(
      <EventsCheckboxFilters
        checkedTypes={checkedTypes}
        setCheckedTypes={setCheckedTypes}
      />
    )
    fireEvent.click(screen.getByText('EVENT TYPE'))
    expect(screen.queryByText(type_I)).not.toBeInTheDocument()
    expect(screen.queryByText(type_II)).not.toBeInTheDocument()
    expect(screen.queryByText(type_III)).not.toBeInTheDocument()
  });

  it('Can collapse working groups filters', () => {
 
    render(
      <EventsCheckboxFilters
        checkedWorkingGroups={checkedWorkingGroups}
        setCheckedWorkingGroups={setCheckedWorkingGroups}
      />
    )
    fireEvent.click(screen.getByText('CATEGORIES'))
    expect(screen.queryByText(group_I)).not.toBeInTheDocument()
    expect(screen.queryByText(group_II)).not.toBeInTheDocument()
    expect(screen.queryByText(group_III)).not.toBeInTheDocument()
  });

})