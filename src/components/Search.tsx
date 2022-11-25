import { useState, FunctionComponent } from "react";
import { MdSearch } from "react-icons/md";

import styles from "../styles/Components.module.css";

interface IPesquisa {
    setPesquisa: Function
}

const Search: FunctionComponent<IPesquisa>= ({ setPesquisa }) => {

    const [value, setValue] = useState('');

    const pesquisar = (e: any) => {
        e.preventDefault();
        setPesquisa(value);
    }
    return(
        <form  className={styles.search}>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                className={styles.inputSearch}
                placeholder="PESQUISAR GRUPO"
            />
            <button type="submit" onClick={pesquisar} className={styles.btnSearch}>
                <MdSearch size={30}/>
            </button>
        </form>
    )
};

export default Search;