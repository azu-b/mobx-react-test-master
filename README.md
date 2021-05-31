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

After having the function, we need to take our function to the `TreeInput` component, which will be the one processing the array input.

## Problem 2

As I read in the description of the second problem, I need to accomplish the following:

- Make the app have somewhere in which the user will select the JSON file with the array and extract it.
- Pass the array from the source using the recently created `parseArrayToTree` function and show it inside the multiline text box we have right now in the app as a JSON text.
- Our JSON text will be the base to build the graphic representation of the binary tree, which will be shown in the lower part of the app.
- After having parsed the source file, the user will be able to modify the JSON text that came as a result from parsing the array into a tree and will live inside the multiline text box.
- While our user modifies the JSON text, the graphic representation should not change until the JSON text is valid. In the meantime, there should be a parsing error message that will tell our user the JSON text is not valid.
- After the used modifies the JSON text as a valid one, the graphic representation of the binary tree should change using this new JSON text.

Now that I have stated how I understood the user requirements, I will start this problem by making the component that will source the JSON file that contains an array. For this component, I added the `react-files` library, to be able to upload the JSON file with the array. Then I used a `FileReader` to read the file as text, then parse it as an array.

After completing the task of uploading my JSON file with the array I get to an interesting problem. This project is the first one in which I use MobX, so I have been learning how to use based on some reading and how it is being used in this sample app I have been modifying. In fact, in the past I didn't use any state management library: I depended on having components with the changing stuff using React's Context Provider and Consumer.

I used the IAppState and added a new property called arrayFormatString, which is modified in the `TreeSource` component as it gets the string from the uploaded JSON file. Then, I used it in `TreeInput` to parse the string as a JSON, get the array and parse it to be a `BinTreeNode`. After that, I set the `treeText` property of `TreeInput` state using `JSON.stringify` and passed it through the `value` prop of the `textarea`.

Other important thing I had to do was to style the graphic representation of the binary tree in a more-or-less decent way. The next thing to do is to parse the `TreeInput` text to an object when the user changes it and show them if they have syntax errors. To do this, I added some error flags and used some `try` and `catch` to decide whether if I should show error messages or not. If the user edits the text and it is a valid JSON that can be converted

For showing error messages, I built an `ErrorMessage` component, which is used in two cases: when pressing `Process` button and there is no JSON file uploaded or the JSON file doesn't have a valid array, and when the user is editing the JSON inside the `TreeInput` multiline text-box and the content is not a valid JSON.

Due to time constraint, I didn't implement parsing the valid JSON to see if it has the correct structure for being a binary tree. As it is, as long as it is valid JSON with ids properties being a number or a string, the app will work as expected. A possible approach to solve this problem could be to implement a method that will check the structure of the object parsed from the JSON text edited by the user. This method would check how many properties the object has and see if it has an id that is a number or a string, a "left" property that is either null of an object and then we could use recursion to call the same method with "left" property value. The same would be done with the "right" property.


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
