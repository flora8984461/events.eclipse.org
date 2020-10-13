import {
  getSelectedItems,
  generateDates,
  generateTimes,
  alphaOrder,
  hasSelectedItems,
  WORKING_GROUPS,
  EVENT_TYPES
} from '../../js/components/EventHelpers';

describe('Test getSelectedItems function', () => {

  const selectedItems = {
    first: true,
    second: false,
    third: true
  }

  const emptySelectedItems_I = {
    first: false,
    second: false,
    third: false
  }

  const emptySelectedItems_II = {}

  it('Test render selected items', () => {
      expect( getSelectedItems(selectedItems) ).toEqual(['first', 'third'])
  });

  it('Test when no checkedItems', () => {
    expect( getSelectedItems(emptySelectedItems_I) ).toEqual([])
  });

  it('Test when no checkedItems', () => {
    expect( getSelectedItems(emptySelectedItems_II) ).toEqual([])
  });
});

describe('Test hasSelectedItems function', () => {

  const selectedItems = {
    first: true,
    second: false,
    third: true
  }

  const emptySelectedItems_I = {
    first: false,
    second: false,
    third: false
  }

  const emptySelectedItems_II = {}

  it('Test render selected items', () => {
      expect( hasSelectedItems(selectedItems) ).toEqual(['first', 'third'])
  });

  it('Test when no checkedItems', () => {
    expect( hasSelectedItems(emptySelectedItems_I) ).toEqual(false)
  });

  it('Test when no checkedItems', () => {
    expect( hasSelectedItems(emptySelectedItems_II) ).toEqual(false)
  });
});

describe('Test generateDates and generateTimes function', () => {

  const startDate_I = new Date('2020-10-13T12:30:00Z')
  const endDate_I = new Date('2020-10-14T21:00:00Z')

  const startDate_II = new Date('2020-10-12T12:00:00Z')
  let endDate_II
  let startDate_III
  const endDate_III = new Date('2020-10-12T21:00:00Z')
  
  it('Test generate correct dates', () => {
    expect(generateDates(startDate_I, endDate_I)).toBe('Tue, Oct 13 - Wed, Oct 14, 2020')
  });
  
  it('Test generate correct dates without end date', () => {
    expect( generateDates(startDate_II, endDate_II) ).toEqual('Mon, Oct 12')
  });

  it('Test generate correct start time for multiday events', () => {
    expect(generateTimes(startDate_I, endDate_I)).toBe('08:30 AM')
  });
  
  it('Test generate correct times for one day event', () => {
    expect( generateTimes(startDate_II, endDate_III) ).toEqual('08:00 AM - 05:00 PM')
  });

  it('Test when empty date for generateDates', () => {
    expect( generateDates(startDate_III, endDate_II) ).toBeUndefined()
  });

  it('Test when empty date for generateTimes', () => {
    expect( generateTimes(startDate_III, endDate_II) ).toBeUndefined()
  });
});

describe('Test alphaOrder function', () => {
  const arr = [
    {name: "Alicia"},
    {name: "Olivia"},
    {name: "Anne"},
    {name: "Ben"}
  ]

  const result = [
    {name: "Alicia"},
    {name: "Anne"},
    {name: "Ben"},
    {name: "Olivia"}
  ]

  const arr_II = [
    {name: "Jakarta EE"},
    {name: "Tangle EE"},
    {name: "Eclipse IDE"},
    {name: "Eclipse Foundation"}
  ]

  const result_II = [
    {name: "Eclipse Foundation"},
    {name: "Eclipse IDE"},
    {name: "Jakarta EE"},
    {name: "Tangle EE"}
  ]

  it('Test alpha order should be correct', () => {
    expect( alphaOrder(arr) ).toEqual(result)
  });

  it('Test alpha order should be correct again', () => {
    expect( alphaOrder(arr_II) ).toEqual(result_II)
  });
});