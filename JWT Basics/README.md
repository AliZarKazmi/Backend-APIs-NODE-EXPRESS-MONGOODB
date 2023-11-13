# Project Summary and Key Points:
1. JWT Basics
2. Authentication 
3. Authorization
4. Restricted Routes (these are like private routes which are accessed by those who has the correct Signed JWT)
5. Request Validation i.e Username and Password 

# Note: 
There are 3 ways for server side validation   (these all also ensure the "Data Intrigity ") 
1. Mongooose validation
2. Joi package 
3. checks in controller

# JWT (JSON Web Tokken):
JWT is just way to exchange data between two parties. This information can be verified and trusted because it is digitally signed.

# Working of JWT:
1. Client send creidentials -> Server accept and Response back with JWT
2. Next time client sent req with JWT -> Server first verify that token (JWt) then allow access or return response otherwise send error.

# Then why Use JWT instead of random String => Because it has the "Security Feature" where can be sure about the integrity of our data 

# Types of Authentication:
1. Auth 2
2. Session
3. JWT (jwt.io)

