import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:3000/blogs");
      return await response.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchBlogDetails = createAsyncThunk(
  "blogs/fetchBlogDetails",
  async (id, thunkApi) => {
    try {
      const response = await axios.get(`http://localhost:3000/blogs?id=${id}`);
      return response.data[0];
    } catch (error) {
      throw thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (newBlog, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3000/blogs", newBlog);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  blogs: [],
  blog:null,
  error: null,
  isLoading: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(addBlog.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.blogs = [...state.blogs, action.payload];
      state.isLoading = false;
    });
    builder.addCase(addBlog.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
   
    builder.addCase(fetchBlogDetails.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchBlogDetails.fulfilled, (state, action) => {
      state.blog = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBlogDetails.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { } = blogSlice.actions;

export default blogSlice.reducer;
