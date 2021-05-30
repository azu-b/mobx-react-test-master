import React from 'react';
import Files from 'react-files';

interface TreeSourceState {
    jsonFile: {}
}

interface FileError {
    code: number;
    message: string;
}

export class TreeSource extends React.Component<{}, TreeSourceState> {
    fileReader: FileReader;

    constructor(props: any) {
        super(props);
        this.state = {
            jsonFile: {}
        }

        this.fileReader = new FileReader();

        this.fileReader.onload = (event: any) => {
            const parsedFile = event!.target!.result;
            if (parsedFile) {
                const fileAsJSON = JSON.parse(parsedFile);
                this.setState({
                    jsonFile: fileAsJSON,
                }, () => console.log(this.state.jsonFile))
            }

        };
    }

    onFilesError = (error: FileError, _file: File) => {
        console.log(`error code ${error.code}: ${error.message}`)
    }

    render() {
        return (
            <div>
                <Files
                    className="files-dropzone"
                    onChange={(file: File[]) => this.fileReader.readAsText(file[0])}
                    onError={this.onFilesError}
                    accepts={['.json']}
                    maxFileSize={1000000}
                    minFileSize={0}
                    clickable
                >
                    <button>Choose JSON file with the array</button>
                </Files>
            </div>
        );
    }
}