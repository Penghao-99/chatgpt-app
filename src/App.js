import { useState, useEffect } from "react";

const App = () => {
  const [prompt, setPrompt] = useState(null);
  const [message, setMessage] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const getMessages = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      };
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!currentTitle && prompt && message) {
      setCurrentTitle(prompt);
    }
    if (currentTitle && prompt && message) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: prompt,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);
  const createNewChat = () => {
    setMessage(null);
    setCurrentTitle(null);
    setPrompt(""); // why cannot set null?
  };
  console.log("prevChats:", prevChats);

  prevChats.map((message, index) => {
    console.log(message, index);
  });

  const currentChat = prevChats.filter(
    (prevChats) => prevChats.title === currentTitle
  );
  // console.log("currentChat:", currentChat);
  const prevChatsTitles = prevChats.map((message) => message.title);
  const unqiueSetTitles = new Set(prevChatsTitles);
  const unqiueArrayTitles = Array.from(unqiueSetTitles);
  function renderChatTitles() {
    return unqiueArrayTitles.map((title, index) => (
      <li key={index}>{title}</li>
    ));
  }
  const handleClick = (title) => {
    setCurrentTitle(title);
    setMessage(null);
    setPrompt("");
  };

  return (
    <div className="app">
      <section className="sidebar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {unqiueArrayTitles.map((title, index) => (
            <li key={index} onClick={() => handleClick(title)}>
              {title}
            </li>
          ))}
          {/* {renderChatTitles()} */}
        </ul>
        <nav>
          <p>Made by Peng Hao</p>
          <button>Rate my app!</button>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>PengGPT</h1>}
        <ul className="feed">
          {currentChat.map((message, index) => (
            <li key={index}>
              <p className="role">{message.role}:</p>
              <p>{message.content}</p>
            </li>
          ))}
          {!currentTitle && (
            <h4 className="start-chat">Start a chat with PengGPT!</h4>
          )}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></input>
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">7/4 version 10.22pm by Peng hao!</p>
        </div>
      </section>
    </div>
  );
};

export default App;
