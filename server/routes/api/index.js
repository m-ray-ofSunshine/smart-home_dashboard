const router = require('express').Router();
const calendarRoutes = require('./calendar-routes')

router.use('/calendar', calendarRoutes);

module.exports = router;