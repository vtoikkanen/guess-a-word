import styles from "./SmallLetter.module.css";

const SmallLetter = ({ letter, used, inWord }) => {
    return (
        <div className={`${styles.smallLetter} ${inWord && used ? styles.inWord : ""} ${used && !inWord ? styles.used : ""}`}>
            {letter}
        </div>
    )
}

export default SmallLetter;