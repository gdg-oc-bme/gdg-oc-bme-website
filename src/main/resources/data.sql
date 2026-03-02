-- 1. CLEAR OLD DATA (Optional, but helpful for clean restarts)
-- Note: Order matters because of Foreign Key constraints
DELETE FROM event_attendance;
DELETE FROM project;
DELETE FROM events;
DELETE FROM user_details;

-- 2. INSERT USERS
-- Assuming your entity table is 'user_details' to avoid SQL keyword 'user'
INSERT INTO user_details (id, email, full_name, profile_picture_url)
VALUES (101, 'r.tables@gdg.com', 'Robert Tables', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'),
       (102, 'j.smith@gdg.com', 'Jane Smith', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'),
       (103, 'm.ross@gdg.com', 'Michael Ross', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael');

-- 3. INSERT PROJECTS (Linked to Users via user_id)
INSERT INTO project (id, title, github_link, tech_stack, user_id)
VALUES (201, 'Smart Mobility App', 'https://github.com/gdg/mobility', 'Java, Spring Boot, Postgres', 101),
       (202, 'GDG Website', 'https://github.com/gdg/web', 'React, TypeScript', 101),
       (203, 'AI Traffic Control', 'https://github.com/devjane/ai', 'Python, TensorFlow', 102);

-- 4. INSERT EVENTS
INSERT INTO events (id, title, description, date_time, location, qr_code_secret)
VALUES (301, 'GDG Spring Meetup', 'Annual gathering for Spring developers', '2026-04-15 18:00:00', 'BME Building I', 'secret_spring_2026'),
       (302, 'Docker Workshop', 'Hands-on session with containers', '2026-05-10 14:00:00', 'BME Building Q', 'docker_mastery_99');

-- 5. INSERT ATTENDANCE (Many-to-Many Join Table)
-- Assuming your join table is named 'user_event_attendance'
INSERT INTO event_attendance (user_id, event_id)
VALUES (101, 301), -- Robert goes to Spring Meetup
       (101, 302), -- Robert goes to Docker Workshop
       (102, 301), -- Jane goes to Spring Meetup
       (103, 302); -- Michael goes to Docker Workshop