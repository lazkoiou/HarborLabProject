
# HarborLab Project #

# Frameworks and Tools #

Playwright with TS: Used as requested for the implementation of the project.
Github actions: For automated testing after each push, to ensure that the core smoke tests have not been broken.
Jenkins: For CI/CD, scheduled runs of smoke and regression suites.

# Test scenarios - API #

Smoke tests:
- POST add user with correct fields _expect_ user created
- GET user profile _expect_ return existing user

Regression tests:
- POST add user with empty firstName _expect_ 400 Bad Request
- GET user profile with no bearer token _expect_ 401 Unauthorized

# Test scenarios - Web #

Smoke tests:
- Sign up user _expect_ create user
- Create contact list _expect_ list created
- Sign up button _expect_ redirect to registration page
- Existing user login _expect_ be successful

Regression tests:
- No input add user _expect_ validation error
- Sign up cancel _expect_ no created user
- Page _expect_ correct texts, links
- Non existing user login _expect_ validation error
- No user input login _expect_ validation error

# How to run them #

Run all tests across all browser projects (chromium, firefox, webkit)
```
npx playwright test
```

Run all api smoke tests in chromium project
```
npm run test:api:smoke
```

Run all api regression tests in chromium project
```
npm run test:api:regression
```

Run all web smoke tests in chromium project
```
npm run test:web:smoke
```

Run all web regression tests in chromium project
```
npm run test:web:regression
```

# Areas of improvement you have identified #

###Improvements that could take place:
- Adding another report tool (e.g. allure-reports)
- Attaching the report to the Jenkins job
- Adding more smoke and regression tests (both for api and web)
- Add a different logger instead of console.log()
- Implement handlers that keep track of created users and deletes them at the end of
    the tests, instead of using try-catch
- Further separation of tests to @critical, which would run at the GitHub actions, because
    running all the smoke tests, will be very time consuming after a point