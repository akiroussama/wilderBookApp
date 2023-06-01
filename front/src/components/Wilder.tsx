import Skill, { ISkillProps } from "./Skill";
import blank_profile from "../assets/blank_profile.png";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ALL_WILDERS } from "../graphql/getAllWilders";
export interface IWilderProps {
  wilderId: number;
  name: string;
  city: string;
  skills: ISkillProps[];
}

const DELETE_WILDER = gql`
 mutation Mutation($deleteWilderId: Float!) {
  deleteWilder(id: $deleteWilderId)
}
`;
const Wilder = ({ wilderId, name, city, skills }: IWilderProps) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_WILDERS);

  const [deleteWilder] = useMutation(DELETE_WILDER, {
    onError: (error) => {
      console.error("Error deleting wilder:", error);
    },
    onCompleted: () => {
      refetch(); // Refetch the GET_WILDERS query after the deletion is completed
    },
  });

  // Call the mutation and provide the variable
  const handleDeleteWilder = (id: number) => {
    console.log("deleteWilderId", id);
    deleteWilder({ variables: { deleteWilderId: id } });
    // deleteWilder({ variables: { deleteWilderId: id } });
  };
  return (
    <article className="card">
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <h4>{city}</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map(({ title, votes }, index) => (
          <Skill key={index} title={title} votes={votes} />
        ))}
      </ul>
      <button onClick={() => handleDeleteWilder(wilderId)}>Delete</button>
    </article>
  );
};

export default Wilder;
