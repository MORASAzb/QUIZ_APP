import { useState, useEffect } from 'react';
import './Quiz.css'
const Quiz = () => {
  const [total, setTotal] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerQuestion, setAnswerQuestion] = useState('');
  const [result, setResult] = useState({
    "score": 0,
    "correctAnswers": 0,
    "wrongAnswers": 0,
  });
  const [changeColorSelected, setChangeColorSelected] = useState(null);
  const [randomChoices, setRandomChoices] = useState([]);
  const numberTotal = (number) => (number > 9 ? number : `0${number}`)
  // eslint-disable-next-line no-unused-vars
  const [showRes, setShowRes] = useState(false)


  useEffect(() => {
    fetch('https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=10&difficulty=medium')
      .then(res => res.json())
      .then(data => {
        setTotal(data);
        console.log(data)
      });
  }, []);


  useEffect(() => {
    if (total.length > 0 && total[currentQuestion]) {
      const choices = total[currentQuestion].incorrectAnswers.concat(total[currentQuestion].correctAnswer);
      setRandomChoices(randomElementsOFArray(choices));
    }
  }, [total, currentQuestion]);


  const handleNextQuestion = () => {
    setChangeColorSelected(null)
    setResult((prev) =>
      answerQuestion
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1
        }
    )

    if (currentQuestion !== total.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setCurrentQuestion(0)
      setShowRes(true)
    }

  }

  const handleRestartQuestion = () => {
    setCurrentQuestion(0);
    setAnswerQuestion('');
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setShowRes(false);
  }

  const onAnswerSelect = (answer, index) => {
    setChangeColorSelected(index);
    setAnswerQuestion(answer === total[currentQuestion].correctAnswer);
    console.log(answer === total[currentQuestion].correctAnswer ? 'right' : 'wrong', currentQuestion, answerQuestion);
  };


  const randomElementsOFArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div >
      {!showRes  ? (

        <>
        <div className='my-5'>

          <span className="text-lg font-">{numberTotal(currentQuestion + 1)}</span>
          <span className="text-lg opacity-75">/{numberTotal(total.length)}</span>
        </div>
          {total.length > 0 && total[currentQuestion] && (
            <div>
              <div className='p-3 overflow-x-auto font-medium border border-black rounded-md '>

              <p key={total[currentQuestion].id}>
                {total[currentQuestion].question}
              </p>
              </div>
              <ul>
                {randomChoices.map((answer, index) => (
                  <li
                    key={index}
                    onClick={() => onAnswerSelect(answer, index)}
                    className={changeColorSelected === index ? 'selected-answer' : null}
                  >
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex content-center justify-center">

          <button
            onClick={handleNextQuestion}
            disabled={changeColorSelected === null}
            className='p-3 font-semibold border-2 border-black rounded-md active:bg-pink-300 disabled:cursor-not-allowed'
          >
            {currentQuestion === total.length - 1 ? 'FINISH' : 'NEXT'}
          </button>
          </div>

        </>
      ) : (
        <>
          <div className="result">
            <h1>RESULT</h1>
            <p>Total Questions <span>{total.length}</span></p>
            <p>Total Score : <span>{result.score}</span></p>
            <p>Correct Answers : <span>{result.correctAnswers}</span></p>
            <p>Wrong Answers : <span>{result.wrongAnswers}</span></p>
          </div>
          <div className="flex content-center justify-center">
            <button 
            onClick={handleRestartQuestion}
            className='p-3 m-3 font-semibold border-2 border-black rounded-md hover:bg-pink-400'
            >
              RESTART
            </button>
          </div>
        </>
      )
      }

    </div>
  );
};

export default Quiz;
