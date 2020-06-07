export {Views};

const target_element_id = "target";
const message_element_id = "messages";

// renders the views for the Controller, to then be routed in main
const Views = {
    
    // parses each view
    apply_template: function (targetid, templateid, data) {

        console.log(data);
        console.log('targetID = ', targetid);

        const element = document.getElementById(templateid);
        console.log('element: ', element);
        
        if (!element) {
            return;
        }
        let template = Handlebars.compile(
            element.textContent
        )
        let target = document.getElementById(targetid);
        console.log('our target: ', target);
        if (!target) {
            return;
        }
        target.innerHTML = template(data);
    },

    // render the html (views) so that you see the appropiate page
    main_view: function (data) {
        this.apply_template(target_element_id, "main-page-template", data);
    },

    submit_view: function (data) {
        this.apply_template(target_element_id, "observation-submit-template", data);
    },

    submit_form_errors_view: function (errors) {
        this.apply_template(message_element_id, "submit-form-errors-template", errors);
    },

    list_users_view: function (data) {
        this.apply_template(target_element_id, "users-list-template", data);
    },

    user_view: function (user) {
        this.apply_template(target_element_id, "user-detail-template", user);
    },

    list_observations_view: function (data) {
        this.apply_template(target_element_id, "observations-list-template", data);
    },

    observation_view: function (observation) {
        this.apply_template(target_element_id, "observation-detail-template", observation);
    },

    leaderboard_view: function (data) {
        this.apply_template(target_element_id, "leaderboard-template", data);
    },

    not_found: function () {
        this.apply_template(target_element_id, "not-found-template");
    },

    clear_errors: function () {
        let target = document.getElementById("messages");
        target.innerHTML = "";
    },
}