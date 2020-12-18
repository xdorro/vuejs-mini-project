import { BehaviorSubject } from "rxjs";

import config from "@/config";
import { requestOptions } from "@/helpers/request";
import { handleResponse } from "@/helpers/response";

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem("currentUser"))
);

export const authService = {
    login,
    logout,
    currentUser,
    isAuthenticated,
    isAuthorized,
};

function currentUser() {
    return currentUserSubject.value;
}

function isAuthenticated() {
    return this.currentUser() !== null;
}

function isAuthorized(role) {
    return (
        this.isAuthenticated() && this.currentUser().roles.indexOf(role) >= 0
    );
}

function login(email, password) {
    return fetch(
        `${config.baseApi}/auth/login`,
        requestOptions.post({ email, password })
    )
        .then(handleResponse)
        .then((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user.result));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    currentUserSubject.next(null);
}
