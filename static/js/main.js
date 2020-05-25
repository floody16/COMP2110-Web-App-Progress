import {Controller} from './controller.js';
import {Model} from './model.js';

const router = new RouteRecognizer();

router.add([
    { path: "/", handler: Controller.main_handler }
]);

router.add([
    { path: "/submit", handler: Controller.submit_view_handler }
]);

window.addEventListener('hashchange', function(){
    console.log('The hash has changed');
});

function get_path() {
    if (location.hash === "") {
        return location.pathname;
    }

    return location.hash.slice(2);  
}

function testUpdateObservations() {
    function handler(e) {
        let model = e.detail;

        let observations = model.get_observations();
        console.log(`observations: ${observations}`);
        window.removeEventListener("modelUpdated", handler);
        done();
    }
    window.addEventListener('modelUpdated', handler);

    Model.update_observations();
}

// handle the routes
function route () {
    const result  = router.recognize(get_path());

    if(!result) {
        console.log("handler not defined for route : " + this.location.hash);
        return;
    }

    const {handler, params} = result[0];

    if(!handler) {
        console.log("handler not defined for route : " + this.location.hash);
        return;
    }
    handler(params);

}

export function handle_submit_form() {
    let form = document.getElementById("submit_form");
    Model.add_observation(form)
    .then(result => {
        console.log('result:', result);

        if (result.status === "success") {
            location.hash = "#!/observations"
        }

        Views.submit_form_errors_view(targetid, result.errors);
    });
    return;
}

window.onload = route;
window.onhashchange = route;