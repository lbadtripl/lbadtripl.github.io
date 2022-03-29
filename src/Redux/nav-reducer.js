let initialState= {
    friendsList: [
        { id: "2", name: "Sasha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSxDCAlgsOq4JsYxNAewwgeReEo4pu05w4bQ&usqp=CAU" },
        { id: "3", name: "Pasha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaFd0FvKJlXESbpMMjZM1Fe05-kVR5QeDJw&usqp=CAU" }
    ]
}

const navReducer = (state=initialState, action) => {
            return state;  
}

export default navReducer;