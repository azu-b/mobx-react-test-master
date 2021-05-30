import { IObservable, IObservableValue } from "mobx";

interface IAppState {
    title: string;
    bodyMessage: string;
    treeNode: BinTreeNode;
    arrayFormatString: string;
    
    setState(newState: IAppState)
}