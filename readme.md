# PostAddSchools - http://localhost:3000/api/v1/postaddSchool

     requests {
          "name": "New School",
          "address": "123 New Street",
          "latitude": 40.730610,
          "longitude": -73.935242
     }

     expected {
          "message": "School added successfully"
     }

# PostAddSchools - http://localhost:3000/api/v1/listSchools

     requests {}

     expected {
        [
          {
               "id": 1,
               "name": "wdasds School",
               "address": "123 dasdsa sadas",
               "latitude": 45.72719955444336,
               "longitude": -12.220000267028809,
               "distance": null
         }]
     }
