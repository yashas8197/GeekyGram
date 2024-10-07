import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePostApi, setPost } from "@/utils/postSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { EditPostDialog } from "../EditPostDialog/EditPostDialog";
import { toast } from "@/hooks/use-toast";

const PostToolBar = ({ post }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const editPost = () => {
    setIsDialogOpen(true);
    dispatch(setPost(post));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="edit">
            <i className="bi bi-three-dots"></i>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => editPost(post)}>
            Edit Post
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              dispatch(deletePostApi(post._id));
              toast({
                description: "Post Deleted Successfully",
                variant: "destructive",
                duration: 900,
              });
            }}
          >
            Delete Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDialogOpen && (
        <EditPostDialog
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
        />
      )}
    </>
  );
};

export default PostToolBar;
