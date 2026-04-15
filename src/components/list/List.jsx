import Loading from "../loading/Loading";
import styles from "./List.module.css";

export default function List({ items, renderItem, isLoading, className }) {
  if (isLoading) return <Loading />;
  if (!items) return <p>No items found</p>;

  return (
    <ul className={`${styles[className]}`}>
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
