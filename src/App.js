import React, { Component } from "react";
import { MdPeople } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import ChatItem from "./Components/ChatItem";
// import { MdOutlineEmojiEmotions } from "react-icons/md";
import "./App.css";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
const colors_list = ["#eb6e34", "#34eb52", "#eb34d5", "#3443eb", "#34ebd9"];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.messagesContainerRef = React.createRef();
  }

  state = { messagesList: [], showEmoji: false, message: "" };

  onChangeMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  onIncrementCount = (id) => {
    const { messagesList } = this.state;
    let x = messagesList.find((each) => each.id === id);
    x.likesCount = x.likesCount + 1;
    let updatedList = messagesList.map((each) => {
      if (each.id === id) return x;
      return each;
    });
    this.setState({ messagesList: updatedList });
  };

  submitMessage = (event) => {
    event.preventDefault();
    const { messagesList, message } = this.state;
    const randomInteger = getRandomInt(0, 5);
    const person = user_list[randomInteger];
    const col = colors_list[randomInteger];
    const item = {
      message: message,
      likesCount: 0,
      id: uuidv4(),
      person: person,
      color: col,
    };

    this.setState(
      { messagesList: [...messagesList, item], message: "" },
      () => {
        this.scrollToBottom();
      }
    );
  };

  scrollToBottom = () => {
    if (this.messagesContainerRef.current) {
      this.messagesContainerRef.current.scrollTop =
        this.messagesContainerRef.current.scrollHeight;
    }
  };

  toggleEmoji = () => {
    const { showEmoji } = this.state;
    this.setState({ showEmoji: !showEmoji });
  };

  render() {
    const { messagesList, message, showEmoji } = this.state;
    const display = showEmoji ? "flex" : "none";
    console.log(display);
    return (
      <div className="main-container">
        <div className="headings">
          <div>
            <h1 className="name">Company Chat</h1>
            <p className="tagline">This channel is for company wide chatter</p>
          </div>
          <div className="logo">
            <MdPeople size={40} className="mr" />
            <h2> | 100</h2>
          </div>
        </div>
        <div className="messages-container" ref={this.messagesContainerRef}>
          {messagesList.map((each, index) => (
            <ChatItem
              key={each.id}
              value={each}
              onIncrementCount={this.onIncrementCount}
            />
          ))}
        </div>

        <form className="row-alignment" onSubmit={this.submitMessage}>
          <input
            type="text"
            className="text-input"
            placeholder="Type Message"
            value={message}
            onChange={this.onChangeMessage}
          />

          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default App;
