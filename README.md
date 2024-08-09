# State Management Toolkit for React

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--_N4G6Upo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://i.imgur.com/riadAin.gif" />

## Overview

This repository provides a powerful state management toolkit for React applications, featuring advanced capabilities such as logger middleware, state persistence, and more. It is designed to outline the main concepts of state management libraries.

## Features

* **State Sync**: Synchronize the state across all components subscribed for it.
* **State Persistence**: Save and load state from `localStorage` to persist across sessions.
* **State Import/Export**: Import and export application state using JSON files for easy state management.
* **Immer Middleware**: Use Immer for immutable state updates.

## Installation

1. Clone the repository:
    
    ```bash
    git clone https://github.com/Shaban-Eissa/state-management-toolbox
    ```
    
2. Navigate to the project directory:
    
    ```bash
    cd state-management-toolbox
    ```
    
3. Install dependencies:
    
    ```bash
    npm install
    ```
    

## Setup

1. **Integrate the Store**: Use the `useStore` hook in your components to access and update state.
    
2. **Configure State Persistence**: Ensure `localStorage` is set up for persistence and configure your `persistenceMiddleware`.
    

## How to Start

1. Start the development server:
    
    ```bash
    npm run dev
    ```
    
2. Open your browser and navigate to `http://localhost:5173` to view the application.
    

## Video Demo

Watch the video demo to see the toolkit in action

https://github.com/user-attachments/assets/0a812b5c-b9f2-410c-82b9-daa323b7fc69


## Important Notes

* **State Persistence**: Ensure that your state structure is consistent to avoid issues with state loading and saving.
* **Shape Of JSON**: The shape of JSON data in application will be like ```{"count":17,"nested":{"deep":{"value":24}}}```
* **Import & Export**: You can export JSON file contain current data by click on Export button, also you can import JSON file by click on input and you will notice that state of application changed by the value contained in JSON file you imported.

## Contributing

Feel free to submit issues or pull requests.
