import styles from "./Game.module.css";
import Letter from "./Letter/Letter";
import SmallLetter from "./SmallLetter/SmallLetter";
import { useState, useEffect } from "react";
import { words_en, words_fi } from "../data/words";
import { letters_en, letters_fi } from "../data/letters";

const Game = () => {
    const [gameWon, setGameWon] = useState(false);
    const [word, setWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState("");

    const getRandomWord = () => {
        const words = words_fi.filter(word => word.length === 5);
        return words[Math.floor(Math.random() * words.length)];
    }

    const handleLetterClick = (letter) => {
        if (guess.length < 5) setGuess(guess + letter);
    }

    const handleBackspaceClick = () => {
        if (guess.length > 0) setGuess(guess.substring(0, guess.length - 1));
    }

    const handleSubmit = () => {
        if (guess.length === 5) {
            setGuesses([...guesses, guess]);
            setGuess("");
            if (guess === word) {
                setGameWon(true);
            }
        }
    }

    // Generate random word on load
    useEffect(() => {
        setWord(getRandomWord());
    }, []);

    const keyPressHandler = (event) => {
        if (event.keyCode === 8 && guess.length > 0) setGuess(guess.substring(0, guess.length - 1));
        else if (((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === 192 || event.keyCode === 221 || event.keyCode === 222) && guess.length < 5) { setGuess(guess + event.key); }
        else if (event.keyCode === 13 && guess.length === 5) {
            setGuesses([...guesses, guess]);
            setGuess("");
            if (guess === word) {
                setGameWon(true);
            }
        }
    }

    // Keydown handler
    useEffect(() => {
        window.addEventListener("keydown", keyPressHandler);
        return () => {
            window.removeEventListener("keydown", keyPressHandler);
        }
    });

    return (
        <div className={styles.game}>
            <div className={styles.gameContainer}>
                <div className={styles.title}>Arvaa sana</div>
                <div className={styles.guide}>
                    Sininen: haettu sana sisältää kyseisen kirjaimen. Vihreä: kirjain on haetussa sanassa samassa kohdassa.
                </div>
                <div className={styles.wordGrid}>
                    {
                        guesses.slice(-4).map(guessed_word => {
                            const correct_word_as_array = word.toUpperCase().split("");
                            const word_as_array = guessed_word.toUpperCase().split("");
                            return word_as_array.map((letter, index) => {
                                const correctLetter = correct_word_as_array.includes(letter);
                                const correctSpot = correct_word_as_array[index] === letter;
                                return <Letter letter={letter} correctLetter={correctLetter} correctSpot={correctSpot} newGuess={false} />;
                            });
                        })
                    }
                    {
                        [...Array(5)].map((word, index) => {
                            return (
                                <Letter letter={guess[index]} currectLetter={null} correctSpot={null} newGuess={true} />
                            );
                        })
                    }
                </div>
                <div className={styles.letters}>
                    <div className={styles.lettersArea}>
                        {
                            letters_fi.map(letter => {
                                const used = guesses.findIndex(guess => guess.toUpperCase().split("").includes(letter)) !== -1;
                                const inWord = word.toUpperCase().split("").includes(letter);
                                return <SmallLetter press={() => handleLetterClick(letter)} letter={letter} used={used} inWord={inWord} />
                            })
                        }
                    </div>
                    <div className={styles.buttons}>
                        <div onClick={() => handleBackspaceClick()} className={`${styles.button} ${styles.backspace}`}>POISTA KIRJAIN</div>
                        <div onClick={() => handleSubmit()} className={`${styles.button} ${styles.submit}`}>LÄHETÄ</div>
                    </div>
                </div>
            </div>
            {
                gameWon &&
                <div className={styles.gameWon}>
                    Arvasit oikein! Sana oli <strong>{word}.</strong> Päivitä sivu ja yritä uudelleen!
                </div>
            }
        </div>
    )
}

export default Game;