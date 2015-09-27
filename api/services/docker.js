/**
* api/services/docker.js
*
* @description :: Docker service to run participants code isolated
*/
var dockerode = require('dockerode');

module.exports = {
	run: function queueOrRun(matchEventRef) {
		return matchEventRef;
	}
};
