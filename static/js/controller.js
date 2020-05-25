export {Controller};
import {Model} from './model.js';
import {Views} from './views.js';

const targetid = "target";

const loggedInUser = 1; // bob balooza


function handle_submit_form() {
    // edit this function in main.js;
    return;
}

//
const Controller = {
    submit_view_handler : function() {
        console.log("submit handler")
        Views.submit_view(targetid, { participant: loggedInUser});
        const form = document.getElementById("submit_form");
        form.onsubmit = handle_submit_form;
    },

    main_handler: function() {
       const obs =  Model.get_recent_observations(10);

       Views.observation_view(targetid, obs);

       Views.submit_form_errors_view()
    },
};