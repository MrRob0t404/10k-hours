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
