const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const userData = require('../server/data/users');
const courseData = require('../server/data/courses');


server.get('/users', (req, res, next) => {
    res.status(200).send(userData.getUsers);
})


server.post('/login', (req, res, next) => {
    console.log("hitting the login endpoint with : " + JSON.stringify(req.body))

})


server.post('/register', (req, rest, next) => {
    console.log('hitting the register endpoint : ' + JSON.stringify(req.body))
})


server.get('/courses', (req, res, next) => {
    res.status(200).send(courseData.getCourses);
})


server.listen(3000, () => {
    console.log("Test server running on port 3000")
})

