export type LogInType = {
    signedIn: boolean;
};

export type ModalType = {
    isShown: boolean;
};

export type UserStateType = {
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  pathName: string;
  userProfileDetail: UserDetailType;
  userUpdateKey: number;
  loading: boolean;
  expirationTime: number;
};

export type UserDetailType = {
  username?: string | null;
  mobile?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  nationalCode?: string | null;
  cardNumber?: string | null;
  shebaNumber?: string | null;
  id: number;
};