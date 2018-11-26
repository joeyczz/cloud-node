const express = require('express');
const router = express.Router();

const service = require('../../services/auth/authService');

/* POST auth listing. */
router.post('/login', (req, res) => {
	const response = service.login('18516105800', '1234');
  res.send(response);
});

router.post('/logout', (req, res) => {
	const response = service.logout('18516105800', '1234');
  res.send(response);
});

module.exports = router;
