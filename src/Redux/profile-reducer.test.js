import profileReducer, { addPostActionCreator } from "./profile-reducer";


it('length of posts should be incremented', () => {
    // 1. test data
    let state = {
        posts: [
            { id: "1", message: "Hello world!", likeCounts: " 3" },
            { id: "2", message: "Hi, its me!", likeCounts: " 5" }
        ]
    }
    let action = addPostActionCreator("it-kamasutra.com")
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(5)
}); 