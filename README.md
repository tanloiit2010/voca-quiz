# Real-Time Vocabulary Quiz

## Requirement
The real-time quiz feature for an English learning application. This feature will allow users to answer questions in real-time, compete with others, and see their scores updated live on a leaderboard.

## Technologies
 - Node.js, Nest.js, Bull Queue, Socket.io, TypeORM
 - React.js, Next.js, React-Query, Tailwind Css
 - MySQL
 - Redis

## The Quiz-Service Architecture
### The Core and the Interface

**The Core**

- The Core is responsible for all the **business logic** within the system. It encapsulates the core functionality and domain-specific rules.
- We draw inspiration from the concept of **Bounded Contexts** in Domain-Driven Design (DDD). Each context represents a dedicated module that groups related business logic.
- For instance, consider the following contexts in our project:
    - **Quiz Context**: Manages quiz sessions and user answers
    - **Score Context**: Evaluate user answers, calculates and updates user scores.
- The Core exposes functions that the Interface can use to serve external client requests.
- Crucially, the Core focuses solely on business logic and remains agnostic about how clients access our system (whether through REST, MVC, GraphQL, etc.). This responsibility lies with the Interface.
- In the project structure, you can find the core at: `src/core`

**The Interface**

- The Interface is responsible for **exposing system functionalities** to external clients.
- When a request arrives, the Interface receives it along with input data. It then converts this input into a well-typed structure required by the Core.
- The Interface performs two critical tasks:
    1. **Validation**: Ensures that input adheres to expected type and format.
    2. **Normalization**: Converts possibly weakly-typed input into a consistent type.
- Note that this normalization is distinct from business validation, which remains the Core’s responsibility.
- In the project structure, you can find the interface at: `src/api`
    

Engineers benefit from understanding the distinct roles of each part. When exploring system behavior, developers can delve directly into the Core, ignoring routing specifics, decoding/encoding intricacies, and HTTP error codes.

Conversely, making changes to the Interface—such as supporting a new protocol (e.g., adding GraphQL alongside an existing REST API)—requires no knowledge of the Core’s internals.

By maintaining this clear separation, we ensure high code quality and facilitate efficient development. 🚀

## Up & Running
### Prerequisite: 
- MySQL installation (https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/installing.html)
- [Node.js 18.20.4](https://nodejs.org/)  or later.
- Redis (https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)

 
### Run Quiz-Service:

#### 1. Install dependencies
```bash
$ yarn install
```

#### 2. Update .env file

```bash
cp .env.example .env
```

Update the value in .env

#### 3. Create Database

```bash
yarn db:create
```

#### 4. Run seed data
```bash
yarn db:seed
```

#### 5. Run the service
```bash
yarn run:dev
```

### Run Real-Time-Communication-Service:

#### 1. Install dependencies
```bash
$ yarn install
```

#### 2. Update .env file
```bash
cp .env.example .env
```

Update the value in .env

#### 3. Run the service
```bash
yarn run:dev
```

### Run The Quiz-Web:
#### 1. Install dependencies
```bash
$ yarn install
```

#### 2. Update .env file

```bash
cp .env.example .env.local
```

Update the value in .env.local

#### 3. Run the web
```bash
yarn dev
```

Now you can visit [`http://localhost:3000/quizzes/1`](http://localhost:3000/quizzes/1) from your browser.
