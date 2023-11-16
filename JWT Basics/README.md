# Project Summary and Key Points:
1. JWT Basics
2. Authentication 
3. Authorization
4. Restricted Routes (these are like private routes which are accessed by those who has the correct Signed JWT)
5. Request Validation i.e Username and Password
6. Token-Based Authentication
7. Bearer Token
8. if the user provide the correct token then we allow them access.
9. VERIFYING THE TOKEN VALIDATION
10. Auth Middleware Setup
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
3. We store/send the token in Headers i.e "Authorization : Bearer ${token}"
4. On each request we always get different token if they provide the same credentials

# Then why Use JWT instead of random String => Because it has the "Security Feature" where can be sure about the integrity of our data 

# Types of Authentication:
1. Auth 2
2. Session
3. JWT (jwt.io)

