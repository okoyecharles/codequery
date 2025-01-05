import { HttpHeaders } from "@angular/common/http";
import Cookies from "js-cookie";

export const tokenName = 'codequery_session';

export const API_URL = 'https://codequery-api.vercel.app/api';

export const getAPIRoute = (route: string) => `${API_URL}/${route}`;

export const generateAuthHeaders = () => {
  const token = Cookies.get(tokenName);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });
  return headers;
}