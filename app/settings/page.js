"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
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
import { useLanguageStore } from "@/store/langStore";
import { useTranslation } from "react-i18next";

const profileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export default function SettingsPage() {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });
    const [profileErrors, setProfileErrors] = useState({});

    const lang = useLanguageStore((s) => s.language);
    const setLanguage = useLanguageStore((s) => s.setLanguage);

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [passwordErrors, setPasswordErrors] = useState({});

    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    function handleProfileChange(e) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    async function handleSaveProfile() {
        const result = profileSchema.safeParse(profile);
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setProfileErrors(fieldErrors);
            return;
        }
        setProfileErrors({});

        setIsSavingProfile(true);
        try {
            const updated = await updateUser(user.id, {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
            });
            setUser({ ...user, ...updated });
            toast.success(`${t("settings.profileUpdated")}`);
        } catch (err) {
            toast.error(`${t("settings.profileUpdateFailed")}`, "Failed to update profile. Please try again.");
        } finally {
            setIsSavingProfile(false);
        }
    }

    async function handleChangePassword() {
        const result = passwordSchema.safeParse(passwordForm);
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setPasswordErrors(fieldErrors);
            return;
        }
        setPasswordErrors({});

        setIsSavingPassword(true);
        try {
            const freshUser = await getUserById(user.id);

            if (freshUser.password !== passwordForm.currentPassword) {
                toast.error(`${t("settings.incorrectCurrentPassword")}`);
                return;
            }

            await updateUser(user.id, { password: passwordForm.newPassword });
            setPasswordForm({ currentPassword: "", newPassword: "" });
            toast.success(`${t("settings.passwordChanged")}`);
        } catch (err) {
            toast.error(t("settings.passwordChangeFailed"));
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
                        <ArrowLeft size={14} /> {t("settings.backToHome")}
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {t("settings.title")}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        {t("settings.subtitle")}
                    </p>
                </div>

                <div className="space-y-8">
                    <Card className="border-zinc-100 dark:border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <Globe className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{t("settings.preferencesAppearance")}</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="dark:text-zinc-300">{t("settings.language")}</Label>
                                    <Select value={lang === "en" ? `${t("settings.englishOption")}` : `${t("settings.arabicOption")}`} onValueChange={setLanguage}>
                                        <SelectTrigger className="w-full dark:text-zinc-100 dark:bg-zinc-900/50">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">{t("settings.englishOption")}</SelectItem>
                                            <SelectItem value="ar">{t("settings.arabicOption")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5 dark:text-zinc-300">
                                        <Moon size={13} /> {t("settings.displayTheme")}
                                    </Label>
                                    <Select value={theme === "light" ? `${t("settings.lightMode")}` : `${t("settings.darkMode")}`} onValueChange={setTheme}>
                                        <SelectTrigger className="w-full dark:text-zinc-100 dark:bg-zinc-900/50">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">{t("settings.lightMode")}</SelectItem>
                                            <SelectItem value="dark">{t("settings.darkMode")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-100 dark:border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <User className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{t("settings.personalProfile")}</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="dark:text-zinc-300">{t("settings.fullName")}</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                    {profileErrors.name && (
                                        <p className="text-xs text-red-600 mt-1">{profileErrors.name}</p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="dark:text-zinc-300">{t("settings.phoneNumber")}</Label>
                                    <Input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleProfileChange}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                    {profileErrors.phone && (
                                        <p className="text-xs text-red-600 mt-1">{profileErrors.phone}</p>
                                    )}
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="email" className="dark:text-zinc-300">{t("settings.emailAddress")}</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                    {profileErrors.email && (
                                        <p className="text-xs text-red-600 mt-1">{profileErrors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    onClick={handleSaveProfile}
                                    disabled={isSavingProfile}
                                    className="bg-blue-900 hover:bg-blue-950 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider gap-2 px-5 py-2 disabled:opacity-60 cursor-pointer"
                                >
                                    <Save size={14} /> {isSavingProfile ? `${t("settings.saving")}` : `${t("settings.saveProfile")}`}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-100 dark:border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <Shield className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{t("settings.security")}</h2>
                            </div>

                            <div className="space-y-4 max-w-md">
                                <div className="space-y-1.5">
                                    <Label htmlFor="currentPassword" className="dark:text-zinc-300">{t("settings.currentPassword")}</Label>
                                    <Input
                                        type="password"
                                        id="currentPassword"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                    {passwordErrors.currentPassword && (
                                        <p className="text-xs text-red-600 mt-1">{passwordErrors.currentPassword}</p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="newPassword" className="dark:text-zinc-300">{t("settings.newPassword")}</Label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="dark:text-zinc-100 dark:bg-zinc-900/50"
                                    />
                                    {passwordErrors.newPassword && (
                                        <p className="text-xs text-red-600 mt-1">{passwordErrors.newPassword}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    onClick={handleChangePassword}
                                    disabled={isSavingPassword}
                                    className="bg-blue-900 hover:bg-blue-950 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider gap-2 px-5 py-2 disabled:opacity-60 cursor-pointer"
                                >
                                    {isSavingPassword ? `${t("settings.changing")}` : `${t("settings.changePassword")}`}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </ProtectedRoutes>
    );
}