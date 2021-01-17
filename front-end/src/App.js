import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

export const AuthContext = React.createContext(); 

const initialState = {
    isAuth: false,
    user: null,
    token: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuth: false,
                user: null
            };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <Header />
            <div className="App">{!state.isAuth ? <Login /> : <Home />}</div>
        </AuthContext.Provider>
    );
}
export default App;