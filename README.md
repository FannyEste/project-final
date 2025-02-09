# Final Project
(I decided to change the name that was on my pitch for Hormonal heaven)
Hormonal Heaven – A Menstrual Cycle Tracking & Community Platform

Project Overview

Hormonal Heaven is a full-stack web application designed to help users track their menstrual cycle, understand hormonal phases, and engage in a supportive community. Users can log their cycle details, get personalized insights, and participate in discussions related to menstrual health.
-Frontend: React, Zustand (state management), React Router, TailwindCSS
-Backend: Node.js, Express, MongoDB, JWT authentication
-Features: User authentication, cycle tracking with a calendar, community discussions, Spotify integration

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

The goal was to create a user-friendly platform that helps users understand their cycle phases while providing a safe space for discussions, adding extra features to make it personalized as much as possible.

 Some of the problems and the solutions that I faced: 

1- Implementing the Cycle Tracking Logic on the Calendar
* Problem: Mapping user input (cycle length, period days, start date) to a color-coded calendar
* Solution: Used a date-based algorithm to dynamically calculate and store cycle phases (menstrual, follicular, ovulatory, luteal)

2-Managing Community Features (Comments, Likes, Deleting Discussions)
* Problem: Handling CRUD operations for discussions (creating, replying, liking, deleting)
* Solution: Used MongoDB relationships to track user interactions and JWT authentication to ensure only authorized users can delete their own content

3- Integrating Spotify Playlists for Each Cycle Phase
* Problem: Embedding Spotify playlists dynamically for different cycle phases
* Solution: Used Spotify’s embed API and ensured responsive design

Tech Stack and main technologies that I implemented: 

-Frontend: React, Zustand (for global state), React Router, TailwindCSS, FullCalendar
-Backend: Node.js, Express, MongoDB, JWT authentication, bcrypt
-Database: MongoDB Atlas
-Hosting: Netlify (Frontend), Render (Backend)

Future Improvements, since I want to continue working on this app to be able to use it in real life this are one of the changes that I would like to implement next:

 Enhance the Calendar Feature
 -Display all phases at once in the calendar using different colors
 -Allow users to see future predictions for their cycle

 Improve UI/UX
 -Replace placeholder images with final, high-quality illustrations
 -Inhance the design for better accessibility & responsiveness

 Expand Community Features
 -Add reporting & moderation tools for discussions
 -Implement notifications when users receive replies

## View it live


Backend
https://project-final-estefanny.onrender.com

Frontend
https://hormonalheaven.netlify.app/