# CollabConnect

## Inspiration

In an increasingly digital age, the need for collaboration across geographical boundaries has become more important than ever. Whether you're a hacker looking for teammates to join a hackathon, a researcher seeking collaborators on a groundbreaking study, or a developer looking to build something new, finding the right people can be a challenge. **CollabConnect** was created to address this need—bringing together like-minded individuals from around the globe, facilitating connections, and fostering collaborations. This platform provides a unique combination of geospatial and professional networking features, making it easier than ever to connect and collaborate.

## What it does

**CollabConnect** is a multi-faceted platform that allows users to:

1.  **Authenticate Securely**: Users can sign up and log in using Auth0, ensuring secure and streamlined authentication.
2.  **Explore a Global Network**: The landing page features an interactive 3D globe, displaying real-time locations of users who have used the application. This isn't just a visual feature but a live reflection of the community, encouraging new users to join.
3.  **Search for Collaborators**: Logged-in users can search for potential collaborators using a map interface. They can filter by location, roles (Hacker, Researcher, Developer), and availability (remote or in-person).
4.  **Connect Directly**: Users can select collaborators and send them emails directly through the platform. The email feature is integrated with a custom modal where users can craft and send collaboration requests.
5.  **Manage Profiles**: Each user has a profile page where they can provide details about their professional background, including a description, time zone, and links to relevant profiles (e.g., GitHub, Devpost).
6.  **Toggle Viewing Options**: Users can toggle between a map view and a list view to see collaborators either as map markers or in a list format.

## How we built it

CollabConnect is built on the MERN stack (MongoDB, Express, React, Node.js) with additional integration of Auth0 for secure authentication, react-map GL for advanced mapping features, and react-globe GL to render a globe with a dynamic geospatial representation of our userbase. The application is designed to facilitate collaboration by allowing users to discover and connect with others based on their location and professional expertise. This technical overview delves into the various components, architecture, and workflows that power CollabConnect.

### Frontend Architecture

The frontend of CollabConnect is built using React, with Tailwind CSS for styling. The application is designed to be a single-page application (SPA), ensuring a seamless and responsive user experience.

#### 1. **Authentication and User Management**

-   **Auth0 Integration**: Authentication in CollabConnect is handled by Auth0, which is integrated using the `@auth0/auth0-react` library. The authentication process involves redirecting users to Auth0’s hosted login page, where they can authenticate via email/password or social logins. Once authenticated, Auth0 returns a JWT token that contains the user's credentials and profile information.
    
-   **AuthContext**: A custom `AuthContext` is created to manage and distribute authentication state across the application. This context provides an easy-to-use API for accessing the authenticated user’s details, checking authentication status, and performing login/logout operations. This approach allows components like `Navbar`, `Profilepage`, and `PrivateRoute` to access authentication data and control access to protected routes.
    
-   **UserContext**: To manage user-specific data such as profile information and preferences, a `UserContext` is implemented. This context fetches user data from the backend once the user is authenticated and keeps the data in sync throughout the user session. The context also handles updates to the user’s profile, ensuring any changes are reflected immediately.
    

#### 2. **Profile Management and Dynamic Forms**

The `Profilepage` component is a dynamic form where users can input and update their personal and professional information. The form adjusts its fields based on the roles selected by the user (e.g., Hacker, Researcher, Developer), ensuring a tailored user experience.

-   **Role-Based Input Fields**: Depending on the user’s selected roles, different sets of fields are displayed. For instance, if a user selects "Hacker," fields for Devpost profile links and previous hackathons become available. This dynamic rendering is managed by state hooks that track user selections.
    
-   **Location and Timezone Selection**: The form includes a location input powered by `use-places-autocomplete`, which provides autocomplete suggestions for geographic locations. Once a location is selected, its coordinates are stored and used in the backend for user location tracking. Additionally, a timezone dropdown allows users to select their time zone from a predefined list of common time zones, which is then stored in the user’s profile.
    

#### 3. **Navbar and Search Functionality**

The `Navbar` component is a multifunctional element that not only provides navigation but also includes a search bar, filter options, and user controls.

-   **Search Bar with Autocomplete**: The search bar in the navbar is powered by the same `use-places-autocomplete` library used in the profile form. It allows users to search for specific locations and updates the map view based on the selected location. The search results are displayed in a dropdown, and upon selection, the map dynamically centers on the chosen location.
    
-   **Filter Options**: The navbar includes filters for user roles (Hacker, Developer, Researcher) and a toggle for remote or in-person collaboration. By default, the remote filter is switched off and all users within a 50 miles radius of the current user are displayed on the map to enable in-person connections. These filters are crucial for narrowing down the displayed users on the map to match the current user’s preferences. The filter state is managed with React hooks, and the map view is updated accordingly.
    

#### 4. **Interactive Map with User Markers**

The `MapPage` is one of the core components of CollabConnect, utilizing Mapbox via the `react-map-gl` library to render an interactive map.

-   **User Markers and Real-Time Data**: The map displays markers corresponding to the locations of other users, based on the filters selected in the navbar. Each marker represents a user’s location, and clicking on a marker opens a `CustomPopup` showing detailed information about that user. This includes their name, email, description, roles, and any relevant profile links (e.g., GitHub, Devpost, research profiles).
    
-   **CustomPopup**: The `CustomPopup` component is responsible for displaying user details when a marker is clicked. It shows role-specific badges, profile links, and a button for initiating collaboration. The "Team Up" button is only enabled if the current user has completed their profile, ensuring that only users with complete profiles can initiate contact.
    
-   **Real-Time User Interaction**: The map view is not static; it allows for real-time interaction where users can adjust the map, click on markers, and filter visible users. The data is fetched from the backend whenever the map view changes or filters are updated, ensuring that the displayed information is always current.
    

### Backend Architecture

The backend of CollabConnect is built using Node.js and Express, with MongoDB as the database. The backend handles user authentication, profile management, and real-time location data processing.

#### 1. **Database Schema and User Management**

-   **MongoDB and Mongoose**: The application uses MongoDB, with Mongoose as an ODM (Object Data Modeling) library. The `User` schema defines the structure of user documents in the database, including fields for personal information, roles, location coordinates, and profile completion status.
    
-   **Location Storage**: User locations are stored as GeoJSON objects, allowing MongoDB to perform geospatial queries. This is essential for features like searching for users within a certain radius or displaying nearby users on the map. The schema uses a `2dsphere` index on the location field to enable efficient geospatial queries.
    
-   **User Roles and Profiles**: The `User` schema also includes fields for roles (isHacker, isDeveloper, isResearcher), each of which triggers the display of corresponding input fields in the profile form. The schema ensures data integrity with validators that check the format and content of fields like email, URLs, and location coordinates.
    

#### 2. **User Authentication and JWT Management**

-   **JWT Authentication**: The backend validates incoming requests using JSON Web Tokens (JWTs). Upon successful login through Auth0, the frontend receives a JWT, which is included in the authorization header of requests to the backend. The backend then verifies the JWT to authenticate the user before processing any requests.
    
-   **User Creation and Management**: When a user logs in for the first time, the backend automatically creates a new user document in MongoDB if one doesn’t already exist. This is done through the `addUser` function in the `userController`, which checks for an existing user by `auth0Id` and creates a new entry if none is found. This ensures that every authenticated user has a corresponding record in the database.
    

#### 3. **Email Functionality**

-   **Nodemailer Integration**: CollabConnect includes a feature for sending emails between users. This is managed through the `mailController`, which uses Nodemailer to send emails via a third-party SMTP service. The email functionality is integrated with the "Team Up" feature, where users can initiate contact with other users by sending a predefined email template.

### Detailed Workflow

1.  **User Authentication**: Users authenticate via Auth0, and upon successful login, their details are fetched and stored using the `AuthContext` and `UserContext`. If the user logs in for the first time, a corresponding entry is created in MongoDB.
    
2.  **Profile Completion**: Users are directed to the profile completion page, where they can fill out their details. The profile form dynamically adjusts based on user roles, and location data is handled with real-time geocoding.
    
3.  **Map Interaction**: The home page displays either the Globe visualization or the Map, depending on whether the user is authenticated. The map shows markers for other users based on their location and roles, and users can interact with the map to discover potential collaborators.
    
4.  **User Filters and Search**: The navbar provides filtering options and a search bar that interacts with the map in real time. Users can search for specific locations or apply filters to narrow down the list of visible collaborators.
    
5.  **Viewing and Contacting Users**: Clicking on a map marker opens a popup with detailed information about the selected user. If the user’s profile is complete, they can initiate contact by sending an email through the integrated email functionality.

## Challenges we ran into

-   **State Management**: Keeping track of various states such as authentication, profile data, and map filters was complex, particularly when these states needed to interact with each other. React contexts helped manage these states, but ensuring seamless data flow between components required careful planning and implementation.
    
-   **Geospatial Data Handling**: Accurately fetching, displaying, and updating user location data on both the 3D globe and the map was challenging. Implementing geospatial queries in MongoDB and ensuring that data was correctly indexed and queried took significant effort.
    
-   **Profile Completion Logic**: The profile completion logic required dynamic rendering of form fields based on user input. Ensuring that the form handled different user roles and their corresponding inputs (like links to Devpost or GitHub profiles) was a non-trivial task.
    
-   **Map Integration**: Integrating the map with React-Map-GL and ensuring it worked seamlessly with the search bar and filters was a complex process. The map needed to update dynamically based on user input, and this required careful synchronization between the frontend and backend.
    
-   **Security Considerations**: Ensuring secure communication between the frontend and backend, particularly with sensitive data like user profiles and email communications, was a key concern. The planned implementation of JWT validation will further enhance the security of the application.

## What's next for CollabConnect

-   **Real-Time Collaboration**: We plan to integrate real-time chat and file-sharing capabilities directly into the platform, allowing users to collaborate on projects without leaving the application.
    
-   **Advanced Filtering**: Future updates will include more advanced filtering options, such as skill level, availability, and preferred collaboration styles. This will allow users to find collaborators who are a perfect match for their needs.
    
-   **Profile Customization**: We'll add features that allow users to customize their profiles further, such as adding portfolio items, showcasing completed projects, and earning badges for successful collaborations.
    
-   **Mobile Application**: Developing a mobile version of CollabConnect is a priority, as it will make the platform accessible to users on the go.
    
-   **Global Expansion**: We aim to enhance the 3D globe visualization to include more detailed user data, potentially incorporating additional data points like collaboration history and network strength.


