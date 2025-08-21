import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, ListChecks, Trophy, Code, Sun, Moon, LogOut, PlaySquare, PlusSquare } from 'lucide-react';

// Component Imports
import Button from './components/ui/Button';
import Modal from './components/ui/Modal';
import AuthForm from './components/auth/AuthForm';

// Page Imports
import AddProblemPage from './pages/AddProblemPage';
import CompilerPage from './pages/CompilerPage';
import ProblemListPage from './pages/ProblemListPage';
import SubmissionListPage from './pages/SubmissionListPage';
import LeaderboardPage from './pages/LeaderboardPage';

const API = axios.create({ 
    baseURL: import.meta.env.VITE_BACK_END_URL ?? 'http://localhost:5000/api' 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const App = () => {
    const [activePage, setActivePage] = useState('problems');
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleProblemSelect = (problem) => {
          console.log('Problem selected:', problem); 
        setSelectedProblem(problem);
        setActivePage('compiler');
    };
    
    // This handler is no longer needed in App.jsx but we keep the render logic
   // const goToAddProblemPage = () => {
  //      setActivePage('add-problem');
  //  };

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data: user } = await API.get('/auth/me');
                    setCurrentUser(user);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Session expired or token invalid.", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);
    
    const handleLogin = async (credentials) => {
        try {
            const { data } = await API.post('/auth/login', credentials);
            localStorage.setItem('token', data.token);
            const { data: user } = await API.get('/auth/me');
            setCurrentUser(user);
            setIsAuthenticated(true);
            setShowAuthModal(null);
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
        }
    };

    const handleRegister = async (credentials) => {
        try {
            await API.post('/auth/register', credentials);
            await handleLogin({ email: credentials.email, password: credentials.password });
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentUser(null);
    };
const goToAddProblemPage = () => {
    setActivePage('add-problem');
};
   const renderPage = () => {
    switch (activePage) {
        case 'add-problem': 
            return <AddProblemPage />;
        case 'compiler': 
            return <CompilerPage problem={selectedProblem} />;
        case 'problems': 
            return <ProblemListPage onProblemSelect={handleProblemSelect} onAddProblemClick={goToAddProblemPage} />; 
        case 'submissions': 
            return <SubmissionListPage />;
        case 'leaderboard': 
            return <LeaderboardPage />;
        default: 
            // FIX: Add the missing onAddProblemClick prop here
           return <ProblemListPage onProblemSelect={handleProblemSelect} onAddProblemClick={goToAddProblemPage} />;
            
    }
};

    const NavLink = ({ page, icon: Icon, children }) => (
        <button
            onClick={() => setActivePage(page)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activePage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            <Icon className="w-5 h-5" />
            <span>{children}</span>
        </button>
    );
    
    const ThemeToggle = () => (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );

    if (loading) {
        return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center"><p>Loading...</p></div>
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors">
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                             <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                                <Code className="w-8 h-8" />
                                <span className="text-xl font-bold text-gray-800 dark:text-white">OnlineJudge</span>
                            </div>
                            <div className="hidden md:flex items-center space-x-2">
                                <NavLink page="compiler" icon={PlaySquare}>Compiler</NavLink>
                                <NavLink page="problems" icon={BookOpen}>Problems</NavLink>
                                {isAuthenticated && (
                                    <>
                                      <NavLink page="submissions" icon={ListChecks}>Submissions</NavLink>
                                      <NavLink page="leaderboard" icon={Trophy}>Leaderboard</NavLink>
                                      {/* "Add Problem" button is back in the nav */}
                                      <NavLink page="add-problem" icon={PlusSquare}>Add Problem</NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <ThemeToggle />
                            {isAuthenticated && currentUser ? (
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                                        Welcome, {currentUser.username}
                                    </span>
                                    <button onClick={handleLogout} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Logout">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center space-x-2">
                                    <Button onClick={() => setShowAuthModal('login')}>Log In</Button>
                                    <Button onClick={() => setShowAuthModal('register')} primary>Sign Up</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] flex justify-around p-2 z-20">
                 <NavLink page="compiler" icon={PlaySquare}>Compiler</NavLink>
                 <NavLink page="problems" icon={BookOpen}>Problems</NavLink>
                 {isAuthenticated ? (
                    <>
                        <NavLink page="submissions" icon={ListChecks}>Submissions</NavLink>
                        <NavLink page="leaderboard" icon={Trophy}>Leaderboard</NavLink>
                    </>
                 ) : (
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => setShowAuthModal('login')}>Log In</Button>
                        <Button onClick={() => setShowAuthModal('register')} primary>Sign Up</Button>
                    </div>
                 )}
            </div>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
                {renderPage()}
            </main>

            <Modal show={showAuthModal === 'login'} onClose={() => setShowAuthModal(null)} title="Log In to Your Account">
                <AuthForm 
                    onSubmit={handleLogin} 
                    onSwitch={() => setShowAuthModal('register')} 
                />
            </Modal>

            <Modal show={showAuthModal === 'register'} onClose={() => setShowAuthModal(null)} title="Create a New Account">
                <AuthForm 
                    isRegister 
                    onSubmit={handleRegister} 
                    onSwitch={() => setShowAuthModal('login')} 
                />
            </Modal>
        </div>
    );
};

export default App;
