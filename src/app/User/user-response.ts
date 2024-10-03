export interface UserResponse {
  code: string;
  message: string;
  data: {
    id: number;
    username: string;
    password: string;
    token: string | null;
  };
}

