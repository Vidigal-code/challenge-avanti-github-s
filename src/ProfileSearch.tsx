import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Search, Loader} from 'lucide-react';
import {GitHubUserData, Language} from "./type/Interface.ts";
import translations from './assets/translations.json';
import {API_GITHUB_USERS} from "./api/api.ts";
import {FaRegLightbulb} from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";


const ProfileSearch: React.FC = () => {

    const [githubUsername, setGithubUsername] = useState<string>('');
    const [userData, setUserData] = useState<GitHubUserData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        return savedLanguage && translations[savedLanguage] ? savedLanguage : 'pt';
    });

    const PathLang = translations[language as keyof typeof translations];

    const handleLanguageChange = (lang: Language): void => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };


    const toggleDarkMode = (): void => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
    };

    const searchGithubProfile = (): void => {

        if (!githubUsername.trim()) {
            setError(PathLang.textErrorGitHubUserRequired);
            return;
        }

        setLoading(true);
        setError(null);
        setUserData(null);

        fetch(`${API_GITHUB_USERS}${githubUsername}`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(PathLang.notFound);
                }
                return response.json();
            })
            .then(data => {
                setUserData(data as GitHubUserData);
            })
            .catch(() => {
                setError(PathLang.notFound);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            searchGithubProfile();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setGithubUsername(e.target.value);
    };

    const [isOpenLang, setIsOpenLang] = useState(false);

    return (
        <div className={isDarkMode ? "dark" : "light"}>
            <div className={`min-h-screen transition-colors duration-300 ${
                isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
            }`}>

                <header className={`w-full py-4 sm:py-6 flex justify-center items-center mb-4 ${
                    isDarkMode ? '' : 'bg-white border-b border-gray-200'
                }`}>
                    <div className="flex items-center">
                        <svg className={`w-8 h-8 sm:w-10 sm:h-10 ${isDarkMode ? 'text-white' : 'text-black'}`} viewBox="0 0 16 16"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span className="text-xl sm:text-3xl ml-2 sm:ml-3 font-bold">Perfil GitHub</span>
                    </div>
                </header>

                <div className="w-full  py-4 flex justify-center items-center" style={{display: 'none'}}>
                    <div className={`relative  w-40 sm:w-auto`}>
                        <div className="w-full flex flex-col sm:flex-row gap-2">
                            <button
                                className={`w-full sm:w-auto px-4 py-2 border rounded-md transition-colors duration-200 focus:outline-none text-center mx-auto ${
                                    isDarkMode ? "text-white" : "bg-gray-200 text-black"
                                }`}
                                onClick={() => setIsOpenLang(!isOpenLang)}
                            >
                                {PathLang.menu?.[language as keyof typeof translations]}
                                <span
                                    className={`ml-2 transform transition-transform ${isOpenLang ? 'rotate-180' : ''}`}
                                >
                                  ▼
                                </span>
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className={`w-full sm:w-auto px-4 py-2 border rounded-md transition-colors duration-200 focus:outline-none flex justify-center items-center ${
                                    isDarkMode ? "text-white" : "bg-gray-200 text-black"
                                }`}
                            >
                                {isDarkMode ? <FaLightbulb/> :  <FaRegLightbulb/> }
                            </button>
                        </div>

                        <ul className={`absolute w-full border rounded-md shadow-lg mt-2 z-10 ${isOpenLang ? 'block' : 'hidden'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            {Object.entries(translations[language as keyof typeof translations].menu).map(([code, label]) => (
                                <li
                                    key={code}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700 text-white" : "text-black hover:bg-gray-100"}`}
                                    onClick={() => {
                                        handleLanguageChange(code as Language);
                                        setIsOpenLang(false);
                                    }}
                                >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto max-w-xl px-4">
                    <div className="relative mb-6">
                        <div className={`flex overflow-hidden rounded-lg ${
                            isDarkMode ? 'border border-gray-700' : 'border border-gray-300'
                        }`}>
                            <input
                                type="text"
                                className={`w-full p-3 sm:p-4 outline-none ${
                                    isDarkMode
                                        ? 'bg-white text-black font-normal placeholder-black'
                                        : 'bg-white text-gray-900 placeholder-gray-500'
                                }`}
                                placeholder={PathLang.inputPlaceholder}
                                value={githubUsername}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                onClick={searchGithubProfile}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 flex items-center justify-center transition-colors duration-200 disabled:bg-blue-400"
                            >
                                {loading ? <Loader size={18} className="animate-spin"/> : <Search size={18} />}
                            </button>
                        </div>
                    </div>

                    {loading && (
                        <div className="flex justify-center my-6 sm:my-8">
                            <div className="flex flex-col items-center">
                                <Loader size={32} className="animate-spin text-blue-500"/>
                                <p className="mt-3 text-base sm:text-lg">{PathLang.loading}</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className={`p-4 sm:p-5 rounded-lg mb-6 text-center ${
                            isDarkMode ? 'bg-[#d9d9d9]' : 'bg-gray-200'
                        }`}>
                            <p className={`text-red-500 font-medium`}>{error}</p>
                            <p className={`text-red-500 font-medium`}>{PathLang.tryAgain}</p>
                        </div>
                    )}

                    {userData && (
                        <div className={`mt-6 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                            isDarkMode ? 'bg-[#d9d9d9]' : 'bg-white'
                        }`}>
                            <div className="flex flex-col">
                                <div className="w-full flex justify-center py-4">
                                    <img
                                        src={userData.avatar_url}
                                        alt={`${userData.name || userData.login}'s profile`}
                                        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-full sm:rounded-none"
                                    />
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-black">
                                            {userData.name || userData.login}
                                            {userData.name && (
                                                <span className="block text-sm font-normal mt-1 text-black">@{userData.login}</span>
                                            )}
                                        </h2>

                                        {userData.bio && (
                                            <p className={`my-3 sm:my-4 text-center max-w-md ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>
                                                {userData.bio}
                                            </p>
                                        )}

                                        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-md">
                                            <div className="text-center">
                                                <p className="text-lg sm:text-xl font-bold text-black">{userData.followers.toLocaleString()}</p>
                                                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-black' : 'text-gray-600'}`}>
                                                    {PathLang.followers}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg sm:text-xl font-bold text-black">{userData.following.toLocaleString()}</p>
                                                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-black' : 'text-gray-600'}`}>
                                                    {PathLang.following}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg sm:text-xl font-bold text-black">{userData.public_repos.toLocaleString()}</p>
                                                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-black' : 'text-gray-600'}`}>
                                                    {PathLang.repositories}
                                                </p>
                                            </div>
                                        </div>

                                        <a
                                            href={userData.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full max-w-md mt-4 sm:mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center transition-colors duration-200"
                                        >
                                            {PathLang.viewProfile}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSearch;