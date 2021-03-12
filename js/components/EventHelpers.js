export const WORKING_GROUPS = [
  {
    id: "ascii_doc",
    name: "AsciiDoc"
  },
  {
    id: "ecd_tools",
    name: "Eclipse Cloud Development Tools"
  },
  {
    id: "edge_native",
    name: "Edge Native"
  },
  {
    id: "gemoc_rc",
    name: "GEMOC RC"
  },
  {
    id: "eclipse_iot",
    name: "Eclipse IoT"
  },
  {
    id: "jakarta_ee",
    name: "Jakarta EE"
  },
  {
    id: "openadx",
    name: "OpenADx"
  },
  {
    id: "opengenesis",
    name: "OpenGENESIS"
  },
  {
    id: "openhwgroup",
    name: "OpenHW Group"
  },
  {
    id: "openmdm",
    name: "OpenMDM"
  },
  {
    id: "openmobility",
    name: "OpenMobility"
  },
  {
    id: "openpass",
    name: "OpenPass"
  },
  {
    id: "science",
    name: "Science"
  },
  {
    id: "sparkplug",
    name: "Sparkplug"
  },
  {
    id: "tangle_ee",
    name: "Tangle EE"
  },
  {
    id: "eclipse_ide",
    name: "Eclipse IDE"
  },
  {
    id: "eclipse_org",
    name: "Other"
  }
]

export const EVENT_TYPES = [
  {
    id: "ec",
    name: "EclipseCon"
  },
  {
    id: "ve",
    name: "Virtual Events"
  },
  {
    id: "dc",
    name: "Demo Camps & Stammtisch"
  },
  {
    id: "wg",
    name: "Working Group Events"
  },
  {
    id: "et",
    name: "Training Series"
  },
  {
    id: "ee",
    name: "Other interesting Events"
  },
  {
    id: "unknown",
    name: "Unknown"
  },
]

export const EVENT_ATTENDANCE_TYPE = [
  {
    id: "ef_event",
    name: "Eclipse Foundation Events"
  },
  {
    id: "ef_attending",
    name: "Events we are attending"
  },
  {
    id: "other",
    name: "Other community events of interest"
  }
]

export function getSelectedItems(checkedItems) {
  let selected = []
  if (checkedItems) {
    for (const property in checkedItems) {
      if (checkedItems[property]) {
        selected.push(property)
      }
    }
    return selected
  }
}

export function hasAddress(event) {
  if (event.address && (event.address.city || event.address.country)) {
    return true
  } else return false
}

export function checkSameMonth(startDate, endDate) {
  return startDate.getMonth() === endDate.getMonth()
}

export function checkSameDay(startDate, endDate) {
  return checkSameMonth(startDate, endDate) && startDate.getDate() === endDate.getDate()
}

export function generateDate(date) {
  if (date) {
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  }
}

export function generateDates(startDate, endDate) {
  if (endDate && !checkSameDay(startDate, endDate)) {
    return generateDate(startDate) + " - " + generateDate(endDate) + ", " + startDate.getFullYear()
  }
  else {
    return generateDate(startDate)
  }
}

export function generateTime(time) {
  if (time) {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
}

export function generateTimes(startDate, endDate) {
  if (endDate && checkSameDay(startDate, endDate)) {
    return generateTime(startDate) + " - " + generateTime(endDate)
  }
  else {
    return generateTime(startDate)
  }
}

export function checkDatePast(inputDate) {
  var today = new Date();
  var input_date = new Date(inputDate);
  if (today.setHours(0,0,0,0) < input_date.setHours(0,0,0,0)) {
    return false;
  } else return true;
}

export function alphaOrder(array) {

  if (array) {
    return array.sort((a, b) => a?.name.localeCompare(b?.name))
  }

}

export function hasSelectedItems(items) {
  let selectedItems = getSelectedItems(items)
  if (selectedItems && selectedItems.length > 0) {
    return selectedItems
  } else return false
}


export function getUrl(page, searchParas, groupParas, typeParas) {
  let url = `https://newsroom.eclipse.org/api/events?&page=${page}&pagesize=10&options[orderby][field_event_date]=custom`
  for (let i=0; i<groupParas.length; i++) {
    url = url + "&parameters[publish_to][]=" + groupParas[i]
  }
  for (let j=0; j<typeParas.length; j++) {
    url = url + "&parameters[type][]=" + typeParas[j]
  }
  if (searchParas) {
    url = url + "&parameters[search]=" + searchParas
  }
  return url
}
