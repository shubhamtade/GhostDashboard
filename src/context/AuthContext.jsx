import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  // Sign up
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  // Add this function inside AuthContextProvider
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/dashboard", // Redirects back to your app
        },
      });

      if (error) {
        console.error("Google Sign-in Error:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error("Unexpected error during Google sign-in:", err.message);
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  // Sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      // Handle Supabase error explicitly
      if (error) {
        console.error("Sign-in error:", error.message); // Log the error for debugging
        return { success: false, error: error.message }; // Return the error
      }

      // If no error, return success
      console.log("Sign-in success:", data);
      return { success: true, data }; // Return the user data
    } catch (error) {
      // Handle unexpected issues
      console.error("Unexpected error during sign-in:", err.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession(); // Set session when component mounts

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      setSession(null); // Reset session after sign-out
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUpNewUser, signInUser, signInWithGoogle, session, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
