# CyberRange_Assignment-2
This is an API application that allows users to check current temperature based on zip code. 

To use the API the user must go through the following steps:
1. In the console, type npm install to install dependencies and npm start to start the server. 
2. Open a web browser and go to localhost:8080/locations/"zip code" without quotes.
3. The zip code field must be replaced by the zip code one wishes to check.
4. If the user wishes to get the temperature in celsius/fahrenheit, it must be provided as a query:
    /locations/"zip code"?scale=Celsius/Fahrenheit
5. Temperature and scale are returned in json format. 
