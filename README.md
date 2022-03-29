# React Shop

* This project is a simple, front end eCommerce app.  
* The app includes a list of available products from the [Fake Store API](https://fakestoreapi.com/docs) that an be added to / removed from a (fake) Wishlist and Cart.
* The app includes simple, local authentication provided by Firebase with JWT implementation (including refreshing access tokens).
* The Wishlist and Cart is NOT saved to a back-end (the API does not provide this functionality) and therefore the same Wishlist/Cart saved in state is used for any user that logs in, and is therefore lost upon logout / app close.

## Third Party Dependencies

In addition to the dependencies specified in the package.json file, the other systems this app depends on are:

1. Firebase for Authentication
2. [Fake Store API](https://fakestoreapi.com/docs) for the mock back-end

## Build / Deploy instructions

### `npm start`

Runs the app in the development mode.
A .env.local file containing the Firebase API Key must be created in the root directory with a valid key

### `npm run build`

Builds the app for production to the `build` folder.
When deploying to a hosting provider, the Firebase API Key must be included as an environment variable as per that providers deployment instructions.
