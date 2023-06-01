import React from "react";
import { useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";

const WILDER_ADDED_SUBSCRIPTION = gql`
  subscription {
    wilderAdded {
      id
      name
    }
  }
`;

const RecentlyAddedWilder = () => {
  const { data, loading } = useSubscription(WILDER_ADDED_SUBSCRIPTION);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log("data from subscription", data);
  if (!data || !data.wilderAdded) {
    return null;
  }

  const { id, name } = data.wilderAdded;

  return (
    <div>
      <h3>Recently Added Wilder</h3>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
    </div>
  );
};

export default RecentlyAddedWilder;
