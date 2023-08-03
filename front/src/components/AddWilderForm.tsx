import { SetStateAction, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_ALL_WILDERS } from "../graphql/getAllWilders";

const CREATE_WILDER = gql`
  mutation CREATE_WILDER($name: String!) {
    createWilder(name: $name) {
      name
    }
  }
`;

const AddWilderForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { data, refetch } = useQuery(GET_ALL_WILDERS);

  const [addData, { loading, error }] = useMutation(CREATE_WILDER, {
    onCompleted: data => {
      console.log("Added data:", data.addData);
      setInputValue("");
      refetch(); // Refetch the GET_WILDERS query after the deletion is completed
    },
    onError: error => {
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
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        data-cy="addBtn"
      />
      <button type="submit" disabled={loading} test-id="submitBtn">
        {loading ? "Adding..." : "Add Data Here"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default AddWilderForm;
