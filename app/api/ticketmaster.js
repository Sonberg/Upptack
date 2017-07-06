
  export function getEvents (lat, long, callback) {
    let url = "https://app.ticketmaster.com/discovery/v2/events?apikey=wOKmNix98PpIhDigJ4FdeVS0KWdppOVk&latlong=57.6806600,11.9860840&radius=19999&unit=km&locale=sv-se&sort=distance,asc";
    return fetch(url)
          .then((response) => response.json()).then(callback).catch((error) => {
            if (error) {
              callback(null, error);
            }
            
          });
    
  }

  export function  getEvent (id, token, callback) {
    return fetch("https://graph.facebook.com/" + id + "?fields=id,name,cover,attending{context,name},place,start_time,end_time,admins,description,attending_count,ticket_uri,is_viewer_admin,type,owner,is_canceled,can_guests_invite,category,interested_count,ticketing_terms_uri,ticketing_privacy_uri,is_page_owned&access_token=" + token)
    
    .then((response) => response.json()).then(callback).catch((error) => {
      
      if (error) {
        console.log(error);
        callback(null, error);
      }
      
    });
    
  }
  
  
  export function next (next, callback) {
    
    return fetch("https://app.ticketmaster.com" + next)
    
    .then((response) => response.json()).then(callback).catch((error) => {
      
      if (error) {
        callback(null, error);
      }
      
    });
    
  }