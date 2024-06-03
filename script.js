import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyD5mX0yRLvanvZicir6kcC7JGQhBJ06nxY";
const genAI = new GoogleGenerativeAI(API_KEY);

const searchBox = document.getElementById("searchBox");
const sendButton = document.querySelector(".send-button");
let displayContainer = document.getElementById("displayContainer");
let count = 1;
const formElement = document.getElementById("formElement");

async function run() {
    displayContainer.style.alignItems = "start";

    let divUser = document.createElement("div");
    divUser.style.marginTop = "5px";
    divUser.classList.add("flex", "gap-4");
    divUser.innerHTML = `
        <img class="w-[30px] h-[30px] rounded-full hover:cursor-pointer" src="passport size.png" alt="" sizes="" srcset="">
        <div class="flex justify-center items-center text-white bg-[rgb(30,31,32)] px-[20px] py-[10px] rounded-lg">${searchBox.value}</div>
    `;
    displayContainer.append(divUser);
    const divBotHeight = displayContainer.clientHeight - divUser.clientHeight;
    window.scrollTo(0, divBotHeight);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = searchBox.value;
    searchBox.value = "";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const md = window.markdownit();
    let divBot = document.createElement("div");
    divBot.style.display = "flex";
    divBot.style.justifyContent = "center";
    divBot.style.marginTop = "5px";
    divBot.style.marginBottom = "15px";
    divBot.classList.add("flex", "gap-4");

    divBot.innerHTML = `
        <img class="w-[30px] h-[30px] rounded-full hover:cursor-pointer rotate-center" src="gemini_favicon.png" alt="" sizes="" srcset="">
        <div class="text-white bg-[rgb(30,31,32)] px-[20px] py-[10px] rounded-lg">${md.render(text)}</div>
    `;
    displayContainer.append(divBot);

    const divBotHeightNew = displayContainer.clientHeight - divBot.clientHeight;
    window.scrollTo(0, divBotHeightNew);
}

sendButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (count === 1) {
        displayContainer.innerText = "";
        count++;
    }
    run();
});

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    if (count === 1) {
        displayContainer.innerText = "";
        count++;
    }
    run();
});

let geminiBox = document.getElementById("geminiBox");
let geminiBoxContainer = document.getElementById("geminiBoxContainer");
let geminiBoxFlag = false;

geminiBox.addEventListener("click", () => {
    if (!geminiBoxFlag) {
        geminiBoxContainer.style.display = "block";
        geminiBoxFlag = true;
    } else {
        geminiBoxContainer.style.display = "none";
        geminiBoxFlag = false;
    }
});

const left_header = document.getElementById("left_header");
let left_header_container = document.getElementById("left_header_container");
let wider_left_header_content = document.querySelectorAll(".wider_left_header_content");
let fixedBars = document.getElementsByClassName("fixedBars")[0];
let left_header_flag = true;

left_header.addEventListener("click", () => {
    if (!left_header_flag) {
        left_header_container.style.width = "172px";
        fixedBars.style.width = "calc(100% - 172px)";
        
        setTimeout(() => {
            wider_left_header_content.forEach(element => {
                element.style.display = "block";
            });
        }, 1050);

        geminiBox.style.marginLeft = "0px";
        geminiBoxContainer.style.left = "15px";
        left_header_flag = true;
    } else {
        left_header_flag = false;
        geminiBox.style.marginLeft = "-90px";
        geminiBoxContainer.style.left = "-75px";
        left_header_container.style.width = "70px";
        fixedBars.style.width = "calc(100% - 70px - 102px)";
        wider_left_header_content.forEach(element => {
            element.style.display = "none";
        });
    }
});

let inputImage = document.getElementById("inputImage");
let iconInputImageBtn = document.getElementById("iconInputImageBtn");

iconInputImageBtn.addEventListener("click", () => {
    inputImage.click();
});
