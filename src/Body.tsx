import * as React from 'react';
import { IAppState } from "./IAppState";
import { observer } from "mobx-react";
import { TreeSource } from "./TreeSource";
import { TreeInput } from './TreeInput';
import { TreeOutput } from './TreeOutput';
import "./Body.scss"
import { useAppStateContext } from './AppState';
interface BodyProps {
    appState: IAppState
}

const BodyRenderer: React.FunctionComponent<BodyProps> = observer((props) => {
    return (
        <main className="App-body">
            {props.appState!.bodyMessage}
            <TreeSource />
            <TreeInput
                onChange={(newVal) => {
                    props.appState.setState({
                        ...props.appState,
                        treeNode: newVal
                    })
                }}
                appState={props.appState}
            />
            <div className="OutputContainer">
                <TreeOutput
                    treeNode={props.appState.treeNode}
                    smallestDeepestBinTreeNode={props.appState.smallestDeepestBinTreeNode}
                />
            </div>
        </main>
    );
})

export const Body: React.FunctionComponent<{}> = (props) => {
    const appState = useAppStateContext();
    return <BodyRenderer appState={appState} />
}

export default Body;