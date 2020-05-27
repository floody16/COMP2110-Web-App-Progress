export {Views};

const target = "target";

// renders the views for the Controller, to then be routed in main
const Views = {
    //
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
        let target = document.getElementById("target");
        console.log('our target: ', target);
        if (!target) {
            return;
        }
        target.innerHTML = template(data);
    },

    // render the html (views) so that you see the appropiate page

    main_view: function (data) {
        this.apply_template(target, "main-page-template", data);
    },

    submit_view: function (data) {
        this.apply_template(target, "observation-submit-template", data);
    },

    submit_form_errors_view: function (errors) {
        this.apply_template("messages", "submit-form-errors-template", errors);
    },

    list_users_view: function (data) {
        this.apply_template(target, "users-list-template", data);
    },

    user_view: function (user) {
        this.apply_template(target, "user-detail-template", user);
    },

    list_observations_view: function (data) {
        this.apply_template(target, "observations-list-template", data);
    },

    observation_view: function (observation) {
        this.apply_template(target, "observation-detail-template", observation);
    },

    leaderboard_view: function (data) {
        this.apply_template(target, "leaderboard-template", data);
    },
}