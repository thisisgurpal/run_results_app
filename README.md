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
* Consume our API with a seperate front-end built in React.
* Have a visually impressive design.

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
In the event details there is a one to many relationship to the runs data. This means each run will have the event but each event will have multiple runs. The run data includes the runner id, event, position, year and run time. I wanted to create an easy to read display of the information and leaderboard whilst also being able toggle gender and year. Each runner has a Link tag to take you to the runner profile page where the runner id is included in the path. If you continue to scroll down on this page there is an events section.
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
When you click on the runner from the event page leader board you will be navigated to the individual runners profile page where you can view their past runs and also click the heart to save them in your personal profile section. In the back end I created runners data which includes the runners name, profile picture and gender. These runners are then linked to the runs data that include the position, event, time and year. As the runner id is in the path for this page I used useParams to get the runner id, and then used this in an Axios get request to retrieve the runner details.
<h3></h3>
To save the user I added a heart feature that toggles a state from false to true which also produces an animation. What I did was further add an onClick feature that triggers a function to run through an if statement. If the isClick state is false on click then I set the state to true, and perform a Axios post request to add the runner to the users favourite runners section. However if the isClick state is true on click, the state is then set to false and an Axios delete request is performed removing the runner from the users favourite runners data.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161328013-f5a66299-deee-41b1-9adb-763ea34413b3.JPG" width="500">
<h3>Training and Nutrition blogs</h3>
The training and health sections of the application are set up very similar to the events part. The difference is that on the individual blog page only the description and image are displayed to provide knowledge for the user.
<h3></h3>
<table>
<tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161328183-79a9fd09-0753-4d61-a183-124f382ffa58.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161328229-4ccd471d-f161-4d42-887a-b91eb3df1277.JPG" width="500"></td>
</tr>
  </table>
<h3>Marathons for you</h3>
To make the experience of this app more useful to the user, I made them able to see what events they could possibly run in depending on their best marathon time. In the Chakra framework I found a way to add a form box for users to fill out. 
<h3></h3>
Each event has a field called requirement, this is the time that is required for individuals to be qualified to run. The time changes for different age groups so the requirements field has many values.
<h3></h3>
When the user adds their details there is a react state that will be updated to save these details. Then when the user submits the form and function is triggered that filters through all of the requirements for each event and saves the ones that they are qualified for into another state. These filtered events are then displayed for the user to click into and find out more information.
<h3></h3>
<table>
<tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161331281-354fe83d-7ce1-469d-a8dd-4fc0f48f860c.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161331331-65376226-39e6-42bc-a76c-7521d884c2a6.JPG" width="500"></td>
</tr>
  </table>

# Code examples
Here is an example of a model which is for runs. The runner will be added to each run and also the event will be added to each run. On the events data many of these runs are populated to enable me to present the leaderboard on the individual event pages. 
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/163192527-fff24eeb-b56a-45ab-8fb3-88d8c54595dc.JPG" width="700">
To make an Axios get request on the front end I had to specify what the get request does on the back end. In this class the code will use the event id and find it in all the events, then it will run a response to send the data back to that specific event. If the event is not found the code will raise detail to show it’s not found
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161441988-cb59f274-9bca-440a-b442-9bca0495c114.JPG" width="500">
In the project folder on the back end this is how I created the urls that will be used as paths in the Axios requests. 
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/163194543-f4409b58-ce73-4234-8974-d4ee5f07866f.JPG" width="500">
The folder structure for the event looks like this. It includes serializers, urls, models, etc.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161441977-1f9c462e-6449-4f67-bda0-463e9c9322e9.JPG" width="250">
On the marathons for you page, I had to make a function that searches for marathons that the user is qualified to run in. This is the function that calculates those marathons.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161442001-fb2a2be7-3649-4f9d-820e-82c6180ed5ed.JPG" width="1000">

# Key learnings and takeaways
My biggest learning for this project was learning how to build the back end of a Full-Stack application using Python, Django and PostgreSQL. Before this project I had some exposure to Python in terms of analysing data and that was not what was required on this project, there was much more in depth knowledge needed. 
<h3></h3>
In terms of seeding the database, it was especially easier to use the Django admin site to do this. I was able to add my data much more efficiently and effectively. It is something that has made me really enjoy using Django to build an application.
<h3></h3>
I found it a great experience learning about how to add different data sets and understanding more on how the views.py, models.py, urls.py and serializers interact with each other. This was initially a challenge for me, It was particularly difficult to work out how to make the many to many and one to many relationships. However when I managed to do it the first few times it increased my learning and helped me become more confident.
<h3></h3>
A win in the project that I felt was setting up the PostgreSQL database and using it to be able to visualise the data better. I have some past experience using SQL to analyse data so I felt comfortable in this area.

Another win for me was getting more familiar with the terminal to makemigrations, migrate and save seeds whenever I make any changes to the models. It became a process that I kept structured so I could ensure I didn’t lose any of my seeds. 


