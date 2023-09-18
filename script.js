import React, {
useRef,
useState,
useEffect } from
"https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";

import gsap from "https://cdn.skypack.dev/gsap";

// Questões

const questions = [
{
  id: 0,
  text: "O que significa CSS?",
  answers: [
  "Computer Style Sheets",
  "Cascading Style Sheets",
  "Creative Style Sheets",
  "Colorful Style Sheets"],

  correct: 1,
  selection: null },

{
  id: 1,
  text:
  "A propriedade em CSS usada para alterar a cor de fundo de um elemento é?",
  answers: ["bgcolor", "color", "background-color", "Tudo o que precede"],
  correct: 2,
  selection: null },

{
  id: 2,
  text: "A propriedade em CSS usada para alterar a cor do texto de um elemento é?",
  answers: ["bgcolor", "color", "background-color", "Tudo o que precede"],
  correct: 1,
  selection: null },

{
  id: 3,
  text: "A propriedade CSS usada para controlar o tamanho da fonte do elemento é?",
  answers: ["text-style", "font-style", "text-size", "font-size"],
  correct: 3,
  selection: null },

{
  id: 4,
  text: "O atributo HTML usado para definir os estilos embutidos é?",
  answers: ["style", "inline", "class", "Nenhuma das acima"],
  correct: 0,
  selection: null },

{
  id: 5,
  text: "Os valores negativos são permitidos na propriedade padding?",
  answers: ["sim", "Não", "Depende do HTML", "Nenhuma das acima"],
  correct: 1,
  selection: null },

{
  id: 6,
  text:
  "A propriedade CSS usada para especificar se o texto é escrito na direção horizontal ou vertical?",
  answers: ["word-break", "text-transform", "writing-mode", "text-direction"],
  correct: 2,
  selection: null },

{
  id: 7,
  text: "Qual seletor é usado para especificar um estilo para um elemento exclusivo?",
  answers: ["class", "attribute", "text", "id"],
  correct: 3,
  selection: null },

{
  id: 8,
  text:
  "Qual das alternativas a seguir é a sintaxe correta para selecionar os p irmãos de um elemento div?",
  answers: ["p", "div + p", "div p", "div ~ p"],
  correct: 3,
  selection: null },

{
  id: 9,
  text: "Como você pode adicionar um comentário em um arquivo CSS?",
  answers: [
  "/* isso é um comentário */",
  "// isso é um comentário",
  "<!-- isso é um comentário -->",
  "** isso é um comentário **"],

  correct: 0,
  selection: null },

{
  id: 10,
  text:
  "Para alinhar um texto ao centro, usamos?",
  answers: ["text-align: center;", "text-center: true;", "align: center;", "align-items: center;"],
  correct: 0,
  selection: null },

{
  id: 11,
  text:
  "Para adicionar um efeito a um elemento quando o mouse passa sobre, usamos qual pseudo-classe?",
  answers: [":active{}", ":focus{}", ":hover{}", ":mouse-enter{};"],
  correct: 2,
  selection: null },

{
  id: 12,
  text:
  "Para adicionar sombra a um texto, usamos?",
  answers: ["shadow: 2px #888888;", "text-color: 2px #888888;", "text: shadow 3px 5px red;", "text-shadow: 2px 2px 2px #ff0000;"],
  correct: 3,
  selection: null },

{
  id: 13,
  text:
  "Para ocultar um elemento, usamos:?",
  answers: ["display: invisible;", "display: hidden;", "display: none;", "display: transparent;"],
  correct: 2,
  selection: null },

{
  id: 14,
  text:
  "Como devemos usar uma variável no CSS?",
  answers: ["color: var(variavel-cor);", "color: variavel-cor;", "variavel: (cor-fundo);", "Não existe variável no CSS"],
  correct: 0,
  selection: null },

{
  id: 15,
  text:
  "Qual pseudo-classe abaixo é invalido?",
  answers: [":root{}", ":nth-child{}", ":stroke{}", ":active{}"],
  correct: 2,
  selection: null },  
  
];



function useCounter(initialState) {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(0);

  const add = () => setValue(value => value += 1);

  return { value, add, reset };
}

function Question({
  data,
  buttonText,
  hasButton = true,
  onQuestionButtonClick,
  showAnswer = false,
  markSelection = null })
{
  const [answer, setAnswer] = useState(null);
  const parseValue = value => value ? parseInt(value.split("-")[1]) : null;
  const questionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
    questionRef.current.querySelector(".question-text"),
    {
      x: 40,
      opacity: 0 },

    {
      x: 0,
      opacity: 1,
      duration: 0.4 });


    gsap.fromTo(
    questionRef.current.querySelectorAll("li"),
    {
      opacity: 0,
      x: 40 },

    {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1 });


  }, [data]);

  return /*#__PURE__*/(
    React.createElement("div", { className: "question", ref: questionRef }, /*#__PURE__*/
    React.createElement("div", { className: "question-inner" }, /*#__PURE__*/
    React.createElement("h2", { className: "question-text" }, data.text), /*#__PURE__*/
    React.createElement("ul", { className: "question-answers" },
    data.answers.map((text, index) => {
      const value = `q${data.id}-${index}`;
      return /*#__PURE__*/(
        React.createElement("li", {
          className:
          index === data.correct && showAnswer ? "is-true" : "",

          "data-selected": markSelection === index ? true : null }, /*#__PURE__*/

        React.createElement("input", {
          type: "radio",
          name: `q_${data.id}`,
          value: value,
          id: value,
          onChange: e => setAnswer(e.target.value),
          checked:
          !showAnswer ? answer === value : markSelection === index }), /*#__PURE__*/


        React.createElement("label", { className: "question-answer", htmlFor: value },
        text)));



    }))),


    hasButton && /*#__PURE__*/
    React.createElement("button", {
      className: "question-button",
      onClick: () => onQuestionButtonClick(parseValue(answer), data) },

    buttonText)));




}

function Results({ wrong, correct, empty }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "result" }, /*#__PURE__*/
    React.createElement("div", { className: "result-item is-correct" }, /*#__PURE__*/
    React.createElement("span", { className: "result-count" }, correct), /*#__PURE__*/
    React.createElement("span", { className: "result-text" }, /*#__PURE__*/
    React.createElement("svg", {
      width: "16",
      height: "16",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      className: "css-i6dzq1",
      viewBox: "0 0 24 24" }, /*#__PURE__*/

    React.createElement("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14" }), /*#__PURE__*/
    React.createElement("path", { d: "M22 4L12 14.01 9 11.01" })), "CORRETO")), /*#__PURE__*/




    React.createElement("div", { className: "result-item is-wrong" }, /*#__PURE__*/
    React.createElement("span", { className: "result-count" }, wrong), /*#__PURE__*/
    React.createElement("span", { className: "result-text" }, /*#__PURE__*/
    React.createElement("svg", {
      width: "16",
      height: "16",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      className: "css-i6dzq1",
      viewBox: "0 0 24 24" }, /*#__PURE__*/

    React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /*#__PURE__*/
    React.createElement("path", { d: "M15 9L9 15" }), /*#__PURE__*/
    React.createElement("path", { d: "M9 9L15 15" })), "ERRO")), /*#__PURE__*/




    React.createElement("div", { className: "result-item is-empty" }, /*#__PURE__*/
    React.createElement("span", { className: "result-count" }, empty), /*#__PURE__*/
    React.createElement("span", { className: "result-text" }, /*#__PURE__*/
    React.createElement("svg", {
      width: "16",
      height: "16",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      className: "css-i6dzq1",
      viewBox: "0 0 24 24" }, /*#__PURE__*/

    React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /*#__PURE__*/
    React.createElement("path", { d: "M8 12L16 12" })), "NÃO RESPONDEU"))));

}

function QuestionCorrection({ wrong, correct, empty }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "correction" },
    questions.map(question => {
      return /*#__PURE__*/(
        React.createElement(Question, {
          hasButton: false,
          markSelection: question.selection,
          showAnswer: true,
          data: question }));


    })));


}

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameSize, setGameSize] = useState({});
  const totalQuestion = questions.length - 1;
  const gameRef = useRef(null);
  const gameOverlayRef = useRef(null);

  const question = useCounter(0);
  const correct = useCounter(0);
  const wrong = useCounter(0);
  const empty = useCounter(0);

  const handleNewQuestionClick = (selectedValue, currQuestion) => {
    if (totalQuestion >= question.value) {
      if (selectedValue === currQuestion.correct) {
        correct.add();
      } else if (
      selectedValue !== null &&
      selectedValue !== currQuestion.correct)
      {
        wrong.add();
      } else {
        empty.add();
      }
      questions[currQuestion.id].selection = selectedValue;
      question.add();
    }
  };

  const resetSelection = () => {
    questions.forEach(q => q.selection = null);
  };

  const handleRestartClick = () => {
    setGameFinished(false);
    setGameStarted(false);
    resetSelection();
    question.reset();
    correct.reset();
    wrong.reset();
    empty.reset();
  };

  const indicatorBg = index => {
    if (question.value > index) {
      return "#fff";
    } else if (question.value === index) {
      return "#29b5d5";
    } else {
      return "rgba(255,255,255,.2)";
    }
  };

  useEffect(() => {
    if (gameStarted) {
      document.body.classList.add("game-started");
    } else {
      document.body.classList.remove("game-started");
    }
  }, [gameStarted]);

  useEffect(() => {
    if (question.value > totalQuestion) {
      gameRef.current.scrollTop = 0;
    }
  }, [question.value]);

  return /*#__PURE__*/(
    React.createElement("div", {
      className: "game",
      ref: gameRef,
      "data-game-started": gameStarted ? true : null,
      "data-game-finished": question.value > totalQuestion ? true : null }, /*#__PURE__*/

    React.createElement("div", { className: "intro" }, /*#__PURE__*/
    React.createElement("div", { className: "intro-inner" }, /*#__PURE__*/
    React.createElement("h1", { className: "intro-title" }, "CSS Quiz"),
    !gameStarted && /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("p", { className: "intro-desc" },
    `O teste contém ${questions.length} perguntas e não há limite de tempo.`), /*#__PURE__*/


    React.createElement("button", {
      className: "intro-button",
      onClick: () => setGameStarted(true) }, "Start Quiz")),





    gameStarted && /*#__PURE__*/
    React.createElement("div", { className: "indicator" },
    questions.map((q, index) => {
      return /*#__PURE__*/(
        React.createElement("span", {
          className: "indicator-item",
          style: {
            backgroundColor: indicatorBg(index) } }));



    })), /*#__PURE__*/


    React.createElement(Results, {
      wrong: wrong.value,
      correct: correct.value,
      empty: empty.value }), /*#__PURE__*/

    React.createElement("button", {
      className: "restart-button",
      onClick: () => handleRestartClick() }, "Restart Quiz"))), /*#__PURE__*/





    React.createElement("div", { className: "game-area" },
    questions[question.value] && /*#__PURE__*/
    React.createElement(Question, {
      data: questions[question.value],
      buttonText:
      question.value !== totalQuestion ? "Próxima questão" : "Concluir questionário",

      onQuestionButtonClick: handleNewQuestionClick }),



    !questions[question.value] && /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(QuestionCorrection, { data: questions })))));





}

render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#app"));