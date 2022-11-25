import React from 'react';
import { MdOutlineImage } from "react-icons/md";

import styles from '../styles/Components.module.css';

export default function ImageProfile({ onFileSelect, selectedFile }: any) {

    const handleFileInput = (e: any) => {
        onFileSelect(e.target.files[0]);
    }

    return(
        <div className={styles.contentImage}>
            <div className={styles.image}>
                <label htmlFor="arquivo">
                    {/* { selectedFile } */}
                    <MdOutlineImage className={styles.imageOrIcon} size={70}/>
                </label>
                <input
                    className={styles.inputFile}
                    type="file" accept="image/*"
                    name="arquivo" id="arquivo"
                    onChange={handleFileInput}
                />
            </div>
            <p className={styles.textLabel}>{selectedFile ? selectedFile.name : 'Adicionar Imagem'}</p>
        </div>
    )
};