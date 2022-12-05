# composite-design-pattern

For this group project, we created a planner to ease up the creation of more professional schemes of work.
SprintQuest provides an easy-to-use user interface through which all important project-related data is collected and used for creating a comprehensible plan.

The backend of this project was implemented following the composite design pattern.

At this level, its usage is limited to the visualization and prototyping of the project itself, but the eventual goal is to export the data to more professional formats (Gantt charts, Burndown charts) used frequently by project managers and push the potential of the website to its maximum.

The UI comprises three main components, a left compartment for main commands, a middle one for manipulating and visualizing the Tasks hierarchy (creation/deletion...) and a right compartment for editing individual Tasks.

On the left, we see four buttons:
	The first -row- creates a new row (a new Epic); 
	The second one -floppy disk- saves the project on local storage;
	The third one -eraser- is used to delete tasks or rows;
	Finally for the fourth one -bomb- deletes the whole project.

Equipped with a responsive layout, the project's title lives in a magenta box next to the four main classes of Tasks: Epics (Milestones) each having a row of its own, User Stories (Main Tasks) in red, Sub tasks in yellow and Optional Tasks in blue; each of which can be created in a certain row by clicking on its corresponding box.

To update a task information, simply double-click on the desired task and input the relevant information, then click 'save' to update the task's information. The information will automatically be updated in the corresponding object.

In fact, a pannel shows up on the right after creating/selecting a certain task, and one can edit all the different aspects of it, some of the listed variables are its duration, name, costs, description etc...
The technologies used for the _current implementation_ of the project are: 	
    Frontend: 	JavaScript, HTML, CSS
	Backend:	JavaScript

In order to excecute / open the project on your machine, visit the URL: https://sprintquest.vercel.app/
Note: The following URL can also be found on this github repository, under the 'About' section.