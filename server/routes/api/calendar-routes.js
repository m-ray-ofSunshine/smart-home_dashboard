const router = require('express').Router();
const {getAllEvents, getNext5Events} = require('../../controllers/calendar-controller');

router.route("/:startDate/:endDate").get(getAllEvents)
router.route("/next5").get(getNext5Events)

module.exports = router;