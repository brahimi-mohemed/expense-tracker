# Expense Tracker App

A simple Expense Tracker web application built using HTML, CSS, and JavaScript.  
The project allows users to manage personal expenses with full CRUD functionality and persistent storage using localStorage.

---

## Features

- Add new expenses
- Edit existing expenses
- Delete expenses
- Search expenses by description
- Sort expenses by amount or date
- Filter expenses by category
- Dashboard statistics (total, highest expense, categories used)
- Data saved in localStorage
- Responsive layout

---

## Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)

---

## Live Demo

[Live Demo](https://expense-tracker-mohamed.vercel.app)

## ScreenShots 
<img width="393" height="852" alt="mobile" src="https://github.com/user-attachments/assets/9d70bde6-6580-49a7-90b1-20e5de20ab13" />
<img width="417.5" height="605.4" alt="tablet" src="https://github.com/user-attachments/assets/a753ec23-8eb8-496d-b6a8-92aa7787822a" />
<img width="960" height="600" alt="desktop" src="https://github.com/user-attachments/assets/2c43e351-a065-4ecf-8237-f9f49b5ea0e6" />

---

## How It Works

Expenses are stored as objects in an array inside localStorage.  
Every change (add, edit, delete) updates both the UI and storage to keep them synchronized.

The application processes data using:

- filter() for search and category filtering
- sort() for ordering expenses
- reduce() for calculating statistics

---

## What I Learned

- Working with DOM manipulation
- Managing application state in vanilla JavaScript
- Using array methods (map, filter, reduce, sort)
- Handling form validation and UI feedback
- Persisting data with localStorage
- Building a structured frontend application without frameworks

---

## Future Improvements

- Dark mode
- Charts for expense visualization
- Monthly budget tracking
- Export data as CSV
