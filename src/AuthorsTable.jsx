import React, { useState } from "react";
export const AuthorsTable = ({ authors = [], onDelete, onEdit }) => {
  const [editID, seteditID] = useState(null);
  const [name, setname] = useState("");
  const [surname, setsurame] = useState("");

  //Edit Author
  const EditAuthor = (author) => {
    seteditID(author.id);
    setname(author.name);
    setsurame(author.surname);
  };
  const saveAuthor = () => {
    onEdit(editID, name, surname);
    seteditID(null);
  };

  //Authors Table
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Available actions</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>
              {editID === author.id ? (
                <input
                  type="text"
                  value={name}
                  onChange={(edit) => setname(edit.target.value)}
                />
              ) : (
                author.name
              )}
            </td>
            <td>
              {editID === author.id ? (
                <input
                  type="text"
                  value={surname}
                  onChange={(edit) => setsurame(edit.target.value)}
                />
              ) : (
                author.surname
              )}
            </td>
            <td>
              {editID === author.id ? (
                <>
                  <button onClick={saveAuthor}>Save</button>
                  <button onClick={() => seteditID(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => EditAuthor(author)}>Edit</button>
                  <button onClick={() => onDelete(author.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
