const DAY = 24 * 60 * 60 * 1000;
const CHECKLIST = [
  {
    "time_before": 0,
    "title": "Travel",
    "description": "(Created by Itinerary Viewer)"
  },
  {
    "time_before": 1 * DAY,
    "title": "Flight Check-in",
    "description": "Check-in to your flight (Created by Itinerary Viewer)"
  },
  {
    "time_before": 3 * DAY, // TODO: only on working days
    "title": "Print travel documents",
    "description": "Flight ticket, train/ferry/cruise ticket, hotel confirmation, museum/attraction/performance confirmation (Created by Itinerary Viewer)"
  },
  {
    "time_before": 3 * DAY, 
    "title": "Offline map on phone",
    "description": ""
  },
  {
    "time_before": 3 * DAY, // TODO: only on working days
    "title": "Prepare money for travel",
    "description": "Withdraw cash; enable overseas transaction (Created by Itinerary Viewer)"
  },
  {
    "time_before": 30 * DAY, 
    "title": "Plan your trip",
    "description": "Plan your trip (Created by Itinerary Viewer)"
  }
];
