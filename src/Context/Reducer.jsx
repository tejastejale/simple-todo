import React, { useReducer } from "react";

function Reducer() {
  const initialState = [
    { name: "John", age: 30 },
    { name: "ritesh", age: 20 },
  ];
  const reducer = (state, action) => {
    switch (action.type) {
      case "updatename":
        return state.map((person, index) =>
          index === action.index ? { ...person, name: action.payload } : person
        );
      case "updateage":
        return state.map((person, index) =>
          index === action.index ? { ...person, age: action.payload } : person
        );
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="bg-gray-200">
      {state.map((person, index) => (
        <div key={index}>
          <input
            value={person.name}
            placeholder="name"
            maxLength={5}
            onChange={(e) => {
              dispatch({
                type: "updatename",
                index: index,
                payload: e.target.value,
              });
            }}
          />
          <input
            value={person.age}
            placeholder="age"
            type="number"
            onChange={(e) => {
              dispatch({
                type: "updateage",
                payload: parseFloat(e.target.value),
                index: index,
              });
            }}
          />
        </div>
      ))}
      {state.map((person, index) => (
        <div key={index}>
          <p>{person.age}</p>
          <p>{person.name}</p>
        </div>
      ))}
      {console.log(state)}
    </div>
  );
}

export default Reducer;
