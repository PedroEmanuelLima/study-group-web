import React, { FunctionComponent } from 'react';
import { MdPictureAsPdf } from 'react-icons/md';

import styles from '../styles/Components.module.css';

interface ISubmit {
    onFileSelect: Function,
    selectedFile: any
}

const SubmitDocument: FunctionComponent<ISubmit> = ({selectedFile, onFileSelect}) => {

    const handleFileInput = (e: any) => {
        onFileSelect(e.target.files[0]);
    }

    return(
            <div className={styles.pdf}>
                <label htmlFor="arquivo">
                    <MdPictureAsPdf size={70}/>
                </label>
                <input
                    className={styles.inputFile}
                    type="file" accept="application/pdf"
                    name="arquivo" id="arquivo"
                    onChange={handleFileInput}
                />
            </div>
    )
};

export default SubmitDocument;