
  import moment from 'moment';
  
  /**
   * [getEvents description]
   * @param  {[type]}   text     [description]
   * @param  {[type]}   filter   [description]
   * @param  {[type]}   token    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  export function events (text, filter, token, callback) {
    
    var filterQuery = "";
    
    if (!text) {
      return callback(null, null);
    }
    
    
    switch (filter.interval) {
      case "today":
        filterQuery = "&since=" + moment().startOf('day').unix() + "&until=" + moment().endOf('day').add(1, 'days').unix();
        break;
      case "week":
        filterQuery = "&since=" + moment().startOf('day').unix() + "&until=" + moment().endOf('day').add(7, 'days').unix();
        break;
        
      case "month":
        filterQuery = "&since=" + moment().startOf('day').unix() + "&until=" + moment().endOf('day').add(31, 'days').unix();
        break;
        
      default:
        
    }
    
    
    return fetch("https://graph.facebook.com/search?q=" + text + "&type=event" + filterQuery + "&fields=id,name,cover,start_time,end_time,owner&access_token=" + token)
    
    .then((response) => response.json()).then(callback).catch((error) => {
      
      if (error) {
        callback(null, error);
      }
      
    });
    
  }

  /**
   * [getEvent description]
   * @param  {[type]}   id       [description]
   * @param  {[type]}   token    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  export function  event (id, token, callback) {
    let url = "https://graph.facebook.com/" + id + "?fields=id,name,cover,attending{context,name},place,start_time,end_time,admins,description,attending_count,ticket_uri,is_viewer_admin,type,owner,is_canceled,can_guests_invite,category,interested_count,ticketing_terms_uri,ticketing_privacy_uri,is_page_owned&access_token=" + token;
    return fetch(url)
    
    .then((response) => response.json()).then(callback).catch((error) => {
      
      if (error) {
        callback(null, error);
      }
      
    });
    
  }
  
  /**
   * [me description]
   * @param  {[type]}   token    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  export function  me (token, callback) {
    
    return fetch("https://graph.facebook.com/me?fields=id,name,age_range,birthday,cover,email,currency,gender,hometown,public_key&access_token=" + token)
    
    .then((response) => response.json()).then(callback).catch((error) => {
      
      if (error) {
        callback(null, error);
      }
      
    });
    
  }
  
  /**
   * [attend description]
   * @param  {[type]}   id       [description]
   * @param  {[type]}   token    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  export function attend (id, token, callback) {
    return fetch("https://graph.facebook.com/" + id + "/attending?access_token=" + token, { method: 'POST' })
      .then((response) => response.json())
      .then(callback)
      .catch((error) => {
          callback(null, error);
      });
    
  }
  
  /**
   * [rsvp description]
   * @param  {[type]}   id       [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  export function rsvp (id, token, callback, url) {
    fetch(url ? url : "https://graph.facebook.com/me/events?fields=id,rsvp_status&access_token=" + token)
      .then((response) => response.json())
      .then((body) => {
        var res = body.data.find((event) => {
          return event.id === id;
        });
        
        if (body.paging.next && !res) {
          rsvp(id, token, callback, body.paging.next);
        } else {
          callback(res, null);
        }
        
      })
      .catch((error) => {
          callback(null, error);
      });
    
  }
  
  
  
  
  
  /**
   * [next description]
   * @param  {Function} next     [description]
   * @param  {Function} callback [description]
   * @return {Function}          [description]
   */
  export function next (next, callback) {
    
    return fetch(next)
    
    .then((response) => response.json()).then(callback).catch((error) => {
      
      if (error) {
        callback(null, error);
      }
      
    });
    
  }
  
  
  /**
   * [cached description]
   * @param  {[type]}   text     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  export function cached(text, callback) {
    global.storage.load({
     key: 'facebook',
     id: '1002'
   }).then(ret => {
     callback(ret[text], null);
   }).catch(err => { 
     callback(null, err); 
   });
  }
  
  /**
   * [cache description]
   * @param  {[type]}   text     [description]
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  export function cache(text, data, callback) {
    global.storage.load({
     key: 'facebook',
     id: '1002'
   }).then(ret => {
     
     ret[text] = data;
     
     global.storage.save({
       key: 'facebook',
       id: '1002',
       data: ret,
       expires: 1000 * 60
     });
     
     callback(data, err); 
    
   }).catch(err => { 
     callback(null, err); 
   });
   
    
  }