export {Controller};
import {Model} from './model.js';
import {Views} from './views.js';

const loggedInUser = 0; // bob bobalooza

// commands the model and view
const Controller = {
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

    // displays the details of a single user, including all their observations
    user_view_handler: async function({id}){

        await Promise.all([ Model.update_observations(), Model.update_users() ]);

        const user = Model.get_user(id);
        const observations = Model.get_user_observations(id);
        Views.user_view({user : user, observations : observations});
    },


    // submits the form and displays the submit view
    submit_view_handler : function() {
        console.log("submit handler")
        Views.submit_view({ participant: loggedInUser});
    },
    
    // displays the details of a single observation, including which user submitted it
    observation_view_handler : async function({id}) {

        await Promise.all([ Model.update_users(), Model.update_observations() ]);

        const observation = Model.get_observation(id);
        const user = Model.get_user(id);
        Views.observation_view({user: user, observation : observation});
    },

    // displays a list of all observations
    observations_view_handler: function() {

    },

    // displays the details of a single observation
    users_view_handler: function() {

    },

    // get the leaderboard (top 10 user with most observations), and display it
    main_handler: function() {
       
       const obs =  Model.get_recent_observations(10);

       Views.observation_view(obs);

       Views.submit_form_errors_view()
    },
};