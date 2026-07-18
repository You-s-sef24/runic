"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User, Shield, Save, ArrowLeft, Globe, Moon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { updateUser, getUserById } from "@/api/users";
import ProtectedRoutes from "@/components/ProtectedRoutes";

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const [language, setLanguage] = useState("en");

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingPreferences, setIsSavingPreferences] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    function handleProfileChange(e) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    async function handleSaveProfile() {
        setIsSavingProfile(true);
        try {
            const updated = await updateUser(user.id, {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
            });
            setUser({ ...user, ...updated });
            toast.success("Profile updated successfully.");
        } catch (err) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsSavingProfile(false);
        }
    }

    async function handleSavePreferences() {
        setIsSavingPreferences(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 600));
            toast.success("Display preferences updated successfully.");
        } catch (err) {
            toast.error("Failed to save display preferences.");
        } finally {
            setIsSavingPreferences(false);
        }
    }

    async function handleChangePassword() {
        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
            toast.error("Please fill in both password fields.");
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            toast.error("New password must be at least 8 characters.");
            return;
        }

        setIsSavingPassword(true);
        try {
            const freshUser = await getUserById(user.id);

            if (freshUser.password !== passwordForm.currentPassword) {
                toast.error("Current password is incorrect.");
                return;
            }

            await updateUser(user.id, { password: passwordForm.newPassword });
            setPasswordForm({ currentPassword: "", newPassword: "" });
            toast.success("Password changed successfully.");
        } catch (err) {
            toast.error("Failed to change password. Please try again.");
        } finally {
            setIsSavingPassword(false);
        }
    }

    return (
        <ProtectedRoutes>
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider mb-4"
                    >
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        Account Settings
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Update your profile data, interface configurations, and security parameters.
                    </p>
                </div>

                <div className="space-y-8">
                    <Card className="border-zinc-100 dark:border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <User className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">Personal Profile</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="dark:text-zinc-300">Full Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="dark:text-zinc-300">Phone Number</Label>
                                    <Input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleProfileChange}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="email" className="dark:text-zinc-300">Email Address</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    onClick={handleSaveProfile}
                                    disabled={isSavingProfile}
                                    className="bg-blue-900 hover:bg-blue-950 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider gap-2 px-5 py-2 disabled:opacity-60 cursor-pointer"
                                >
                                    <Save size={14} /> {isSavingProfile ? "Saving..." : "Save Profile"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-100 dark:border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <Globe className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">Preferences & Appearance</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="dark:text-zinc-300">Language / اللغة</Label>
                                    <Select value={language=== "en" ? "English (US)" : "العربية (Arabic)"} onValueChange={setLanguage}>
                                        <SelectTrigger className="w-full dark:text-zinc-100 dark:bg-zinc-900/50">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English (US)</SelectItem>
                                            <SelectItem value="ar">العربية (Arabic)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5 dark:text-zinc-300">
                                        <Moon size={13} /> Display Theme
                                    </Label>
                                    <Select value={theme === "light" ? "Light Mode" : "Dark Mode"} onValueChange={setTheme}>
                                        <SelectTrigger className="w-full dark:text-zinc-100 dark:bg-zinc-900/50">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light Mode</SelectItem>
                                            <SelectItem value="dark">Dark Mode</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-100 dark:border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <Shield className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">Security & Authentication</h2>
                            </div>

                            <div className="space-y-4 max-w-md">
                                <div className="space-y-1.5">
                                    <Label htmlFor="currentPassword" className="dark:text-zinc-300">Current Password</Label>
                                    <Input
                                        type="password"
                                        id="currentPassword"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="newPassword" className="dark:text-zinc-300">New Password</Label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    onClick={handleChangePassword}
                                    disabled={isSavingPassword}
                                    className="bg-blue-900 hover:bg-blue-950 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider gap-2 px-5 py-2 disabled:opacity-60 cursor-pointer"
                                >
                                    {isSavingPassword ? "Changing..." : "Change Password"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </ProtectedRoutes>
    );
}