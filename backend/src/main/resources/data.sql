-- Seed data for GDG on Campus BME
-- This runs every time the app starts (spring.sql.init.mode=always)
-- The DELETE statements ensure a clean state so there are no duplicates

DELETE FROM check_ins;
DELETE FROM opportunities;
DELETE FROM articles;
DELETE FROM projects;
DELETE FROM team_members;
DELETE FROM events;
-- Admin user is created by AdminInitializer.java with proper BCrypt encoding

-- Events (mix of past real events and upcoming)
INSERT INTO events (id, title, description, date_time, location, image_url, category, check_in_code)
VALUES
(1, 'Hardware Meets Software Workshop', 'Done with just studying theory? It is time to apply what you know. Real systems are not just code or hardware, they are both. Join our hands-on workshop to see how they integrate in real-world applications.', '2026-03-27T16:00:00', 'BME IB023', 'https://placehold.co/600x400/4285F4/FFFFFF?text=HW+SW+Workshop', 'Workshop', 'hw-sw-2026'),
(2, 'Technology & Society: A Debate', 'Ready to challenge your thinking? Step into a fun, fast-paced Tech Debate. Exchange ideas on controversial topics where technology, logic, and competition intersect. Compete in a tournament-style format and win cool prizes.', '2026-04-13T15:00:00', 'BME IB023', 'https://placehold.co/600x400/EA4335/FFFFFF?text=Tech+Debate', 'Meetup', 'tech-debate-2026'),
(3, 'Cloud Technologies 101', 'No preliminary experience with Cloud is required. Dive into the world of cloud computing and learn the fundamentals that power modern applications. Suitable for all students.', '2026-05-14T16:30:00', 'BME QBF09', 'https://placehold.co/600x400/34A853/FFFFFF?text=Cloud+101', 'Study Jam', 'cloud101-2026'),
(4, 'GDG DevFest Budapest 2026', 'The biggest Google developer conference in Budapest. Talks on AI, Web, Cloud, and Mobile from industry experts and Google Developer Experts. Save the date.', '2026-10-18T09:00:00', 'BME Building K', 'https://placehold.co/600x400/FBBC05/202124?text=DevFest+2026', 'Conference', 'devfest-2026'),
(5, 'How to Leverage Your BME Experience', 'Panel discussion with recent graduates and active students on making the best of your time at BME. Get answers to questions like how to get an internship, should you go for masters, and what research opportunities exist.', '2026-09-22T17:30:00', 'BME Building Q, QBF13', 'https://placehold.co/600x400/4285F4/FFFFFF?text=BME+Panel', 'Meetup', 'bme-panel-2026'),
(6, 'Spring Boot Workshop', 'Learn how to build production-grade REST APIs with Spring Boot 3 and Java 21. Hands-on coding session with live demos and Q&A.', '2026-05-20T18:00:00', 'BME Building I, I128', 'https://placehold.co/600x400/34A853/FFFFFF?text=Spring+Boot', 'Workshop', 'springboot-2026');

-- Team Members (real core team from Spring 2026)
INSERT INTO team_members (id, name, role, image_url, linkedin_url, github_url, "order")
VALUES
(1, 'Arbenite', 'Lead', 'https://placehold.co/300x300/4285F4/FFFFFF?text=AR', '', '', 1),
(2, 'Aykhan', 'Tech Team Head', 'https://placehold.co/300x300/EA4335/FFFFFF?text=AY', '', '', 2),
(3, 'Gvantsa', 'Solutions Team Head', 'https://placehold.co/300x300/34A853/FFFFFF?text=GV', '', '', 3),
(4, 'Rodina', 'Event Team Head', 'https://placehold.co/300x300/FBBC05/202124?text=RO', '', '', 4),
(5, 'Argesa', 'Social Media Team Head', 'https://placehold.co/300x300/4285F4/FFFFFF?text=AG', '', '', 5),
(6, 'Hussein', 'Tech Team', 'https://placehold.co/300x300/EA4335/FFFFFF?text=HU', '', '', 6),
(7, 'Yassine', 'Tech Team', 'https://placehold.co/300x300/34A853/FFFFFF?text=YA', '', '', 7),
(8, 'Grego', 'Tech Team', 'https://placehold.co/300x300/FBBC05/202124?text=GR', '', '', 8),
(9, 'Abdalfatah', 'Solutions Team', 'https://placehold.co/300x300/4285F4/FFFFFF?text=AB', '', '', 9),
(10, 'Khayala', 'Solutions Team', 'https://placehold.co/300x300/EA4335/FFFFFF?text=KH', '', '', 10),
(11, 'Artem', 'Solutions Team', 'https://placehold.co/300x300/34A853/FFFFFF?text=AT', '', '', 11),
(12, 'Emre', 'Solutions Team', 'https://placehold.co/300x300/FBBC05/202124?text=EM', '', '', 12),
(13, 'Uulkan', 'Solutions Team', 'https://placehold.co/300x300/4285F4/FFFFFF?text=UL', '', '', 13),
(14, 'Faris', 'Event Team', 'https://placehold.co/300x300/EA4335/FFFFFF?text=FA', '', '', 14),
(15, 'Khansa', 'Event Team', 'https://placehold.co/300x300/34A853/FFFFFF?text=KN', '', '', 15),
(16, 'Abood', 'Event Team', 'https://placehold.co/300x300/FBBC05/202124?text=AB', '', '', 16),
(17, 'Elen', 'Social Media Team', 'https://placehold.co/300x300/4285F4/FFFFFF?text=EL', '', '', 17),
(18, 'Precious', 'Social Media Team', 'https://placehold.co/300x300/EA4335/FFFFFF?text=PR', '', '', 18),
(19, 'Samira', 'Social Media Team', 'https://placehold.co/300x300/34A853/FFFFFF?text=SM', '', '', 19),
(20, 'Marwan', 'Social Media Team', 'https://placehold.co/300x300/FBBC05/202124?text=MW', '', '', 20),
(21, 'Seobin', 'Social Media Team', 'https://placehold.co/300x300/4285F4/FFFFFF?text=SB', '', '', 21),
(22, 'Mariami', 'Social Media Team', 'https://placehold.co/300x300/EA4335/FFFFFF?text=MR', '', '', 22);

-- Projects
INSERT INTO projects (id, title, description, github_link, tech_stack, image_url)
VALUES
(1, 'GDGoC BME Website', 'The very platform you are looking at. A full-stack enterprise platform built with Next.js and Spring Boot. Come contribute!', 'https://github.com/gdg-oc-bme/gdg-oc-bme-website', 'Next.js, Spring Boot, SQLite, Tailwind', 'https://placehold.co/600x400/4285F4/FFFFFF?text=GDG+Website'),
(2, 'VIK Chatbot', 'An AI-powered chatbot for BME VIK students. Ask about courses, exams, professors, and campus life.', 'https://github.com/gdg-oc-bme/vik-chatbot', 'Python, Rasa, FastAPI, Docker', 'https://placehold.co/600x400/34A853/FFFFFF?text=VIK+Chatbot'),
(3, 'QR Check-in System', 'Event attendance tracking using QR codes. Members scan a unique QR to check in. Integrates with the main platform for the leaderboard.', 'https://github.com/gdg-oc-bme/qr-checkin', 'Java, Spring Boot, ZXing, React', 'https://placehold.co/600x400/EA4335/FFFFFF?text=QR+Checkin'),
(4, 'Certificate Generator', 'Automatically generates PDF certificates for workshop attendees. Verified via the Certificate Verifier tool on the main site.', 'https://github.com/gdg-oc-bme/cert-gen', 'Python, ReportLab, Flask', 'https://placehold.co/600x400/FBBC05/202124?text=Cert+Gen');

-- Articles
INSERT INTO articles (id, title, content, image_url, author, created_at)
VALUES
(1, 'Welcome to GDG on Campus BME',
'We are excited to launch the official platform for Google Developer Groups on Campus at the Budapest University of Technology and Economics. Whether you are a beginner or an experienced developer, there is something here for you. Join us for workshops, hackathons, study jams, and meetups throughout the year.',
'https://placehold.co/800x400/4285F4/FFFFFF?text=Welcome', 'Arbenite', '2026-01-15T10:00:00'),
(2, 'Hardware Meets Software: Our First Workshop',
'Our first workshop of the semester is here. Real systems are not just code or hardware, they are both. Join us for a hands-on session where you will see how hardware and software integrate in real-world applications. Free, limited spots available.',
'https://placehold.co/800x400/34A853/FFFFFF?text=HW+SW', 'Gvantsa', '2026-03-24T14:00:00'),
(3, 'How to Leverage Your BME Experience',
'Boost your BME adventure. Join the conversation with experienced university seniors and BME graduates in Engineering and Economics. Pick up great advice and practical tips to enhance your BME education. It is all smiles and support.',
'https://placehold.co/800x400/FBBC05/202124?text=BME+Tips', 'Rodina', '2026-04-05T09:00:00');

-- Opportunities
INSERT INTO opportunities (id, title, company, description, link, deadline, location)
VALUES
(1, 'Backend Developer Intern', 'EPAM Systems', 'Join the Budapest office for a 3-month summer internship. Work on real client projects with Java and Spring Boot. Mentorship provided.', 'https://epam.com/careers', '2026-06-01', 'Budapest, Hungary'),
(2, 'Frontend Engineer Intern', 'Graphisoft', 'Build the next generation of Archicad web tools using React and TypeScript. Hybrid work model with flexible hours.', 'https://graphisoft.com/careers', '2026-06-15', 'Budapest, Hungary'),
(3, 'Cloud Engineering Intern', 'Google', 'Google Cloud is looking for students passionate about cloud infrastructure. Help enterprise customers migrate and modernize their applications.', 'https://careers.google.com', '2026-05-30', 'Budapest, Hungary'),
(4, 'Full Stack Developer', 'Balabit (One Identity)', 'Work on cybersecurity products used by Fortune 500 companies. Python backend and React frontend. Great for students interested in security.', 'https://oneidentity.com/careers', '2026-07-01', 'Budapest, Hungary');
