import React from "react";
import Files from "react-files";
import { observer } from "mobx-react";
import { IAppState } from "./IAppState";
import { useAppStateContext } from "./AppState";

interface TreeSourceProps {
    appState: IAppState;
}

interface FileError {
    code: number;
    message: string;
}

const TreeSourceRenderer: React.FunctionComponent<TreeSourceProps> = observer((props) => {
    const fileReader = new FileReader();

    fileReader.onload = (event: any) => {
        const parsedFile = event!.target!.result;
        if (parsedFile) {
            props.appState.setState({
                ...props.appState,
                arrayFormatString: parsedFile,
            });
        }
    };

    const onFilesError = (error: FileError, _file: File) => {
        console.log(`Error code ${error.code}: ${error.message}`);
    };

    return (
        <div>
            <Files
                className="files-dropzone"
                onChange={(file: File[]) => fileReader.readAsText(file[0])}
                onError={onFilesError}
                accepts={[".json"]}
                maxFileSize={1000000}
                minFileSize={0}
                clickable
            >
                <button>Choose JSON file with the array</button>
            </Files>
            {props.appState.arrayFormatString !== ""
                ? <p>File content: {props.appState.arrayFormatString}</p>
                : <p>No JSON file uploaded yet</p>
            }
        </div>
    );
}
);

export const TreeSource: React.FunctionComponent<{}> = (_props) => {
    const appState = useAppStateContext();
    return <TreeSourceRenderer appState={appState} />
};
