export class BinTreeNode {
    id: string | number;
    left: BinTreeNode | null;
    right: BinTreeNode | null
    constructor(id: string | number, left: BinTreeNode | null, right: BinTreeNode | null) {
        this.id = id;
        this.left = left;
        this.right = right;
    }
}

type BinTreeArray = [
    root: string | number,
    left?: BinTreeArray | null,
    right?: BinTreeArray | null
];

export const parseArrayBinTree = (input: BinTreeArray): any => {
    // Save input array length
    const arrayLength = input.length;

    // If the tree node has no children
    if (arrayLength === 1) {
        const [root] = input;
        return new BinTreeNode(root, null, null);
    } else if (arrayLength === 2) { // If the tree node has 2 elements
        const [root, left] = input;

        // If left element is null, then the node has no children
        if (!left) {
            return new BinTreeNode(root, null, null);
        } else { // If not, then we call parseArrayBinTree to create the left node
            return new BinTreeNode(root, parseArrayBinTree(left), null);
        }
    } else if (arrayLength === 3) { // If the tree node has 3 elements
        const [root, left, right] = input;

        // If the left and right elements are null
        if (!left && !right) {
            return new BinTreeNode(root, null, null);
        } else if (!left && right) { // If left is null, but right is an array
            return new BinTreeNode(root, null, parseArrayBinTree(right));
        } else if (left && !right) { // If left is an array, but right is null
            return new BinTreeNode(root, parseArrayBinTree(left), null);
        } else if (left && right){ // If both left and right are an array
            return new BinTreeNode(root, parseArrayBinTree(left), parseArrayBinTree(right));
        }
    }
};