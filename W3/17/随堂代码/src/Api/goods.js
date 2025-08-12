import axios from "axios"
const SUPER_SECRET_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdm9rdmp6cWRzZnh5eG9icmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzIyMzMsImV4cCI6MjA1NjY0ODIzM30.UJ2VDA7egsf0BkToUJWR6V236u9FZ1-0bY1a4K7u28Y"
export const getGoodsRecords = () => {
    return axios({
        method:'post',
        url:'/functions/v1/get-product-list',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPER_SECRET_KEY}`,
        },
        data: { 
            name: "Functions"
        }
    })
}

export const clearGoodsRecords = () => {
    return axios({
        method:'post',
        url:'/functions/v1/clear-product-records',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPER_SECRET_KEY}`,
        },
        data: { 
            name: "Functions"
        }
    })
}