import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import Wilder, { IWilderProps } from "./components/Wilder";

const GET_ALL_WILDERS = gql`
  query GetAllWilders {
    getAllWilders {
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

function App() {
  const dataManipulation = (dataFromApi: any) => {
    const newData: IWilderProps[] = dataFromApi.map(
      (wilder: { grades: []; name: string }) => {
        const cleanSkills = wilder.grades.map(
          (grade: { grade: number; skill: { name: string } }) => {
            return { title: grade.skill.name, votes: grade.grade };
          }
        );
        return { name: wilder.name, skills: cleanSkills };
      }
    );
    return newData;
  };
  const { loading, error, data } = useQuery(GET_ALL_WILDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <section className="card-row">
          {dataManipulation(data.getAllWilders).map((el, index) => (
            <Wilder
              key={index}
              name={el.name}
              city={el.city}
              skills={el.skills}
            />
          ))}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
