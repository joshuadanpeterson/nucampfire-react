import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { COMMENTS } from '../../app/shared/COMMENTS';
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const fetchComments = createAsyncThunk(
	"comments/fetchComments",
	async () => {
		const querySnapshot = await getDocs(collection(db, "comments"));
		const comments = [];
		querySnapshot.forEach((doc) => {
			comments.push(doc.data());
		});
		return comments;
	}
);

export const postComment = createAsyncThunk(
	"comments/postComment",
	async (payload, { dispatch, getState }) => {
		setTimeout(() => {
			const { comments } = getState();
			payload.date = new Date().toISOString();
			payload.id = comments.commentsArray.length;
			dispatch(addComment(payload));
		}, 2000);
	}
);

const initialState = {
	commentsArray: [],
	isLoading: true,
	errMsg: "",
};

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		addComment: (state, action) => {
			const newComment = {
				id: state.commentsArray.length + 1,
				...action.payload,
			};
			state.commentsArray.push(newComment);
		},
	},
	extraReducers: {
		[fetchComments.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.errMsg = "";
			state.commentsArray = action.payload;
		},
		[fetchComments.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.error ? action.error.message : "Fetch failed";
		},
		[postComment.rejected]: (state, action) => {
			alert(
				"Your comment could not be posted\nError: " +
					(action.error ? action.error.message : "Fetch failed")
			);
		},
	},
});

export const commentsReducer = commentsSlice.reducer;

export const { addComment } = commentsSlice.actions;

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
	return state.comments.commentsArray.filter(
		(comment) => comment.campsiteId === parseInt(campsiteId)
	);
};
