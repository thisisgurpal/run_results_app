# General Assembly Project 4 - RunnersUniverse
This was a solo project where I created a running app that allows visitors to get information on running events, view past years leaders, view runners profiles, view fitness and health blogs and once registered and logged in you can save favourite runners, save favourite blogs and also comment on running events. For this project I built the back end which included making my own API, I also designed and developed the front end. This was done using PostgreSQL, Python, TablePlus, React. You can find this application <a href="https://runnersuniverse.herokuapp.com/">here</a>.
  <table>
  <tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160816457-4e0258b7-20b2-45d4-a9e6-c4da5daedd5c.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160816540-2adf83ae-7bc6-4e7f-98ab-d293ab876477.JPG" width="500"></td>
  </tr>
</table>

# Links
<h3>Application</h3>
RunnersUniverse: https://runnersuniverse.herokuapp.com/
<h3>Contact</h3>
Gurpal Gohler (LinkedIn): https://www.linkedin.com/in/gurpal-gohler/

# Brief
* Build a Full-Stack application making my own back end and front end.
* Use a Python Django API using Django REST Framework to serve my data from a Postgres database.
* Consume our API with a seperate front-end built in react.
* Have visually impressive design.

# Code Installation
* Clone or download the repo.
* Install backend dependencies: `pipenv` in the terminal
* Enter the shell for the project: `pipenv shell`
* Make Migrations: python manage.py makemigrations`
* Migrate: `python manage.py migrate`
* Create super user: `python manage.py createsuperuser`
* Start Backup Server: `python manage.py runserver`
* Install dependencies: `yarn`
* Start front end server: `yarn start`
* Put data into a seed.js file (specify app-name e.g events): `python manage.py dumpdata app-name --output app-name/seeds.json --indent=2`
* Load seed.js data into database (specify app-name e.g events): `python manage.py loaddata app_name/seeds.json`
* Clear data from database: `python manage.py flush`
* Start back end server: `python manage.py runserver`

# Technologies and tools used
* Python
* JavaScript
* Django
* Django REST Framework
* PostgreSQL
* TablePlus
* Axios
* React
* SASS
* CSS
* Chakra
* Cloudinary
* React Router DOM
* JWT
* Insomnia
* Heroku
* Visual Studio Code

# Planning
When starting to think about this project and what I wanted to build, there was no idea jumping out to me and I felt like a good idea would be to start thinking about my hobbies and passions from there. I love sports and have recently just got into running and have found myself on the internet researching runners and looking at events and health blogs, so this became the idea for my project. 

I began brainstorming any ideas that came to mind and features that I would personally find quite useful as a user. I thought that being able to view past leaderboards, comment on events, saving your favourite runners and blogs to your profile was a great way for users to stay up to date with the running universe. 

Next I moved on into inVision which is a tool to wireframe the application. I sketched out a high level structure for the project, this helped me realise the features and pages I needed for the application.

Then I planned out the structure of the data, so that when I started to code the back end I knew exactly the fields I needed and how to go about adding them in. I used the QuickDatabaseDiagrams tool to plan this out, it’s a great way to visualise the data structure. I made sure to decide which fields will have a many to many relationship and which will have a one to many relationship. 

Once all that was done I decided on how long I wanted to spend on the back end and front end so that I could manage my time effectively. I planned around 3 days on the back end, around 3 days on the front end and then 1 day to seed the database.

<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161325623-b22e0158-c5e8-492f-8a7d-aa485a3d166c.JPG" width="1000">

# Walk through
<h3>Home page and dropdown menu</h3>
The home page welcomes you to the application and also displays the buttons for the different pages. These buttons are wrapped in a Link tag from React Router DOM to navigate to their page. I've also added some React Spring styling to these buttons so that on desktop mode there will be a cool hover effect.
<h3></h3>
In the nav bar I’ve also added buttons for the different pages as well the Login and Register sections, these are also wrapped in Link tags for navigation.
<h3></h3>
I wanted to keep the theme of this application consistent, which is why I chose to only use two main colours of black and yellow. 
<h3></h3>
  <table>
  <tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160816457-4e0258b7-20b2-45d4-a9e6-c4da5daedd5c.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160816540-2adf83ae-7bc6-4e7f-98ab-d293ab876477.JPG" width="500"></td>
  </tr>
</table>
<h3>Login and register</h3>
To create the register and login forms I used the FormControl tag from Chakra framework. The forms have a handleSubmit function when they are submitted. This function will do an Axios post request of the inputted data using a controller created on the back end. To input the data and save it in order to do the post request I had to create two states and a function to update them when inputs are changed. One of them is a state that contains information that has been input into the fields, and the other one contains the error messages if the data the user tried to submit was not in the correct format. If there are any error messages the form will not submit and the messages are shown under the input fields.
<h3></h3>
In the back end controller I made sure that a token is created for each new user. Within the handleSubmit function for the login form, it will take the token created on the back end and set it to the local storage. This lets me know what user is currently logged into the application.
<h3></h3>
In the register form input there is a profile picture uploader, this is not only used here but also on the comment form, it is also included on the forms that allow the user to edit their comments and profile picture. This is done using cloudinary, so when an image is uploaded it gets sent to cloudinary to retrieve a hosted path for the image which is then sent back to be displayed and saved into the state on the front end.
<h3></h3>
<table>
<tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161327623-429ce6f5-2fc8-4fe4-9139-c05e3e63c363.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161327642-4cdefbb8-84d1-493e-8114-71dd218dbd39.JPG" width="500"></td>
  </tr>
  </table>
<h3>Dropdown after logged in</h3>
To know that the user is currently logged in I’ve created a function called userIsAutheniticated that gets the token from local storage, decodes it to find the pay load and then checks to see if the user is still authenticated by reviewing the expiry date.
<h3></h3>
I’ve added a ternary into the nav bar using the authentication function so that when the user is logged in, the navbar changes its elements from Login and Register to Logout and a profile page link is added. This profile link will use a class created in the back end code that will retrieve the logged in user's id through an Axios request, this id will be then used in the link path.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161327720-674273fc-abc2-4b15-b919-57b65b092d32.JPG" width="500">
<h3>Profile page</h3>
On the profile page an Axios request is made to get the user's details that are currently logged in. This request is made to a path that is specified on the back end, and can be done due a class that is also created to retrieve the details. 
<h3></h3>
On this page I wanted the user to be able to view their saved blog, runners and comments they have made. I found a nice way of displaying this through the use of tabs in the Chakra framework documentation, the user can now click through these tabs and see the details. These bogs and runners are wrapped in Link tabs so you can also navigate to their individual pages. The comments tab displays your comments with the ability to delete them if needed. This delete functionality is created on the back end using a class that finds the comment using its id and then deletes it.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161328294-a0696302-beb4-44ad-bd64-fc0b39eb2040.JPG" width="500">
<h3>Events</h3>
To get the information on the events page I made a class in the back end that will get all the events when an Axios request is made to a specified path. This is how I got these events to be displayed. I’ve taken the first event to be displayed large and then the rest will run through a map array method to be displayed below. Each of these marathon events are wrapped in a Link tag that will navigate to a path which includes the event id, this will be where the details of the event can be viewed.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161327825-45ce3d9a-927a-40b4-a64b-a0225b4f455f.JPG" width="500">
<h3>Event page</h3>
On the individual event page an Axios request is made to a path which includes the event id which gets specific events details. The event id is retrieved in the current page path using useParams from React Router DOM. In the back end this Axios request path is specified and a class I made will find the event using the id and then send that event's details back to the front end.
<h3></h3>
In the event details there is a one to many relationship to the runs data. This means each run will have the event but each event will have multiple runs. The run data includes the runner id, event, position, year and run time. I wanted to create an easy to read display of the information and leaderboard whilst also being able toggle gender and year. Each runner has a Link tag to take you to the runner profile page where the runner id is inlcuded in the path. If you continue to scroll down on this page there is an events section.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161327881-70e6c351-18ba-45a9-a72b-c0c7e89bd365.JPG" width="1000">
<h3>Comment on event</h3>
Lower down on the event page there is a comment section where other users can share their thoughts and pictures (pictures through cloudinary mentioned in the ‘Login and register’ section) on the event. Each comment made conducts an Axios post request to a location that I’ve specified. In the back end I made classes so I can get, post and delete comments. The user can only post an event if they are logged in, so the leave a comments section will only be shown if that is the case through the use of the function isUserAuthenticated. If they are not logged in they can only see the comments that have been left. To get the comments for the specific event, they are all filtered using the event id. 
<h3></h3>
When a comment is made it will show at the top of the feed, as I’ve ordered them to show the most recent first. Also the avatar and the name will be wrapped in a Link tag which will navigate to that user's profile using the user id in the path which is retrieved from the comment data.
<h3></h3>
<table>
<tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161327942-86efa8b6-cc44-4129-aee7-54ddd8515bc7.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161328127-30701cee-23ad-45e8-8833-e83c2c8eee2f.JPG" width="500"></td>
</tr>
  </table>
<h3>View runner profile</h3>
If you click on a runner from the leaderboard on the events page, you'll be taken to the runners profile. Here you can see all there runs and if you click the heart button they will be saved to your profile. You can click on the running event to navigate to the event page.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161328013-f5a66299-deee-41b1-9adb-763ea34413b3.JPG" width="500">
<h3>Training and Nutrition blogs</h3>
On the Training and Nutrition page you can view all blogs. When clicked into a blog you can then read what it's all about and get valuable information about fitness and nutrition.
<h3></h3>
<table>
<tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161328183-79a9fd09-0753-4d61-a183-124f382ffa58.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161328229-4ccd471d-f161-4d42-887a-b91eb3df1277.JPG" width="500"></td>
</tr>
  </table>
<h3>Marathons for you</h3>
On the marathons for you page, you can input your best marathon run and see what events you have reached the requirements for. You are then able click on these running events and view the event page to get more info.
<h3></h3>
<table>
<tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161331281-354fe83d-7ce1-469d-a8dd-4fc0f48f860c.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161331331-65376226-39e6-42bc-a76c-7521d884c2a6.JPG" width="500"></td>
</tr>
  </table>

# Code examples
Here is an example of a model for the event, I made the distances and owner a foreign field and the requirement (marathon run time to qualify for event) a many to many field.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161441964-2955eff3-f366-41e3-9410-376001134fae.JPG" width="500">
This is the code used to get the data for a single event.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161441988-cb59f274-9bca-440a-b442-9bca0495c114.JPG" width="500">
The folder structure for the event looks like this. It includes serializers, urls, models, etc.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161441977-1f9c462e-6449-4f67-bda0-463e9c9322e9.JPG" width="250">
On the marathons for you page, I had to make a function that search for marathons that the user is qualified to run in. This is the function that calculates those marathons.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161442001-fb2a2be7-3649-4f9d-820e-82c6180ed5ed.JPG" width="1000">

# Challenges
My biggest challenge for this I would say is getting familiar with using python to build the back end. Once the project was over I felt much more confident and capable building the back end, I also found it much easier to seed the database using the django admin. Another challenge for me was implements the logic for users to save there favourite runners to their profile.

# Wins
My biggest win for this project was building a full stack application on my own about something that I enjoy and am passionate about. 
