# Matcha

please refer to .env

if connecting to remote db uncomment ssl in dbConnection.js

## API ENDPOINTS

>### USERS
> get:	_`/users/:login/all`_
>> ` gets all relevant information regarding the user `
>
> get:	_`/users/:login`_
>> ` gets the user's personal information `
>
> get:	_`/users`_
>> ` return all the user information held in the database `
>  
> post: _`/users/`_
>> ` creates a new user `
>
> put: _`/users/:login`_
>> ` update a user's information `
> 

>### LOGIN
> post: _`/login/`_
>> ` logs a user in `
>
<!-- > get:	_`/login/:login/all`_
>> `gets all userId's who are currently logged in`
>
> get:	_`/login/:login/`_
>> ` returns whether the user is logged in or not `
> -->

>### PROFILES
> get:	_`/profiles/`_
>> `gets all profiles in the db`
>
> get:	_`/profiles/:login`_
>> ` get a specific user's profile `
>
> put: _`/profiles/:login`_
>> ` update a specific user's profile `
>
> post: _`/profiles/:login`_
>> ` insert a specific user's profile details `
>

>### AUTHENTICAION
> get:	_`/auth/`_
>> `gets all authentication details in the db `
>
> get:	_`/auth/:login`_
>> ` get a specific user's authentication details `
>
> put: _`/auth/:login`_
>> ` update a specific user's authenticaion details `
>
> post: _`/auth/:login`_
>> ` create authentication details for a specific user `
>

>### VERIFICATION
>post : _`/verify`_
>> `verifies a users email address`
>

>### IMAGES
> get: _`/images/:login`_
>> `get all images of a specific user`
>
> post: _`/images/:login`_
>> `uploads an image to the db`
>

>### VIEWS
>post: _`/views/login`_
>> `adds a record to the user of who they viewed`
> 