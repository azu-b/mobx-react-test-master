import * as React from "react";
import { BinTreeNode } from "./TreeNode";

export interface TreeInputProps {
    onChange: (newTreeNode: BinTreeNode) => void
}
interface TreeInputState {
    treeText: string
}

type BinTreeArray = [
    root: string | number,
    leftChild?: BinTreeArray | null,
    rightChild?: BinTreeArray | null
];

export class TreeInput extends React.Component<TreeInputProps, TreeInputState>{
    constructor(props: TreeInputProps) {
        super(props);
        this.state = {
            treeText: ""
        }
    }

    /**
     * Converts array format binary tree notation to BinTreeNode data structure
     * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
     * @returns TreeNode format
     * */
    parseArrayToTree = (arrayFormat: BinTreeArray) : BinTreeNode => {
        // Save arrayFormat array length
        const arrayLength = arrayFormat.length;
    
        if (arrayLength === 2) { // If the tree node has 2 elements
            const [root, leftChild] = arrayFormat;
    
            // If left element is null, then the node has no children
            if (!leftChild) {
                return new BinTreeNode(root, null, null);
            } else { // If not, then we call parseArrayBinTree to create the left node
                return new BinTreeNode(root, this.parseArrayToTree(leftChild), null);
            }
        } else if (arrayLength === 3) { // If the tree node has 3 elements
            const [root, leftChild, rightChild] = arrayFormat;
    
            // If the left and right elements are null
            if (!leftChild && !rightChild) {
                return new BinTreeNode(root, null, null);
            } else if (!leftChild && rightChild) { // If left is null, but right is an array
                return new BinTreeNode(root, null, this.parseArrayToTree(rightChild));
            } else if (leftChild && !rightChild) { // If left is an array, but right is null
                return new BinTreeNode(root, this.parseArrayToTree(leftChild), null);
            } else if (leftChild && rightChild){ // If both left and right are an array
                return new BinTreeNode(root, this.parseArrayToTree(leftChild), this.parseArrayToTree(rightChild));
            }
        }
        
        // If the tree node has no children, array has only one element
        const [root] = arrayFormat;
        return new BinTreeNode(root, null, null);
    }

    convert = () => {
        // After you implement parseArrayToTree above, uncomment the below code
        let treeArrayFormat: BinTreeArray = JSON.parse(this.state.treeText);
        this.props.onChange(this.parseArrayToTree(treeArrayFormat));
    }

    render() {

        return (
            <div>
                <button onClick={this.convert}>Process</button><br />
                <textarea rows={5} cols={120} onChange={(ev) => {
                    this.setState({
                        treeText: ev.target.value
                    })
                }}></textarea>
            </div>
        )
    }
}