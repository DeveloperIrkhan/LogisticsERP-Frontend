import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";

const AdminMenu = async () => {
  return (
    <div className="w-auto md:w-1/3 gap-4 flex items-center justify-end font-Jost">
      <SearchBar />
      <CartIcon />
      <FavoriteButton />
    </div>
  );
};

export default AdminMenu;
