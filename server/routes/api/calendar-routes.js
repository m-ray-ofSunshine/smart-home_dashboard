const router = require('express').Router();
const {getAllEvents} = require('../../controllers/calendar-controller');

router.route("/:startDate/:endDate").get(getAllEvents)

module.exports = router;