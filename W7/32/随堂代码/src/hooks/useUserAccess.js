
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Snackbar from '@mui/material/Snackbar';
import { supabase } from "../utils/index";


export const useUserAccess = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);


  const { user } = JSON.parse(localStorage.getItem('sb-rsvokvjzqdsfxyxobrks-auth-token') || '{}');
  const { id: userId } = user;

  useEffect(() => {

    supabase.functions.invoke(`user-expansion-crud/${userId}`, {
      method: 'GET'
    }).then(response => {
      const { data, error } = response
      if (error) {
        setLoading(false);
        console.error('Error fetching access:', error);
      } else {
        // 设置权限列表，如果 access 为 null 则设置为空数组
        setList(data?.access || []);
        setLoading(false);
      }
    })


  }, [userId]);


  const check = (key) => {
    return new Promise((resolve, reject) => {
      if (list.includes(key)) {
        resolve()
      } else {
        const snackbarContainer = document.createElement('div')
        ReactDOM.render(<Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open
          message={`你没有${key}权限`}
        />,
          document.body.appendChild(snackbarContainer)
        )
        setTimeout(() => {
          snackbarContainer.remove()
        }, 3000)
        reject(`你没有${key}权限`)
      }

    })
  }

  return [
    loading,
    list,
    check
  ]
}