# semantics fro future 
   - What it does
   - Why it exists
   - Code snippet
   - Common mistakes


# Syntax Explantion
   >arrow function    ()=>            {function body}
   >normal function   function()     {function body} 
   >app.listen(PORT,callback)   -- callback is optional and is arrow function

# For starting the server with npm start 
   >change this to "test": "echo \"Error: no test specified\" && exit 1" to 
     this  `"start" : "npx nodemon src/index.js"

# Setup body parser
  -    what it does??   -> body-parser reads the body of an incoming HTTP request and     converts it into a usable JavaScript object.
  -    **app.use(bodyParser.json());**  --->  Whenever a request comes in with JSON data in its body, read it, parse it, and put it into req.body.
  
# setting up dotenv file in config/serverconfig.js
  - Why do we use it ?    => .env file is used to store sensitive and environment-specific variables which are loaded into process.env using dotenv.
  - How do we use it ??   => store the value in server folder 

# Setup routes 
   - understand the syntax of routing 
   - router.use('source', sink);
  
# setup DB_SYNC

# Setting up booking repository
  - Export Booking model
  - Import errors
  - Import Status Codes
  - Create a class name Booking repository 
  - Inside this class create a function named "create"
  
# Create a modify_booking model using migration 
  - code is - <npx sequelize migration:create --name modify_boookings_add_new_fields>
  - We may have directly done this --- BUt migration file shows incremntal changes 
  - Directly we can do through adding rows in Bopoking model -- then force db sync 
  - Migration file will contain these two function broadly -----:
       1.  asyn Up=>      used to Apply changes
       1.  async down=>    Rollback changes 
  - to run the above migration do --<npx sequelize db:migrate>



## LECTURE - 12TH --------------------------------------

- setup thr crud in flight repo to get the flight 
- set up booking service 
    - Install axios to get the data from different microservice 
    - # AXIOS
       1. Axios lets one service talk to another service over HTTP,
       2. Axios is the bridge between microservices.
       3. Syntax <axios.get(URL, CONFIG)>
       4. These things ahppen internally 
       5. 🧠 What happens internally (very important)
            - Booking Service sends HTTP request
            - Flight Service processes it
            - Flight Service sends JSON response
            - Axios:
                 - Waits for response
                 - Converts JSON automatically
                 - Resolves promise













