// COMP2110 Web Technology - Web Applicaion Development
// James Flood
// Student Number: 43823912

import {Controller} from './controller.js';
import {Model} from './model.js';

window.Controller = Controller;

const router = new RouteRecognizer();

// add a handler to each of the routes and bind the Controller 
router.add([
    { path: "/", handler: Controller.main_handler.bind(Controller) }
]);

router.add([
    { path: "/submit", handler: Controller.submit_view_handler.bind(Controller) }
]);

router.add([
    { path: "/users/:id", handler: Controller.user_view_handler.bind(Controller) }
]);

router.add([
    { path: "/observations/:id", handler: Controller.observation_view_handler.bind(Controller) }
]);

router.add([
    { path: "/observations", handler: Controller.observations_view_handler.bind(Controller) }
]);

router.add([
    { path: "/users", handler: Controller.users_view_handler.bind(Controller) }
]);

// retrieves the URL
function get_path() {
    if (location.hash === "") {
        return location.pathname;
    }
    return location.hash.slice(2);  
}

// handle the routes
async function route () {
    const result  = router.recognize(get_path());

    if(!result) {
        console.log("handler not defined for route : " + this.location.hash);
        return;
    }
    const {handler, params} = result[ 0];
    if(!handler) {
        console.log("handler not defined for route : " + this.location.hash);
        return;
    }
    
    handler(params);
}

const page_load = () => {
    Controller.on_page_load().then(route)
};

window.addEventListener("load", page_load);
window.addEventListener("hashchange", page_load);