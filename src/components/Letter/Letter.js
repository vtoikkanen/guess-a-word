import styles from "./Letter.module.css";

const Letter = ({ letter, correctLetter, correctSpot, newGuess }) => {
    return (
        <div className={`
            ${styles.letter}
            ${correctLetter && !correctSpot ? styles.correctLetter : ""}
            ${correctSpot ? styles.correctSpot : ""}
            ${newGuess ? styles.new : ""}    
        `}>
            {letter && letter.toUpperCase()}
        </div >
    )
}

export default Letter;