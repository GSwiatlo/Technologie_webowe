import { useEffect, useState } from "react";
import { AddAuthor } from "./AddAuthor";
import { AuthorsTable } from "./AuthorsTable";
import "./styles.css";

export default function App() {
  const [authors, setAuthors] = useState([]);

  //Add Author
  const handleAddAuthor = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const surname = event.target.surname.value;

    fetch(`http://localhost:8000/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setAuthors((prevAuthors) => [...prevAuthors, data]);
        }
      });
  };
  //Delate Author
  const handleDeleteAuthor = (id) => {
    fetch(`http://localhost:8000/authors/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== id)
        );
      }
    });
  };
  //Edit Author
  const handleEditAuthor = (id, name, surname) => {
    fetch(`http://localhost:8000/authors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    })
      .then((res) => res.json())
      .then((newAuthor) => {
        setAuthors((prevAuthors) =>
          prevAuthors.map((author) => (author.id === id ? newAuthor : author))
        );
      });
  };

  //Load Data
  useEffect(() => {
    fetch(`http://localhost:8000/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  return (
    <div className="app">
      <h1>Authors app</h1>
      <div style={{ marginBottom: "60px" }}>
        <AddAuthor onAdd={handleAddAuthor} />
      </div>
      <h2> Existing authors </h2>
      <AuthorsTable
        authors={authors}
        onDelete={handleDeleteAuthor}
        onEdit={handleEditAuthor}
      />
    </div>
  );
}
