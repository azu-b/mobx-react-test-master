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
        return 1;
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