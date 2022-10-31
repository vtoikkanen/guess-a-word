import styles from "./SmallLetter.module.css";

const SmallLetter = ({ press, letter, used, inWord }) => {
    return (
        <div onClick={press} className={`${styles.smallLetter} ${inWord && used ? styles.inWord : ""} ${used && !inWord ? styles.used : ""}`}>
            {letter}
        </div>
    )
}

export default SmallLetter;