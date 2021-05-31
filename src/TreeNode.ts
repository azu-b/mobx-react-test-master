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

export const calculateBinTreeDepth = (treeNode: BinTreeNode): number => {
    if (!treeNode.left && !treeNode.right) {
        return 0;
    } else if (treeNode.left && !treeNode.right) {
        return calculateBinTreeDepth(treeNode.left) + 1;
    } else if (!treeNode.left && treeNode.right) {
        return calculateBinTreeDepth(treeNode.right) + 1;
    } else if (treeNode.left && treeNode.right) {
        const leftDepth = calculateBinTreeDepth(treeNode.left) + 1;
        const rightDepth = calculateBinTreeDepth(treeNode.right) + 1;
        return Math.max(leftDepth, rightDepth);
    };
    return 0;
}

export const getSmallestBinTreeNode = (root: BinTreeNode): any => {
    if (!root.left && !root.right) {
        return root;
    } else if (root.left && !root.right) {
        // Calculate the depth to see if it is 1 or greater
        const leftDepth = calculateBinTreeDepth(root.left);

        // If it is greater than 1, we can keep calling the function
        if (leftDepth > 1) {
            return getSmallestBinTreeNode(root.left);
        } else {
            // In this case, our depth is 1. If we call again this function
            // then we will pass to the leaf node, so we wouldn't have a subtree.
            // So instead, we return the root node
            return root;
        }
    } else if (!root.left && root.right) {
        // Same situation as in the left side
        const rightDepth = calculateBinTreeDepth(root.right);

        if (rightDepth > 1) {
            return getSmallestBinTreeNode(root.right);
        } else {
            return root;
        }
    } else if (root.left && root.right) {
        const leftDepth = calculateBinTreeDepth(root.left);
        const rightDepth = calculateBinTreeDepth(root.right);

        if (leftDepth > rightDepth) {
            return getSmallestBinTreeNode(root.left);
        } else if (rightDepth > leftDepth) {
            return getSmallestBinTreeNode(root.right);
        } else {
            return root;
        }
    }
}