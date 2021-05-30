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