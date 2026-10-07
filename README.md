React Native - e-Commerce App

A simple ecommerce product listing app built with React Native, Expo Router, JavaScript, and Redux Toolkit.

The app includes product listing with pagination, search, product details, cart management, offline/error handling, API retry with exponential backoff, and a WebView for the Return Policy.

Tech Stack -
- React Native + Expo + Javascript
- Expo Router for navigation
- Redux Toolkit for state management
- AsyncStorage for local persistence
- React Native WebView
- DummyJSON API
- Setup & Run

Clone the repository and install dependencies:

git clone <https://github.com/AdarshGuptaAndroid/NuaWomanClone.git>
cd <NuaWomanClone>
npm install

Start the application:

npm expo start

Then run it on Android/iOS using the Expo development options.

Key Decisions & Trade-offs


- Redux Toolkit

I used Redux Toolkit because cart and product-related state needs to be shared across multiple screens. Context API would be simpler for a small app, but Redux gives a more structured approach if the application grows.

- Expo Router

I used Expo Router because its file-based navigation keeps the project structure simple and makes routes easier to manage.

- Client-side Search

For this assignment, I used client-side filtering because the product dataset is relatively small. In a production application, I would prefer server-side search for better scalability.

- Local Cart

The cart is maintained locally because backend cart synchronization was outside the assignment scope. In a production app, I would sync the cart with the user's account/backend.

- Assumptions -
* DummyJSON is used as the product API and does not require authentication.
* Payment and checkout are outside the scope of this assignment.
* The Return Policy can use a static/public URL for the WebView demonstration.


- What I Would Improve With More Time

If I had more time, I would focus on:

* Better offline-first support with local product caching
* Debounced search and advanced filtering
* Add retry with exponential backoff to handle temporary API failures gracefully.
* Automated unit/component testing
* Image caching and performance optimization
* Authentication and backend cart synchronization
* Checkout/payment flow
* CI/CD and crash/analytics monitoring


Note

The main focus of this assignment was to keep the implementation simple, maintainable, and scalable, while covering the requested functionality and handling common real-world cases such as API failures and network issues.