import { IObservable, IObservableValue } from "mobx";
import { BinTreeNode } from "./TreeNode";

interface IAppState {
    title: string;
    bodyMessage: string;
    treeNode: BinTreeNode;
    arrayFormatString: string;
    
    setState(newState: IAppState);
    smallestDeepestBinTreeNode: BinTreeNode;
}