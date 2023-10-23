# Blog-API Front End

## About The Project

This is the code base for the front end component of a full stack blogging website. Features include:

* Signing up as a user
* Logging in
* Logging out
* Viewing user profile
* Creating, updating, and deleting posts
* Creating, updating, and deleting comments
* Viewing all posts 

This application uses the build tool Vite and the the Javascript library React due to their ease of use, speed, and wide applicability. 
It sends fetch requests to a backend API I built that can be found <a href="https://github.com/mulcharv/blogapi">here</a>
For a live demonstration of the above features, please click the link in the reponsitory's about section. 

## Key Learning 

This project had a lot of moving parts, but building it component by component allowed me to overcome challenges and learn how to do the following:

* Structure fetch requests to communicate all necessary information to the backend API for the correct response. Areas of focus were learning how
  to write authorization headers that correctly include the JWT as a bearer token, how to write and properly package the body data, and how to include the above
  in the fetch data.
* Process fetch responses (data and errors) including setting state with the JSON data received and error handling.
* Getting and setting JWT in local storage in the App.jsx file, and using state in that file to pass these details to the necessary route paths/components.
* Using the schema of the data models on the back end to correctly map and populate it on the front end where needed.
* Organizing route paths in a logical manner to achieve seperation of concerns (which became most important in the creation/updating of posts/comments).

## Future Opportunities

There are a couple of things that I would like to revisit in the future to add to the project.

* Incorporate a text editor with advanced features (ie. TinyMCE) that allows for better formatting when creating/updating posts.
* Create a dark mode reading feature and ability to sort posts (in different chronologicial orders) as part of user settings.

## Acknowledgements 

Resources that were helpful in creating this application.

* <a href="https://www.npmjs.com/package/multer" target="blank">Multer</a>
* <a href="https://www.npmjs.com/package/react-icons" target="blank">React Icons</a>
* <a href="https://www.npmjs.com/package/uniqid" target="blank">Uniqid</a>
* <a href="https://www.npmjs.com/package/jwt-decode" target="blank">JWT Decode</a>

## About Me 

Visit my <a href="https://github.com/mulcharv" target="blank">about me</a> page to learn what I'm up to and contact me. 






