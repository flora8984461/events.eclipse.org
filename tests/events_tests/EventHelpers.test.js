import {
  getSelectedItems,
  generateDates,
  generateTimes,
  alphaOrder,
  hasSelectedItems,
  getUrl
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

describe('Test getUrl function', () => {

  it('Test url is upcoming only and added params correctly', () => {
    let testPagePara = 1
    let testSearchParas = "con"
    let testTimeParas = "upcoming"
    let testGroupParas = ["eclipse_org"]
    let testTypeParas = ["ee", "ve"]
  
    expect(getUrl(testPagePara, testSearchParas, testTimeParas, testGroupParas, testTypeParas)).toBe(
      "https://newsroom.eclipse.org/api/events?&page=1&pagesize=20&parameters[upcoming_only]=1&options[orderby][field_event_date]=ASC&parameters[publish_to][]=eclipse_org&parameters[type][]=ee&parameters[type][]=ve&parameters[search]=con"
    )
  })

  it('Test url is past events only and added params correctly', () => {
    let testPagePara = 2
    let testSearchParas = "con"
    let testTimeParas = "past"
    let testGroupParas = ["eclipse_org", "openmdm"]
    let testTypeParas = ["ee", "ve"]
  
    expect(getUrl(testPagePara, testSearchParas, testTimeParas, testGroupParas, testTypeParas)).toBe(
      "https://newsroom.eclipse.org/api/events?&page=2&pagesize=20&parameters[past_event_only]=1&parameters[publish_to][]=eclipse_org&parameters[publish_to][]=openmdm&parameters[type][]=ee&parameters[type][]=ve&parameters[search]=con"
    )
  })

})