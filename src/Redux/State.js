import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: "1", message: "Hello world!", likeCounts: " 3" },
                { id: "2", message: "Hi, its me!", likeCounts: " 5" }
            ],
            newPostText: "it-kamasutra.coms"
        },
        messagesPage: {
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
            newMessageText: "it-kamasutra.com"
        },
        nav: {
            friendsList: [
                { id: "2", name: "Sasha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSxDCAlgsOq4JsYxNAewwgeReEo4pu05w4bQ&usqp=CAU" },
                { id: "3", name: "Pasha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaFd0FvKJlXESbpMMjZM1Fe05-kVR5QeDJw&usqp=CAU" }
            ]
        }
    },
    _callSubscriber() {
        console.log("State changed")
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogReducer(this._state.messagesPage, action)
        this._callSubscriber(this._state)
    }
}

export default store;