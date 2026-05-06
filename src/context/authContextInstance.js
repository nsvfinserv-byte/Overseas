import { createContext } from 'react';

// Separate file so react-refresh can fast-reload AuthProvider without
// treating the context export as a non-component violation.
export const AuthContext = createContext(null);
