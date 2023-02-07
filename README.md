# The Meal App

This app was written as a test challenge for **Hackaton 2023**.

## Link on Heroku

[Link](https://night-raid-hackaton2023.herokuapp.com)

# Run project

To run the project you need to run 2 commands in the cmd
- > npm i
- > npm run dev

Be sure you have .env file in your root directory with the following fields: 
- CONNECTION="mongodb+srv://<login:<password>@cluster0.9jutuij.mongodb.net/database?retryWrites=true&w=majority"
- URI = 'https://www.themealdb.com/api/json/v2/key/'

You have to change login, password and key

# Product functionality

The application has standard functions that were specified in the task:
- the possibility to view a selection and quantity of products 
	that need to be bought to prepare the chosen dish;
- possibility to review the recipe of the selected dish;
- the ability to view all products available to the user;
- the ability to view lists grouped by category;
- available products (dairy products, vegetables, fruits, etc.);
- the opportunity to review dishes that can be prepared from
	 familiar ones products.

## Project overview

As soon as the user goes to the application page, he will see a  **Home page**:

![Home page](https://raw.githubusercontent.com/Zonathrope/nightRaid_hackaton_2023/main/Images/Main%20page.png)

To access the **Fridge**, the user must log in to his account. The **Login**/**Registration page**:
![Login/Registration](https://raw.githubusercontent.com/Zonathrope/nightRaid_hackaton_2023/main/Images/login%20page.png)

After authorization, the user will be able to view his products in the **Fridge**. On this page, the user can add new products, **delete** & **edit** (amount) existing ones.
	![Fridge](https://raw.githubusercontent.com/Zonathrope/nightRaid_hackaton_2023/main/Images/fridge.jpg)
	
The user has the opportunity to look at the dishes that he can cook from the ingredients that he has.
![Suggestions](https://raw.githubusercontent.com/Zonathrope/nightRaid_hackaton_2023/main/Images/suggestions.jpg)
The user can also **Search** for dishes and **View** receipt.

![Search](https://raw.githubusercontent.com/Zonathrope/nightRaid_hackaton_2023/main/Images/search.jpg)

![View](https://raw.githubusercontent.com/Zonathrope/nightRaid_hackaton_2023/main/Images/view.jpg)
