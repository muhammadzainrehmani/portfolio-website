// Gemini api call code

import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "https://esm.run/marked";

let samplePromptsShown = true; // Flag to track if sample prompts are shown
let firstMessageSent = false; // Flag to track the first message

const genAI = new GoogleGenerativeAI("AIzaSyCRvWyiexLtAbHAfPHSq2TRXncODn4Ab0A");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Display Message

function displayMessage(message, sender) {
  const chatWindow = document.getElementById("chat-window-brd");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message-brd", sender);

  // Add image based on sender
  let imageHTML = "";
  if (sender === "user") {
    imageHTML = `<img src="/assets/img/user.svg" alt="User" class="message-icon-brd">`;
  } else if (sender === "bot-brd") {
    imageHTML = `<img src="/assets/img/chatbot.svg" alt="Bot" class="message-icon-brd">`;
  }

  messageDiv.innerHTML = `${imageHTML} ${message}`;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Popup js

function toggleChat() {
  const chatPopup = document.getElementById("chat-popup-brd");
  const chatIcon = document.getElementById("chat-icon-brd");

  if (chatPopup.style.display === "none") {
    chatPopup.style.display = "block";
    chatIcon.style.display = "none";
  } else {
    chatPopup.style.display = "none";
    chatIcon.style.display = "block";
  }
}

// Send Message function

async function sendMessage(userMessage) {
  const predefinedContext = {
    companyContext: `As Zain's AI Assistant, I'm here to help you connect with Muhammad Zain regarding his expertise in Generative AI, Computer Vision, and Audio & Speech solutions. How can I assist you today?
	
    1. Begin the conversation with a friendly greeting, ask for the user’s name, and inquire how you can assist them with their Generative AI, Computer Vision, and Audio & Speech solutions needs. Use the friendly greeting only in the first response. If the user directly asks about a specific need, skip introductions and provide a direct response to their query.
    2. Provide clear, accurate, and concise information on Muhammad Zain services and about.
    3. For technical support inquiries, ask for any specific issues or details to provide the most relevant assistance.
    4. Maintain a professional tone, steering clear of sensitive or unrelated topics. Gently redirect the conversation if it veers off topic.
    5. Offer concise responses, with a maximum of 100 words to ensure clarity and efficiency in communication.
    6. Muhammad Zain graduated in 2025 with a B.Sc. in Computer Systems Engineering from Quaid-e-Awam University, specializes in Generative AI, Computer Vision, and Audio & Speech, and works as an AI Developer at Qonkar Technologies.
    7. Over a year of professional experience delivering Generative AI, Computer Vision, Audio & Speech, with 10+ completed projects. 
    8. Key Skills: Generative AI, Computer Vision, Audio & Speech, Data Science, NLP & Chatbot Development; LLMs (OpenAI, Gemini, Claude, open-source), LangChain & LangGraph, vector databases; ML/DL (TensorFlow, PyTorch, Hugging Face), and CV/audio tools (OpenCV, YOLO, SAM, CLIP, speech/STT/TTS pipelines).
    9. Healthcare AI Research: Actively researching the application of Generative AI in healthcare as part of his Final Year Design Project.
    10. Specializes in:
    Generative AI Solutions: Custom chatbots, virtual assistants, multimodal GenAI apps (text, code, image, speech, video), knowledge-grounded QA systems, RAG pipelines, agent workflows, fine-tuning, and prompt engineering.
    Computer Vision Solutions: Real-time object detection, segmentation, tracking, OCR, video intelligence, and edge-based low-latency vision systems for industries like retail, manufacturing, and healthcare.
    Audio & Speech Solutions: Conversational AI, real-time transcription, multilingual speech-to-text, captioning, voice cloning, TTS, and multimodal audio-visual analytics for smarter decision-making.
    11. Contact: Reach out via email at muhammadzain.rehmani@gmail.com or phone at +923133592819. Located in Sindh, Pakistan.
    
    Remember, your primary goal is to support clients and team members, enhance their understanding of Muhammad Zain's expertise and solutions, and reinforce his commitment to excellence and innovation.
    `,
  };

  const fullPrompt = `User Input: ${userMessage}, This is the predefined context: ${predefinedContext.companyContext}`;

  displayMessage(userMessage, "user");

  // Modify the send button to show a loading indicator

  const sendButton = document.getElementById("send-button-brd");
  const originalButtonContent = sendButton.innerHTML;
  sendButton.innerHTML = `<div class="loading-spinner-brd"></div>`;
  sendButton.disabled = true;
  try {
    const parameters = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const result = await model.generateContent(fullPrompt, parameters); // Pass the parameters object here
    const markdownResponse = result.response.text();
    const htmlResponse = marked(markdownResponse);
    displayMessage(htmlResponse, "bot-brd");
  } catch (error) {
    console.error("Error fetching response from Gemini:", error);
    displayMessage(
      "I'm having trouble understanding you. Please try again.",
      "bot-brd"
    );
  } finally {
    // Restore the original button content
    sendButton.innerHTML = originalButtonContent;
    sendButton.disabled = false; // Re-enable button
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Wait for DOM to load
  const chatIcon = document.getElementById("chat-icon-brd");
  const closeButton = document.getElementById("close-chat-brd");
  const sendButton = document.getElementById("send-button-brd");
  const userInput = document.getElementById("user-input-brd");

  chatIcon.addEventListener("click", toggleChat);
  closeButton.addEventListener("click", toggleChat);

  sendButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message !== "") {
      sendMessage(message);
      userInput.value = ""; // Clear input
    }
  });

  userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const message = userInput.value.trim();
      if (message !== "") {
        sendMessage(message);
        userInput.value = "";
      }
    }
  });

  // Add event listener for sample prompts hide sample prompt when user click on it

  const promptButtons = document.querySelectorAll(".prompt-button-brd");
  promptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.prompt;
      sendMessage(prompt);
      if (samplePromptsShown) {
        document.getElementById("sample-prompts-brd").style.display = "none";
        samplePromptsShown = false;
        document.getElementById("chat-window-brd").style.height = "39vh"; // Change height here
      }
    });
  });

  // when user send the message throw input field hide the prompt

  sendButton.addEventListener("click", () => {
    if (!firstMessageSent) {
      document.getElementById("sample-prompts-brd").style.display = "none";
      document.getElementById("chat-window-brd").style.height = "39vh";
      firstMessageSent = true;
    }
  });

  userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const message = userInput.value.trim();
      if (!firstMessageSent) {
        document.getElementById("sample-prompts-brd").style.display = "none";
        document.getElementById("chat-window-brd").style.height = "39vh";
        firstMessageSent = true;
      }
    }
  });

  // delete icon when click than remove the conversation

  const deleteButton = document.getElementById("delete-chat-brd");
  deleteButton.addEventListener("click", clearChat);

  function clearChat() {
    const chatWindow = document.getElementById("chat-window-brd");
    chatWindow.innerHTML = ""; // Clear the chat window content
    document.getElementById("sample-prompts-brd").style.display = "block";
    samplePromptsShown = true;
    firstMessageSent = false;
    document.getElementById("chat-window-brd").style.height = "0vh";
    // Change height here
  }
});
