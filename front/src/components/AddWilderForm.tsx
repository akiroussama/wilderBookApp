import { SetStateAction, useState } from "react";
import { gql, useMutation } from "@apollo/client";
const CREATE_WILDER = gql`
   mutation Mutation($name: String!) {
    createWilder(name: $name) {
        name
    }
}
`;

const AddWilderForm = () => {
  const [inputValue, setInputValue] = useState("");

  const [addData, { loading, error }] = useMutation(CREATE_WILDER, {
    onCompleted: (data) => {
      console.log("Added data:", data.addData);
      setInputValue("");
    },
    onError: (error) => {
      console.error("Error adding data:", error);
    },
  });

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addData({ variables: { name: inputValue } });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Data"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default AddWilderForm;
