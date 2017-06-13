CONTENTS OF THIS FILE
---------------------

 * Important Info
 * Folders/Paths
 * Important Objects - Noteworthy Mentions


###Important Info
--------------------
### Step 1: Add Ionic Material stylesheets and scripts
Set MasterPage.html as Startup Page and run application to see the demo. Then refer each view inside 'View' folder to use each control.



### Step 2: Add Ionic Material stylesheets and scripts
Add 'ionic.material.min.css' and 'ionic.material.min.js' to your 'MasterPage.html'

'''html 
    <link href="styles/ionic.min.css" rel="stylesheet" />
    <link href="styles/ionic.material.min.css" rel="stylesheet" />

	<script src="scripts/jquery.min.js"></script>
    <script src="scripts/ionic.bundle.min.js"></script>
    <script src="scripts/angular-cookies.min.js"></script>
    <script src="scripts/ionic.material.min.js"></script>
'''

### Step 3: Decalre your app name inside MasterPage.html to instantiate the angular js dependencies
'''html 
<body ng-app="YOUR_APP_NAME">
'''


### Step 4: Inject Ionic & Ionic Material into your Ionic App Module i.e. 'module.js' 

'''javascript
    var app = angular.module('YOUR_APP_NAME', ['ionic', 'ionic-material']);
'''

### Step 5: Where appropriate, inject *ionicMaterialInk* and/or *ionicMaterialMotion*

The angular services 'ionicMaterialInk' and 'ionicMaterialMotion' are used to activate animations.

**You are all set to go!** :thumbsup:

### Activating Animations

**NB:** Make sure the relevant services are injected into your controllers.

In your controllers: 
- 'ionicMaterialInk.displayEffect()' (will need to happen once on controller activation and then repeat every time the objects update)
- 'ionicMaterialMotion.ripple()' (etc.)



###Folders/Paths
--------------

S.No.	PATH NAME				PURPOSE
----------------------------------------------------------------------------------------------------------------
1.		fonts					Contains the font resources used in the Project.
2.		images					Contains all the images used in the Project.
3.		scripts					Contains the default JavaScript Files used by various APIs - Bootstrap, DataTable etc.[NuGet Compatible]
4.		styles					Contains all core stylesheets like ionic.css and ionic.material.css and the DEVELOPER-DEFINED Stylesheets.
5.		views					Contains the views(screens) that are being used or developed in the application
 


 ###View Folder Structure
 
S.No.	OBJECT NAME						PATH							PURPOSE
----------------------------------------------------------------------------------------------------------------
1.		VIEW_NAME.html					views/VIEW_NAME/				html file contains the UI of the view
2.		VIEW_NAME.js					views/VIEW_NAME/				angular js controller for the view containing the business logic of the view
3.		VIEW_NAME_service.js			views/VIEW_NAME/				angular js service for the view containing the methods to be called for DB communication

###Important Objects - Noteworthy Mentions
------------------------------------------

S.No.	OBJECT NAME							PATH				REMARKS
----------------------------------------------------------------------------------------------------------------
1.		module.js							scripts/app/		angular js module that defines and instantiates your app.
																You can think of a module as a container for the different parts of your app – controllers, services,						 filters, directives, etc.
2.		config.js							scripts/app/		angular js config that defines the routing scheme of your app and various app level configuration.
3.		constants.js						scripts/app/		js file used to define app level constants.

