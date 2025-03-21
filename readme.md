### Install dependencies
```Bash
pnpm i
```

# Steps

## Step 1
To launch step 1 with in memory repository you have to launch the followin command :
```
pnpm demo
```

## Step 2
For the step 2, i chose to persist data in json repository. I have used commanderjs for help me to handle args. 
Launch following commands to start the cli : 
```
pnpm start fleet create <userId>
pnpm start fleet register-vehicle <vehiclePlateNumber>
pnpm start fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```

## Step 3
In order to enhance and ensure the code quality, i would like to use some linting tools like eslint. It could be executed in an CI workflow. Then maybe sonarqube to analyze code and detect code smells and security breach.

I can create a CI workflow with the followings steps : 
1. Install deps
2. Check linting
3. Launch sonarqube analyze
4. Launch unit test and others
5. Build to check

And for the CD workflow :
1. Install deps (can be getting by cache)
2. Build application or microservice to a docker image
3. Push it through AWS ECR private repository
4. Launch IaC (terraform or cloudformation)