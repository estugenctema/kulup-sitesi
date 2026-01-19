import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sun, Moon, Calendar, MapPin, Users, BookOpen, Lightbulb, Compass, ChevronLeft, Home, Info, FileText, UserCircle, Bell, Plus, Edit2, Trash2, Upload, Save, LogOut } from 'lucide-react';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Örnek veriler (State)
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'Yeni Dönem Başlıyor!', content: 'Kulübümüz yeni dönemde birçok etkinlik ile sizlerle olacak.', date: '20 Ocak 2026', pinned: true },
        { id: 2, title: 'Workshop Kayıtları Açıldı', content: 'Sürdürülebilirlik workshop\'una kaydınızı yaptırabilirsiniz.', date: '15 Ocak 2026', pinned: false },
        { id: 3, title: 'Dergi Yazarları Aranıyor', content: 'Yeni sayımız için yazarlar arıyoruz. Başvurularınızı bekliyoruz!', date: '10 Ocak 2026', pinned: false },
    ]);

    const [magazines, setMagazines] = useState([
        { id: 1, title: "Kasım 2024", cover: "🌿", theme: "Sürdürülebilirlik", link: "#" },
        { id: 2, title: "Ekim 2024", cover: "🌍", theme: "İklim Değişikliği", link: "#" },
        { id: 3, title: "Eylül 2024", cover: "♻️", theme: "Geri Dönüşüm", link: "#" },
        { id: 4, title: "Ağustos 2024", cover: "🌱", theme: "Yeşil Kampüs", link: "#" },
    ]);

    const [events, setEvents] = useState([
        { id: 1, date: "25 Ocak", title: "Sürdürülebilirlik Workshop", location: "A303 Amfisi", time: "14:00" },
        { id: 2, date: "5 Şubat", title: "Doğa Yürüyüşü", location: "Kent Ormanı", time: "09:00" },
        { id: 3, date: "15 Şubat", title: "Çevre Semineri", location: "Online", time: "18:00" },
    ]);

    const [team, setTeam] = useState([
        { id: 1, name: "Ayşe Yılmaz", role: "Kulüp Başkanı", image: "👩‍💼" },
        { id: 2, name: "Mehmet Kaya", role: "Başkan Yardımcısı", image: "👨‍💼" },
        { id: 3, name: "Zeynep Demir", role: "Dergi Sorumlusu", image: "👩‍🎓" },
        { id: 4, name: "Can Öztürk", role: "Etkinlik Koordinatörü", image: "👨‍🎓" },
    ]);

    // Düzenleme modalları için state'ler
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const [editingMagazine, setEditingMagazine] = useState(null);
    const [editingTeamMember, setEditingTeamMember] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleLogin = () => {
        if (adminPassword === 'admin123') {
            setIsAdmin(true);
            setShowLoginModal(false);
            setAdminPassword('');
        } else {
            alert('Yanlış şifre!');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        setCurrentPage('home');
    };

    // Ekleme / Silme Fonksiyonları
    const addAnnouncement = () => {
        const newAnnouncement = {
            id: Date.now(),
            title: 'Yeni Duyuru',
            content: 'Duyuru içeriği...',
            date: new Date().toLocaleDateString('tr-TR'),
            pinned: false
        };
        setAnnouncements([newAnnouncement, ...announcements]);
    };

    const deleteAnnouncement = (id) => {
        setAnnouncements(announcements.filter(a => a.id !== id));
    };

    const addEvent = () => {
        const newEvent = {
            id: Date.now(),
            date: "TBD",
            title: "Yeni Etkinlik",
            location: "TBD",
            time: "TBD"
        };
        setEvents([...events, newEvent]);
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const addMagazine = () => {
        const newMagazine = {
            id: Date.now(),
            title: "Yeni Sayı",
            cover: "📰",
            theme: "Tema",
            link: "#"
        };
        setMagazines([newMagazine, ...magazines]);
    };

    const deleteMagazine = (id) => {
        setMagazines(magazines.filter(m => m.id !== id));
    };

    const addTeamMember = () => {
        const newMember = {
            id: Date.now(),
            name: "Yeni Üye",
            role: "Görev",
            image: "👤"
        };
        setTeam([...team, newMember]);
    };

    const deleteTeamMember = (id) => {
        setTeam(team.filter(t => t.id !== id));
    };

    // Navigasyon Öğeleri
    const navItems = [
        { id: 'home', label: 'Ana Sayfa', icon: <Home className="w-5 h-5" /> },
        { id: 'about', label: 'Hakkımızda', icon: <Info className="w-5 h-5" /> },
        { id: 'magazine', label: 'Dergi', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'events', label: 'Etkinlikler', icon: <Calendar className="w-5 h-5" /> },
        { id: 'team', label: 'Yönetim', icon: <Users className="w-5 h-5" /> },
    ];

    const activities = [
        { icon: <Lightbulb className="w-8 h-8" />, title: "Workshoplar", desc: "Sürdürülebilirlik odaklı eğitimler" },
        { icon: <Compass className="w-8 h-8" />, title: "Teknik Geziler", desc: "Doğa ve çevre keşifleri" },
        { icon: <Users className="w-8 h-8" />, title: "Seminerler", desc: "Uzman konuşmacılarla buluşmalar" },
        { icon: <BookOpen className="w-8 h-8" />, title: "Dijital Dergi", desc: "Aylık çevre yayınımız" },
    ];

    // Sayfa Bileşenleri
    const HomePage = () => (
        <div className="space-y-12">
            {/* Hero */}
            <div className="relative h-96 flex items-center justify-center overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-900 opacity-90"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-48 h-48 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Genç TEMA Kulübü</h1>
                    <p className="text-xl text-green-100 mb-6">Eskişehir Teknik Üniversitesi</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button onClick={() => setCurrentPage('about')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all">
                            Bize Katıl
                        </button>
                        <button onClick={() => setCurrentPage('magazine')} className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all">
                            Dergimizi Oku
                        </button>
                    </div>
                </div>
            </div>

            {/* Announcements */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <Bell className="w-8 h-8 text-orange-500" />
                        Duyurular
                    </h2>
                    {isAdmin && (
                        <button onClick={addAnnouncement} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Yeni Duyuru
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {announcements.sort((a, b) => b.pinned - a.pinned).map(announcement => (
                        <div key={announcement.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg ${announcement.pinned ? 'border-2 border-orange-500' : ''}`}>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {announcement.pinned && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Sabitlendi</span>}
                                        <span className="text-sm opacity-70">{announcement.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                                    <p className="opacity-80">{announcement.content}</p>
                                </div>
                                {isAdmin && (
                                    <div className="flex gap-2 ml-4">
                                        <button onClick={() => deleteAnnouncement(announcement.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-green-50 to-green-100'} p-6 rounded-xl text-center`}>
                    <div className="text-4xl font-bold text-green-600 mb-2">{team.length}</div>
                    <div className="opacity-70">Yönetim Üyesi</div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-orange-50 to-orange-100'} p-6 rounded-xl text-center`}>
                    <div className="text-4xl font-bold text-orange-600 mb-2">{events.length}</div>
                    <div className="opacity-70">Yaklaşan Etkinlik</div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'} p-6 rounded-xl text-center`}>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{magazines.length}</div>
                    <div className="opacity-70">Dergi Sayısı</div>
                </div>
            </div>
        </div>
    );

    const AboutPage = () => (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
                <p className="text-xl max-w-3xl mx-auto opacity-80">
                    Genç TEMA Kulübü olarak, çevre bilincini artırmak ve sürdürülebilir yaşam tarzlarını teşvik etmek amacıyla çeşitli etkinlikler düzenliyoruz.
                </p>
            </div>

            <div>
                <h2 className="text-3xl font-bold mb-8 text-center">Neler Yapıyoruz?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map((activity, index) => (
                        <div key={index} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform hover:scale-105 transition-all`}>
                            <div className="text-green-600 mb-4">{activity.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                            <p className="opacity-70">{activity.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-green-50 to-orange-50'} p-8 rounded-3xl`}>
                <h2 className="text-3xl font-bold mb-4">Misyonumuz</h2>
                <p className="text-lg opacity-80 mb-4">
                    Üniversite kampüsünde çevre bilincini yaymak, öğrencileri sürdürülebilirlik konusunda eğitmek ve aktif projeler geliştirmek.
                </p>
                <h2 className="text-3xl font-bold mb-4 mt-6">Vizyonumuz</h2>
                <p className="text-lg opacity-80">
                    Geleceğin çevre liderlerini yetiştiren, toplumsal farkındalık yaratan ve yeşil bir kampüs kültürü oluşturan öncü bir öğrenci topluluğu olmak.
                </p>
            </div>
        </div>
    );

    const MagazinePage = () => (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Dijital Dergimiz</h1>
                <p className="text-xl opacity-80">Çevre ve sürdürülebilirlik odaklı aylık yayınımız</p>
            </div>

            {isAdmin && (
                <div className="flex justify-end">
                    <button onClick={addMagazine} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Yeni Sayı Ekle
                    </button>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {magazines.map(magazine => (
                    <div key={magazine.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all`}>
                        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-green-100 to-orange-100'} p-12 text-center`}>
                            <div className="text-8xl mb-4">{magazine.cover}</div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">{magazine.title}</h3>
                            <p className="text-green-600 font-semibold mb-4">{magazine.theme}</p>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                                    Oku
                                </button>
                                {isAdmin && (
                                    <>
                                        <button onClick={() => deleteMagazine(magazine.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const EventsPage = () => (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Etkinliklerimiz</h1>
                <p className="text-xl opacity-80">Yaklaşan workshop, seminer ve gezilerimiz</p>
            </div>

            {isAdmin && (
                <div className="flex justify-end">
                    <button onClick={addEvent} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Yeni Etkinlik Ekle
                    </button>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <div key={event.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all`}>
                        <div className="flex items-center gap-2 text-orange-500 mb-4">
                            <Calendar className="w-5 h-5" />
                            <span className="font-bold">{event.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                        <div className="flex items-center gap-2 opacity-70 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                        </div>
                        <p className="opacity-70 mb-4">Saat: {event.time}</p>
                        {isAdmin && (
                            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button onClick={() => deleteEvent(event.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const TeamPage = () => (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Yönetim Ekibimiz</h1>
                <p className="text-xl opacity-80">Kulübümüzü yöneten değerli ekibimiz</p>
            </div>

            {isAdmin && (
                <div className="flex justify-end">
                    <button onClick={addTeamMember} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Yeni Üye Ekle
                    </button>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map(member => (
                    <div key={member.id} className={`text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all`}>
                        <div className="text-6xl mb-4">{member.image}</div>
                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                        <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                        {isAdmin && (
                            <div className="flex gap-2 justify-center">
                                <button onClick={() => deleteTeamMember(member.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // Login Modal
    const LoginModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl max-w-md w-full shadow-2xl`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Yönetici Girişi</h2>
                    <button onClick={() => setShowLoginModal(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-70">Şifre</label>
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            placeholder="Şifrenizi girin..."
                        />
                    </div>
                    <button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-all">
                        Giriş Yap
                    </button>
                    <div className="text-xs text-center opacity-50">Demo Şifre: admin123</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Top Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? (darkMode ? 'bg-gray-900/95 shadow-lg' : 'bg-white/95 shadow-lg') : (darkMode ? 'bg-gray-900' : 'bg-white')}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
                            <span className="text-2xl">🌿</span>
                            <span className="font-bold text-xl">Genç TEMA</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${currentPage === item.id
                                            ? 'bg-green-600 text-white'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            ))}

                            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {isAdmin ? (
                                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                    <LogOut className="w-4 h-4" />
                                    Çıkış
                                </button>
                            ) : (
                                <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                                    <UserCircle className="w-4 h-4" />
                                    Admin
                                </button>
                            )}
                        </div>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <div className="px-4 py-3 space-y-2">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => { setCurrentPage(item.id); setIsMenuOpen(false); }}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${currentPage === item.id
                                            ? 'bg-green-600 text-white'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {currentPage === 'home' && <HomePage />}
                {currentPage === 'about' && <AboutPage />}
                {currentPage === 'magazine' && <MagazinePage />}
                {currentPage === 'events' && <EventsPage />}
                {currentPage === 'team' && <TeamPage />}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Genç TEMA Kulübü</h3>
                            <p className="opacity-70">Eskişehir Teknik Üniversitesi</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">İletişim</h3>
                            <p className="opacity-70">Email: genctema@estu.edu.tr</p>
                            <p className="opacity-70">Kulüp Odası: C Blok 205</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Sosyal Medya</h3>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-orange-500 transition-colors">Instagram</a>
                                <a href="#" className="hover:text-orange-500 transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-orange-500 transition-colors">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modals */}
            {showLoginModal && <LoginModal />}
        </div>
    );
};

export default App;