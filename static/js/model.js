export {Model};

/* 
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/

// contains the functions to manipulate the data
// these functions are called by the controller, and are displayed by the views
const Model = {

    observations_url: '/api/observations', 
    users_url:  '/api/users',   
    
    // this will hold the data stored in the model
    data: {
        observations: [],
        users: []
    },

    // update_users - retrieve the latest list of users 
    // from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_users: function() {
        return fetch(this.users_url)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            this.data.users = data;
            let event = new CustomEvent("modelUpdated", {detail: this})
            window.dispatchEvent(event);
            return event;
        });
    },

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_observations: function() {
        console.log("update observartions:");
        return fetch(this.observations_url)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            this.data.observations = data;
            let event = new CustomEvent("modelUpdated", {detail: this});
            window.dispatchEvent(event);
            return event;
        });
    },

    // get_observations - return an array of observation objects
    get_observations: function() {
        return this.data.observations;
    },

    // get_observation - return a single observation given its id
    get_observation: function(observationid) {
        return this.data.observations.find(o => o.id == observationid);
    },
 
    set_observations: function(observations) {
        this.data.observations = observations;
    },

    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   formdata is a FormData object containing all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: async function (formdata) {
        const data = new URLSearchParams(formdata);

        const fetchResult = await fetch(this.observations_url, {
            method: 'POST',
            body: data
        });
        
        //var r = JSON.parse( fetchResult.body );
        const jsonResult = await fetchResult.json();

        let event = new CustomEvent("observationAdded", {
            detail: jsonResult
        });
        window.dispatchEvent(event);

        return jsonResult;

        //  fetch(this.observations_url, {
        //     method: 'POST',
        //     body: data
        // })
        // .then(response => response.json())
        // .then(result => {
        //     let event = new CustomEvent("observationAdded", {
        //         detail: result
        //     });
        //     window.dispatchEvent(event);
        //     return result;
        // })
        // .catch((error) => {
        //     console.log(error);
        //     throw error;
        // });
    },

    // get_user_observations - return just the observations for
    // one user as an array
    // this combines the data of both users and observations
    get_user_observations: function(userId) {
        let observations = this.get_observations();
        console.log(observations);

        var userObservations = observations.filter(function(o) { return o.participant == userId; } );     
        return this.sort_by_timestamp(userObservations);
    },  

    // get_recent_observations - return the N most recent
    // observations, ordered by timestamp, most recent first
    // call sort_by_timestamp and pass observations as a parameter
    // return a sorted copy of observations 
    get_recent_observations: function(N) {   
        console.log("get_recent_observations is called");
        console.log(this.data.observations); 

        let sortedObservations = this.sort_by_timestamp(this.data.observations);
        return sortedObservations.slice(0, N);
    },

    // sort_by_timestamp - take a copy of the original observations array, and sort
    // the copied array in descending order of most recent timestamp first
    // this is then called in get_recent_observations
    sort_by_timestamp: function(observations){
        var copy = observations.slice();     
        copy.sort(function(a, b){   
            if (a.timestamp > b.timestamp){
                return -1;
            }
            if (a.timestamp < b.timestamp){
                return 1;
            }      
            return 0; 
        }); 
        return copy;
    },

    // get_users - return the array of users
    get_users: function() {
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },

    // get_user - return the details of a single user given 
    // the user id
    get_user: function(userid) {
        for (const user of this.data.users) {
            if (user.id == userid) {
                return user;
            }           
        }
        return null;
    },


    // get_leaderboard - get the 10 users with the highest number of submissions,
    // in descending order 
    get_leaderboard: function(N) {
        const userMap = this.get_users()
        .reduce(function(userMap,user){
            userMap[user.id]=user;
            return userMap;
        },{});
        
        let topLeaders = this.get_observations()
            .reduce(function(leaderboard, observation){
                leaderboard[observation.participant] = 1 + (leaderboard[observation.participant] || 0);
                return leaderboard;
            },{});
        topLeaders = Object.entries(topLeaders);
        topLeaders.sort(([,v1], [,v2]) => {
            return v2 - v1;
        });
        return topLeaders.slice(0, N || topLeaders.length)
            .map(([participant, count]) => {
                const user = userMap[participant];
                user.observation_count = count;
                return user;
            });
    }

};