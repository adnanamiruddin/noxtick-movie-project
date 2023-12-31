import { createSlice } from "@reduxjs/toolkit/dist";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listTickets: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("acsktkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("acsktkn", action.payload.token);
      }
      state.user = action.payload;
    },
    setListTickets: (state, action) => {
      state.listTickets = action.payload;
    },
    bookTickets: (state, action) => {
      state.listTickets = [action.payload, ...state.listTickets];
    },
    cancelTicket: (state, action) => {
      const { id } = action.payload;
      state.listTickets = [...state.listTickets].filter(
        (ticket) => ticket.id.toString() !== id.toString()
      );
    },
  },
});

export const { setUser, setListTickets, bookTickets, cancelTicket } =
  userSlice.actions;

export default userSlice.reducer;
