import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getArchived = createAsyncThunk("note/getArchived", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const { data } = await axios.get(`${BASE_URL}/notes/archived`);
            return data;
        } else {
            const { data } = await axios.put(`${BASE_URL}/notes/${reqData}/archive`);
            return data;
        }

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


export const restoreArchive = createAsyncThunk("note/restoreArchive", async (reqData, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/notes/${reqData}/archive`);
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
