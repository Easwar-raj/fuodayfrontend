import { TeamMember } from '../models/team-member.model';

// Your provided TEAM_DATA array goes here
export const TEAM_DATA: TeamMember[] = [
  // --- Management ---
  { id: 1, name: 'Stella Payne Diaz', designation: 'CEO', profile: 'stella.png', department: 'Management' },
  { id: 2, name: 'Luke Warm', designation: 'VP Marketing & Sales', profile: 'luke.png', department: 'Management', parentId: 1 },
  { id: 3, name: 'Peggy Flaming', designation: 'VP Engineering', profile: 'peggy.png', department: 'Management', parentId: 1 },
  { id: 6, name: 'Arthur Doyle', designation: 'VP Operations', profile: 'arthur.png', department: 'Management', parentId: 1 },
  { id: 7, name: 'Eleanor Rigby', designation: 'VP Human Resources', profile: 'eleanor.png', department: 'Management', parentId: 1 },
  { id: 8, name: 'Marcus Aurelius', designation: 'VP Finance', profile: 'marcus.png', department: 'Management', parentId: 1 },
  { id: 9, name: 'Saravanan', designation: 'IT', profile: 'ada_b.png', department: 'Management', parentId: 1 },

  // --- Sales Team (reports to Luke Warm, id: 2) ---
  { id: 4, name: 'Easwar Raj', designation: 'Project Manager', profile: 'meg.png', department: 'IT', parentId: 9 },
  { id: 5, name: 'Kavi Chindhu', designation: 'Ui/Ux Designer', profile: 'finn.png', department: 'IT', parentId: 4 },
  { id: 10, name: 'Karkavelraj', designation: 'AI Developer Team Leader', profile: 'emma_p.png', department: 'IT', parentId: 4 },

  { id: 11, name: 'Janani', designation: 'Digital Market Excutive', profile: 'kurt.png', department: 'IT', parentId: 4 },
  { id: 12, name: 'Irfan', designation: 'Flutter Developer', profile: 'santana.png', department: 'IT', parentId: 4 },
  { id: 13, name: 'Vimal Raj', designation: 'AI Developer', profile: 'rachel.png', department: 'IT', parentId: 10 },


  // // --- Marketing Team (reports to Luke Warm, id: 2) ---
  // { id: 15, name: 'Don Draper', designation: 'Marketing Director', profile: 'don.png', department: 'Marketing', parentId: 2 },
  // { id: 16, name: 'Peggy Olson', designation: 'Marketing Manager', profile: 'peggy_o.png', department: 'Marketing', parentId: 15 },
  // { id: 17, name: 'Joan Holloway', designation: 'Content Strategist', profile: 'joan.png', department: 'Marketing', parentId: 16 },
  // { id: 18, name: 'Roger Sterling', designation: 'SEO Specialist', profile: 'roger.png', department: 'Marketing', parentId: 16 },
  // { id: 19, name: 'Pete Campbell', designation: 'Social Media Manager', profile: 'pete.png', department: 'Marketing', parentId: 16 },
  // { id: 73, name: 'Lane Pryce', designation: 'Digital Marketing Specialist', profile: 'lane.png', department: 'Marketing', parentId: 16 },
  // { id: 74, name: 'Betty Francis', designation: 'Graphic Designer (Marketing)', profile: 'betty.png', department: 'Marketing', parentId: 15 },


  // // --- Engineering Team (reports to Peggy Flaming, id: 3 / Ada Byron, id: 9) ---
  // { id: 5, name: 'Xavier Breath', designation: 'Lead Software Engineer', profile: 'xavier.png', department: 'Engineering', parentId: 3 },
  // { id: 20, name: 'Grace Hopper', designation: 'Engineering Manager', profile: 'grace.png', department: 'Engineering', parentId: 3 },
  // { id: 21, name: 'Alan Turing', designation: 'Senior Software Engineer', profile: 'alan.png', department: 'Engineering', parentId: 20 },
  // { id: 22, name: 'Tim Berners-Lee', designation: 'Software Engineer', profile: 'tim.png', department: 'Engineering', parentId: 20 },
  // { id: 23, name: 'Linus Torvalds', designation: 'Software Engineer', profile: 'linus.png', department: 'Engineering', parentId: 20 },
  // { id: 24, name: 'Margaret Hamilton', designation: 'QA Lead', profile: 'margaret.png', department: 'Engineering', parentId: 3 },
  // { id: 25, name: 'John von Neumann', designation: 'QA Engineer', profile: 'john_vn.png', department: 'Engineering', parentId: 24 },
  // { id: 26, name: 'Katherine Johnson', designation: 'QA Engineer', profile: 'katherine.png', department: 'Engineering', parentId: 24 },
  // { id: 27, name: 'Dennis Ritchie', designation: 'DevOps Lead', profile: 'dennis.png', department: 'Engineering', parentId: 9 },
  // { id: 28, name: 'Ken Thompson', designation: 'DevOps Engineer', profile: 'ken.png', department: 'Engineering', parentId: 27 },
  // { id: 29, name: 'Bjarne Stroustrup', designation: 'DevOps Engineer', profile: 'bjarne.png', department: 'Engineering', parentId: 27 },
  // { id: 30, name: 'James Gosling', designation: 'Engineering Manager', profile: 'james_g.png', department: 'Engineering', parentId: 3 },
  // { id: 31, name: 'Guido van Rossum', designation: 'Senior Software Engineer', profile: 'guido.png', department: 'Engineering', parentId: 30 },
  // { id: 32, name: 'Yukihiro Matsumoto', designation: 'Software Engineer', profile: 'yukihiro.png', department: 'Engineering', parentId: 30 },
  // { id: 33, name: 'Brendan Eich', designation: 'Frontend Lead', profile: 'brendan.png', department: 'Engineering', parentId: 3 },
  // { id: 34, name: 'Rasmus Lerdorf', designation: 'Senior Frontend Engineer', profile: 'rasmus.png', department: 'Engineering', parentId: 33 },
  // { id: 35, name: 'Ryan Dahl', designation: 'Backend Lead', profile: 'ryan.png', department: 'Engineering', parentId: 3 },
  // { id: 36, name: 'Solomon Hykes', designation: 'Senior Backend Engineer', profile: 'solomon.png', department: 'Engineering', parentId: 35 },
  // { id: 75, name: 'Niklaus Wirth', designation: 'Architect', profile: 'niklaus.png', department: 'Engineering', parentId: 9 },
  // { id: 76, name: 'Donald Knuth', designation: 'Principal Engineer', profile: 'donald.png', department: 'Engineering', parentId: 9 },
  // { id: 77, name: 'Vint Cerf', designation: 'Network Engineer', profile: 'vint.png', department: 'Engineering', parentId: 27 },
  // { id: 78, name: 'Bob Kahn', designation: 'Network Engineer', profile: 'bob_k.png', department: 'Engineering', parentId: 27 },
  // { id: 79, name: 'Radia Perlman', designation: 'Security Engineer', profile: 'radia.png', department: 'Engineering', parentId: 9 },
  // { id: 80, name: 'Shafi Goldwasser', designation: 'Cryptography Specialist', profile: 'shafi.png', department: 'Engineering', parentId: 79 },

  // // --- Operations Team (reports to Arthur Doyle, id: 6) ---
  // { id: 37, name: 'Sherlock Holmes', designation: 'Operations Manager', profile: 'sherlock.png', department: 'Operations', parentId: 6 },
  // { id: 38, name: 'John Watson', designation: 'Project Manager', profile: 'john_w.png', department: 'Operations', parentId: 37 },
  // { id: 39, name: 'Mycroft Holmes', designation: 'Business Analyst', profile: 'mycroft.png', department: 'Operations', parentId: 37 },
  // { id: 40, name: 'Irene Adler', designation: 'Process Improvement Lead', profile: 'irene.png', department: 'Operations', parentId: 37 },
  // { id: 81, name: 'Mary Morstan', designation: 'Project Coordinator', profile: 'mary_m.png', department: 'Operations', parentId: 38 },
  // { id: 82, name: 'Greg Lestrade', designation: 'Logistics Specialist', profile: 'greg.png', department: 'Operations', parentId: 37 },

  // // --- Human Resources Team (reports to Eleanor Rigby, id: 7) ---
  // { id: 41, name: 'Michael Scott', designation: 'HR Manager', profile: 'michael_s.png', department: 'Human Resources', parentId: 7 },
  // { id: 42, name: 'Pam Beesly', designation: 'HR Generalist', profile: 'pam.png', department: 'Human Resources', parentId: 41 },
  // { id: 43, name: 'Toby Flenderson', designation: 'HR Specialist - Compliance', profile: 'toby.png', department: 'Human Resources', parentId: 41 },
  // { id: 44, name: 'Holly Flax', designation: 'Recruitment Lead', profile: 'holly.png', department: 'Human Resources', parentId: 7 },
  // { id: 45, name: 'Dwight Schrute', designation: 'Talent Acquisition Specialist', profile: 'dwight.png', department: 'Human Resources', parentId: 44 },
  // { id: 83, name: 'Angela Martin', designation: 'Payroll Specialist', profile: 'angela_m.png', department: 'Human Resources', parentId: 41 },
  // { id: 84, name: 'Oscar Martinez', designation: 'HR Analyst', profile: 'oscar_m.png', department: 'Human Resources', parentId: 41 },

  // // --- Finance Team (reports to Marcus Aurelius, id: 8) ---
  // { id: 46, name: 'Jordan Belfort', designation: 'Finance Manager', profile: 'jordan.png', department: 'Finance', parentId: 8 },
  // { id: 47, name: 'Gordon Gekko', designation: 'Senior Financial Analyst', profile: 'gordon.png', department: 'Finance', parentId: 46 },
  // { id: 48, name: 'Bud Fox', designation: 'Financial Analyst', profile: 'bud.png', department: 'Finance', parentId: 46 },
  // { id: 49, name: 'Teresa Petrillo', designation: 'Accountant Lead', profile: 'teresa.png', department: 'Finance', parentId: 8 },
  // { id: 50, name: 'Maria Von Trapp', designation: 'Accountant', profile: 'maria_vt.png', department: 'Finance', parentId: 49 },
  // { id: 85, name: 'Scrooge McDuck', designation: 'Chief Accountant', profile: 'scrooge.png', department: 'Finance', parentId: 8 },
  // { id: 86, name: 'Richie Rich', designation: 'Junior Accountant', profile: 'richie.png', department: 'Finance', parentId: 50 },

  // // --- Design Team (reports to CTO: id: 9) ---
  // { id: 51, name: 'Jony Ive', designation: 'Head of Design', profile: 'jony.png', department: 'Design', parentId: 9 },
  // { id: 52, name: 'Susan Kare', designation: 'Lead UX Designer', profile: 'susan_k.png', department: 'Design', parentId: 51 },
  // { id: 53, name: 'Paul Rand', designation: 'Lead UI Designer', profile: 'paul_r.png', department: 'Design', parentId: 51 },
  // { id: 54, name: 'Milton Glaser', designation: 'UX Designer', profile: 'milton.png', department: 'Design', parentId: 52 },
  // { id: 55, name: 'Paula Scher', designation: 'UI Designer', profile: 'paula_s.png', department: 'Design', parentId: 53 },
  // { id: 56, name: 'Massimo Vignelli', designation: 'Graphic Designer', profile: 'massimo.png', department: 'Design', parentId: 51 },
  // { id: 87, name: 'Dieter Rams', designation: 'Industrial Designer', profile: 'dieter.png', department: 'Design', parentId: 51 },
  // { id: 88, name: 'Zaha Hadid', designation: 'Architectural Visualizer', profile: 'zaha.png', department: 'Design', parentId: 51 },

  // // --- Customer Support Team (reports to VP Operations, id: 6) ---
  // { id: 57, name: 'Leslie Knope', designation: 'Support Director', profile: 'leslie.png', department: 'Support', parentId: 6 },
  // { id: 58, name: 'Ron Swanson', designation: 'Support Manager', profile: 'ron.png', department: 'Support', parentId: 57 },
  // { id: 59, name: 'April Ludgate', designation: 'Customer Support Specialist', profile: 'april.png', department: 'Support', parentId: 58 },
  // { id: 60, name: 'Andy Dwyer', designation: 'Customer Support Specialist', profile: 'andy.png', department: 'Support', parentId: 58 },
  // { id: 61, name: 'Tom Haverford', designation: 'Technical Support Lead', profile: 'tom_h.png', department: 'Support', parentId: 57 },
  // { id: 62, name: 'Ben Wyatt', designation: 'Technical Support Engineer', profile: 'ben_w.png', department: 'Support', parentId: 61 },
  // { id: 89, name: 'Ann Perkins', designation: 'Customer Success Manager', profile: 'ann_p.png', department: 'Support', parentId: 57 },
  // { id: 90, name: 'Chris Traeger', designation: 'Support Operations Analyst', profile: 'chris_t.png', department: 'Support', parentId: 57 },

  // // --- Adding more individual contributors to various teams to reach 100 ---
  // // More Engineers
  // { id: 63, name: 'Sophie Wilson', designation: 'Software Engineer', profile: 'sophie_w.png', department: 'Engineering', parentId: 20 },
  // { id: 64, name: 'Steve Wozniak', designation: 'Hardware Engineer', profile: 'steve_w.png', department: 'Engineering', parentId: 30 },
  // { id: 65, name: 'Bill Gates', designation: 'Software Intern', profile: 'bill_g.png', department: 'Engineering', parentId: 22 },
  // { id: 91, name: 'Larry Ellison', designation: 'Database Administrator', profile: 'larry_e.png', department: 'Engineering', parentId: 27 },
  // { id: 92, name: 'Sergey Brin', designation: 'Research Scientist', profile: 'sergey_b.png', department: 'Engineering', parentId: 76 },
  // { id: 93, name: 'Larry Page', designation: 'AI Engineer', profile: 'larry_p.png', department: 'Engineering', parentId: 76 },

  // // More Sales/Marketing
  // { id: 66, name: 'Phoebe Buffay', designation: 'Sales Associate', profile: 'phoebe.png', department: 'Sales', parentId: 10 },
  // { id: 67, name: 'Chandler Bing', designation: 'Data Analyst (Marketing)', profile: 'chandler.png', department: 'Marketing', parentId: 15 },
  // { id: 94, name: 'Monica Geller', designation: 'Event Coordinator (Marketing)', profile: 'monica.png', department: 'Marketing', parentId: 15 },
  // { id: 95, name: 'Ross Geller', designation: 'Market Research Analyst', profile: 'ross.png', department: 'Marketing', parentId: 15 },

  // // More Operations/Support
  // { id: 68, name: 'Cosmo Kramer', designation: 'Logistics Coordinator', profile: 'kramer.png', department: 'Operations', parentId: 38 },
  // { id: 69, name: 'Elaine Benes', designation: 'Support Agent Tier 2', profile: 'elaine.png', department: 'Support', parentId: 58 },
  // { id: 96, name: 'Jerry Seinfeld', designation: 'Community Manager', profile: 'jerry.png', department: 'Support', parentId: 57 },

  // // More HR/Finance
  // { id: 97, name: 'Newman Postman', designation: 'Benefits Administrator', profile: 'newman.png', department: 'Human Resources', parentId: 41 },
  // { id: 98, name: 'George Costanza', designation: 'Financial Assistant', profile: 'george_c.png', department: 'Finance', parentId: 50 },

  // // Final filler for any department
  // { id: 99, name: 'Alice Wonderland', designation: 'Junior Developer', profile: 'alice_w.png', department: 'Engineering', parentId: 32 },
  // { id: 100, name: 'Bob The Builder', designation: 'Facilities Coordinator', profile: 'bob_b.png', department: 'Operations', parentId: 37 },
  // { id: 101, name: 'Charles Xavier', designation: 'Ethics Officer', profile: 'charles_x.png', department: 'Management', parentId: 1 },
  // { id: 102, name: 'Diana Prince', designation: 'Legal Counsel', profile: 'diana_p.png', department: 'Management', parentId: 1 },
  // { id: 103, name: 'Clark Kent', designation: 'Internal Communications', profile: 'clark_k.png', department: 'Human Resources', parentId: 7 },
  // { id: 104, name: 'Bruce Wayne', designation: 'Security Consultant', profile: 'bruce_w.png', department: 'Operations', parentId: 6 },

  // // Example data to match the image provided by the user for styling reference
  // { id: 200, name: 'Karkavelraja', designation: 'Project Manager', profile: 'karkavelraja.png', department: 'Project Management Root', parentId: null },
  // { id: 201, name: 'Priya Kumar', designation: 'Team Leader', profile: 'priya.png', department: 'Project Management', parentId: 200 },
  // { id: 202, name: 'Tamil Raj', designation: 'Project Manager', profile: 'tamil.png', department: 'Project Management', parentId: 201 },
  // { id: 203, name: 'Ifran', designation: 'Project Manager', profile: 'ifran.png', department: 'Project Management', parentId: 201 },
  // { id: 204, name: 'Eswaran Raj', designation: 'Project Manager', profile: 'eswaran.png', department: 'Project Management', parentId: 201 },
];
