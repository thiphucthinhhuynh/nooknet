# How to Rollback Migrations and Seeds in Render

# The Render Build Command (Or How to Update Your Remote DB)

Your project contains backend and frontend folders to appropriately partition related code. Because of this separation, you added a package.json file to the root of the code base to help direct various commands to their appropriate places.

An important job the outer package.json file performs is helping you to execute a series of commands for your back end. For instance, you need to be able to issue Sequelize commands to execute migration and seeder files.

When you initially deploy your application on Render, you are given the following list of commands (separated by "&&") to enter as the build command on your dashboard:

```bash
npm install &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all
```

When your application deploys, Render will issue all of the commands listed as the build command for the app. As you can see, part of this process involves executing your migrations and seeders.

This command is all well and good, but there will be times when you need to roll back your migrations and seeders and re-execute them. Maybe you made a change to a file, or maybe you just want to reset the state of your database.
Regardless, you'll need to be able to roll those files back to re-execute them.

To do so, in your application's settings on Render, change the build command to the following:

```bash
npm install &&
npm run build &&
npm run sequelize --prefix backend db:seed:undo:all &&
npm run sequelize --prefix backend db:migrate:undo:all &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all
```

Then, redeploy the application. This will force your app to roll back your Sequelize files and re-execute them, processing any changes you made to those files.

After you've updated your database, it is recommended to change your build command back to the original. You will be re-deploying to update your app with new changes frequently, but you do not always want to rebuild your database.
