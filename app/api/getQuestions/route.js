// pages/api/parse-html.js
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import axios from "axios";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    // let count = 8
    let TotalQuestion = [];

    for (let c = 1; c <= 0; c++) {
      const dataSet = await axios.get(
        "https://iasbaba.com/wp-json/wp/v2/posts?per_page=100&page=" +
          c +
          "&categories=1066"
      );
      // const dataSet = await axios.get(
      //   "https://www.insightsonindia.com/wp-json/wp/v2/posts?per_page=100&page=" +
      //     c +
      //     "&categories=238403627"
      // );

      console.log("🚀 ~ GET c:", c);
      // let quesIndex = 0;
      for (let quesIndex = 0; quesIndex < 100; quesIndex++) {
        console.log("🚀 ~ GET ~ quesIndex:", quesIndex);
        const dom = new JSDOM(dataSet.data[quesIndex].content.rendered);
        const document = dom.window.document;

        let quizData = [];
        const questions = document.querySelectorAll(".wpProQuiz_question_text");
        const optionsDom = document.querySelectorAll(".wpProQuiz_questionList");
        const solutionTextmain =
          document.querySelectorAll(".wpProQuiz_correct");

        if (questions.length == 0) {
          continue;
        }
        const solutions = document.querySelector("script");
        const str = solutions.textContent.trim();
        let jsonStart = str.indexOf("json: {") + "json: {".length - 1;
        let jsonEnd = str.indexOf("}}", jsonStart) + 2;

        // // Extract and parse the JSON object
        let jsonString = str.substring(jsonStart, jsonEnd);
        let jsonObject = JSON.parse(jsonString);

        for (let i = 0; i < questions.length; i++) {
          let options = optionsDom[i].textContent
            .trim()
            .split(/\s*\n\s*|\s{2,}/)
            .filter(Boolean);
          const id = optionsDom[i].getAttribute("data-question_id");
          quizData.push({
            questionId: id,
            correctOption: jsonObject[id].correct.indexOf(1),
            text: questions[i].innerHTML.trim(),
            options: options,
            solutionTextmain: solutionTextmain[i].innerHTML.trim(),
          });
        }
        TotalQuestion.push({
          link: dataSet.data[quesIndex].link,
          title: dataSet.data[quesIndex].title.rendered,
          questions: quizData,
        });
      }
    }

    return NextResponse.json({ TotalQuestion }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
