Foliofusion
A full stack portfolio builder that helps developers construct professional portfolios with ease.

Demo Video- https://youtu.be/6piJWVwbr04
Design- https://www.figma.com/design/mwGJygn2qHfAU2eSfOr1Tu/Untitled?node-id=0-1&p=f&t=5FChJ6KYnIZhyBL9-0
Features
User Authentication using JWT tokens  
Separate Link to individual portfolios  
Changes visible in real time  

FRONTEND  
Next JS 14  
Typescript  
Tailwind CSS  

BACKEND  
Node.js + Express  
PostgreSQL  
JWT Authentication  

SETUP  
git clone https://github.com/Christony/foliofusion.git  
cd foliofusion  
Create .env and node_modules file in the root folder  
Create postgreSQL database  

**TABLE CREATION**  
`CREATE TABLE users (  
    id SERIAL PRIMARY KEY,  
    username VARCHAR(30) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    hasresume BOOLEAN DEFAULT false,  
    email VARCHAR(50),  
    biodata TEXT,  
    theme CHAR(1)  
);`  
user table  

`CREATE TABLE socials (  
    id SERIAL PRIMARY KEY,  
    user_id INTEGER,  
    platform VARCHAR(50),  
    url TEXT,  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);`  
socials table  

`CREATE TABLE skills (  
    id SERIAL PRIMARY KEY,  
    user_id INTEGER,  
    skill_name VARCHAR(100),  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);`  
skills table  

`CREATE TABLE projects (  
    id SERIAL PRIMARY KEY,  
    user_id INTEGER,  
    title VARCHAR(100),  
    tech_stack TEXT,  
    project_url TEXT,  
    repo_url TEXT,  
    description TEXT,  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);`  
projects table   

`CREATE TABLE experience (  
    id SERIAL PRIMARY KEY,  
    user_id INTEGER,  
    role VARCHAR(100),  
    company VARCHAR(100),  
    start_date DATE,  
    end_date DATE,  
    description TEXT,  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);`  
experience table  

`CREATE TABLE education (  
    id SERIAL PRIMARY KEY,  
    user_id INTEGER,  
    institution VARCHAR(100),  
    degree VARCHAR(100),  
    start_year INTEGER,  
    end_year INTEGER,  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);`  
education table  

`CREATE TABLE achievements (  
    id SERIAL PRIMARY KEY,  
    user_id INTEGER NOT NULL,  
    title VARCHAR(255) NOT NULL,  
    description TEXT,  
    date DATE,  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);`  
achievements table  

`CREATE TABLE custom_sections (  
    id SERIAL PRIMARY KEY,  
    user_id INTEGER NOT NULL,  
    title VARCHAR(255) NOT NULL,  
    content JSON,  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);`  
custom_sections table  
`
port=1100  
DB_USER=  
DB_HOST=localhost  
DB_NAME=  
DB_PASSWORD=  
DB_PORT=5432  
JWT_SECRET=  
`  
________________________________________________________________  
Run npm run dev in the root  
Visit http://localhost:3000 to view foliofusion  

Instructions  
Register/login to edit your own portfolio or view other portfolios  
Click on create/edit portfolio to initialise/alter your portfolio  
OR   
Enter a username in the Searchbar to view their portfolio  

