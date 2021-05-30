# Thinking and more thinking....

## Problem 1

As far as I understood, I need to parse an array into a BinNodeTree. In the sample app, the `BinNodeTree` is a class, so I'll handle it that way for this problem.

The input would look something like:
```
["a", ["b"], ["c"]]
```

The expected output would look like this:
```
{
  "id": "a",
  "left": {
    "id": "b",
    "left": null,
    "right": null
  },
  "right": {
    "id": "c",
    "left": null,
    "right": null
  }
}
```
Before starting with the problem, I wanted to state what I am seeing and assuming for this problem:

- The input array will always have 1 to 3 elements.
- The first element will be either a number or a string.
- The second element will be an array whose content will have the same structure as what I am describing here, or a null value.
- The third element will be of the same type as the second element: either an array or a null value.
- If the array has a length of 1, the node won't have any children.
- If the array has a length of 2, the node could have a left child.
- If the array has a length of 3, the node could have a left child and / or a right child.

Having these statements in mind, in this first part of the problem I will build the function that will return the array as a parsed `BinTreeNode`.

### How to implement it?

At first, I tried by hand the parsing from the array to the object like class, so I made the algorithm step by step:

- If array has one element:
  - Return the element in BinTreeNode(id: element, left: null, right: null)

- If array has 2 elements:
  - If second element (left) is null:
    - Return the element in BinTreeNode(id: element, left: null, right: null)
  
  - If left is not null:
    - Return the element in BinTreeNode(id: element, left: parse function(left), right: null)

- If array has 3 elements:
  - If second (left) and third element (right) are null:
    - Return the element in BinTreeNode(id: element, left: null, right: null)
  - If left is null and right is not null:
    - Return the element in BinTreeNode(id: element, left: null, right: parse function(right))
  - If left is not null and right is null:
    - Return the element in BinTreeNode(id: element, left: parse function(left), right: null)
  - If left and right are not null:
    - Return the element in BinTreeNode(id: element, left: parse function(left), right: parse function (right))

After having the function, we need to convert the `BinTreeNode` to a JSON string.


# Original README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
