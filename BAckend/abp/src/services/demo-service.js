const CrudService = require('./crud-service');

const DemoRepository = require('../repository/demo-repository');

class DemoService extends CrudService {
    constructor() {
        const demoRepository = new DemoRepository();
        super(demoRepository);
    }
}

module.exports = DemoService;