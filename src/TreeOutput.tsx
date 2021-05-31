import * as React from "react";
import { BinTreeNode } from "./TreeNode";

import "./TreeOutput.scss"

export interface TreeOutputProps {
    treeNode: BinTreeNode | null;
    smallestDeepestBinTreeNode: BinTreeNode;
}

export const TreeOutput: React.FunctionComponent<TreeOutputProps> = (props) => {
    if (!props.treeNode || !props.treeNode.id) {
        return <div className="treeNode"></div>;
    }

    // See if current tree node id is equal to the one from the smallest deepest tree node
    const isSDBinTreeNode = props.treeNode.id === props.smallestDeepestBinTreeNode.id;
    const smallestDeepestBinTreeNodeId = isSDBinTreeNode ? "smallestBinTree": undefined;

    return (
        // Assign id to div is current node is the smallest deepest one
        <div className="treeNode" id={smallestDeepestBinTreeNodeId} >
            <div className="nodeId">{props.treeNode.id}</div>
            {props.treeNode.left || props.treeNode.right ?
                <div className="nodeChildren">
                    <TreeOutput
                        treeNode={props.treeNode.left}
                        smallestDeepestBinTreeNode={props.smallestDeepestBinTreeNode}
                    />
                    <TreeOutput
                        treeNode={props.treeNode.right}
                        smallestDeepestBinTreeNode={props.smallestDeepestBinTreeNode}
                    />
                </div> : null
            }
        </div>
    );
}