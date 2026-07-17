
// this repo is to understsand how to use crudReposiroy

const  CrudRepository =require("./crud-repository");
const { Airport }=require('../models/index');

class demoRepository extends CrudRepository{
    constructor(){
        super(Airport);
    }
}

module.exports=demoRepository;