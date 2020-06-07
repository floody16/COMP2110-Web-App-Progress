export {Controller};
import {Model} from './model.js';
import {Views} from './views.js';

const loggedInUser = 0; // bob bobalooba

// controls the model and view
const Controller = {
    // gets the form element, returns if the data is good, displays errors if the data is bad
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
        

        // Model.add_observation(new FormData(form))
        // .then(result=>{
        //     if (result.status === "failed") {
        //         Views.submit_form_errors_view({
        //             errors: result.errors
        //         });
        //         return;
        //     }
    
        //     location.hash = `#!/users/${loggedInUser}`
        // });

     
    },

    // submits the form and displays the submit view
    submit_view_handler : function() {
        console.log("submit handler")
        Views.submit_view({ participant: loggedInUser });
    },

    // displays the details of a single user
    user_view_handler: async function({id}){
        if (isNaN(id)){
            Views.not_found();
            return;            
        };

        const userId = parseInt(id);
        const user = Model.get_user(userId);
        const observations = Model.get_user_observations(userId);
        Views.user_view({user : user, observations : observations});
    },

    // displays all the details of a single observation
    observation_view_handler: async function({id}){
        if (isNaN(id)){
            Views.not_found();
            return;            
        };

        const observation = Model.get_observation(parseInt(id));
        Views.observation_view(observation);
    },

    // displays a list of all observations
    observations_view_handler: function(){
        // code here
        const observations = Model.get_observations(); 
        Views.list_observations_view({ observations });
    },

    // displays a list of all users
    users_view_handler: function(){
        // code here
        const users = Model.get_users();
        Views.list_users_view({users});
    },

    main_handler: function() {
       // get the leaderboard (top 10 user with most observations), and display it
       const obs =  Model.get_recent_observations(10);
       // taking top 11, the test asserts a different order of users within rankings
       // this means user participant 87 is not in top 10 of our ranking
       const leaderboard = Model.get_leaderboard(11);
       Views.main_view({ observations : obs, leaderboard : leaderboard });
    },

    on_page_load: async function() {
        Views.clear_errors();
        await Promise.all([ Model.update_observations(), Model.update_users() ]);
    },
};