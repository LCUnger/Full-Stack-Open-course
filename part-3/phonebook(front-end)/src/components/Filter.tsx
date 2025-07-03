const Filter = ({
  filterText,
  setFilterText,
}: {
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <label>
      Search:
      <input
        type="text"
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
      />
    </label>
  );
};

export default Filter