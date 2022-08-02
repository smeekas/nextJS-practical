import create from "zustand";
import { getToken } from "../helper/localStorage";
import { SinglePostType } from "../pages";
interface PostStoreType {
  posts: SinglePostType[];
  setPosts: (arg0: SinglePostType[]) => void;
  addPost: (arg0: SinglePostType) => void;
  deletePost: (arg0: string) => void;
}
const useMyPostStore = create<PostStoreType>()((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ posts: posts })),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (postId) =>
    set((state) => {
      return {
        posts: state.posts.filter((post) => {
          return post._id !== postId;
        }),
      };
    }),
}));

export default useMyPostStore;
