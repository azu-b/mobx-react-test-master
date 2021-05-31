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

After completing the task of uploading my JSON file with the array I get to an interesting problem. This project is the first one in which I use MobX, so I have been learning how to use based on some reading and how it is being used in this sample app I have been modifying. In fact, in the past I didn't use any state management library: I depended on having components with the changing stuff, and a few times using React's Context Provider and Consumer.

I used the IAppState and added a new property called arrayFormatString, which is modified in the `TreeSource` component as it gets the string from the uploaded JSON file. Then, I used it in `TreeInput` to parse the string as a JSON, get the array and parse it to be a `BinTreeNode`. After that, I set the `treeText` property of `TreeInput` state using `JSON.stringify` and passed it through the `value` prop of the `textarea`.

Other important thing I had to do was to style the graphic representation of the binary tree in a more-or-less decent way. The next thing to do is to parse the `TreeInput` text to an object when the user changes it and show them if they have syntax errors. To do this, I added some error flags and used some `try` and `catch` to decide whether if I should show error messages or not. If the user edits the text and it is a valid JSON that can be converted

For showing error messages, I built an `ErrorMessage` component, which is used in two cases: when pressing `Process` button and there is no JSON file uploaded or the JSON file doesn't have a valid array, and when the user is editing the JSON inside the `TreeInput` multiline text-box and the content is not a valid JSON.

Due to time constraint, I didn't implement parsing the valid JSON to see if it has the correct structure for being a binary tree. As it is, as long as it is valid JSON with ids properties being a number or a string, the app will work as expected. A possible approach to solve this problem could be to implement a method that will check the structure of the object parsed from the JSON text edited by the user. This method would check how many properties the object has and see if it has an id that is a number or a string, a "left" property that is either null of an object and then we could use recursion to call the same method with "left" property value. The same would be done with the "right" property.

## Problem 3

After reading the problem, I understood that I need to find the smallest subtree from our shown binary tree which contains the deepest nodes. And what is that? Here are my assumptions and understandings of that concept:
- A one node tree. If the root node has no children, then we should return the root node.
- A node whose children are leaf nodes and the depth from the root to these children is the largest one from all the tree.
- A node with one child that is a leaf node and the depth from the root to this child is the largest one from all the tree.
- A node that has more than two grandchildren and they have equal depth from the root to these grandchildren and that depth is the largest of all the tree.
Besides talking about what is the smallest subtree we look for, I want to say that I am assuming our binary tree could be unbalanced, so our smallest subtree can be a node with one child.

Having these statements in my mind, I wanted to try to solve this problem by calculating the depth of their left and right children and compare them to see if which of them has a greater depth.

1. Calculate the tree depth from a given node:
- When given node has no children:
  - Return 0
- When given node has left child but no right child:
  - Return function(left child) + 1
- When given node has right child but no left child:
  - Return function(right child) + 1
- When given node has both left and right children:
  - Run function(left child) + 1
  - Run function(right child) + 1
  - Determine which is bigger
    - Return the bigger one

After having implemented the function that gets the depth of a treeNode, the next step seemed to go through the binary tree and calculate the depth from both sides, see which one is bigger and keep calculating depths and comparing until both sides have the same depth. When this happens, we should have the smallest subtree with the deepest nodes.

2. Get the smallest subtree with the deepest nodes:
- When given node has no children:
  - Return given node
- When given node has left child but no right child:
  - Calculate left depth
  - If left depth is bigger than 1:
    - Return function(left child)
  - Return given node
- When given node has right child but no left child:
  - Calculate right depth
  - If right depth is bigger than 1:
    - Return function(right child)
  - Return given node
- When given node has both children:
  - Calculate left depth
  - Calculate right depth
  - If left depth is greater than right depth:
    - Return function(left child)
  - If right depth is greater than left depth:
    - Return function(right child)
  - If both left and right depth are equal:
    - Return given node

After finishing the function to get the smallest subtree, the next step is to highlight this subtree in our visual output with a 2px-solid green border. For this goal, I read a little bit more about MobX because, before wanting to solve this problem, I saw there was a `@computed` property and I thought it could be useful for this.

A `@computed` property is a get function that returns something that is calculated with other state properties. In our case, there was a dependency on the tree node. Since we wanted to hightlight the smallest deepest binary tree and our function to get that subtree node uses a tree node, I added a `@computed` getter for this smallest deepest binary tree to the `AppState`, which I passed through the `Body` component, who sends it to the `TreeOutput` component.

When `TreeOutput`receives it as a property, it can determine whether if the current node is the same as the one from the smallest deepest subtree. I compared both ids, and if they were the same, an `id` property would be assigned to the outer `<div>` with `treeNode` className. Then, in the `TreeOutput` style file, I created a CSS rule for this id: `#smallestBinTree`. With this rule, the smallest deepest binary tree is rendered with a 2px-solid green border.

## Ideas I wanted to implement

Due to time constraint, I wasn't able to do more things to show you. But here I will talk about it:

1. *Create unit tests for my functions*: I am no expert on this, but at least I would have liked to do some simple tests to check which kind of inputs would make my functions fail, or check if they do what I want them to do. I want more experience in these things to be able to plan and code them more easily than now.
2. *Build a nice UI*: I would have liked to use Styled Components library to build the components and get inspiration (or even the library) from Materialize. Also, I would have liked to use CSS media queries to do the app responsive to screen sizes.
3. *Parse valid JSON text*: As I mentioned in Problem 2, my app needs this to be able to determine if the JSON text has the `BinTreeNode` structure. That would avoid the app to crash when an `id` has a value different from a number or a string and it would help to always show the error message for the JSON text, because right now I can add to a JSON tree text a property `hello` with an `x` value and my error message wouldn't be there because it is a valid JSON.
4. *Change folder structure*: I feel I left my files disorganized, so I would have liked to create a `components` folder to add the `Body`, `Header`, `TreeInput`, `TreeOutput`, `TreeSource` and `ErrorMessage`, a `state` folder to add `AppState` and `IAppState`, a `utils` folder to add `TreeNode` and the sample JSON files.


# Part of original README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.