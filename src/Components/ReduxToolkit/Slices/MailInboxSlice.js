import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let usermail;
export const getMailsFromFirebase = createAsyncThunk(
  "getMail/getMailsFromFirebase",
  async () => {
    try {
      usermail = JSON.parse(localStorage.getItem("userinfo")).userEmail;

      // url = `https://formail-boxanother-client-default-rtdb.firebaseio.com/mails.json`;

      const url = `https://mail-box-client-efeff-default-rtdb.firebaseio.com/${usermail}.json`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

// patch request for changing the databse read value using id
export const patchForUpdateReadValue = createAsyncThunk(
  "patch_read/patchForUpdateReadValue",
  async (id) => {
    try {
      const url = `https://mail-box-client-efeff-default-rtdb.firebaseio.com/${usermail}/${id}.json`;
      const res = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          read: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// delete request  when user click on the delete button
export const deleteRequestOnclick = createAsyncThunk(
  "delete-mail-on-click/deleteRequestOnclick",
  async (id) => {
    try {
      const url = `https://mail-box-client-efeff-default-rtdb.firebaseio.com/${usermail}/${id}.json`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return id;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getMailsFromANotherClient = createAsyncThunk(
  "getMailForsent/getMailsFromANotherClient",
  async () => {
    try {
      const url = `https://formail-boxanother-client-default-rtdb.firebaseio.com/mails.json`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const mailInboxSlice = createSlice({
  name: "mail",
  initialState: {
    dismailInbox: false,
    mailInboxCart: [],
    sentMailInbox: [],
    displaySentMail: false,
  },
  reducers: {
    displayMailReadbox(state) {
      state.dismailInbox = !state.dismailInbox;
    },
    Do_Not_display_SenMailAction(state) {
      state.displaySentMail = false;
    },
    display_SenMailAction(state) {
      state.displaySentMail = true;
    },
  },
  extraReducers: {
    [getMailsFromFirebase.fulfilled]: (state, action) => {
      state.mailInboxCart = [];
      let firebaseData = [];
      if (action.payload !== undefined) {
        for (let data in action.payload) {
          firebaseData.push({
            id: data,
            from: action.payload[data].from,
            to: action.payload[data].to,
            date: action.payload[data].date,
            mail: action.payload[data].mail,
            subject: action.payload[data].subject,
            time: action.payload[data].time,
            read: action.payload[data].read,
            userName: action.payload[data].userName,
          });
        }
      }
      state.mailInboxCart = firebaseData;
    },
    [getMailsFromFirebase.rejected]: (state, action) => {
      console.log("action.payload when rejected", action.error.message);
    },
    [getMailsFromANotherClient.fulfilled]: (state, action) => {
      let userName = JSON.parse(localStorage.getItem("userinfo")).userName;
      let mailboxdata = [];
      if (action.payload !== undefined) {
        for (let data in action.payload) {
          mailboxdata.push({
            id: data,
            from: action.payload[data].from,
            to: action.payload[data].to,
            date: action.payload[data].date,
            mail: action.payload[data].mail,
            subject: action.payload[data].subject,
            time: action.payload[data].time,
            read: action.payload[data].read,
            userName: action.payload[data].userName,
          });
        }
      }
      let filterval = mailboxdata.filter((item) => item.userName === userName);
      state.sentMailInbox = filterval;
    },
    [deleteRequestOnclick.fulfilled]: (state, action) => {
      state.mailInboxCart = state.mailInboxCart.filter(
        (item) => item.id != action.payload
      );
    },
  },
});
export const {
  displayMailReadbox,
  display_SenMailAction,
  Do_Not_display_SenMailAction,
} = mailInboxSlice.actions;
export default mailInboxSlice;
