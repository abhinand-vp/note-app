import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getFolder = createAsyncThunk("note/getFolder", async (reqData, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/folders`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


export const addFolder = createAsyncThunk("note/addFolder", async (reqData, { rejectWithValue }) => {
    try {
            let params = {
                name: reqData.name,
            }
            const { data } = await axios.post(`${BASE_URL}/folders`, params);
            return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

