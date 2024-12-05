# 10k-hours

## Overview

10K Hours is a web and mobile application designed to help users track hours spent mastering specific skills, aligning with the 10,000-hour rule. The MVP focuses on the web and includes manual time tracking, a dashboard for skill progress visualization, and user authentication.

1. Objectives:
   Enable users to track up to 100 skills with detailed session logs. Provide a dashboard with progress bars and charts for tracking progress toward 10,000 hours per skill.Support two user roles:
   - Admin: Can modify user sessions.
   - Regular User: Can manage their own account and sessions.
     Implement secure user authentication with email/password and OAuth (Google and Facebook).
2. MVP Features:
   - User Management
     Authentication: Email/password and OAuth (Google, Facebook).
   - Roles: Admin and Regular User.
     Skill Tracking
     Add, edit, and delete skills (up to 100 per user).
     Log hours manually via start/stop button.
   - Dashboard:
     Display basic progress bars and charts showing hours completed and remaining.
     Session Tracking
     Start and stop session timers manually.
     Store session logs, including start time, end time, and duration.
3. Technical Requirements
   - Frontend
     Framework: React (for web MVP), React Native (future mobile version).
     UI Components: Progress bars, charts, and forms for skill and session management.
   - Backend
     Framework: Node.js with Express.js.
     Database: PostgreSQL for relational data.
     Authentication: OAuth (Google, Facebook) and email/password using libraries like Passport.js or Auth0.
     Hosting and Deployment
     Frontend: Deployed using platforms like Vercel or Netlify.
     Backend: Hosted on AWS or Heroku.
     Database: Hosted on AWS RDS or similar cloud service.
4. System Design
   - Database Schema
   - Database Type: PostgreSQL.

---

### Tables and Attributes:

Users

- user_id (PK)
- email (Unique, Required)
- password (hashed, nullable for OAuth users)
  oauth_provider (string, nullable, e.g., "Google", "Facebook")
- role (enum: "admin", "regular")
- created_at (timestamp)
- updated_at (timestamp)

Skills:

- skill_id (PK)
- user_id (FK → Users.user_id)
  name (string, Required)
- description (optional)
- created_at (timestamp)
- updated_at (timestamp)

Sessions:

- session_id (PK)
- skill_id (FK → Skills.skill_id)
- user_id (FK → Users.user_id)
  start_time (timestamp)
- end_time (timestamp)
- duration (calculated in seconds or minutes)
- created_at (timestamp)

Relationships:

- Users → Skills: One-to-Many.
- Skills → Sessions: One-to-Many.

---

5. Future Features

   - Analytics: Advanced trends and patterns in time-tracking data.
   - Social Sharing: Allow users to share skill progress with their network.
   - Integrations: Tools like Google Calendar or other apps for session tracking.

6. Timeline

   - Database schema design and setup: 1 week
   - Backend development: 2 weeks
     Frontend MVP (Dashboard, Skill management): 3 weeks
   - Authentication setup: 1 week
   - Testing and deployment: 1 week
   - Total: 8 weeks

7. Assumptions and Risks
   - Users manually log time for sessions; auto-tracking integrations are out of scope for MVP.
   - Future scalability will require optimization in session logging and dashboard analytics.

---

TODO: separate out to proper directories:

Database Schema for 10K Hours
SQL Definitions

```sql
-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255),
Nullable for OAuth users
oauth_provider VARCHAR(50), e.g., 'Google', 'Facebook', or NULL
role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'regular')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

```sql
-- Skills Table
CREATE TABLE skills (
skill_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
name VARCHAR(255) NOT NULL,
description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

```sql
-- Sessions Table
CREATE TABLE sessions (
session_id SERIAL PRIMARY KEY,
skill_id INT REFERENCES skills(skill_id) ON DELETE CASCADE,
user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
start_time TIMESTAMP NOT NULL,
end_time TIMESTAMP,
duration INT GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))::INT) STORED,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints

#### Authentication

#### User Signup

POST: `/api/auth/signup`
Request Body:

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

Response:
`201 Created on success.`

#### User Login

POST: `/api/auth/login`
Request Body:
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

Response:
`200 OK with a JWT token.`

#### OAuth Login

POST: `/api/auth/oauth`
Request Body:

```json
{
    "provider": "Google",
    "token": "oauth_access_token"
}
```

Response:
`200 OK with a JWT token.`

#### Skills

#### Get All Skills

GET: `/api/skills`
Response:

```json
[
    {
        "skill_id": 1,
        "name": "Guitar Practice",
        "description": "Learn fingerstyle techniques",
        "hours_completed": 500,
        "hours_remaining": 9500
    }
]

```

#### Add a Skill

POST: `/api/skills`

Request Body:

```json
{
    "name": "Guitar Practice",
    "description": "Learn fingerstyle techniques"
}

```

Response:
`201 Created.`

#### Update a Skill

PUT: `/api/skills/:skill_id`

Request Body:
```json
{
    "name": "Advanced Guitar",
    "description": "Master advanced techniques"
}

```

Response:
200 OK.
Delete a Skill

DELETE: `/api/skills/:skill_id`
Response:
`204 No Content.`

#### Sessions

Get All Sessions for a Skill

GET: `/api/skills/:skill_id/sessions`

Response:

```json
[
    {
        "session_id": 1,
        "start_time": "2024-12-01T12:00:00Z",
        "end_time": "2024-12-01T13:00:00Z",
        "duration": 3600
    }
]

```

#### Start a Session:

POST: `/api/skills/:skill_id/sessions/start`

Response:
`201 Created with session details.`

#### Stop a Session:

POST: `/api/skills/:skill_id/sessions/:session_id/stop`

Response:
`200 OK with updated session details.`

#### Delete a Session:

DELETE: `/api/sessions/:session_id`

Response:
`204 No Content.`

