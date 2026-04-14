import Loading from "./loading/Loading";

export default function List({ items, renderItem, isLoading }) {
  console.log("items:", items);
  console.log(isLoading);
  console.log(renderItem);
  if (isLoading) return <Loading />;
  if (!items?.length) return <p>No items found</p>;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
