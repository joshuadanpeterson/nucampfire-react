import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { CAMPSITES } from '../../app/shared/CAMPSITES';
import { mapImageURL } from "../../utils/mapImageURL";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const fetchCampsites = createAsyncThunk(
	"campsites/fetchCampsites",
	async () => {
		const querySnapshot = await getDocs(collection(db, "campsites"));
		const campsites = [];
		querySnapshot.forEach((doc) => {
			campsites.push(doc.data());
		});

		return campsites;
	}
);

const initialState = {
	campsitesArray: [],
	isLoading: true,
	errMsg: "",
};

const campsitesSlice = createSlice({
	name: "campsites",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchCampsites.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchCampsites.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.errMsg = "";
			state.campsitesArray = mapImageURL(action.payload);
		},
		[fetchCampsites.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.error ? action.error.message : "Fetch failed";
		},
	},
});

export const campsitesReducer = campsitesSlice.reducer;

export const selectAllCampsites = (state) => {
	return state.campsites.campsitesArray;
};

export const selectCampsiteById = (id) => (state) => {
	return state.campsites.campsitesArray.find(
		(campsite) => campsite.id === parseInt(id)
	);
};

export const selectFeaturedCampsite = (state) => {
	return {
		featuredItem: state.campsites.campsitesArray.find(
			(campsite) => campsite.featured
		),
		isLoading: state.campsites.isLoading,
		errMsg: state.campsites.errMsg,
	};
};
