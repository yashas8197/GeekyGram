import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SortPostsDropdown = ({ handleSelect, selectedOption }) => {
  return (
    <>
      <div className="flex justify-between px-3">
        <p>{selectedOption} Posts</p>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <i className="bi bi-sliders cursor-pointer"></i>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSelect("Trending")}>
              Trending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Oldest")}>
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Latest")}>
              Latest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default SortPostsDropdown;
