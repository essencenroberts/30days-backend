# 30Days 

This is the backend for 30Days a fullstack social media planner tool that helps creators oist consistently. Users get to turn a posting goal into a challenge then plan every post.

This repo holds the API: the server, database models, login system and all the routes the frontend uses. The Recat frontend lives in its own repo.

It lets people:

  - Create an account and log in
  - Create **challenges**
  - Add **posts** inside each challenge 
  - Update and delete their challenes and posts

---
## Links
 | | Link |
| --- | --- |
| **Live API** | [ADD MY RENDER WEB SERVICE URL] |
| **Live app (frontend)** | [ADD MY RENDER STATIC SITE URL] |
| **Frontend repo** | https://github.com/essencenroberts/30days-frontend |
___
## Tools Used

**Node.js**
**Express**
**MongoDB**
**Mongoose**
**bcrypt**
**jswonwebtoken**
**dotenv**
**cors**
**nodemon**
**Render**

---
## Features

**Accounts**
 
- Create an account, log in, and get the logged-in user's profile
- Passwords are scrambled (hashed) before they're saved, so they're never stored as plain text
- Logins last 7 days

**Challenges**
 
- Create a challenge with a name, description, start date, length (30 to 90 days), and how many posts are planned per day (1 to 10)
- List, view, update, and delete challenges, but only the ones you own
- Deleting a challenge also deletes its posts

**Posts**
 
- Plan posts for any day of a challenge, including several posts on the same day
- Each post has a title, caption or script, platform, content type, optional time of day, and link
- Move posts through six statuses: **idea → writing → filming → editing → scheduled → posted**
- Filter posts by status or platform

**Progress tracking**
 
- Progress percentage toward the total post goal
- Current streak and best streak
- A count of how many posts are in each status
___

## How to Run This Project on Your Computer

### What You Need
- [Node.js](https://nodejs.org/) version 20 or newer
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account and database
- [Git](https://git-scm.com/)


### Step 1: Download the project

```
git clone [https://github.com/essencenroberts/30days-backend]
cd 30-days-backend
```

### Step 2: Install the packages
```
npm install express dotenv jswonwebetoken bcrypt cors 
```

### Step 3: Create your `.env` file
Create a file name `.env` in

### Step 4: Start the server
```
npm run dev
```
--- 
## Folder Structure

---

## Data Models 

**User** a person with an account


**Challenge** a posting goal

**Post** One planned oist inside a challenge

How They Connect"
- One **user** can own multiple **challenges** and each challenge has an `owner` that points to the user
- One **challenge** can have a minimum of 30 **posts** and each post has a `challenge` that points to its challenge
- Each **post** also has a `createdBy` that points to the user who made it.

---

## API Endpoints
Every address starts with the API's URL: `http://localhost:3010` or the live render URL.

### Users
| Method | Route | What It Does | Privacy |
|---|---|---|---|
| POST | `/api/users/register `| Create an account and get a token | publi |
| POST | `/api/users/login `| Log in and get a token | public |
| GET | `/api/users/me` | Get the logged in users profile | protected |

**Register Example**

Send: 
```json
     {
     "username": "essence",
     "email": "essence@test.com",
     "password": "password123"
   }
```

Get Back (status 200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWM2NTg4MzA2MWQyODAyZGQwM2NmNjAiLCJ1c2VybmFtZSI6ImVzc2VuY2UiLCJlbWFpbCI6ImVzc2VuY2VAdGVzdC5jb20iLCJpYXQiOjE3OTEzODg2NDAsImV4cCI6MTc5MTM5NTg0MH0.aVBvcxIBYDOoFEJljvPuhlNYZdw9BQIEY2_yItMRhlg",
  "user": {
    "_id": "6ac65883061d2802dd03cf60",
    "username": "essence",
    "email": "essence@test.com",
    "createdAt": "2026-10-07T14:34:43.051Z",
    "updatedAt": "2026-10-07T14:34:43.051Z"
  }
}

```
Login works the same way but you would only send `email` and `password`

### Challenges
All challenges routes require user being logged in. You can only see and change challenges you own.

| Method | Route | What It Does | Privacy |
|---|---|---|---|
| GET | `/api/challenges` | List all my challeneges with their stats | 
| POST | `/api/challenges` | Create a challenge |
| GET | `/api/challenges/:challengeId` | Get one challenge with its stats | 
| PUT | `/api/challenges/:challengeId` | Update a challenge | 
| DELETE | `/api/challenges/:challengeId` | Delete a challenge and all owned posts |

**Challenge Example**
Send: 

```json
{
   "challengeName": "30 Reels in 30 Days", 
   "description": "One reel a day documenting becoming a software developer", 
   "startDate": "2026-10-07", "lengthInDays": 30, "postPerDay": 1 
}
```
### Post

Post can only be created **inside** a challenge, so their addresses start with the challenges. All posts addresses require login and user must own the challenge to access it. 

| Method | Route | What It Does | Privacy |
|---|---|---|---|
| GET |`/api/challenges/:challengeId/posts` |  List all posts in a challenge |
| POST | `/api/challenges/:challengeId/posts` | Add a post to a challenge |
| GET | `/api/challenges/:challengeId/posts/:postId | Get one post |
| PUT | `/api/challenges/:challengeId/posts/:postId` | Update/edit post |
| DELETE | `/api/challenges/:challengeId/posts/:postId` | Delete a post + challenge |

**Post Example**

Send:
```json
{
  "dayNumber": 1, 
  "title": "Why I left my 9-to-5", "platform": "TikTok", "contentType": "Reel", 
  "caption": "Story time.", "postTime": "09:00", 
  "status": "idea"
}
```
---
## Authentication

---
## What's next
 
Features I'd like to add after the capstone:
 
- **Media uploads:** attach finished videos and images to each post with Cloudinary
- **Collaboration:** invite teammates or clients to work on a challenge together
- **Landing page:** a public homepage with a free content starter kit/email capture form
- **AI caption helper:** suggest hooks and captions for a post
- **Drag and drop:** move posts between days on the plan view
---
 
## Author
 
**Essence**
Full stack developer and digital marketer