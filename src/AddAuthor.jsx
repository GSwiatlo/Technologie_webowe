export const AddAuthor = ({ onAdd }) => (
  <div>
    <h2> Add a new author </h2>
    <form onSubmit={onAdd}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
      </div>

      <div>
        <label htmlFor="surname">Surname</label>
        <input id="surname" name="surname" />
      </div>
      <button>Add</button>
    </form>
  </div>
);
