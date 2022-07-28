import create from "zustand";
import { getToken } from "../helper/localStorage";
import { SinglePostType } from "../pages";
interface PostStoreType {
  posts: SinglePostType[];
  setPosts: (arg0: SinglePostType[]) => void;
  addPost: (arg0: SinglePostType) => void;
}
const useMyPostStore = create<PostStoreType>()((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ posts: posts })),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
}));

export default useMyPostStore;
