import {Controller} from './controller.js';
import {Model} from './model.js';

window.Controller = Controller;

const router = new RouteRecognizer();

router.add([
    { path: "/", handler: Controller.main_handler.bind(Controller) }
]);

router.add([
    { path: "/submit", handler: Controller.submit_view_handler.bind(Controller) }
]);

router.add([
    { path: "/users/:id", handler: Controller.user_view_handler.bind(Controller) }
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


window.onload = route;
window.onhashchange = route;