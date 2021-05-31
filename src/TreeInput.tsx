import * as React from "react";
import { BinTreeNode } from "./TreeNode";
import { IAppState } from "./IAppState";
import { ErrorMessage } from "./ErrorMessage";

export interface TreeInputProps {
    onChange: (newTreeNode: BinTreeNode) => void
    appState: IAppState;
}
interface TreeInputState {
    treeText: string;
    hasArrayError: boolean;
    hasJSONError: boolean;
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
            treeText: "",
            hasArrayError: false,
            hasJSONError: false,
        }
    }

    /**
     * Converts array format binary tree notation to BinTreeNode data structure
     * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
     * @returns TreeNode format
     * */
    parseArrayToTree = (arrayFormat: BinTreeArray) : any => {
        // Save arrayFormat array length
        const arrayLength = arrayFormat.length;

        if (arrayLength === 1){
            // If the tree node has no children, array has only one element
            const [root] = arrayFormat;
            return new BinTreeNode(root, null, null);
        }
    
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
        } else {
            // If array has more than 3 elements, it should throw an error
            throw Error;
        }
    }

    convert = () => {
        try {
            const treeArrayFormat = JSON.parse(this.props.appState.arrayFormatString);
            this.props.onChange(this.parseArrayToTree(treeArrayFormat));
            this.setState({
                ...this.state,
                treeText: JSON.stringify(this.props.appState.treeNode, null, 3),
                hasArrayError: false
            });
        } catch {
            this.setState({
                ...this.state,
                hasArrayError: true,
            })
        }
    };

    resetInputs = () => {
        this.props.appState.setState({
            ...this.props.appState,
            treeNode: new BinTreeNode("root", null, null),
            arrayFormatString: ""
        });

        this.setState({
            treeText: "",
            hasArrayError: false,
            hasJSONError: false,
        });
    }

    onChange = (ev: any) => {
        console.log("Enter on change");
        const changingText = ev.target.value;

        try {
            const binTreeNodeObject = JSON.parse(changingText);
            const newBinTreeNode = binTreeNodeObject;
            this.setState({
                ...this.state,
                hasJSONError: false,
                treeText: changingText,
            })

            this.props.appState.setState({
                ...this.props.appState,
                treeNode: newBinTreeNode
            })
        } catch {
            this.setState({
                ...this.state,
                hasJSONError: true,
                treeText: changingText,
            })
        }
    };

    render() {
        return (
            <div>
                <button onClick={this.convert} >Process</button>
                <button onClick={this.resetInputs}>Reset Inputs</button>
                <br />
                {this.state.hasArrayError &&
                    <ErrorMessage
                        message="Error: No file was uploaded or the file content is not valid."
                    />
                }
                {this.state.hasJSONError &&
                    <ErrorMessage
                        message={`Error: JSON text is not valid. Try the format: { "id": 1, "left": null, "right": { "id": 2, "left": null, "right": null}`}
                    />
                }
                <br/>
                <textarea
                    rows={20}
                    cols={120}
                    onChange={(ev) => this.onChange(ev)}
                    value={this.state.treeText}
                />
            </div>
        )
    }
}