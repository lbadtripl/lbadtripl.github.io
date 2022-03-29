const addMessage = "ADD-MESSAGE";
export const addMessageActionCreator = (newMessageBody) => ({ type: addMessage, newMessageBody })


let initialState = {
    dialogs: [
        { id: "1", name: "Dymich", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8jZq4uBcSg4Yd4sbMBC5hUd7OFsVPG49ww&usqp=CAU" },
        { id: "2", name: "Sasha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSxDCAlgsOq4JsYxNAewwgeReEo4pu05w4bQ&usqp=CAU" },
        { id: "3", name: "Pasha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaFd0FvKJlXESbpMMjZM1Fe05-kVR5QeDJw&usqp=CAU" },
        { id: "4", name: "Valera", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5gXpk8DoJb5JdZn8qGVenl6LMZOzmIEvsgA&usqp=CAU" },
        { id: "5", name: "Anya", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYs5pjJL91GmWCY320ehmbGjILJt5ofZCmxA&usqp=CAU" }
    ],
    messages: [
        { id: "1", message: "Hello world!" },
        { id: "2", message: "How are u" },
        { id: "3", message: "Legendary!" },
        { id: "4", message: "Yo!" },
        { id: "5", message: "Yo!" }
    ],
}

const dialogReducer = (state = initialState, action) => {

    switch (action.type) {
        case addMessage:
            return {
                ...state,
                messages: [...state.messages, { id: "6", message: action.newMessageBody }]
            }

        default:
            return state;
    }
}

export default dialogReducer;