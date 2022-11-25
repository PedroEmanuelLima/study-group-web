import axios from 'axios';
import passwordValidator from 'password-validator';

export const api: any = axios.create({
  // baseURL: `https://study-group-api.herokuapp.com/`,
  // baseURL: 'http://localhost:3001/',
  baseURL: 'https://study-group-api.onrender.com/',
  headers: {
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
  }
});

export const schema = new passwordValidator()
.is().min(8) // Minimum length 8
.is().max(100) // Maximum length 100
.has().uppercase() // Must have uppercase letters
.has().lowercase() // Must have lowercase letters
.has().not().spaces() // Should not have spaces
