import { gql } from "@apollo/client";
export const GET_ALL_WILDERS = gql`
    query GetAllWilders {
        getAllWilders {
            id
            name
            grades {
                grade
                skill {
                    name
                }
            }
        }
   }
`;

export default GET_ALL_WILDERS;
