export {Views};

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

    submit_view: function (targetid) {
        this.apply_template(targetid, "observation-submit-template");
    },

    submit_form_errors_view: function (targetid, errors) {
        this.apply_template(targetid, "submit-form-errors-template", errors);
    },

    list_users_view: function (targetid, users) {
        this.apply_template(targetid, "users-list-template", { 'Users': users });
    },

    user_view: function (targetid, user) {
        this.apply_template(targetid, "user-detail-template", user);
    },

    list_observations_view: function (targetid, observations) {
        this.apply_template(targetid, "observations-list-template", { 'Observations': observations });
    },

    observation_view: function (targetid, observation) {
        this.apply_template("target", "observation-detail-template", observation);
    },

    leaderboard_view: function (targetid, user, observation) {
        this.apply_template(targetid, "leaderboard-template", user, observation);
    },
}