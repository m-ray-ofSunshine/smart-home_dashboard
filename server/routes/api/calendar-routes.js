const router = require('express').Router();
const {getAllEvents} = require('../../controllers/calendar-controller');

router.route("/").get(getAllEvents)

module.exports = router;