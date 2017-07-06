
import moment from 'moment';

export function eventDate (event) {
  var date = "";
  
  if (!event) {
    return date;
  }
  
  let today = moment();
  let start = moment(event.start_time);
  let end = moment(event.end_time);
  
  if(start.diff(today) > 0) {
    date = "Börjar om " + start.to(today, true);
  } else {
    
    // MARK : - Is it active?
    if(end.diff(today) > 0) {
      date = "Slutar om " + end.to(today, true);
    } else {
      date = "Har paserats";
    }
  }
    
    
    return date;
};

export function hasStarted (event) {
  
  if (!event || !event.start_time || !event.end_time) {
    return false;
  }
  
  let today = moment();
  let start = moment(event.start_time);
  let end = moment(event.end_time);
  
  return (start.diff(today) < 0 && end.diff(today) > 0);
  
};

export function hasExpired (event) {
  
  if (!event) {
    return true;
  }
  
  let today = moment();
  let start = moment(event.start_time);
  let end = moment(event.end_time);
  
  if(start.diff(today) < 0) {
    if(end.diff(today) < 0 || !event.end_time) { 
      return true;
    }
  }
    
    return false;
}
