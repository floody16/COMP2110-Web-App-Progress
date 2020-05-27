export {Controller};
import {Model} from './model.js';
import {Views} from './views.js';

const loggedInUser = 0; // bob bobalooba

// controls the model and view
const Controller = {
    // gets the form element, returns if the data is gold, displays errors if the data is bad
    handle_submit_form: async function() {
        const form = document.getElementById("submit_form");
        const result = await Model.add_observation(new FormData(form));

        if (result.status === "failed") {
            Views.submit_form_errors_view({ 
                errors: result.errors 
            });
            return;
        }
        
        location.hash = `#!/users/${loggedInUser}`
    },

    // submits the form and displays the submit view
    submit_view_handler : function() {
        console.log("submit handler")
        Views.submit_view({ participant: loggedInUser});
    },

    // displays the details of a single user
    user_view_handler: async function({id}){

        await Promise.all([ Model.update_observations(), Model.update_users() ]);

        const user = Model.get_user(id);
        const observations = Model.get_user_observations(id);
        Views.user_view({user : user, observations : observations});
    },

    // displays the details of a single observation
    observation_view_handler: async function({id}){

        await Promise.all([ Model.update_observations(), Model.update_users() ])

        const observation = Model.get_user_observations(id);
        const user = Model.get_user(id);
        Views.observation_view({observation : observation , user : user});
    },

    // displays a list of observations
    observations_view_handler: function({id}){
        // code here
    },

    // displays a list of users
    users_view_handler: function(){
        // code here

    },

    main_handler: function() {
       // get the leaderboard (top 10 user with most observations), and display it
       const obs =  Model.get_recent_observations(10);

       Views.observation_view(obs);

       Views.submit_form_errors_view();
    },
};