const mandatory = require('../utils/validationHelper');

class Base {
    constructor({ apiClient = mandatory('apiClient') }) {
        
        this.apiClient = apiClient;
    }
}

module.exports = Base;