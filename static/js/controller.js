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

    main_handler: function() {
       // get the leaderboard (top 10 user with most observations), and display it
       const obs =  Model.get_recent_observations(10);

       Views.observation_view(obs);

       Views.submit_form_errors_view()
    },
};